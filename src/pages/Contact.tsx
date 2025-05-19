
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Mail, MapPin, Book } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // This will be replaced with actual Supabase functionality after integration
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "We've received your message and will respond shortly.",
      });
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              We'd love to hear from you. Please fill out the form or reach out via the contact information below.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <MapPin className="h-5 w-5 text-brand-600 mt-0.5" />
              <div>
                <h3 className="font-medium">Our Location</h3>
                <address className="not-italic text-muted-foreground">
                  123 Qurbani Street<br />
                  Delhi, India 110001
                </address>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="h-5 w-5 text-brand-600 mt-0.5" />
              <div>
                <h3 className="font-medium">Email Us</h3>
                <a href="mailto:info@qurbaniconnect.com" className="text-brand-600 hover:underline">
                  info@qurbaniconnect.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Book className="h-5 w-5 text-brand-600 mt-0.5" />
              <div>
                <h3 className="font-medium">Office Hours</h3>
                <p className="text-muted-foreground">
                  Monday - Friday: 9 AM - 5 PM<br />
                  Saturday: 10 AM - 2 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
