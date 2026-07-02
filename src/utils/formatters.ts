export function formatFollowers(count: number): string {
  if (count >= 1_000_000_000) {
    return (count / 1_000_000_000).toFixed(1) + "B";
  }

  if (count >= 1_000_000) {
    return (count / 1_000_000).toFixed(1) + "M";
  }

  if (count >= 1_000) {
    return (count / 1_000).toFixed(1) + "K";
  }

  return count.toString();
}

export function formatEngagementRate(rate?: number) {
  if (rate == null) return "N/A";
  return `${(rate * 100).toFixed(2)}%`;
}