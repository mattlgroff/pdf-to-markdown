# api

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.js
```

This project was created using `bun init` in bun v1.0.27. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

# Call the API
curl -X POST http://localhost:3000/openai-chat-completion      -H "Content-Type: application/json"      -d '{"user_query": "Where are white sharks distributed?"}'