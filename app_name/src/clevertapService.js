// clevertapService.js
let clevertapInstance = null;

export const initCleverTap = async () => {
  if (clevertapInstance) return clevertapInstance;

  const clevertap = await import('clevertap-web-sdk');
  clevertap.default.init('679-R87-876Z');
  clevertapInstance = clevertap.default;
  return clevertapInstance;
};
