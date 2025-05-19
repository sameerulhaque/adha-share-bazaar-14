
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

// Mock data - will be replaced with Supabase fetching
const mockAnimals = [
  {
    id: "1",
    name: "Premium Cow",
    category: "cow",
    breed: "Sahiwal",
    weight: 450,
    price: 42000,
    totalShares: 7,
    bookedShares: 3,
    remainingShares: 4,
    imageUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=600&h=400",
    description: "Healthy, well-fed cow suitable for Qurbani."
  },
  {
    id: "2",
    name: "Large Goat",
    category: "goat",
    breed: "Boer",
    weight: 75,
    price: 15000,
    totalShares: 1,
    bookedShares: 0,
    remainingShares: 1,
    imageUrl: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=600&h=400",
    description: "Well-raised goat perfect for individual Qurbani."
  },
  {
    id: "3",
    name: "Medium Cow",
    category: "cow",
    breed: "Nili-Ravi",
    weight: 380,
    price: 35000,
    totalShares: 7,
    bookedShares: 5,
    remainingShares: 2,
    imageUrl: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=600&h=400",
    description: "Healthy cow raised on natural feed."
  },
  {
    id: "4",
    name: "Premium Goat",
    category: "goat",
    breed: "Beetal",
    weight: 90,
    price: 20000,
    totalShares: 1,
    bookedShares: 0,
    remainingShares: 1,
    imageUrl: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=600&h=400",
    description: "Large, healthy goat suitable for Qurbani."
  },
  {
    id: "5",
    name: "Large Cow",
    category: "cow",
    breed: "Holstein Friesian",
    weight: 500,
    price: 49000,
    totalShares: 7,
    bookedShares: 2,
    remainingShares: 5,
    imageUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=600&h=400",
    description: "Premium quality cow raised with care."
  },
  {
    id: "6",
    name: "Standard Goat",
    category: "goat",
    breed: "Jamunapari",
    weight: 65,
    price: 12000,
    totalShares: 1,
    bookedShares: 0,
    remainingShares: 1,
    imageUrl: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=600&h=400",
    description: "Healthy goat for individual sacrifice."
  }
];

const AnimalListing = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAnimals, setFilteredAnimals] = useState(mockAnimals);
  
  // Filter animals based on selected filters
  useEffect(() => {
    let result = mockAnimals;
    
    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(animal => animal.category === selectedCategory);
    }
    
    // Filter by price range
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      result = result.filter(animal => animal.price >= min && animal.price <= max);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        animal => 
          animal.name.toLowerCase().includes(query) || 
          animal.breed.toLowerCase().includes(query) ||
          animal.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredAnimals(result);
  }, [selectedCategory, priceRange, searchQuery]);

  return (
    <div className="container px-4 sm:px-8 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Available Animals</h1>
      <p className="text-muted-foreground mb-8">
        Browse our selection of quality animals for Qurbani. Book shares or full animals.
      </p>
      
      {/* Filters */}
      <div className="bg-secondary p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-muted-foreground block mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search animals..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm text-muted-foreground block mb-2">
              Category
            </label>
            <Select 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Animals</SelectItem>
                <SelectItem value="cow">Cow</SelectItem>
                <SelectItem value="goat">Goat</SelectItem>
                <SelectItem value="sheep">Sheep</SelectItem>
                <SelectItem value="camel">Camel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm text-muted-foreground block mb-2">
              Price Range
            </label>
            <Select 
              value={priceRange} 
              onValueChange={setPriceRange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Price</SelectItem>
                <SelectItem value="0-15000">Under 15,000</SelectItem>
                <SelectItem value="15000-25000">15,000 - 25,000</SelectItem>
                <SelectItem value="25000-40000">25,000 - 40,000</SelectItem>
                <SelectItem value="40000-100000">Above 40,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Tab Categories */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setSelectedCategory("all")}>
            All Animals
          </TabsTrigger>
          <TabsTrigger value="cow" onClick={() => setSelectedCategory("cow")}>
            Cows
          </TabsTrigger>
          <TabsTrigger value="goat" onClick={() => setSelectedCategory("goat")}>
            Goats
          </TabsTrigger>
          <TabsTrigger value="sheep" onClick={() => setSelectedCategory("sheep")}>
            Sheep
          </TabsTrigger>
          <TabsTrigger value="camel" onClick={() => setSelectedCategory("camel")}>
            Camels
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <AnimalGrid animals={filteredAnimals} />
        </TabsContent>
        <TabsContent value="cow" className="mt-6">
          <AnimalGrid animals={filteredAnimals} />
        </TabsContent>
        <TabsContent value="goat" className="mt-6">
          <AnimalGrid animals={filteredAnimals} />
        </TabsContent>
        <TabsContent value="sheep" className="mt-6">
          <AnimalGrid animals={filteredAnimals} />
        </TabsContent>
        <TabsContent value="camel" className="mt-6">
          <AnimalGrid animals={filteredAnimals} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const AnimalGrid = ({ animals }: { animals: any[] }) => {
  if (animals.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-muted-foreground">No animals found matching your criteria.</h3>
        <p className="mt-2 text-muted-foreground">Try changing your filters or check back later for new listings.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {animals.map((animal) => (
        <Card key={animal.id} className="overflow-hidden border-brand-200 hover:shadow-md transition-shadow">
          <div className="aspect-video relative">
            <img
              src={animal.imageUrl}
              alt={animal.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-brand-600 text-white px-2 py-1 rounded text-sm font-medium">
              {animal.category === "cow" ? "7 Shares" : "Full Animal"}
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">{animal.name}</h3>
              <span className="text-brand-700 font-bold">₹{animal.price.toLocaleString()}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{animal.description}</p>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Availability:</span>
                <span className="font-medium">
                  {animal.remainingShares}/{animal.totalShares} shares available
                </span>
              </div>
              <div className="progress-bar bg-muted">
                <div 
                  className="h-full bg-brand-500"
                  style={{ 
                    width: `${(animal.bookedShares / animal.totalShares) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-muted-foreground">Breed</span>
                <p className="font-medium">{animal.breed}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Weight</span>
                <p className="font-medium">{animal.weight} kg</p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="p-6 pt-0">
            <Button asChild className="w-full bg-brand-600 hover:bg-brand-700">
              <Link to={`/animal/${animal.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default AnimalListing;
