declare global {
  interface Window {
    grecaptcha?: any;
  }
}

export const loadRecaptchaV2Invisible = (siteKey: string): Promise<void> => {
  return new Promise((resolve) => {
    if (window.grecaptcha) return resolve();
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
};

export const renderInvisibleRecaptcha = async (
  container: HTMLElement,
  siteKey: string,
  callback: (token: string) => void
): Promise<number | null> => {
  await loadRecaptchaV2Invisible(siteKey);
  if (!window.grecaptcha) return null;
  return window.grecaptcha.render(container, {
    sitekey: siteKey,
    size: "invisible",
    callback,
  });
};

export const executeInvisible = (widgetId: number): Promise<string> => {
  return new Promise((resolve) => {
    if (!window.grecaptcha) return resolve("");
    window.grecaptcha.execute(widgetId);
    // The resolve will be called via callback passed in renderInvisibleRecaptcha
    // This function is just a convenience stub.
    resolve("");
  });
};
