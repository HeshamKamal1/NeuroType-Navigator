
'use server';
/**
 * @fileOverview A Genkit flow to analyze a child's neurotype profile and provide insights.
 *
 * - analyzeNeurotypeProfile - A function that handles the neurotype analysis.
 * - AnalyzeNeurotypeInput - The input type for the analyzeNeurotypeProfile function.
 * - AnalyzeNeurotypeOutput - The return type for the analyzeNeurotypeProfile function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DominantTypeSchema = z.object({
  name: z.string().describe("The name of the nervous system type."),
});

const AnalyzeNeurotypeInputSchema = z.object({
  dominantTypes: z.array(DominantTypeSchema)
    .min(1, "At least one dominant type is required.")
    .describe("An array of dominant nervous system types identified for the child. Usually 1 or more types."),
});
export type AnalyzeNeurotypeInput = z.infer<typeof AnalyzeNeurotypeInputSchema>;

const AnalyzeNeurotypeOutputSchema = z.object({
  characterAnalysis: z.string().describe("The AI-generated analysis of the child's character based on the dominant neurotypes."),
  parentingTips: z.array(z.string()).describe("An array of actionable parenting tips."),
});
export type AnalyzeNeurotypeOutput = z.infer<typeof AnalyzeNeurotypeOutputSchema>;


const analysisPrompt = ai.definePrompt({
  name: 'analyzeNeurotypePrompt',
  input: { schema: AnalyzeNeurotypeInputSchema },
  output: { schema: AnalyzeNeurotypeOutputSchema },
  prompt: `You are an expert in child psychology and neurodiversity, specializing in providing supportive and constructive advice to parents.

Based on the child's dominant nervous system profile, which is primarily characterized as:
{{#each dominantTypes}}
- {{{name}}}{{#unless @last}}{{#if @last}} and {{else}}, {{/if}}{{/unless}}
{{/each}}

Please provide the following in a warm, empathetic, and easy-to-understand tone:

1.  **Character Analysis**: 
    A concise analysis (typically 2-3 paragraphs, ~150-250 words) of the child's likely character traits, temperament, potential strengths, and common challenges associated with this profile. If multiple types are listed, briefly describe how they might interact or manifest together. Focus on a balanced perspective.

2.  **Tips for Parents**: 
    Provide 3-5 practical, actionable tips for parents or guardians. These tips should focus on positive parenting strategies to best support, nurture, and interact with a child exhibiting these traits. Frame tips constructively (e.g., "Encourage..." rather than "Don't...").

Output the response in the specified JSON format.
`,
});


const analyzeNeurotypeFlow = ai.defineFlow(
  {
    name: 'analyzeNeurotypeFlow',
    inputSchema: AnalyzeNeurotypeInputSchema,
    outputSchema: AnalyzeNeurotypeOutputSchema,
  },
  async (input) => {
    console.log('[analyzeNeurotypeFlow] Input:', JSON.stringify(input, null, 2));
    try {
      // const { output } = await analysisPrompt(input); // Original
      const genkitResponse = await analysisPrompt(input); // Get the full response object
      
      console.log('[analyzeNeurotypeFlow] Genkit Full Response:', JSON.stringify(genkitResponse, (key, value) => 
        typeof value === 'bigint' ? value.toString() : value // BigInt serialization
      , 2));

      const output = genkitResponse.output; // Extract output

      if (!output) {
        console.error('[analyzeNeurotypeFlow] AI analysis returned no output. Full Genkit Response was logged above.');
        let errorMessage = "AI analysis failed to generate an output.";

        // Attempt to extract more specific error information from the response
        const candidate = genkitResponse.response?.candidates?.[0];
        if (candidate?.finishReason) {
          errorMessage += ` Finish Reason: ${candidate.finishReason}.`;
        }
        if (candidate?.finishMessage) {
          errorMessage += ` Finish Message: ${candidate.finishMessage}.`;
        }
        const safetyRatings = candidate?.safetyRatings;
        if (safetyRatings && safetyRatings.length > 0) {
          const blockedCategories = safetyRatings
            .filter((r: any) => r.blocked)
            .map((r: any) => r.category)
            .join(', ');
          if (blockedCategories) {
            errorMessage += ` Blocked due to safety categories: ${blockedCategories}.`;
          }
        }
        throw new Error(errorMessage);
      }
      return output;
    } catch (flowError: any) {
      console.error('[analyzeNeurotypeFlow] Error during AI analysis:', flowError);
      // Ensure the error message is propagated
      throw new Error(flowError.message || "Unknown error in AI flow");
    }
  }
);

export async function analyzeNeurotypeProfile(input: AnalyzeNeurotypeInput): Promise<AnalyzeNeurotypeOutput> {
  return analyzeNeurotypeFlow(input);
}

