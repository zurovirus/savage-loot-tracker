import { prisma } from "@/components/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const group = await prisma.group.update({
        where: {
          id: req.body.id,
        },
        data: {
          name: req.body.name,
        },
      });
      return res.status(200).json(group);
    } catch (error) {
      console.log(error.message);
      return res.status(400).json(error);
    }
  } else {
    return res.status(500).json();
  }
}
