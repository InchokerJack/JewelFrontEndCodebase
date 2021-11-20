export const formatAddress = (address: string, chars = 4): string => {
  if (!address) return '';
  return `${String(address).substring(0, chars)}...${String(address).substring(
    String(address).length - chars,
  )}`;
};
