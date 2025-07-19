import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a numerical value into PNG Kina (K) currency display format
 * @param amount - The numerical amount to format
 * @returns Formatted string in PNG Kina format (e.g., "K1,500.50")
 * @example
 * formatKina(1500.5) // Returns "K1,500.50"
 * formatKina(50) // Returns "K50.00"
 * formatKina(12345.67) // Returns "K12,345.67"
 */
export function formatKina(amount: number): string {
  // Handle edge cases
  if (typeof amount !== 'number' || isNaN(amount)) {
    return 'K0.00';
  }

  // Format with comma for thousands separator and 2 decimal places
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  // Return with PNG Kina symbol prefix
  return `K${formattedAmount}`;
}

/**
 * Formats a numerical value into PNG Kina for ISO/API contexts
 * @param amount - The numerical amount to format
 * @returns Formatted string with PGK prefix for ISO contexts (e.g., "PGK 1,500.50")
 */
export function formatKinaISO(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return 'PGK 0.00';
  }

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return `PGK ${formattedAmount}`;
}
