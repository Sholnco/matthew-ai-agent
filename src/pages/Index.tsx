import { useState } from "react";
import StudentIntake from "@/components/StudentIntake";
import TeachingInterface from "@/components/TeachingInterface";
import heroImage from "@/assets/hero-classroom.jpg";

interface StudentData {
  name: string;
  classLevel: string;
  subject: string;
  topic: string;
  language: string;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'intake' | 'teaching'>('intake');
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  const handleStudentSubmit = (data: StudentData) => {
    setStudentData(data);
    setCurrentView('teaching');
  };

  const handleBackToIntake = () => {
    setCurrentView('intake');
    setStudentData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage} 
            alt="Nigerian classroom with teacher and students"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Mr. Matthew Olushola
            <br />
            <span className="text-primary-glow">AI Agent</span>
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-primary-foreground/90">
            Your Multilingual Teaching Assistant
          </p>
          <p className="text-lg max-w-2xl mx-auto text-primary-foreground/80">
            Personalized step-by-step learning for Primary 1-6, JSS 1-3, SS 1-3, and WAEC preparation
            in English, French, Yoruba, Igbo, and Hausa
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentView === 'intake' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Welcome to Mr. Olushola Matthew AI Agent class
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Let's get started with your personalized learning experience. 
                I'm here to help you understand any topic step by step.
              </p>
            </div>
            <StudentIntake onSubmit={handleStudentSubmit} />
          </div>
        )}

        {currentView === 'teaching' && studentData && (
          <div className="space-y-6">
            <button
              onClick={handleBackToIntake}
              className="text-primary hover:text-primary-glow transition-smooth mb-4"
            >
              ← Back to Student Intake
            </button>
            <TeachingInterface
              studentName={studentData.name}
              subject={studentData.subject}
              topic={studentData.topic}
              classLevel={studentData.classLevel}
              language={studentData.language}
            />
          </div>
        )}
      </main>

      {/* Features Section */}
      {currentView === 'intake' && (
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-primary mb-4">
                Why Choose Mr. Matthew Olushola AI Agent?
              </h3>
              <p className="text-xl text-muted-foreground">
                Advanced AI-powered education tailored for Nigerian students
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card p-6 rounded-lg shadow-soft text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-bold">1-6</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Primary Education</h4>
                <p className="text-muted-foreground text-sm">Complete coverage of Primary 1-6 curriculum</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-soft text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-bold">JSS</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Junior Secondary</h4>
                <p className="text-muted-foreground text-sm">JSS 1-3 comprehensive learning support</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-soft text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-bold">SS</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">Senior Secondary</h4>
                <p className="text-muted-foreground text-sm">SS 1-3 advanced subject mastery</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-soft text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-bold">WAEC</span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">WAEC Prep</h4>
                <p className="text-muted-foreground text-sm">Complete WAEC examination preparation</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-card p-6 rounded-lg shadow-soft text-center">
                <h4 className="font-semibold text-foreground mb-2">🌍 Multilingual Support</h4>
                <p className="text-muted-foreground text-sm">Learn in English, French, Yoruba, Igbo, or Hausa</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-soft text-center">
                <h4 className="font-semibold text-foreground mb-2">🎥 Video Lessons</h4>
                <p className="text-muted-foreground text-sm">Auto-generated video explanations for every topic</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-soft text-center">
                <h4 className="font-semibold text-foreground mb-2">📱 Screen Sharing</h4>
                <p className="text-muted-foreground text-sm">Interactive screen sharing for personalized help</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary-foreground/80">
            © 2024 Mr. Matthew Olushola AI Agent - Empowering Nigerian Students Through AI Education
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;