const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');

const openai = new OpenAI();

// Initialize the Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function searchDocuments(query) {
  // OpenAI recommends replacing newlines with spaces for best results
  const input = query.replace(/\n/g, ' ');

  // Generate a one-time embedding for the query itself
  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input,
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
    console.error('Error searching documents:', error);
    return;
  }

  console.log('Matched documents:', documents);
}

// Example usage
const query = "What are critical sites?";
searchDocuments(query).catch(console.error);