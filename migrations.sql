 -- enable the "vector" extension.
create extension vector
with
  schema extensions;

-- create a table to store documents.
create table documents (
  id serial primary key,
  title text not null,
  page_number integer not null,
  body text not null,
  embedding vector(1536)
);

-- create a function to do cosine similarity search.
create or replace function match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  title text,
  page_number integer,
  body text,
  similarity float
)
language sql stable
as $$
  select
    documents.id,
    documents.title,
    documents.page_number,
    documents.body,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where documents.embedding <=> query_embedding < 1 - match_threshold
  order by documents.embedding <=> query_embedding
  limit match_count;
$$;


-- create an index on the documents table using the ivfflat method.
create index on documents using ivfflat (embedding vector_cosine_ops)
with
  (lists = 100);
