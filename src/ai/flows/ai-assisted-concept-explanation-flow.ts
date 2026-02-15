'use server';
/**
 * @fileOverview An AI agent that helps students understand concepts by suggesting relevant study materials and providing concise explanations.
 *
 * - aiAssistedConceptExplanation - A function that handles the concept explanation process.
 * - AIConceptExplanationInput - The input type for the aiAssistedConceptExplanation function.
 * - AIConceptExplanationOutput - The return type for the aiAssistedConceptExplanation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AIConceptExplanationInputSchema = z.object({
  conceptDescription: z.string().describe('A description of the concept the student is struggling with.'),
});
export type AIConceptExplanationInput = z.infer<typeof AIConceptExplanationInputSchema>;

const SuggestedMaterialSchema = z.object({
  type: z.enum(['Notes', 'Important Questions', 'PYQ', 'Mock Test', 'Formula Sheet', 'Practice Worksheet', 'Sample Paper', 'MCQ']).describe('The type of study material.'),
  title: z.string().describe('The title or name of the study material.'),
  url: z.string().url().describe('A mock URL to access the study material.'),
});

const AIConceptExplanationOutputSchema = z.object({
  explanation: z.string().describe('A concise explanation of the concept, derived from the platform\\'s content.'),
  suggestedMaterials: z.array(SuggestedMaterialSchema).describe('A list of study materials relevant to the concept.'),
});
export type AIConceptExplanationOutput = z.infer<typeof AIConceptExplanationOutputSchema>;

// Mock database of study materials
const mockStudyMaterials = [
  { type: 'Notes', title: 'Class 10 Science: Photosynthesis', url: 'https://example.com/notes/class10/photosynthesis.pdf', keywords: ['photosynthesis', 'science', 'biology', 'plants'] },
  { type: 'Important Questions', title: 'Class 10 Science: Photosynthesis Q&A', url: 'https://example.com/iq/class10/photosynthesis-qa.pdf', keywords: ['photosynthesis', 'science', 'questions'] },
  { type: 'PYQ', title: 'CBSE Class 10 Science PYQ: Photosynthesis (2022)', url: 'https://example.com/pyq/class10/photosynthesis-2022.pdf', keywords: ['photosynthesis', 'science', 'pyq'] },
  { type: 'Notes', title: 'Class 11 Physics: Newton\'s Laws of Motion', url: 'https://example.com/notes/class11/newtons-laws.pdf', keywords: ['newton', 'laws', 'motion', 'physics'] },
  { type: 'PYQ', title: 'JEE Main Physics PYQ: Newton\'s Laws (2021)', url: 'https://example.com/pyq/jee/newtons-laws-2021.pdf', keywords: ['newton', 'laws', 'motion', 'physics', 'jee'] },
  { type: 'Important Questions', title: 'Class 9 Math: Quadratic Equations', url: 'https://example.com/iq/class9/quadratic-equations.pdf', keywords: ['quadratic', 'equations', 'math'] },
  { type: 'Mock Test', title: 'NEET Biology Mock Test: Cell Structure', url: 'https://example.com/mocktest/neet/cell-structure.pdf', keywords: ['cell', 'biology', 'neet'] },
  { type: 'Notes', title: 'Class 12 Chemistry: Organic Reactions', url: 'https://example.com/notes/class12/organic-reactions.pdf', keywords: ['organic', 'chemistry', 'reactions'] },
];

const searchStudyMaterials = ai.defineTool(
  {
    name: 'searchStudyMaterials',
    description: 'Searches for relevant study materials (notes, questions, PYQs, etc.) based on a given concept.',
    inputSchema: z.object({
      concept: z.string().describe('The concept to search for study materials.'),
    }),
    outputSchema: z.array(SuggestedMaterialSchema),
  },
  async (input) => {
    const searchKeywords = input.concept.toLowerCase().split(/\s+/);
    const results: z.infer<typeof SuggestedMaterialSchema>[] = [];

    mockStudyMaterials.forEach(material => {
      const materialKeywords = material.keywords.map(kw => kw.toLowerCase());
      if (searchKeywords.some(sk => materialKeywords.includes(sk) || material.title.toLowerCase().includes(sk))) {
        results.push({ type: material.type as z.infer<typeof SuggestedMaterialSchema>['type'], title: material.title, url: material.url });
      }
    });
    return results;
  }
);

const conceptExplanationPrompt = ai.definePrompt({
  name: 'conceptExplanationPrompt',
  input: { schema: AIConceptExplanationInputSchema },
  output: { schema: AIConceptExplanationOutputSchema },
  tools: [searchStudyMaterials],
  prompt: `You are an AI study guide. Your task is to help students understand difficult concepts.

First, provide a concise and clear explanation of the concept described by the student. This explanation should be easy to understand and accurate, as if it\'s derived from the best study notes.

Second, use the 'searchStudyMaterials' tool to find and suggest relevant study materials (like notes, important questions, or PYQs) that could further help the student understand the concept. List these suggested materials clearly.

Student\'s concept description: {{{conceptDescription}}}`,
});

export async function aiAssistedConceptExplanation(input: AIConceptExplanationInput): Promise<AIConceptExplanationOutput> {
  return aiAssistedConceptExplanationFlow(input);
}

const aiAssistedConceptExplanationFlow = ai.defineFlow(
  {
    name: 'aiAssistedConceptExplanationFlow',
    inputSchema: AIConceptExplanationInputSchema,
    outputSchema: AIConceptExplanationOutputSchema,
  },
  async (input) => {
    const { output } = await conceptExplanationPrompt(input);
    if (!output) {
      throw new Error('Failed to get output from conceptExplanationPrompt');
    }
    return output;
  }
);
