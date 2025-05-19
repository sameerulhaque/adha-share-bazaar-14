
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Users } from "lucide-react";

const About = () => {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">About Qurbani Connect</h1>
          <p className="text-xl text-muted-foreground">
            Connecting communities through ethical and transparent Qurbani services
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-brand-600" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Qurbani Connect was founded with a simple mission: to make the tradition of Qurbani accessible, 
              transparent, and sustainable for Muslims around the world. We believe that this important 
              religious practice should be performed with the highest standards of animal welfare and ethical 
              treatment.
            </p>
            <p>
              Our platform connects individuals with local farms and facilities that raise animals in humane 
              conditions, following both Islamic principles and modern ethical standards. By enabling community 
              sharing of animals, we make Qurbani more affordable while reducing waste.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5 text-brand-600" />
              Our Values
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-brand-600">Transparency</h3>
                <p className="text-muted-foreground">
                  We provide complete information about our animals, their care, and the entire Qurbani process.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-brand-600">Ethics</h3>
                <p className="text-muted-foreground">
                  All animals are raised in humane conditions and slaughtered according to Islamic requirements.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-brand-600">Community</h3>
                <p className="text-muted-foreground">
                  We foster connections between Muslims who want to participate in Qurbani together.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-brand-600">Sustainability</h3>
                <p className="text-muted-foreground">
                  By sharing animals and distributing meat efficiently, we reduce waste and environmental impact.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Our Team</CardTitle>
            <CardDescription>The people behind Qurbani Connect</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Replace with actual team information */}
              <div className="text-center space-y-2">
                <div className="w-24 h-24 rounded-full bg-brand-100 mx-auto flex items-center justify-center">
                  <Users className="h-10 w-10 text-brand-600" />
                </div>
                <h3 className="font-medium">Mohammed Ali</h3>
                <p className="text-sm text-muted-foreground">Founder & CEO</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-24 h-24 rounded-full bg-brand-100 mx-auto flex items-center justify-center">
                  <Users className="h-10 w-10 text-brand-600" />
                </div>
                <h3 className="font-medium">Aisha Khan</h3>
                <p className="text-sm text-muted-foreground">Operations Director</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-24 h-24 rounded-full bg-brand-100 mx-auto flex items-center justify-center">
                  <Users className="h-10 w-10 text-brand-600" />
                </div>
                <h3 className="font-medium">Yusuf Rahman</h3>
                <p className="text-sm text-muted-foreground">Community Manager</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
