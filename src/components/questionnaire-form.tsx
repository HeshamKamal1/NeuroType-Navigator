
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import type { TypeSection } from "@/config/questionnaire";

interface QuestionnaireFormProps {
  currentSection: TypeSection;
  currentSectionIndex: number;
  totalTypes: number;
  answers: Record<string, boolean | undefined>;
  onAnswerChange: (questionId: string, answer: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

export function QuestionnaireForm({
  currentSection,
  currentSectionIndex,
  totalTypes,
  answers,
  onAnswerChange,
  onNext,
  onPrevious,
  onSubmit,
}: QuestionnaireFormProps) {
  const { title, questions, icon: Icon, questionnaireTitle } = currentSection;
  const progressValue = ((currentSectionIndex + 1) / totalTypes) * 100;

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-2xl font-semibold flex items-center">
            <Icon className="mr-3 h-7 w-7 text-primary" />
            {questionnaireTitle || title}
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            Step {currentSectionIndex + 1} of {totalTypes}
          </span>
        </div>
        <Progress value={progressValue} className="w-full h-3 mb-2" aria-label={`Progress: ${Math.round(progressValue)}% complete`} />
        <CardDescription>Please answer "Yes" or "No" to the following statements about your child. You can skip questions if unsure.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((question, index) => (
          <div key={question.id} className="p-4 border rounded-lg shadow-sm bg-background/50">
            <p className="mb-3 font-medium text-foreground">{index + 1}. {question.text}</p>
            <RadioGroup
              value={answers[question.id] === undefined ? "" : (answers[question.id] ? "yes" : "no")}
              onValueChange={(value) => onAnswerChange(question.id, value === "yes")}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id={`${question.id}-yes`} />
                <Label htmlFor={`${question.id}-yes`} className="cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id={`${question.id}-no`} />
                <Label htmlFor={`${question.id}-no`} className="cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrevious} disabled={currentSectionIndex === 0}>
          Previous
        </Button>
        {currentSectionIndex < totalTypes - 1 ? (
          <Button onClick={onNext}>
            Next
          </Button>
        ) : (
          <Button onClick={onSubmit} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Show Results
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
