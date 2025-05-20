
import { useState, useEffect } from "react";
import { format, parseISO, isSameDay, addDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ArrowRight, Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { calendarService, CalendarEvent, mockSlaughterEvents, mockCollectionEvents } from "@/services/calendarService";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const CalendarView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [calendarType, setCalendarType] = useState<"slaughter" | "collection">("slaughter");
  
  // Fetch events based on calendar type
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['calendar', calendarType],
    queryFn: () => calendarService.getEventsByType(calendarType),
    onSettled: (data, error) => {
      if (error) {
        toast.error("Failed to load calendar events", {
          description: "Using cached data instead.",
        });
      }
    }
  });

  // Get events for the selected date
  const getEventsForDate = (date: Date | undefined) => {
    if (!date) return [];
    
    // Use mockData as fallback if no events returned from API
    const eventsToUse = events.length ? events : 
      (calendarType === 'slaughter' ? mockSlaughterEvents : mockCollectionEvents);
    
    return eventsToUse.filter(event => {
      const eventDate = parseISO(event.date);
      return isSameDay(eventDate, date);
    });
  };
  
  // Generate all dates that have events
  const getDatesWithEvents = () => {
    // Use mockData as fallback if no events returned from API
    const eventsToUse = events.length ? events : 
      (calendarType === 'slaughter' ? mockSlaughterEvents : mockCollectionEvents);
    
    return eventsToUse.map(event => parseISO(event.date));
  };
  
  const selectedDateEvents = getEventsForDate(date);
  const datesWithEvents = getDatesWithEvents();

  // Group events by time slot
  const groupEventsByTimeSlot = (events: CalendarEvent[]) => {
    const grouped = new Map<string, CalendarEvent[]>();
    
    events.forEach(event => {
      const timeSlot = event.timeSlot || 'Unscheduled';
      if (!grouped.has(timeSlot)) {
        grouped.set(timeSlot, []);
      }
      grouped.get(timeSlot)?.push(event);
    });
    
    // Convert map to array and sort by time
    return Array.from(grouped.entries()).sort((a, b) => {
      // Handle 'Unscheduled' case
      if (a[0] === 'Unscheduled') return 1;
      if (b[0] === 'Unscheduled') return -1;
      return a[0].localeCompare(b[0]);
    });
  };

  const groupedEvents = groupEventsByTimeSlot(selectedDateEvents);

  return (
    <div className="container px-4 sm:px-8 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Qurbani Calendar</h1>
      <p className="text-muted-foreground mb-8">
        View and plan slaughter and meat collection schedules for your Qurbani shares.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
              <CardDescription>
                View scheduled events for slaughter and collection.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs 
                defaultValue="slaughter" 
                className="mb-4"
                onValueChange={(value) => setCalendarType(value as "slaughter" | "collection")}
              >
                <TabsList className="w-full">
                  <TabsTrigger value="slaughter" className="flex-1">Slaughter</TabsTrigger>
                  <TabsTrigger value="collection" className="flex-1">Collection</TabsTrigger>
                </TabsList>
              </Tabs>
              
              {isLoading ? (
                <div className="flex items-center justify-center h-[350px]">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              ) : (
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border pointer-events-auto"
                  modifiers={{
                    booked: datesWithEvents,
                  }}
                  modifiersStyles={{
                    booked: { 
                      backgroundColor: calendarType === "slaughter" ? "#FECACA" : "#BFDBFE",
                      color: calendarType === "slaughter" ? "#991B1B" : "#1E40AF",
                      fontWeight: "bold"
                    }
                  }}
                  components={{
                    DayContent: ({ date, ...props }) => {
                      const isBooked = datesWithEvents.some(d => isSameDay(d, date));
                      
                      return (
                        <div 
                          {...props}
                          className={cn(
                            "relative flex h-9 w-9 items-center justify-center",
                            isBooked && "font-bold"
                          )}
                        >
                          {date.getDate()}
                          {isBooked && (
                            <div 
                              className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${
                                calendarType === "slaughter" ? "bg-red-600" : "bg-blue-600"
                              }`}
                            />
                          )}
                        </div>
                      );
                    },
                  }}
                />
              )}
              
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <span className="text-sm">Slaughter</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                  <span className="text-sm">Collection</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    {calendarType === "slaughter" ? "Slaughter Schedule" : "Collection Schedule"}
                  </CardTitle>
                  <CardDescription>
                    {date ? (
                      `Events for ${format(date, "PPP")}`
                    ) : (
                      "Select a date to view events"
                    )}
                  </CardDescription>
                </div>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="ml-auto h-8 gap-1">
                      <CalendarIcon className="h-4 w-4 opacity-50" />
                      <span>Jump to date</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto" align="end">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="p-3"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center h-[200px]">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              ) : groupedEvents.length > 0 ? (
                <div className="space-y-6">
                  {groupedEvents.map(([timeSlot, timeSlotEvents]) => (
                    <div key={timeSlot} className="rounded-lg border">
                      <div className="bg-muted px-4 py-2 border-b flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <h3 className="font-medium">{timeSlot}</h3>
                      </div>
                      
                      <div className="divide-y">
                        {timeSlotEvents.map((event) => (
                          <div key={event.id} className="p-4">
                            <div className="flex flex-col sm:flex-row justify-between mb-2">
                              <div>
                                <h3 className="font-semibold">
                                  {event.type === "slaughter" ? "Slaughter Event" : "Collection Event"}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {format(parseISO(event.date), "PPP")}
                                </p>
                              </div>
                              <Badge className={event.type === "slaughter" ? "bg-red-600" : "bg-blue-600"}>
                                {event.type === "slaughter" ? "Slaughter" : "Collection"}
                              </Badge>
                            </div>
                            
                            <div className="mt-4 space-y-2">
                              <div>
                                <h4 className="text-sm font-medium">Location</h4>
                                <p>{event.location}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium">Animals</h4>
                                <ul className="list-disc list-inside">
                                  {event.animals.map((animal, index) => (
                                    <li key={index} className="text-sm">{animal}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <Button 
                                variant="outline" 
                                className="w-full sm:w-auto"
                                size="sm"
                              >
                                {event.type === "slaughter" ? "View Collection Details" : "View Slaughter Details"}
                                <ArrowRight className="ml-1 h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No events scheduled</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {date
                      ? `There are no ${calendarType} events scheduled for ${format(date, "PPP")}.`
                      : "Select a date to view scheduled events."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
