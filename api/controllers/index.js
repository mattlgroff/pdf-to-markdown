const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI();

// Initialize the Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export const handleOpenAIChatCompletion = async (req) => {
  try {
      // Everything we did in search.js
      const data = await req.json();

      // OpenAI recommends replacing newlines with spaces for best results
      const user_query = data.user_query.replace(/\n/g, ' ');

      // Generate a one-time embedding for the query itself
      const embeddingResponse = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: user_query,
        encoding_format: "float",
      });

      const embedding = embeddingResponse.data[0].embedding;

      // Call a Supabase RPC or a stored procedure 'match_documents'
      // Make sure to adjust parameters ('query_embedding', 'match_threshold', 'match_count') as per your actual RPC implementation
      const { data: documents, error } = await supabase.rpc('match_documents', {
        query_embedding: embedding,
        match_threshold: 0.25, // Adjust threshold according to your needs
        match_count: 10, // Adjust the number of matches as needed
      });

      if (error) {
        throw new Error('Error searching documents:', error);
      }

      // console.log('Matched documents:', documents);


      // Call OpenAI to handle the final user response


      // Document has the title, page_number, body, which we want to .map over and neatly return as a markdown formatted string

      const systemMessage = {
          role: 'system',
          content: `## You are an expert in Great White Sharks. Use only the information in your "Context" to answer user's questions about Great White Sharks. If the answer is not in the "Context", then simply say "I do not know."
          
          ## Context
          ${documents.map((doc) => `### ${doc.body} (Citation/Reference: Page ${doc.page_number} from ${doc.title})`).join('\n\n')}
          `,
      };

      const userMessage = {
          role: 'user',
          content: user_query,
      };

      console.log('System Message:', systemMessage);

      console.log('User Message:', userMessage);


      // Start the OpenAI API stream
      const openai_api_stream = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [systemMessage, userMessage],
          stream: true,
      });

      // Create a streaming response using the 'ai' package
      const stream = OpenAIStream(openai_api_stream);

      // Return the streaming response
      return new StreamingTextResponse(stream, {
          headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Content-Type': 'text/event-stream',
          },
      });
  } catch (err) {
      const errorMessage = err?.message || 'There was a problem asking OpenAI for a chat-completion';

      return new Response(errorMessage, {
          status: 502,
          headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST',
              'Access-Control-Allow-Headers': 'Content-Type',
          },
      });
  }
};