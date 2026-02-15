'use server';
/**
 * @fileOverview A Genkit flow for summarizing chapter notes.
 *
 * - aiSummarizeChapterNotes - A function that handles the chapter notes summarization process.
 * - AISummarizeChapterNotesInput - The input type for the aiSummarizeChapterNotes function.
 * - AISummarizeChapterNotesOutput - The return type for the aiSummarizeChapterNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISummarizeChapterNotesInputSchema = z.object({
  notes: z
    .string()
    .describe('The chapter notes content to be summarized.'),
});
export type AISummarizeChapterNotesInput = z.infer<
  typeof AISummarizeChapterNotesInputSchema
>;

const AISummarizeChapterNotesOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the provided notes.'),
});
export type AISummarizeChapterNotesOutput = z.infer<
  typeof AISummarizeChapterNotesOutputSchema
>;

export async function aiSummarizeChapterNotes(
  input: AISummarizeChapterNotesInput
): Promise<AISummarizeChapterNotesOutput> {
  return aiSummarizeChapterNotesFlow(input);
}

const summarizeChapterNotesPrompt = ai.definePrompt({
  name: 'summarizeChapterNotesPrompt',
  input: {schema: AISummarizeChapterNotesInputSchema},
  output: {schema: AISummarizeChapterNotesOutputSchema},
  prompt: `You are an AI assistant specialized in summarizing educational content.

Your task is to provide a concise and accurate summary of the following chapter notes. Focus on key concepts, definitions, and main ideas, ensuring the summary is easy for a student to understand and review.

Chapter Notes:
{{notes}}`,
});

const aiSummarizeChapterNotesFlow = ai.defineFlow(
  {
    name: 'aiSummarizeChapterNotesFlow',
    inputSchema: AISummarizeChapterNotesInputSchema,
    outputSchema: AISummarizeChapterNotesOutputSchema,
  },
  async (input) => {
    const {output} = await summarizeChapterNotesPrompt(input);
    return output!;
  }
);
