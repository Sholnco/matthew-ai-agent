import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Mic, Globe } from "lucide-react";

interface StudentData {
  name: string;
  classLevel: string;
  subject: string;
  topic: string;
  language: string;
}

interface StudentIntakeProps {
  onSubmit: (data: StudentData) => void;
}

const StudentIntake = ({ onSubmit }: StudentIntakeProps) => {
  const [formData, setFormData] = useState<StudentData>({
    name: "",
    classLevel: "",
    subject: "",
    topic: "",
    language: "English"
  });

  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.classLevel && formData.subject && formData.topic) {
      onSubmit(formData);
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input logic would go here
  };

  const classLevels = [
    { value: "primary-1", label: "Primary 1" },
    { value: "primary-2", label: "Primary 2" },
    { value: "primary-3", label: "Primary 3" },
    { value: "primary-4", label: "Primary 4" },
    { value: "primary-5", label: "Primary 5" },
    { value: "primary-6", label: "Primary 6" },
    { value: "jss-1", label: "JSS 1" },
    { value: "jss-2", label: "JSS 2" },
    { value: "jss-3", label: "JSS 3" },
    { value: "ss-1", label: "SS 1" },
    { value: "ss-2", label: "SS 2" },
    { value: "ss-3", label: "SS 3" },
    { value: "waec", label: "WAEC Preparation" }
  ];

  const languages = [
    { value: "English", label: "English" },
    { value: "French", label: "Français" },
    { value: "Yoruba", label: "Yorùbá" },
    { value: "Igbo", label: "Igbo" },
    { value: "Hausa", label: "Hausa" }
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-card shadow-medium">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-primary flex items-center justify-center gap-2">
          <Globe className="w-6 h-6" />
          Student Information
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Tell me about yourself so I can help you learn better
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-medium">
                Your Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="transition-smooth focus:shadow-soft"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language" className="text-foreground font-medium">
                Preferred Language
              </Label>
              <Select
                value={formData.language}
                onValueChange={(value) => setFormData({ ...formData, language: value })}
              >
                <SelectTrigger className="transition-smooth focus:shadow-soft">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="class" className="text-foreground font-medium">
              Class Level
            </Label>
            <Select
              value={formData.classLevel}
              onValueChange={(value) => setFormData({ ...formData, classLevel: value })}
            >
              <SelectTrigger className="transition-smooth focus:shadow-soft">
                <SelectValue placeholder="Select your class level" />
              </SelectTrigger>
              <SelectContent>
                {classLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-foreground font-medium">
                Subject
              </Label>
              <Input
                id="subject"
                placeholder="e.g., Mathematics, English, Science"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="transition-smooth focus:shadow-soft"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic" className="text-foreground font-medium">
                Topic
              </Label>
              <div className="flex gap-2">
                <Input
                  id="topic"
                  placeholder="What would you like to learn?"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="transition-smooth focus:shadow-soft"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleVoiceInput}
                  className={`transition-bounce ${isListening ? 'bg-primary text-primary-foreground' : ''}`}
                >
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="submit"
              className="flex-1 bg-gradient-primary hover:shadow-glow transition-bounce"
              disabled={!formData.name || !formData.classLevel || !formData.subject || !formData.topic}
            >
              Start Learning Session
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2 transition-smooth"
            >
              <Upload className="w-4 h-4" />
              Upload File
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default StudentIntake;