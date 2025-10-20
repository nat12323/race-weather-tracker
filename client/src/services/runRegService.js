import axios from "axios";

const BASE_URL = "https://www.runreg.com/api/search";

/**
 * Converts RunReg date format (/Date(1760760000000-0400)/)
 * to a readable ISO date string
 */
function parseRunRegDate(runRegDate) {
  if (!runRegDate) return null;
  const timestamp = parseInt(runRegDate.match(/\d+/)?.[0], 10);
  return new Date(timestamp).toISOString();
}

/**
 * Fetches upcoming events from RunReg API
 */
export async function getUpcomingEvents() {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        startDate: today, // Only future events
      },
    });

    // Extract the MatchingEvents array
    const events = response.data.MatchingEvents || [];

    // Map and format data to match your database structure
    const formatted = events.map((event) => ({
      id: `runreg-${event.EventId}`, // Prefix to avoid ID conflicts with database
      race_name: event.EventName,
      race_type: event.EventTypes, // Default type since API doesn't provide it
      race_date: parseRunRegDate(event.EventDate),
      latitude: event.Latitude,
      longitude: event.Longitude,
      city: event.EventCity,
      state: event.EventState,
      address: null,
      description: null,
      website_url: event.EventUrl,
      image: event.CoverPhoto || event.EventLogo || null,
      source: 'runreg' // Tag to identify where this data came from
    }));

    return formatted;
  } catch (error) {
    console.error("Error fetching RunReg events:", error.message);
    return []; // Return empty array on error
  }
}