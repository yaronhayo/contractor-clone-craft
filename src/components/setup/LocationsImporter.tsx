import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import type { Location, ServiceAreaCity } from "@/config/site-config";
import Papa from "papaparse";

export type LocationsImporterProps = {
  existingLocations: Location[];
  onMerge: (locations: Location[]) => void;
};

const download = (filename: string, text: string) => {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const templateLocations = `id,name,slug,phone,email,address_line1,address_line2,city,state,postal_code,country,lat,lng,hours_mon,hours_tue,hours_wed,hours_thu,hours_fri,hours_sat,hours_sun,isPrimary,coverageRadiusMiles
loc-san-antonio,Locksmith San Antonio,locksmith-san-antonio-tx,(210) 000-0000,sa@example.com,200 Houston St,,San Antonio,TX,78205,US,29.426,-98.489,8:00AM – 6:00PM,8:00AM – 6:00PM,8:00AM – 6:00PM,8:00AM – 6:00PM,8:00AM – 6:00PM,8:00AM – 4:00PM,Closed,true,40`;

const templateServiceAreas = `locationId,name,state,slug,center_lat,center_lng,neighborhoods
loc-san-antonio,San Antonio,TX,san-antonio-tx,29.4241,-98.4936,"Downtown|Alamo Heights|Stone Oak"
loc-san-antonio,Leon Valley,TX,leon-valley-tx,29.495,-98.619,
`;

const LocationsImporter: React.FC<LocationsImporterProps> = ({ existingLocations, onMerge }) => {
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);

  const mergeById = (current: Location[], incoming: Location[]): Location[] => {
    const map = new Map<string, Location>(current.map((l) => [l.id, { ...l }]));
    for (const loc of incoming) {
      map.set(loc.id, { ...map.get(loc.id), ...loc, serviceAreas: loc.serviceAreas ?? map.get(loc.id)?.serviceAreas ?? [] } as Location);
    }
    return Array.from(map.values());
  };

  const handleLocationsCsv = (file: File) => {
    setBusy(true);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as any[];
        const parsed: Location[] = [];
        const errors: string[] = [];
        for (const row of rows) {
          try {
            const id = String(row.id || "").trim();
            if (!id) { errors.push("Missing id for a row"); continue; }
            const name = String(row.name || "").trim();
            const slug = String(row.slug || "").trim();
            const phone = String(row.phone || "").trim();
            const email = row.email ? String(row.email).trim() : undefined;
            const address = {
              line1: String(row.address_line1 || "").trim(),
              line2: row.address_line2 ? String(row.address_line2).trim() : undefined,
              city: String(row.city || "").trim(),
              state: String(row.state || "").trim().toUpperCase(),
              postalCode: String(row.postal_code || "").trim(),
              country: row.country ? String(row.country).trim() : undefined,
            };
            const geo = { lat: parseFloat(row.lat), lng: parseFloat(row.lng) } as { lat: number; lng: number };
            const hours = {
              mon: String(row.hours_mon || "").trim(),
              tue: String(row.hours_tue || "").trim(),
              wed: String(row.hours_wed || "").trim(),
              thu: String(row.hours_thu || "").trim(),
              fri: String(row.hours_fri || "").trim(),
              sat: String(row.hours_sat || "").trim(),
              sun: String(row.hours_sun || "").trim(),
            };
            const isPrimary = String(row.isPrimary || "").toLowerCase() === "true" || String(row.isPrimary) === "1";
            const coverageRadiusMiles = row.coverageRadiusMiles !== undefined && row.coverageRadiusMiles !== "" ? parseFloat(row.coverageRadiusMiles) : undefined;

            if (!name || !slug || !phone || !address.line1 || !address.city || !address.state || !address.postalCode || isNaN(geo.lat) || isNaN(geo.lng)) {
              errors.push(`Invalid required fields for id ${id}`);
              continue;
            }

            const loc: Location = {
              id,
              name,
              slug,
              phone,
              email,
              address: address as Location["address"],
              geo,
              hours: hours as Location["hours"],
              isPrimary: isPrimary || undefined,
              coverageRadiusMiles,
              serviceAreas: [],
            };
            parsed.push(loc);
          } catch (e: any) {
            errors.push(e?.message || "Unknown parsing error");
          }
        }
        const merged = mergeById(existingLocations, parsed);
        onMerge(merged);
        toast({ title: "Locations imported", description: errors.length ? `Imported ${parsed.length}; ${errors.length} rows skipped.` : `Imported ${parsed.length} locations.` });
        setBusy(false);
      },
      error: (err) => {
        toast({ title: "CSV parse error", description: err.message, variant: "destructive" as any });
        setBusy(false);
      },
    });
  };

  const handleAreasCsv = (file: File) => {
    setBusy(true);
    const byId = new Map<string, Location>(existingLocations.map((l) => [l.id, { ...l, serviceAreas: [...(l.serviceAreas || [])] }]));
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as any[];
        const errors: string[] = [];
        for (const row of rows) {
          const locationId = String(row.locationId || "").trim();
          const loc = byId.get(locationId);
          if (!loc) { errors.push(`locationId not found: ${locationId}`); continue; }
          const name = String(row.name || "").trim();
          const state = String(row.state || "").trim().toUpperCase();
          const slug = String(row.slug || "").trim();
          const centerLat = row.center_lat !== undefined && row.center_lat !== "" ? parseFloat(row.center_lat) : NaN;
          const centerLng = row.center_lng !== undefined && row.center_lng !== "" ? parseFloat(row.center_lng) : NaN;
          const neighborhoods = row.neighborhoods ? String(row.neighborhoods).split(/[|,]/).map((s: string) => s.trim()).filter(Boolean) : undefined;
          if (!name || !state || !slug) { errors.push(`Invalid area for locationId ${locationId}`); continue; }
          const area: ServiceAreaCity = {
            name,
            state,
            slug,
            center: !isNaN(centerLat) && !isNaN(centerLng) ? { lat: centerLat, lng: centerLng } : undefined,
            neighborhoods,
          };
          const idx = (loc.serviceAreas || []).findIndex((a) => a.slug === slug);
          if (idx >= 0) loc.serviceAreas[idx] = area; else (loc.serviceAreas || (loc.serviceAreas = [])).push(area);
        }
        onMerge(Array.from(byId.values()));
        toast({ title: "Service areas imported", description: errors.length ? `${errors.length} rows skipped; check format.` : "All rows imported." });
        setBusy(false);
      },
      error: (err) => {
        toast({ title: "CSV parse error", description: err.message, variant: "destructive" as any });
        setBusy(false);
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import / Export Locations</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Import Locations CSV (creates or updates by id).</p>
          <div className="space-y-1">
            <Label htmlFor="locationsCsv">Select CSV file</Label>
            <Input id="locationsCsv" type="file" accept=".csv" disabled={busy} onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleLocationsCsv(file);
              e.currentTarget.value = ""; // reset
            }} />
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" onClick={() => download("locations-template.csv", templateLocations)}>Download template</Button>
          </div>
          <p className="text-xs text-muted-foreground">Columns: id,name,slug,phone,email,address_line1,address_line2,city,state,postal_code,country,lat,lng,hours_mon..hours_sun,isPrimary,coverageRadiusMiles</p>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Import Service Areas CSV (adds/replaces by slug within each location).</p>
          <div className="space-y-1">
            <Label htmlFor="areasCsv">Select CSV file</Label>
            <Input id="areasCsv" type="file" accept=".csv" disabled={busy} onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleAreasCsv(file);
              e.currentTarget.value = "";
            }} />
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" onClick={() => download("service-areas-template.csv", templateServiceAreas)}>Download template</Button>
          </div>
          <p className="text-xs text-muted-foreground">Columns: locationId,name,state,slug,center_lat,center_lng,neighborhoods (pipe or comma separated)</p>
        </div>

        <div className="md:col-span-2">
          <Button type="button" onClick={() => download("locations.json", JSON.stringify(existingLocations, null, 2))}>Export current JSON</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationsImporter;
