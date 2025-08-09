export type EstimateRequestPayload = {
  address: string;
  services: string[];
  name: string;
  phone: string;
  email: string;
  message?: string;
  recaptchaToken?: string;
  pageUrl?: string;
};

export type ApiResponse = { ok: boolean; error?: string };

export async function sendEstimateRequest(payload: EstimateRequestPayload): Promise<ApiResponse> {
  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "estimate_request", ...payload }),
    });
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: text || "Failed to send request" };
    }
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err?.message || "Network error" };
  }
}
