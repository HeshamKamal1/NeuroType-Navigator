
"use client";

import { useState, useEffect } from "react";
import { QuestionnaireForm } from "@/components/questionnaire-form";
import { ResultsDisplay } from "@/components/results-display";
import { AppIcon, questionnaireData, toddlerQuestionnaireData, NervousSystemType, type TypeSection } from "@/config/questionnaire";
import { Button } from "@/components/ui/button";

type Answers = Record<string, boolean | undefined>; // questionId: answer
type Scores = Record<NervousSystemType, number>;

export default function Home() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<"0-3" | "3+" | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [scores, setScores] = useState<Scores>({});
  const [showResults, setShowResults] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const questionsForAge: TypeSection[] | null = selectedAgeGroup
    ? (selectedAgeGroup === "0-3" ? toddlerQuestionnaireData : questionnaireData)
    : null;
  
  const currentSectionData: TypeSection | undefined = questionsForAge ? questionsForAge[currentSectionIndex] : undefined;
  const totalTypesForAge: number = questionsForAge ? questionsForAge.length : 0;

  const handleAnswerChange = (questionId: string, answer: boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const calculateAndShowResults = () => {
    if (!questionsForAge) return;

    const newScores: Scores = {} as Scores;
    // Initialize all possible types to 0 to ensure all keys exist
    Object.values(NervousSystemType).forEach(type => {
      newScores[type] = 0;
    });

    questionsForAge.forEach(section => {
      let typeScore = 0;
      section.questions.forEach(question => {
        if (answers[question.id] === true) {
          typeScore++;
        }
      });
      newScores[section.type] = typeScore;
    });
    setScores(newScores);
    setShowResults(true);
  };

  const handleNext = () => {
    if (questionsForAge && currentSectionIndex < totalTypesForAge - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
    } else {
      calculateAndShowResults();
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {    
    setSelectedAgeGroup(null);
    setCurrentSectionIndex(0);
    setAnswers({});
    setScores({});
    setShowResults(false);
    setIsStarted(false);
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

  if (!selectedAgeGroup) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 bg-gradient-to-br from-background to-secondary">
        <div className="text-center max-w-2xl">
          <AppIcon className="w-24 h-24 mx-auto mb-6 text-primary" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
            Select Your Child's Age
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8">
            To provide the most relevant questions, please tell us your child's age group.
          </p>
          <Button size="lg" onClick={() => setSelectedAgeGroup("0-3")} className="mr-4 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-lg shadow-lg transition-transform duration-150 hover:scale-105">0-3 Years</Button>
          <Button size="lg" onClick={() => setSelectedAgeGroup("3+")} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-lg shadow-lg transition-transform duration-150 hover:scale-105">3+ Years</Button>
        </div>
      </main>
    );
  }

  if (showResults) {
    return <ResultsDisplay scores={scores} onRestart={handleRestart} />;
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
          <p className="text-muted-foreground">
            <h3>By Nada Yasser</h3><br />
            <br />
            Answer the questions to understand your child's nervous system type. You can skip questions if you're unsure.
        </p>
      </header>
      <div className="w-full max-w-3xl">
        {currentSectionData && totalTypesForAge > 0 && (
          <QuestionnaireForm
            currentSection={currentSectionData}
            currentSectionIndex={currentSectionIndex}
            totalTypes={totalTypesForAge}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSubmit={calculateAndShowResults}
            />
          )
        }
      </div>
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        {currentYear !== null && <p>&copy; {currentYear} NeuroType Navigator. All rights reserved to Nada Yasser.</p>}
        <p className="mt-1">This tool is for informational purposes only and not a substitute for professional advice.</p>
      </footer>
    </main>
  );
}
