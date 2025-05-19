
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Beef, Bell, Clock, Users } from "lucide-react";

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set Eid date - this would need to be updated each year
  useEffect(() => {
    // Example Eid date - adjust as needed
    const eidDate = new Date("2025-06-17T00:00:00");
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = eidDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(timer);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const features = [
    {
      icon: <Beef className="h-10 w-10 text-brand-600" />,
      title: "Quality Animals",
      description: "Healthy, well-fed animals that meet all Islamic requirements for Qurbani."
    },
    {
      icon: <Users className="h-10 w-10 text-brand-600" />,
      title: "Share Options",
      description: "Book full animals or shares with others, making Qurbani accessible for everyone."
    },
    {
      icon: <Clock className="h-10 w-10 text-brand-600" />,
      title: "Scheduled Slaughter",
      description: "Transparent scheduling with notification system to keep you informed."
    },
    {
      icon: <Bell className="h-10 w-10 text-brand-600" />,
      title: "Multiple Animals",
      description: "Choose from cows, goats, sheep and camels for your Qurbani."
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-secondary to-secondary/40 py-20">
        <div className="islamic-pattern absolute inset-0 opacity-10"></div>
        <div className="container px-4 sm:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-brand-700">
              Fulfill Your Qurbani With Care & Devotion
            </h1>
            <p className="text-lg md:text-xl mb-8 text-brand-900">
              Book your sacrifice for Eid al-Adha with our trusted platform. 
              Quality animals, transparent process, adherence to Islamic principles.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700">
                <Link to="/animals">Browse Animals</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/register">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="py-12 bg-white">
        <div className="container px-4 sm:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
            Time Remaining Until Eid al-Adha
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-secondary rounded-lg p-6 text-center">
              <span className="block text-3xl md:text-4xl font-bold text-brand-700">{timeLeft.days}</span>
              <span className="text-muted-foreground">Days</span>
            </div>
            <div className="bg-secondary rounded-lg p-6 text-center">
              <span className="block text-3xl md:text-4xl font-bold text-brand-700">{timeLeft.hours}</span>
              <span className="text-muted-foreground">Hours</span>
            </div>
            <div className="bg-secondary rounded-lg p-6 text-center">
              <span className="block text-3xl md:text-4xl font-bold text-brand-700">{timeLeft.minutes}</span>
              <span className="text-muted-foreground">Minutes</span>
            </div>
            <div className="bg-secondary rounded-lg p-6 text-center">
              <span className="block text-3xl md:text-4xl font-bold text-brand-700">{timeLeft.seconds}</span>
              <span className="text-muted-foreground">Seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted">
        <div className="container px-4 sm:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-brand-200 hover:border-brand-400 transition-colors">
                <CardContent className="pt-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="container px-4 sm:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Ready to Book Your Qurbani?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Don't wait until the last minute. Secure your animal now and have peace of mind for Eid al-Adha.
          </p>
          <Button asChild size="lg" variant="outline" className="border-white hover:bg-white hover:text-brand-600">
            <Link to="/animals">Browse Available Animals</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
