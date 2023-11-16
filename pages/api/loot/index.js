import { prisma } from "@/components/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const loot = await prisma.loot.findMany({
        include: { fights: true },
        orderBy: [
          {
            id: "asc",
          },
        ],
      });
      return res.status(200).json(loot);
    } catch (error) {
      console.log(error.message);
    }
  } else {
    return res.status(400).json({ message: "Bad Request" });
  }
}
