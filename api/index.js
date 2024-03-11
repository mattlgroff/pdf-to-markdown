import { handleOpenAIChatCompletion } from './controllers';

Bun.serve({
    async fetch(req) {
        const url = new URL(req.url);

        if (req.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
            });
        }

        if (url.pathname === '/openai-chat-completion' && req.method === 'POST') {
            return handleOpenAIChatCompletion(req);
        }

        // 404 catch-all
        return new Response('404!', {
            status: 404,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    },
});

console.log('Listening on port 3000');