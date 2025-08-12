import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import type { Location, ServiceAreaCity } from "@/config/site-config";
import Papa from "papaparse";

export type LocationsSheetsSyncProps = {
  existingLocations: Location[];
  onMerge: (locations: Location[]) => void;
};

const toExportCsvUrl = (url: string): string => {
  try {
    const u = new URL(url);
    if (u.hostname.includes("docs.google.com") && u.pathname.includes("/spreadsheets/d/")) {
      const parts = u.pathname.split("/");
      const idIdx = parts.findIndex((p) => p === "d") + 1;
      const id = parts[idIdx];
      const gidMatch = u.hash.match(/gid=(\d+)/);
      const gid = gidMatch?.[1] || u.searchParams.get("gid") || "0";
      // Prefer export endpoint (works when published or link is public)
      return `https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${gid}`;
    }
    // Already an export/pub CSV link or any raw CSV URL
    return url;
  } catch {
    return url;
  }
};

const parseLocationsCsv = (csvText: string): { data: Location[]; errors: string[] } => {
  const parsed: Location[] = [];
  const errors: string[] = [];
  const res = Papa.parse(csvText, { header: true, skipEmptyLines: true });
  const rows = (res.data as any[]) || [];
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
      const lat = parseFloat(row.lat);
      const lng = parseFloat(row.lng);
      const geo = { lat, lng };
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
      if (!name || !slug || !phone || !address.line1 || !address.city || !address.state || !address.postalCode || isNaN(lat) || isNaN(lng)) {
        errors.push(`Invalid required fields for id ${id}`);
        continue;
      }
      parsed.push({ id, name, slug, phone, email, address: address as any, geo, hours: hours as any, isPrimary: isPrimary || undefined, coverageRadiusMiles, serviceAreas: [] });
    } catch (e: any) {
      errors.push(e?.message || "Unknown parsing error");
    }
  }
  return { data: parsed, errors };
};

const parseAreasCsv = (csvText: string, existingById: Map<string, Location>): { data: Location[]; errors: string[] } => {
  const res = Papa.parse(csvText, { header: true, skipEmptyLines: true });
  const rows = (res.data as any[]) || [];
  const byId = new Map<string, Location>(Array.from(existingById.values()).map((l) => [l.id, { ...l, serviceAreas: [...(l.serviceAreas || [])] }]));
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
    const area: ServiceAreaCity = { name, state, slug, center: !isNaN(centerLat) && !isNaN(centerLng) ? { lat: centerLat, lng: centerLng } : undefined, neighborhoods };
    const idx = (loc.serviceAreas || []).findIndex((a) => a.slug === slug);
    if (idx >= 0) loc.serviceAreas[idx] = area; else (loc.serviceAreas || (loc.serviceAreas = [])).push(area);
  }
  return { data: Array.from(byId.values()), errors };
};

const mergeById = (current: Location[], incoming: Location[]): Location[] => {
  const map = new Map<string, Location>(current.map((l) => [l.id, { ...l }]));
  for (const loc of incoming) {
    map.set(loc.id, { ...map.get(loc.id), ...loc, serviceAreas: loc.serviceAreas ?? map.get(loc.id)?.serviceAreas ?? [] } as Location);
  }
  return Array.from(map.values());
};

const LocationsSheetsSync: React.FC<LocationsSheetsSyncProps> = ({ existingLocations, onMerge }) => {
  const { toast } = useToast();
  const [locUrl, setLocUrl] = useState("");
  const [areasUrl, setAreasUrl] = useState("");
  const [busy, setBusy] = useState(false);

  const existingById = useMemo(() => new Map(existingLocations.map((l) => [l.id, l])), [existingLocations]);

  const fetchCsv = async (url: string) => {
    const csvUrl = toExportCsvUrl(url);
    const res = await fetch(csvUrl);
    if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
    return await res.text();
  };

  const handleFetchLocations = async () => {
    if (!locUrl) { toast({ title: "Missing URL", description: "Paste a Google Sheets CSV link for Locations.", variant: "destructive" as any }); return; }
    try {
      setBusy(true);
      const text = await fetchCsv(locUrl);
      const { data, errors } = parseLocationsCsv(text);
      const merged = mergeById(existingLocations, data);
      onMerge(merged);
      toast({ title: "Locations synced", description: errors.length ? `Imported ${data.length}; ${errors.length} rows skipped.` : `Imported ${data.length} locations.` });
    } catch (e: any) {
      toast({ title: "Sync failed", description: e?.message || "Unable to fetch CSV", variant: "destructive" as any });
    } finally { setBusy(false); }
  };

  const handleFetchAreas = async () => {
    if (!areasUrl) { toast({ title: "Missing URL", description: "Paste a Google Sheets CSV link for Service Areas.", variant: "destructive" as any }); return; }
    try {
      setBusy(true);
      const text = await fetchCsv(areasUrl);
      const { data, errors } = parseAreasCsv(text, existingById);
      onMerge(data);
      toast({ title: "Service areas synced", description: errors.length ? `${errors.length} rows skipped.` : "All rows imported." });
    } catch (e: any) {
      toast({ title: "Sync failed", description: e?.message || "Unable to fetch CSV", variant: "destructive" as any });
    } finally { setBusy(false); }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sync from Google Sheets (CSV)</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <p className="text-sm text-muted-foreground">Publish each sheet to the web or use an export CSV link. We’ll fetch, parse, and merge by location id.</p>
        <div className="grid md:grid-cols-3 gap-3 items-end">
          <div className="md:col-span-2 space-y-1">
            <Label htmlFor="locSheetUrl">Locations CSV URL</Label>
            <Input id="locSheetUrl" placeholder="https://docs.google.com/spreadsheets/d/..../export?format=csv&gid=0" value={locUrl} onChange={(e) => setLocUrl(e.target.value)} />
          </div>
          <div>
            <Button type="button" disabled={busy} onClick={handleFetchLocations}>Fetch & Merge</Button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-3 items-end">
          <div className="md:col-span-2 space-y-1">
            <Label htmlFor="areasSheetUrl">Service Areas CSV URL</Label>
            <Input id="areasSheetUrl" placeholder="https://docs.google.com/spreadsheets/d/..../export?format=csv&gid=123456" value={areasUrl} onChange={(e) => setAreasUrl(e.target.value)} />
          </div>
          <div>
            <Button type="button" variant="outline" disabled={busy} onClick={handleFetchAreas}>Fetch & Merge</Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Tips: For a view link like /edit#gid=123, we auto-convert to export CSV. Ensure sharing is public or the sheet is published.
        </p>
      </CardContent>
    </Card>
  );
};

export default LocationsSheetsSync;
