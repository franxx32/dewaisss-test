import type { Server } from "bun";
import { dictionary, mappedDictionary } from "./dictionary";

export default {
  async fetch(request: Request, server: Server): Promise<Response | undefined> {
    const start = performance.now();
    const { string } = await request.json()
    const words = string.split(' ')

    const result = Object.keys(dictionary).reduce((acc, curr) => {
      acc[curr] = 0
      return acc
    }, {})
    result['others'] = 0

    words.forEach(word => {
      const key = mappedDictionary[word]

      result[key ?? 'others'] += 1;
    });
    const end = performance.now();
    return Response.json({ string, result, calculationTime: `${(end - start).toFixed(2)}ms` })
  },
};
