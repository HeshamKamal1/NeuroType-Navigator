
"use client";

import { useEffect, useState, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import type { NervousSystemType } from "@/config/questionnaire";
import { questionnaireData } from "@/config/questionnaire";
import { analyzeNeurotypeProfile, type AnalyzeNeurotypeOutput, type AnalyzeNeurotypeInput } from "@/ai/flows/analyze-neurotype-flow";
import { Loader2 } from "lucide-react";


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
  const [aiAnalysis, setAiAnalysis] = useState<AnalyzeNeurotypeOutput | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const chartData = useMemo(() => questionnaireData.map((section, index) => ({
    type: section.type,
    name: section.title.split(":")[0], // e.g., "Type 1"
    fullTitle: section.title,
    description: section.description,
    value: scores[section.type] || 0, // 'value' is typically used by PieChart for segment size
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
        shortTitle: section.title.split(":")[0],
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


  useEffect(() => {
    if (dominantTypes.length > 0) {
      const fetchAnalysis = async () => {
        setIsLoadingAi(true);
        setAiError(null);
        setAiAnalysis(null);
        try {
          const input: AnalyzeNeurotypeInput = {
            dominantTypes: dominantTypes.map(dt => ({ name: dt.title })),
          };
          console.log('[ResultsDisplay] Sending to AI:', JSON.stringify(input, null, 2));
          const result = await analyzeNeurotypeProfile(input);
          setAiAnalysis(result);
        } catch (error: any) { // Catch error as any to access potential custom properties
          console.error("Error fetching AI analysis (ResultsDisplay):", error);
          
          // Log all available properties of the error object for better debugging
          if (error && typeof error === 'object') {
            console.error("Full error object details (ResultsDisplay):", {
              message: error.message,
              name: error.name,
              stack: error.stack,
              digest: error.digest, // Specifically log the digest
              ...error // Spread other potential properties
            });
          }

          let displayError = "Failed to load AI-powered insights. Please try again later.";
          if (error?.message) {
            if (error.message.includes("An error occurred in the Server Components render")) {
              // If it's the generic server component error, include the digest
              displayError = `Failed to load AI-powered insights. Server error digest: ${error.digest || 'N/A'}. Check server logs for more details.`;
            } else {
              // Otherwise, use the specific error message
              displayError = `Failed to load AI-powered insights: ${error.message}`;
            }
          } else if (typeof error === 'string') {
            displayError = `Failed to load AI-powered insights: ${error}`;
          }
          setAiError(displayError);
        } finally {
          setIsLoadingAi(false);
        }
      };
      fetchAnalysis();
    } else {
        setIsLoadingAi(false);
        setAiAnalysis(null);
        setAiError(null);
    }
  }, [dominantTypes]);

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

  const showAiSection = dominantTypes.length > 0;

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
        {totalScore > 0 ? (
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

        {showAiSection && (
          <div className="pt-6 border-t">
            <Accordion type="single" collapsible className="w-full" defaultValue="ai-analysis">
              <AccordionItem value="ai-analysis">
                <AccordionTrigger className="text-xl font-semibold text-primary hover:no-underline">
                  <div className="flex items-center">
                  {isLoadingAi && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  AI-Powered Insights & Guidance
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  {isLoadingAi && (
                    <>
                      <Skeleton className="h-6 w-1/3 mb-2" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-4/5 mb-4" />
                      <Skeleton className="h-6 w-1/4 mb-2" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </>
                  )}
                  {aiError && !isLoadingAi && (
                    <Alert variant="destructive">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{aiError}</AlertDescription>
                    </Alert>
                  )}
                  {aiAnalysis && !isLoadingAi && !aiError && (
                    <>
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-foreground">Character Analysis</h4>
                        <p className="text-muted-foreground whitespace-pre-line">{aiAnalysis.characterAnalysis}</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mt-4 mb-2 text-foreground">Tips for Parents</h4>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                          {aiAnalysis.parentingTips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

      </CardContent>
      <CardFooter className="pt-6 flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
        <Button onClick={onRestart} className="w-full sm:w-auto" variant="outline">
          Start Over
        </Button>
         <p className="text-xs text-muted-foreground text-center sm:text-right">
          AI analysis is experimental. Always consult with a professional for guidance.
        </p>
      </CardFooter>
    </Card>
  );
}
    