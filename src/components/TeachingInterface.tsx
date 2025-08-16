import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Target, 
  CheckCircle2, 
  Play, 
  Share2, 
  Volume2,
  FileText,
  Award
} from "lucide-react";

interface LessonStep {
  id: number;
  title: string;
  explanation: string;
  example?: string;
  quickCheck: string[];
}

interface TeachingInterfaceProps {
  studentName: string;
  subject: string;
  topic: string;
  classLevel: string;
  language: string;
}

const TeachingInterface = ({ 
  studentName, 
  subject, 
  topic, 
  classLevel, 
  language 
}: TeachingInterfaceProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // Mock lesson data - in real implementation, this would come from the AI agent
  const lesson = {
    title: `Understanding ${topic}`,
    objectives: [
      `Define and explain ${topic}`,
      "Apply concepts through practical examples",
      "Solve related problems step by step"
    ],
    steps: [
      {
        id: 1,
        title: "Introduction to the Concept",
        explanation: `Let me explain ${topic} in simple terms that are perfect for ${classLevel} level.`,
        example: "Here's a real-world example that will help you understand better...",
        quickCheck: [
          "What does this concept mean in your own words?",
          "Can you think of an example from daily life?",
          "Why is this important to learn?"
        ]
      },
      {
        id: 2,
        title: "Step-by-Step Breakdown",
        explanation: "Now let's break down the concept into smaller, manageable parts.",
        example: "Follow along as I demonstrate each step...",
        quickCheck: [
          "What is the first step in solving this?",
          "Why do we do this step?",
          "What happens if we skip this step?"
        ]
      },
      {
        id: 3,
        title: "Practice Together",
        explanation: "Let's work through some examples together to reinforce your understanding.",
        example: "Try this problem with me...",
        quickCheck: [
          "Can you solve this similar problem?",
          "What strategy would you use here?",
          "How confident do you feel about this topic now?"
        ]
      }
    ] as LessonStep[]
  };

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    if (currentStep < lesson.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        await navigator.mediaDevices.getDisplayMedia({ video: true });
        setIsScreenSharing(true);
      } else {
        setIsScreenSharing(false);
      }
    } catch (error) {
      console.error("Screen sharing failed:", error);
    }
  };

  const currentLessonStep = lesson.steps[currentStep];

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <Card className="bg-gradient-hero text-primary-foreground shadow-medium">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Welcome to Mr. Olushola Matthew AI Agent class
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Hello {studentName}! I'm excited to help you learn {subject} today.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Lesson Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-medium">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Target className="w-5 h-5" />
                  {lesson.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{classLevel}</Badge>
                  <Badge variant="outline">{language}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Learning Objectives:</h4>
                  <ul className="space-y-1">
                    {lesson.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-success" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator />
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Generate Lesson Video
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={handleScreenShare}
                  >
                    <Share2 className="w-4 h-4" />
                    {isScreenSharing ? 'Stop' : 'Start'} Screen Share
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    Voice Narration
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Sidebar */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lesson.steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`p-3 rounded-lg border transition-smooth cursor-pointer ${
                    index === currentStep
                      ? 'border-primary bg-primary/5'
                      : completedSteps.includes(step.id)
                      ? 'border-success bg-success/5'
                      : 'border-border'
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  <div className="flex items-center gap-2">
                    {completedSteps.includes(step.id) ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : (
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        index === currentStep ? 'border-primary' : 'border-muted'
                      }`} />
                    )}
                    <span className="text-sm font-medium">{step.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Lesson Step */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Step {currentStep + 1}: {currentLessonStep.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Explanation:</h4>
            <p className="text-muted-foreground leading-relaxed">
              {currentLessonStep.explanation}
            </p>
          </div>

          {currentLessonStep.example && (
            <div className="bg-accent/20 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-accent-foreground">Worked Example:</h4>
              <p className="text-accent-foreground/80">{currentLessonStep.example}</p>
            </div>
          )}

          <div>
            <h4 className="font-semibold mb-3 text-foreground">Quick Checks:</h4>
            <ul className="space-y-2">
              {currentLessonStep.quickCheck.map((question, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{question}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous Step
            </Button>
            <Button
              onClick={() => handleStepComplete(currentLessonStep.id)}
              className="bg-gradient-primary hover:shadow-glow transition-bounce"
            >
              {currentStep === lesson.steps.length - 1 ? 'Complete Lesson' : 'Next Step'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeachingInterface;