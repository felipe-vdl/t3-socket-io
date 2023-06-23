import { prisma } from "@/server/db";
import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/types/next";

export default async function TargetHandler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  try {
    if (req.method !== "POST")
      return res.status(405).json({ error: "Method not allowed" });

    const data = req.body;

    const newEntry = await prisma.entry.create({
      data: {
        json: JSON.stringify(data),
      },
    });

    res.socket.server.io.emit("new-entry", newEntry);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
}
