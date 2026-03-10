export const convertFeatures = (features: any[]) =>
  features.map((f) => (typeof f === "string" ? f : f?.title)).filter(Boolean);
