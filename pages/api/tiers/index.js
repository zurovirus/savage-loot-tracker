import { prisma } from "@/components/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const tiers = await prisma.tier.findMany({
        include: { fights: true },
        orderBy: [
          {
            name: "asc",
          },
        ],
      });
      return res.status(200).json(tiers);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(400).json({ message: "Bad Request" });
  }
}
