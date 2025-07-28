
/**
 * Parses a date string in "DD/MM/YYYY HH:mm" format into a JavaScript Date object.
 * This is necessary because the default `new Date()` constructor is not reliable
 * with this non-standard format across all browsers.
 * @param dateString The date string to parse (e.g., "15/08/2025 20:00").
 * @returns A Date object, or an invalid Date object if the format is incorrect.
 */
export const parseDateString = (dateString: string): Date => {
  const parts = dateString.match(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/);
  if (!parts) {
    console.error(`Invalid date format: "${dateString}". Expected "DD/MM/YYYY HH:mm".`);
    // Return an invalid date which can be checked with isNaN(date.getTime())
    return new Date('invalid');
  }

  // Parts are: [full_match, day, month, year, hours, minutes]
  const day = parseInt(parts[1], 10);
  const month = parseInt(parts[2], 10) - 1; // Month is 0-indexed in JavaScript
  const year = parseInt(parts[3], 10);
  const hours = parseInt(parts[4], 10);
  const minutes = parseInt(parts[5], 10);

  return new Date(year, month, day, hours, minutes);
};
