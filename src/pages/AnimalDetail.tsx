
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { animalService, Animal } from "@/services/animalService";
import { configService } from "@/services/configService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const AnimalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showImages, setShowImages] = useState(configService.getShowProductImages());

  useEffect(() => {
    const fetchAnimal = async () => {
      setIsLoading(true);
      try {
        const animalData = await animalService.getAnimalById(id);
        setAnimal(animalData);
      } catch (error) {
        console.error("Failed to fetch animal:", error);
        setAnimal(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimal();
  }, [id]);
  
  // Listen for image display setting changes
  useEffect(() => {
    const handleConfigChange = (event: CustomEvent) => {
      setShowImages(event.detail.showProductImages);
    };

    window.addEventListener(
      'product-images-setting-changed', 
      handleConfigChange as EventListener
    );
    
    return () => {
      window.removeEventListener(
        'product-images-setting-changed',
        handleConfigChange as EventListener
      );
    };
  }, []);

  if (isLoading) {
    return (
      <div className="container px-4 py-8">
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">Loading animal details...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      {isLoading ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">Loading animal details...</h3>
        </div>
      ) : animal === null ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-muted-foreground">
            Animal not found.
          </h3>
          <p className="mt-2 text-muted-foreground">
            Please check the URL or return to the animal listing.
          </p>
          <Button asChild className="mt-4">
            <Link to="/animals">Back to Animals</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Section */}
          {showImages && (
            <div className="rounded-lg overflow-hidden border">
              <img 
                src={animal.imageUrl} 
                alt={animal.name} 
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          
          {/* Details Section */}
          <div className={`${!showImages ? "md:col-span-2" : ""}`}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{animal.name}</CardTitle>
                <CardDescription>{animal.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-semibold">
                    ₹{animal.price ? animal.price.toLocaleString() : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Category</span>
                  <p className="font-medium">{animal.category}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Breed</span>
                  <p className="font-medium">{animal.breed}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Weight</span>
                  <p className="font-medium">{animal.weight} kg</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-muted-foreground">Status</span>
                    <div>
                      {animal.remainingShares === animal.totalShares ? (
                        <Badge className="bg-green-500 text-white">Available</Badge>
                      ) : (
                        <Badge className="bg-red-500 text-white">Booked</Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Shares</span>
                    <p className="font-medium">
                      {animal.remainingShares}/{animal.totalShares} remaining
                    </p>
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link to="/cart">Add to Cart</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalDetail;
