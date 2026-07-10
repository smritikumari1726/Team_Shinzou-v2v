import { chatHandler } from "../server/handlers.js";

export default async function handler(req: any, res: any) {
  return chatHandler(req, res);
}
