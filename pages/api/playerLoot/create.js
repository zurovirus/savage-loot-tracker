import { prisma } from "@/components/lib/prisma";

export default async function handler(req, res) {
  const data = req.body;

  console.log(req.body);
  if (req.method === "POST") {
    try {
      const playerLoot = await prisma.playerLoot.createMany({
        data: data,
      });
      return res.status(200).json(playerLoot);
    } catch (error) {
      console.log(error.message);
      return res.status(400).json(error);
    }
  } else {
    return res.status(500).json();
  }
}
