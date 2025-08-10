import { useEffect, useMemo } from "react";

// Simple client-side call tracking helper
// - Reads ?ctn= from URL (numeric phone), stores in localStorage
// - Exposes the preferred phone and tel: href with fallback to location/business phone
export function useCallTracking(defaultBusinessPhone: string, locationPhone?: string) {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const ctn = params.get("ctn") || params.get("phone") || "";
      const cleaned = (ctn || "").replace(/[^+\d]/g, "");
      if (cleaned && cleaned.replace(/\D/g, "").length >= 7 && cleaned.replace(/\D/g, "").length <= 15) {
        localStorage.setItem("tracking_ctn", cleaned);
      }
    } catch {}
  }, []);

  const phone = useMemo(() => {
    try {
      const tracked = localStorage.getItem("tracking_ctn");
      return tracked || locationPhone || defaultBusinessPhone;
    } catch {
      return locationPhone || defaultBusinessPhone;
    }
  }, [defaultBusinessPhone, locationPhone]);

  const telHref = useMemo(() => `tel:${(phone || "").replace(/[^+\d]/g, "")}` , [phone]);

  return { phone, telHref };
}
