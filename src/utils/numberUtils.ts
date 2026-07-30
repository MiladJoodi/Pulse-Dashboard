/**
 * Formats a number with standard thousand separators.
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

/**
 * Formats currency values in USD ($).
 */
export const formatCurrency = (amount: number): string => {
  return `$${formatNumber(amount)}`;
};

