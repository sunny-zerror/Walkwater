// Resolves a rem-based spacing token from globals.css (e.g. "--spacing-grid") to pixels,
// for libraries such as Swiper that only accept numbers.
export const spacingToPx = (token) => {
  if (typeof window === "undefined") return 0;
  const root = getComputedStyle(document.documentElement);
  const value = root.getPropertyValue(token).trim();
  const rem = parseFloat(root.fontSize) || 16;
  if (value.endsWith("rem")) return parseFloat(value) * rem;
  return parseFloat(value) || 0;
};
