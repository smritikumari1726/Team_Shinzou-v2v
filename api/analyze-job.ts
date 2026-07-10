import { analyzeJobHandler } from "../server/handlers.js";

export default async function handler(req: any, res: any) {
  return analyzeJobHandler(req, res);
}
