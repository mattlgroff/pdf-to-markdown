import pandas as pd
from openai import OpenAI
import json

client = OpenAI()

# Read the original CSV file"chunks.csv"
df = pd.read_csv('chunks.csv')

# Function to generate embedding
def get_embedding(text):
    response = client.embeddings.create(
        input=text,
        model="text-embedding-3-small"
    )
    # Access the embedding using dot notation and convert it to a JSON string for easier CSV storage
    embedding = response.data[0].embedding
    return json.dumps(embedding)

# Apply the function to each chunk and store the result in a new column
df['Embedding'] = df['Chunk'].apply(get_embedding)

# Write the updated DataFrame to a new CSV file
df.to_csv('chunks_with_embedding.csv', index=False)
