
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src="/lovable-uploads/400574e6-7b15-4fa2-a10f-85b42c0b8051.png" alt="Qurbani Connect Logo" className="h-10 w-auto" />
          <span className="font-bold text-xl text-brand-600">Qurbani Connect</span>
        </Link>
        
        <nav className="ml-auto hidden md:flex gap-6">
          <Link to="/" className="text-sm font-medium hover:text-brand-600 transition-colors">
            Home
          </Link>
          <Link to="/animals" className="text-sm font-medium hover:text-brand-600 transition-colors">
            Animals
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-brand-600 transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-brand-600 transition-colors">
            Contact
          </Link>
        </nav>
        
        <div className="ml-auto md:ml-6 flex items-center gap-4">
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Sign Up</Link>
          </Button>
          
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link to="/" className="text-lg font-medium hover:text-brand-600 transition-colors">
                  Home
                </Link>
                <Link to="/animals" className="text-lg font-medium hover:text-brand-600 transition-colors">
                  Animals
                </Link>
                <Link to="/about" className="text-lg font-medium hover:text-brand-600 transition-colors">
                  About
                </Link>
                <Link to="/contact" className="text-lg font-medium hover:text-brand-600 transition-colors">
                  Contact
                </Link>
                <Link to="/login" className="text-lg font-medium hover:text-brand-600 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="text-lg font-medium hover:text-brand-600 transition-colors">
                  Sign Up
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
