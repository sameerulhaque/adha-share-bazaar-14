
import { ApiService } from '@/lib/axios';

// Define the animal type for better TypeScript support
export interface Animal {
  id: string;
  name: string;
  category: string;
  breed: string;
  weight: number;
  age?: string;
  price: number;
  pricePerShare: number;
  totalShares: number;
  bookedShares: number;
  remainingShares: number;
  imageUrl: string;
  additionalImages?: string[];
  description: string;
  features?: string[];
}

// Mock data - same as currently being used
const mockAnimals: Animal[] = [
  {
    id: "1",
    name: "Premium Cow",
    category: "cow",
    breed: "Sahiwal",
    weight: 450,
    age: "3 years",
    price: 42000,
    pricePerShare: 6000,
    totalShares: 7,
    bookedShares: 3,
    remainingShares: 4,
    imageUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=600&h=400",
    additionalImages: [
      "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=600&h=400",
      "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=600&h=400",
    ],
    description: "This premium cow is raised with care on natural feed, making it an ideal choice for Qurbani. The animal is healthy and meets all Islamic requirements for sacrifice.",
    features: [
      "Certified healthy by veterinarian",
      "Fed on natural, organic feed",
      "Raised in ethical conditions",
      "Meets all religious requirements"
    ]
  },
  {
    id: "2",
    name: "Large Goat",
    category: "goat",
    breed: "Boer",
    weight: 75,
    age: "1.5 years",
    price: 15000,
    pricePerShare: 15000,
    totalShares: 1,
    bookedShares: 0,
    remainingShares: 1,
    imageUrl: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=600&h=400",
    additionalImages: [
      "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=600&h=400"
    ],
    description: "This large, healthy goat is perfect for individual Qurbani. Raised with care on a trusted farm, it meets all requirements for sacrifice.",
    features: [
      "Certified healthy by veterinarian",
      "Fed on natural, organic feed",
      "Raised in ethical conditions",
      "Meets all religious requirements"
    ]
  },
  {
    id: "3",
    name: "Medium Cow",
    category: "cow",
    breed: "Nili-Ravi",
    weight: 380,
    age: "2.5 years",
    price: 35000,
    pricePerShare: 5000,
    totalShares: 7,
    bookedShares: 5,
    remainingShares: 2,
    imageUrl: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=600&h=400",
    description: "Healthy cow raised on natural feed.",
    features: [
      "Certified healthy by veterinarian",
      "Fed on natural, organic feed",
      "Raised in ethical conditions",
      "Meets all religious requirements"
    ]
  },
  {
    id: "4",
    name: "Premium Goat",
    category: "goat",
    breed: "Beetal",
    weight: 90,
    age: "2 years",
    price: 20000,
    pricePerShare: 20000,
    totalShares: 1,
    bookedShares: 0,
    remainingShares: 1,
    imageUrl: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=600&h=400",
    description: "Large, healthy goat suitable for Qurbani.",
    features: [
      "Certified healthy by veterinarian",
      "Fed on natural, organic feed",
      "Raised in ethical conditions",
      "Meets all religious requirements"
    ]
  },
  {
    id: "5",
    name: "Large Cow",
    category: "cow",
    breed: "Holstein Friesian",
    weight: 500,
    age: "3.5 years",
    price: 49000,
    pricePerShare: 7000,
    totalShares: 7,
    bookedShares: 2,
    remainingShares: 5,
    imageUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=600&h=400",
    description: "Premium quality cow raised with care.",
    features: [
      "Certified healthy by veterinarian",
      "Fed on natural, organic feed",
      "Raised in ethical conditions",
      "Meets all religious requirements"
    ]
  },
  {
    id: "6",
    name: "Standard Goat",
    category: "goat",
    breed: "Jamunapari",
    weight: 65,
    age: "1.8 years",
    price: 12000,
    pricePerShare: 12000,
    totalShares: 1,
    bookedShares: 0,
    remainingShares: 1,
    imageUrl: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=600&h=400",
    description: "Healthy goat for individual sacrifice.",
    features: [
      "Certified healthy by veterinarian",
      "Fed on natural, organic feed",
      "Raised in ethical conditions",
      "Meets all religious requirements"
    ]
  }
];

// Animal API service
class AnimalService extends ApiService<Animal> {
  private static instance: AnimalService;

  private constructor() {
    // Pass mockAnimals as fallback data
    super('https://api.example.com/animals', mockAnimals);
  }

  // Singleton pattern to ensure only one instance is created
  public static getInstance(): AnimalService {
    if (!AnimalService.instance) {
      AnimalService.instance = new AnimalService();
    }
    return AnimalService.instance;
  }

  // Get all animals
  async getAllAnimals(): Promise<Animal[]> {
    try {
      const response = await this.get<Animal[]>('/');
      return response.data;
    } catch (error) {
      console.error('Error fetching animals:', error);
      return mockAnimals;
    }
  }

  // Get animals by category
  async getAnimalsByCategory(category: string): Promise<Animal[]> {
    try {
      const response = await this.get<Animal[]>(`/?category=${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching animals by category ${category}:`, error);
      return mockAnimals.filter(animal => animal.category === category);
    }
  }

  // Get animal by ID
  async getAnimalById(id: string): Promise<Animal | undefined> {
    try {
      const response = await this.get<Animal>(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching animal by ID ${id}:`, error);
      return mockAnimals.find(animal => animal.id === id);
    }
  }

  // Book shares
  async bookShares(animalId: string, shares: number): Promise<boolean> {
    try {
      await this.post(`/${animalId}/book`, { shares });
      return true;
    } catch (error) {
      console.error(`Error booking shares for animal ${animalId}:`, error);
      // Mock successful booking
      return true;
    }
  }
}

export const animalService = AnimalService.getInstance();
export { mockAnimals };
