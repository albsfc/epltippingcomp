import { Fixture } from '../types';

// The data is now fetched from a local file to improve reliability.
const CSV_URL = '/data/epl-2023-fixtures.csv';

// A simple CSV parser
const parseCSV = (csvText: string): Fixture[] => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const data = lines.slice(1);

  const requiredColumns = ['Match Number', 'Date', 'Home Team', 'Away Team', 'Round Number', 'Location'];
  const columnIndices: { [key: string]: number } = {};

  requiredColumns.forEach(col => {
    const index = headers.indexOf(col);
    if (index === -1) {
      throw new Error(`CSV file is missing required column: ${col}`);
    }
    columnIndices[col] = index;
  });

  return data.map(line => {
    const values = line.split(',');
    return {
      matchNumber: parseInt(values[columnIndices['Match Number']], 10),
      roundNumber: parseInt(values[columnIndices['Round Number']], 10),
      date: values[columnIndices['Date']].trim(),
      location: values[columnIndices['Location']].trim(),
      homeTeam: values[columnIndices['Home Team']].trim(),
      awayTeam: values[columnIndices['Away Team']].trim(),
    };
  }).filter(f => !isNaN(f.matchNumber)); // Filter out any invalid rows
};

export const fetchFixtures = async (): Promise<Fixture[]> => {
  try {
    const response = await fetch(CSV_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch local fixtures: ${response.statusText} (Status: ${response.status})`);
    }
    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error("Error in fetchFixtures:", error);
    throw new Error("Could not retrieve fixture data. The local data file might be missing or corrupt.");
  }
};
