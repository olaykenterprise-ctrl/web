// Meta Pixel and Conversions API Helper

export const trackEvent = (eventName: string, eventData: any = {}) => {
  // Browser-side tracking (Meta Pixel)
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, eventData);
  } else {
    console.warn('Meta Pixel (fbq) not found or running on server.');
  }
};

export const trackServerConversion = async (eventName: string, eventData: any = {}) => {
  // Server-side tracking (Conversions API)
  // This will send data directly to Meta's API using NEXT_PUBLIC_META_PIXEL_ID and a Conversions API Access Token
  console.log(`[CAPI] Tracking server-side event: ${eventName}`, eventData);
  
  // TODO: Implement actual CAPI fetch request here
};
