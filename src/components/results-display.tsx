"use client";

import { useEffect, useState, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import type { NervousSystemType } from "@/config/questionnaire";
import { questionnaireData } from "@/config/questionnaire";
// Removed: analyzeNeurotypeProfile, AnalyzeNeurotypeOutput, AnalyzeNeurotypeInput
// Removed: Loader2

interface ResultsDisplayProps {
  scores: Record<NervousSystemType, number>;
  onRestart: () => void;
}

// Define enough colors for all types
const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--chart-6))',
];

export function ResultsDisplay({ scores, onRestart }: ResultsDisplayProps) {
  // Removed: aiAnalysis, isLoadingAi, aiError state variables
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const chartData = useMemo(() => questionnaireData.map((section, index) => ({
    type: section.type,
    name: section.questionnaireTitle || section.title.split(":")[0], // Use questionnaireTitle if available for chart label
    fullTitle: section.title,
    description: section.description,
    value: scores[section.type] || 0,
    icon: section.icon,
    fill: COLORS[index % COLORS.length],
  })), [scores]);

  const totalScore = useMemo(() => chartData.reduce((sum, item) => sum + item.value, 0), [chartData]);

  const maxScoreValue = useMemo(() => Math.max(...Object.values(scores)), [scores]);
  
  const dominantTypes = useMemo(() => {
    if (maxScoreValue === 0) return [];
    return questionnaireData
      .filter((section) => scores[section.type] === maxScoreValue)
      .map(section => ({
        title: section.title,
        shortTitle: section.questionnaireTitle || section.title.split(":")[0],
        description: section.description,
        icon: section.icon,
        score: scores[section.type],
        type: section.type,
      }));
  }, [scores, maxScoreValue]);

  const dominantTypeSummary = useMemo(() => {
    if (dominantTypes.length === 0 && totalScore > 0) {
        return "The profile is balanced or no single type is strongly dominant. See details below.";
    }
    if (dominantTypes.length === 0) {
        return "";
    }
    if (dominantTypes.length === 1) {
      return `Your child's profile is predominantly ${dominantTypes[0].title}.`;
    }
    const sumOfDominantScores = dominantTypes.reduce((acc, dt) => acc + dt.score, 0);
    if (sumOfDominantScores === 0) return "";

    return "Your child's profile shows strong characteristics of: " + dominantTypes
      .map(dt => {
        const percentage = Math.round((dt.score / sumOfDominantScores) * 100);
        return `${percentage}% ${dt.shortTitle}`;
      })
      .join(' & ') + ".";
  }, [dominantTypes, totalScore]);

  // Removed useEffect hook for fetching AI analysis

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = totalScore > 0 ? ((data.value / totalScore) * 100).toFixed(1) : 0;
      return (
        <div className="p-2 bg-background/80 border border-border rounded-md shadow-lg">
          <p className="font-semibold text-foreground">{`${data.name}`}</p>
          <p className="text-sm text-muted-foreground">{`Score: ${data.value}`}</p>
          <p className="text-sm text-muted-foreground">{`Percentage: ${percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  // Removed: const showAiSection = dominantTypes.length > 0;

  return (
    <Card className="w-full shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold">Your Child's NeuroType Profile</CardTitle>
        <CardDescription>
          This chart visualizes the scores for each nervous system type.
          {totalScore > 0 ? " Bigger slices indicate stronger characteristics of that type." : " No scores were recorded."}
        </CardDescription>
        {dominantTypeSummary && (
           <p className="text-lg font-medium text-primary mt-2">{dominantTypeSummary}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-8">
        {isMounted && totalScore > 0 ? (
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={120}
                  dataKey="value"
                  nameKey="name"
                  stroke="hsl(var(--background))"
                  strokeWidth={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value, entry) => {
                    const { color } = entry;
                    const IconComponent = chartData.find(d => d.name === value)?.icon;
                    return (
                      <span style={{ color }} className="flex items-center">
                        {IconComponent && <IconComponent className="w-4 h-4 mr-1" style={{ color: entry.color }}/>}
                        {value}
                      </span>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : totalScore > 0 ? (
           <Skeleton className="w-full h-[350px]" />
        ) : (
           <Alert variant="default" className="mt-4">
            <AlertTitle>No Scores Recorded</AlertTitle>
            <AlertDescription>
              Please answer some questions to see the neurotype profile.
            </AlertDescription>
          </Alert>
        )}
        
        {dominantTypes.length > 0 && (
          <div className="space-y-4 pt-6 border-t">
            <h3 className="text-xl font-semibold text-center">Dominant Profile Details:</h3>
            {dominantTypes.map((type) => (
              <Alert key={type.type} className="bg-primary/10 border-primary/30">
                <type.icon className="h-5 w-5 text-primary" />
                <AlertTitle className="text-primary">{type.title}</AlertTitle>
                <AlertDescription>{type.description}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}
         {maxScoreValue === 0 && totalScore > 0 && (
           <Alert variant="default" className="mt-4">
            <AlertTitle>Profile Overview</AlertTitle>
            <AlertDescription>
              Based on the responses, no single type stands out strongly with a high score. The pie chart above shows the distribution of all characteristics. Consider the general patterns for insights.
            </AlertDescription>
          </Alert>
         )}

        {/* Removed AI Analysis Section (Accordion, loading states, error messages, AI content) */}

      </CardContent>
      <CardFooter className="pt-6 flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
        <Button onClick={onRestart} className="w-full sm:w-auto" variant="outline">
          Start Over
        </Button>
         <p className="text-xs text-muted-foreground text-center sm:text-right">
          This tool is for informational purposes and not a substitute for professional advice.
        </p>
      </CardFooter>
    </Card>
  );
}