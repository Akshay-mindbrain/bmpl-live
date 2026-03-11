export const parseTTLToMs = (ttl: string): number => {
  if (!ttl) throw new Error("TTL value missing");

  const unitMap: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
    w: 7 * 24 * 60 * 60 * 1000,
    y: 365 * 24 * 60 * 60 * 1000,
  };

  let totalMs = 0;

  const regex = /(\d+)\s*([smhdwy])/gi;
  const matches = ttl.matchAll(regex);

  for (const match of matches) {
    const value = Number(match[1]);
    const unit = match[2].toLowerCase();

    const multiplier = unitMap[unit];
    if (!multiplier) throw new Error(`Invalid TTL unit: ${unit}`);

    totalMs += value * multiplier;
  }

  if (totalMs === 0) throw new Error(`Invalid TTL format: ${ttl}`);

  return totalMs;
};
