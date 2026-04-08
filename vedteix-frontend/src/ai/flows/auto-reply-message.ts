'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating automated replies to contact form messages.
 *
 * - autoReplyMessage - A function that generates an automated reply to a contact form message.
 * - AutoReplyMessageInput - The input type for the autoReplyMessage function.
 * - AutoReplyMessageOutput - The return type for the autoReplyMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const AutoReplyMessageInputSchema = z.object({
  message: z.string().describe('The message sent via the contact form.'),
  name: z.string().describe('The name of the person sending the message.'),
});
export type AutoReplyMessageInput = z.infer<typeof AutoReplyMessageInputSchema>;

const AutoReplyMessageOutputSchema = z.object({
  reply: z.string().describe('The AI-generated reply message.'),
});
export type AutoReplyMessageOutput = z.infer<typeof AutoReplyMessageOutputSchema>;

export async function autoReplyMessage(input: AutoReplyMessageInput): Promise<AutoReplyMessageOutput> {
  return autoReplyMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'autoReplyMessagePrompt',
  input: {schema: AutoReplyMessageInputSchema},
  output: {schema: AutoReplyMessageOutputSchema},
  prompt: `You are a helpful AI assistant that generates automated replies for contact form messages.

  Given the following message and sender name, generate a brief and polite reply acknowledging receipt and assuring a timely review.

  Message: {{{message}}}
  Sender Name: {{{name}}}

  Reply:`,
});

const autoReplyMessageFlow = ai.defineFlow(
  {
    name: 'autoReplyMessageFlow',
    inputSchema: AutoReplyMessageInputSchema,
    outputSchema: AutoReplyMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
