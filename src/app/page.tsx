
"use client";

import { useState } from "react";
import { QuestionnaireForm } from "@/components/questionnaire-form";
import { ResultsDisplay } from "@/components/results-display";
import { AppIcon, questionnaireData, NervousSystemType, totalTypes } from "@/config/questionnaire";
import { Button } from "@/components/ui/button";
// Removed useToast as it's no longer needed here for validation

type Answers = Record<string, boolean | undefined>; // questionId: answer
type Scores = Record<NervousSystemType, number>;

export default function Home() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);
  const [scores, setScores] = useState<Scores>({} as Scores);
  const [isStarted, setIsStarted] = useState(false);
  // Removed toast from here

  const currentSection = questionnaireData[currentSectionIndex];

  const handleAnswerChange = (questionId: string, answer: boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    // Removed check for all questions answered
    if (currentSectionIndex < totalTypes - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1);
    }
  };

  const calculateScores = () => {
    const newScores: Scores = {} as Scores;
    for (const type of Object.values(NervousSystemType)) {
      newScores[type] = 0;
    }

    questionnaireData.forEach(section => {
      section.questions.forEach(question => {
        if (answers[question.id] === true) { // Only count 'yes' answers
          newScores[section.type]++;
        }
      });
    });
    return newScores;
  };

  const handleSubmit = () => {
    // Removed check for all questions answered
    const calculatedScores = calculateScores();
    setScores(calculatedScores);
    setShowResults(true);
  };

  const handleRestart = () => {
    setCurrentSectionIndex(0);
    setAnswers({});
    setShowResults(false);
    setScores({} as Scores);
    setIsStarted(true); // Go directly to questionnaire
  };
  
  const handleStart = () => {
    setIsStarted(true);
  };

  if (!isStarted) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-background to-secondary">
        <div className="text-center max-w-2xl">
          <AppIcon className="w-24 h-24 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
            Welcome to NeuroType Navigator
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8">
            Discover your child's unique nervous system profile with our insightful questionnaire. Understanding their neurotype can help you provide tailored support and foster their growth.
          </p>
          <Button size="lg" onClick={handleStart} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-lg shadow-lg transition-transform duration-150 hover:scale-105">
            Start Questionnaire
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-screen p-4 sm:p-6 md:p-8">
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <AppIcon className="w-12 h-12 mr-3 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            NeuroType Navigator
          </h1>
        </div>
        {!showResults && (
          <p className="text-muted-foreground">
            By Nada Yasser
			<br /><br />Answer the questions to understand your child's nervous system type. You can skip questions if you're unsure.
          </p>
        )}
      </header>
      <div className="w-full max-w-3xl">
        {showResults ? (
          <ResultsDisplay scores={scores} onRestart={handleRestart} />
        ) : (
          currentSection && (
            <QuestionnaireForm
              currentSection={currentSection}
              currentSectionIndex={currentSectionIndex}
              answers={answers}
              onAnswerChange={handleAnswerChange}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onSubmit={handleSubmit}
            />
          )
        )}
      </div>
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} NeuroType Navigator. All rights reserved to Nada Yasser.</p>
        <p className="mt-1">This tool is for informational purposes only and not a substitute for professional advice.</p>
      </footer>
    </main>
  );
}
