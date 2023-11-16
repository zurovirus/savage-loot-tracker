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
      console.log(error.message);
    }
  } else {
    return res.status(400).json({ message: "Bad Request" });
  }
}
