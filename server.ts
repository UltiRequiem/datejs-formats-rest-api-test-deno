import { Handler, serve } from "https://deno.land/std@0.167.0/http/server.ts";

const app = await Deno.readTextFile("app.html");

const handler: Handler = (request) => {
  if (request.method !== "GET" && request.method !== "POST") {
    return new Response("Method not allowed.", { status: 400 });
  }

  const { pathname } = new URL(request.url);

  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Request-Method": "*",
    "Access-Control-Allow-Methods": "GET, POST",
    "Access-Control-Allow-Headers": "*",
  };

  if (pathname === "/") {
    headers["content-type"] = "text/html";

    return new Response(app, { headers, status: 200 });
  }

  if (pathname === "/api") {
    const date = new Date();

    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

    return new Response(JSON.stringify({ date: date.valueOf(), timeZone }));
  }

  return new Response("Route not found.", { status: 404 });
};

serve(handler);
