import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Safely converts game category to string for display
 * Handles both string and string[] types
 */
export function getCategoryDisplay(category?: string | string[]): string {
  if (!category) return 'Uncategorized';
  if (Array.isArray(category)) {
    return category.length > 0 ? category.join(', ') : 'Uncategorized';
  }
  return category;
}
