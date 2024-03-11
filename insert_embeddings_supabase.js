const fs = require('fs');
const csv = require('csv-parser');
const { createClient } = require('@supabase/supabase-js');

// Initialize the Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const insertData = async (page_number, title, body, embedding) => {
  const { data, error } = await supabase.from('documents').insert({
    page_number,
    title,
    body,
    embedding: JSON.parse(embedding), // Assuming embedding is a JSON string that needs to be parsed
  });

  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log('Inserted data:', body);
  }
};

// Read the CSV file
fs.createReadStream('chunks_with_embedding.csv')
  .pipe(csv())
  .on('data', (row) => {
    // For each row in the CSV, call the insert function
    insertData(row['Page Number'], 'Great White Shark Fact Sheet', row['Chunk'], row['Embedding']);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
