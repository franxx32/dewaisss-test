import type { Server } from "bun";
import { dictionary, mappedDictionary } from "./dictionary";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
};

export default {
  async fetch(request: Request): Promise<Response | undefined> {
    if (request.method !== "POST") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    const start = performance.now();
    const { string } = await request.json();

    const words = string.split(" ");

    const result = Object.keys(dictionary).reduce((acc, curr) => {
      acc[curr] = 0;
      return acc;
    }, {});
    result["others"] = 0;

    words.forEach((word) => {
      const key = mappedDictionary[word];

      result[key ?? "others"] += 1;
    });
    const end = performance.now();

    const response = Response.json(
      {
        string,
        result,
        calculationTime: `${(end - start).toFixed(2)}ms`,
      },
      { headers: corsHeaders }
    );

    return response;
  },
};
