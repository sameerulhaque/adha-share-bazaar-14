
import { ApiService } from '@/lib/axios';
import { format, addMinutes, parseISO, startOfDay, setHours, setMinutes } from 'date-fns';

// Define the event type
export interface CalendarEvent {
  id: number;
  date: string; // ISO string format
  animals: string[];
  location: string;
  type: 'slaughter' | 'collection';
  timeSlot?: string; // Add timeSlot field
}

// Generate time slots for a given day (every 30 minutes from 8:00 AM to 6:00 PM)
const generateTimeSlots = (baseDate: Date): string[] => {
  const slots: string[] = [];
  const startTime = setHours(setMinutes(startOfDay(baseDate), 0), 8); // 8:00 AM
  
  for (let i = 0; i < 20; i++) { // 20 slots of 30 minutes = 10 hours (8 AM to 6 PM)
    const slotTime = addMinutes(startTime, i * 30);
    slots.push(format(slotTime, 'h:mm a')); // e.g., "8:00 AM"
  }
  
  return slots;
};

// Function to create detailed events with time slots
const createDetailedEvents = (events: CalendarEvent[]): CalendarEvent[] => {
  return events.map(event => {
    const eventDate = parseISO(event.date);
    const timeSlots = generateTimeSlots(eventDate);
    
    // Assign a random time slot from the available slots
    const randomSlotIndex = Math.floor(Math.random() * timeSlots.length);
    
    return {
      ...event,
      timeSlot: timeSlots[randomSlotIndex]
    };
  });
};

// Mock data for the slaughter events - update May 20 event to ensure it appears on today's date
const mockSlaughterEvents: CalendarEvent[] = [
  { id: 1, date: new Date(2025, 4, 20).toISOString(), animals: ["Premium Cow", "Large Goat"], location: "Central Facility", type: 'slaughter' },
  { id: 2, date: new Date(2025, 4, 20, 10, 30).toISOString(), animals: ["Medium Cow"], location: "Central Facility", type: 'slaughter' },
  { id: 3, date: new Date(2025, 4, 20, 14, 0).toISOString(), animals: ["Standard Goat"], location: "East Facility", type: 'slaughter' },
  { id: 4, date: new Date(2025, 4, 22).toISOString(), animals: ["Medium Cow", "Standard Goat"], location: "East Facility", type: 'slaughter' },
  { id: 5, date: new Date(2025, 4, 25).toISOString(), animals: ["Large Cow", "Premium Goat"], location: "West Facility", type: 'slaughter' },
  { id: 6, date: new Date(2025, 4, 27).toISOString(), animals: ["Premium Cow", "Medium Goat"], location: "North Facility", type: 'slaughter' },
  { id: 7, date: new Date(2025, 4, 29).toISOString(), animals: ["Standard Cow", "Large Goat"], location: "South Facility", type: 'slaughter' },
  { id: 8, date: new Date(2025, 5, 2).toISOString(), animals: ["Premium Cow", "Medium Goat"], location: "Central Facility", type: 'slaughter' },
  { id: 9, date: new Date(2025, 5, 5).toISOString(), animals: ["Large Cow", "Standard Goat"], location: "East Facility", type: 'slaughter' },
  { id: 10, date: new Date(2025, 5, 8).toISOString(), animals: ["Medium Cow", "Premium Goat"], location: "West Facility", type: 'slaughter' },
  { id: 11, date: new Date(2025, 5, 11).toISOString(), animals: ["Premium Cow", "Large Goat"], location: "North Facility", type: 'slaughter' },
  { id: 12, date: new Date(2025, 5, 15).toISOString(), animals: ["Standard Cow", "Medium Goat"], location: "South Facility", type: 'slaughter' },
];

// Mock data for the collection events
const mockCollectionEvents: CalendarEvent[] = [
  { id: 1, date: new Date(2025, 4, 21).toISOString(), animals: ["Premium Cow", "Large Goat"], location: "Distribution Center A", type: 'collection' },
  { id: 2, date: new Date(2025, 4, 23).toISOString(), animals: ["Medium Cow", "Standard Goat"], location: "Distribution Center B", type: 'collection' },
  { id: 3, date: new Date(2025, 4, 26).toISOString(), animals: ["Large Cow", "Premium Goat"], location: "Distribution Center C", type: 'collection' },
  { id: 4, date: new Date(2025, 4, 28).toISOString(), animals: ["Premium Cow", "Medium Goat"], location: "Distribution Center D", type: 'collection' },
  { id: 5, date: new Date(2025, 4, 30).toISOString(), animals: ["Standard Cow", "Large Goat"], location: "Distribution Center E", type: 'collection' },
  { id: 6, date: new Date(2025, 5, 3).toISOString(), animals: ["Premium Cow", "Large Goat"], location: "Distribution Center A", type: 'collection' },
  { id: 7, date: new Date(2025, 5, 6).toISOString(), animals: ["Medium Cow", "Standard Goat"], location: "Distribution Center B", type: 'collection' },
  { id: 8, date: new Date(2025, 5, 9).toISOString(), animals: ["Large Cow", "Premium Goat"], location: "Distribution Center C", type: 'collection' },
  { id: 9, date: new Date(2025, 5, 12).toISOString(), animals: ["Premium Cow", "Medium Goat"], location: "Distribution Center D", type: 'collection' },
  { id: 10, date: new Date(2025, 5, 16).toISOString(), animals: ["Standard Cow", "Large Goat"], location: "Distribution Center E", type: 'collection' },
];

// Add time slots to mock data
const detailedSlaughterEvents = createDetailedEvents(mockSlaughterEvents);
const detailedCollectionEvents = createDetailedEvents(mockCollectionEvents);

// Calendar API service
class CalendarService extends ApiService<CalendarEvent> {
  private static instance: CalendarService;

  private constructor() {
    // Pass mockAnimals as fallback data
    super('https://api.example.com/calendar', [...detailedSlaughterEvents, ...detailedCollectionEvents]);
  }

  // Singleton pattern to ensure only one instance is created
  public static getInstance(): CalendarService {
    if (!CalendarService.instance) {
      CalendarService.instance = new CalendarService();
    }
    return CalendarService.instance;
  }

  // Get all events
  async getAllEvents(): Promise<CalendarEvent[]> {
    try {
      const response = await this.get<CalendarEvent[]>('/events');
      return response.data;
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      return [...detailedSlaughterEvents, ...detailedCollectionEvents];
    }
  }

  // Get events by type
  async getEventsByType(type: 'slaughter' | 'collection'): Promise<CalendarEvent[]> {
    try {
      const response = await this.get<CalendarEvent[]>(`/events?type=${type}`);
      if (!response.data || response.data.length === 0) {
        // If API returns empty array, use mock data
        return type === 'slaughter' ? detailedSlaughterEvents : detailedCollectionEvents;
      }
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${type} events:`, error);
      return type === 'slaughter' ? detailedSlaughterEvents : detailedCollectionEvents;
    }
  }
}

export const calendarService = CalendarService.getInstance();
export { detailedSlaughterEvents as mockSlaughterEvents, detailedCollectionEvents as mockCollectionEvents };
