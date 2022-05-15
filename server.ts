import { serve, Handler } from "https://deno.land/std@0.138.0/http/server.ts";

const app = Deno.readTextFileSync("app.html");

const handler: Handler = (request) => {
  console.log(request);

  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Request-Method": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "*",
  };

  if (request.method !== "GET") {
    return new Response("Method not allowed.", { status: 400 });
  }

  headers["content-type"] = "text/html";

  return new Response(app, { headers, status: 200 });
};

serve(handler);
