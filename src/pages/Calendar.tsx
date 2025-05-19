
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ArrowRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Mock events data for demonstration
const slaughterEvents = [
  { id: 1, date: new Date(2025, 5, 20), animals: ["Premium Cow", "Large Goat"], location: "Central Facility" },
  { id: 2, date: new Date(2025, 5, 22), animals: ["Medium Cow", "Standard Goat"], location: "East Facility" },
  { id: 3, date: new Date(2025, 5, 25), animals: ["Large Cow", "Premium Goat"], location: "West Facility" },
];

const collectionEvents = [
  { id: 1, date: new Date(2025, 5, 21), animals: ["Premium Cow", "Large Goat"], location: "Distribution Center A" },
  { id: 2, date: new Date(2025, 5, 23), animals: ["Medium Cow", "Standard Goat"], location: "Distribution Center B" },
  { id: 3, date: new Date(2025, 5, 26), animals: ["Large Cow", "Premium Goat"], location: "Distribution Center C" },
];

const CalendarView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [calendarType, setCalendarType] = useState<"slaughter" | "collection">("slaughter");
  
  // Get events for the selected date
  const getEventsForDate = (date: Date | undefined) => {
    if (!date) return [];
    
    const events = calendarType === "slaughter" ? slaughterEvents : collectionEvents;
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };
  
  // Generate all dates that have events
  const getDatesWithEvents = () => {
    const events = calendarType === "slaughter" ? slaughterEvents : collectionEvents;
    return events.map(event => event.date);
  };
  
  const selectedDateEvents = getEventsForDate(date);
  const datesWithEvents = getDatesWithEvents();

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
              
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
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
                    const isBooked = datesWithEvents.some(d => 
                      d.getDate() === date.getDate() &&
                      d.getMonth() === date.getMonth() &&
                      d.getFullYear() === date.getFullYear()
                    );
                    
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
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className="rounded-lg border p-4">
                      <div className="flex flex-col sm:flex-row justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">
                            {calendarType === "slaughter" ? "Slaughter Event" : "Collection Event"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {format(event.date, "PPP")} at {format(event.date, "p")}
                          </p>
                        </div>
                        <Badge className={calendarType === "slaughter" ? "bg-red-600" : "bg-blue-600"}>
                          {calendarType === "slaughter" ? "Slaughter" : "Collection"}
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
                          {calendarType === "slaughter" ? "View Collection Details" : "View Slaughter Details"}
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
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
