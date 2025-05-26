"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import type { NervousSystemType, TypeSection } from "@/config/questionnaire";
import { questionnaireData } from "@/config/questionnaire";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ResultsDisplayProps {
  scores: Record<NervousSystemType, number>;
  onRestart: () => void;
}

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--chart-1))", // Accent color
  },
} satisfies ChartConfig;


export function ResultsDisplay({ scores, onRestart }: ResultsDisplayProps) {
  const chartData = questionnaireData.map(section => ({
    type: section.type,
    shortTitle: section.title.split(":")[0], // e.g., "Type 1"
    score: scores[section.type] || 0,
    icon: section.icon,
  }));

  const maxScore = Math.max(...Object.values(scores));
  const dominantTypes = questionnaireData.filter(
    (section) => scores[section.type] === maxScore && maxScore > 0
  );

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Your Child's NeuroType Profile</CardTitle>
        <CardDescription>
          This chart visualizes the scores for each nervous system type based on your answers.
          Higher bars indicate stronger characteristics of that type.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="h-[350px] w-full">
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart 
              accessibilityLayer 
              data={chartData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="shortTitle"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                interval={0}
                angle={-30}
                textAnchor="end"
                height={60}
                
              />
              <YAxis 
                domain={[0, 7]} 
                allowDecimals={false}
                tickCount={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="score" fill="var(--color-score)" radius={8}>
                 <LabelList dataKey="score" position="top" offset={8} className="fill-foreground" fontSize={12} />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>

        {dominantTypes.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Dominant Profile(s):</h3>
            {dominantTypes.map((type) => (
              <Alert key={type.type} className="bg-primary/10 border-primary/30">
                <type.icon className="h-5 w-5 text-primary" />
                <AlertTitle className="text-primary">{type.title}</AlertTitle>
                <AlertDescription>{type.description}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}
         {dominantTypes.length === 0 && (
           <Alert variant="default">
            <AlertTitle>No Dominant Profile Identified</AlertTitle>
            <AlertDescription>
              Based on the responses, no single type stands out strongly. Consider the scores across all types, or retake the questionnaire focusing on typical behaviors.
            </AlertDescription>
          </Alert>
         )}

      </CardContent>
      <CardFooter className="pt-6">
        <Button onClick={onRestart} className="w-full sm:w-auto" variant="outline">
          Start Over
        </Button>
      </CardFooter>
    </Card>
  );
}
