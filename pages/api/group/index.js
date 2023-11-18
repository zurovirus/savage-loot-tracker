import { prisma } from "@/components/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const loot = await prisma.group.findMany({
        include: { players: true },
        orderBy: [
          {
            id: "asc",
          },
        ],
      });
      return res.status(200).json(loot);
    } catch (error) {
      return res.status(400).json(error);
      console.log(error.message);
    }
  } else {
    return res.status(500).json();
  }
}
