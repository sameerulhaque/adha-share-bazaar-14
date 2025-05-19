
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, Calendar, Download, Bell } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data for bookings
const mockBookings = [
  {
    id: "booking1",
    animalId: "1",
    animalName: "Premium Cow",
    animalImage: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=600&h=400",
    shares: 2,
    totalPrice: 12000,
    status: "Confirmed",
    slaughterDate: "2025-06-17",
    slaughterTime: "09:00 AM",
    bookingDate: "2025-05-15",
  },
  {
    id: "booking2",
    animalId: "2",
    animalName: "Large Goat",
    animalImage: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=600&h=400",
    shares: 1,
    totalPrice: 15000,
    status: "Pending Payment",
    bookingDate: "2025-05-14",
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const { toast } = useToast();
  
  const handleDownloadInvoice = (bookingId: string) => {
    toast({
      title: "Download functionality not implemented",
      description: "This feature will be available once Supabase is connected.",
    });
  };
  
  const handleSetReminder = (bookingId: string) => {
    toast({
      title: "Reminder set successfully",
      description: "You will be notified 24 hours before the scheduled time.",
    });
  };

  return (
    <div className="container px-4 sm:px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        View and manage your bookings and account details.
      </p>
      
      <Tabs defaultValue="bookings" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="profile">My Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bookings">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{mockBookings.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Confirmed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-600">
                    {mockBookings.filter(booking => booking.status === "Confirmed").length}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Pending Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-amber-600">
                    {mockBookings.filter(booking => booking.status === "Pending Payment").length}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
            
            {mockBookings.length === 0 ? (
              <Card className="border-dashed border-2 p-8 text-center">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't made any bookings yet. Browse our animals and make your first booking.
                  </p>
                  <Button asChild>
                    <Link to="/animals">Browse Animals</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {mockBookings.map((booking) => (
                  <Card key={booking.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/4">
                        <img 
                          src={booking.animalImage} 
                          alt={booking.animalName}
                          className="h-full w-full object-cover aspect-video md:aspect-square"
                        />
                      </div>
                      <div className="p-6 w-full md:w-3/4 flex flex-col md:flex-row justify-between">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold">{booking.animalName}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              booking.status === "Confirmed" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-amber-100 text-amber-800"
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                          <p className="text-muted-foreground mb-2">
                            {booking.shares} {booking.shares > 1 ? "shares" : "share"} • ₹{booking.totalPrice.toLocaleString()}
                          </p>
                          <p className="text-sm mb-4">
                            Booked on {new Date(booking.bookingDate).toLocaleDateString()}
                          </p>
                          
                          {booking.status === "Confirmed" && booking.slaughterDate && (
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4" />
                              <span>Scheduled for {new Date(booking.slaughterDate).toLocaleDateString()} at {booking.slaughterTime}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-1"
                            onClick={() => handleDownloadInvoice(booking.id)}
                          >
                            <Download className="h-4 w-4" />
                            Invoice
                          </Button>
                          
                          {booking.status === "Confirmed" && booking.slaughterDate && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex items-center gap-1"
                              onClick={() => handleSetReminder(booking.id)}
                            >
                              <Bell className="h-4 w-4" />
                              Set Reminder
                            </Button>
                          )}
                          
                          {booking.status === "Pending Payment" && (
                            <Button size="sm" className="bg-brand-600 hover:bg-brand-700">
                              Pay Now
                            </Button>
                          )}
                          
                          <Link 
                            to={`/animal/${booking.animalId}`} 
                            className="text-sm text-brand-600 hover:underline text-center"
                          >
                            View Animal
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Manage your personal details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                User profile functionality will be available after connecting to Supabase.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Manage your notification preferences and view recent alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Notification functionality will be available after connecting to Supabase.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
