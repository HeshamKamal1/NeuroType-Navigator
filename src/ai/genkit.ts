import 'dotenv/config'; // Ensure .env is loaded
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Ensure you have GOOGLE_API_KEY in your .env file
const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.warn(
    'GOOGLE_API_KEY is not set in the environment. AI features may not work.'
  );
}

export const ai = genkit({
  plugins: [
    googleAI({ apiKey: apiKey }) // Explicitly pass the API key
  ],
  model: 'googleai/gemini-2.0-flash',
});
