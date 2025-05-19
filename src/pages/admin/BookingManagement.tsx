
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

// Mock booking data interface
interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  animalId: string;
  animalName: string;
  shares: number;
  totalAmount: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  bookingDate: string;
  notes?: string;
}

// Mock bookings data
const mockBookings: Booking[] = [
  {
    id: "booking1",
    userId: "user1",
    userName: "Ahmed Khan",
    userEmail: "ahmed@example.com",
    animalId: "1",
    animalName: "Premium Cow",
    shares: 2,
    totalAmount: 12000,
    status: "confirmed",
    bookingDate: "2025-05-15T10:30:00Z",
  },
  {
    id: "booking2",
    userId: "user2",
    userName: "Fatima Ali",
    userEmail: "fatima@example.com",
    animalId: "3",
    animalName: "Medium Cow",
    shares: 1,
    totalAmount: 5000,
    status: "pending",
    bookingDate: "2025-05-18T14:45:00Z",
  },
  {
    id: "booking3",
    userId: "user3",
    userName: "Mohammed Patel",
    userEmail: "mohammed@example.com",
    animalId: "2",
    animalName: "Large Goat",
    shares: 1,
    totalAmount: 15000,
    status: "completed",
    bookingDate: "2025-05-10T09:15:00Z",
    notes: "Customer requested special packaging"
  },
  {
    id: "booking4",
    userId: "user4",
    userName: "Zahra Khan",
    userEmail: "zahra@example.com",
    animalId: "5",
    animalName: "Large Cow",
    shares: 3,
    totalAmount: 21000,
    status: "pending",
    bookingDate: "2025-05-20T11:00:00Z",
  },
  {
    id: "booking5",
    userId: "user5",
    userName: "Yasir Ahmed",
    userEmail: "yasir@example.com",
    animalId: "6",
    animalName: "Standard Goat",
    shares: 1,
    totalAmount: 12000,
    status: "cancelled",
    bookingDate: "2025-05-05T16:30:00Z",
    notes: "Customer cancelled due to travel plans"
  },
  {
    id: "booking6",
    userId: "user1",
    userName: "Ahmed Khan",
    userEmail: "ahmed@example.com",
    animalId: "4",
    animalName: "Premium Goat",
    shares: 1,
    totalAmount: 20000,
    status: "confirmed",
    bookingDate: "2025-05-16T13:20:00Z",
  },
  {
    id: "booking7",
    userId: "user6",
    userName: "Aisha Rahman",
    userEmail: "aisha@example.com",
    animalId: "1",
    animalName: "Premium Cow",
    shares: 1,
    totalAmount: 6000,
    status: "pending",
    bookingDate: "2025-05-19T09:45:00Z",
  },
];

// Mock API functions
const fetchBookings = async (page: number, pageSize: number, statusFilter?: string): Promise<{
  bookings: Booking[];
  totalItems: number;
  totalPages: number;
}> => {
  // Filter by status if provided
  let filteredBookings = mockBookings;
  if (statusFilter && statusFilter !== "all") {
    filteredBookings = mockBookings.filter(booking => booking.status === statusFilter);
  }
  
  // Calculate pagination
  const totalItems = filteredBookings.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedBookings = filteredBookings.slice(start, end);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    bookings: paginatedBookings,
    totalItems,
    totalPages
  };
};

const updateBookingStatus = async (bookingId: string, status: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // In a real app, this would update the status in the backend
};

const BookingManagement = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const pageSize = 5;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["bookings", page, statusFilter],
    queryFn: () => fetchBookings(page, pageSize, statusFilter),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ bookingId, status }: { bookingId: string; status: string }) => 
      updateBookingStatus(bookingId, status),
    onSuccess: () => {
      toast.success("Booking status updated successfully");
      refetch();
    },
    onError: () => {
      toast.error("Failed to update booking status");
    },
  });

  const handleStatusChange = (bookingId: string, status: string) => {
    updateStatusMutation.mutate({ bookingId, status });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "confirmed": return "bg-blue-500";
      case "completed": return "bg-green-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Booking Management</h1>
      <p className="text-muted-foreground mb-6">View and manage Qurbani bookings</p>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <CardTitle>Customer Bookings</CardTitle>
              <CardDescription>
                Showing {data?.bookings.length || 0} of {data?.totalItems || 0} bookings
              </CardDescription>
            </div>
            
            <div className="mt-4 sm:mt-0">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Bookings</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Animal</TableHead>
                      <TableHead className="text-right">Shares</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Booking Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{booking.userName}</div>
                            <div className="text-sm text-muted-foreground">{booking.userEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>{booking.animalName}</TableCell>
                        <TableCell className="text-right">{booking.shares}</TableCell>
                        <TableCell className="text-right">₹{booking.totalAmount.toLocaleString()}</TableCell>
                        <TableCell>{format(new Date(booking.bookingDate), "PPP")}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(booking.status)}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Select 
                            defaultValue={booking.status}
                            onValueChange={(value) => handleStatusChange(booking.id, value)}
                          >
                            <SelectTrigger className="w-[130px]">
                              <SelectValue placeholder="Update Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirm</SelectItem>
                              <SelectItem value="completed">Complete</SelectItem>
                              <SelectItem value="cancelled">Cancel</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Page {page} of {data?.totalPages || 1}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(p + 1, data?.totalPages || 1))}
                    disabled={page === data?.totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingManagement;
