import { prisma } from "@/components/lib/prisma";

// Creates a player and associates it with a group.
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const group = await prisma.player.create({
        data: {
          name: req.body.name,
          class: { connect: { id: parseInt(req.body.classId) } },
          group: {
            connect: {
              id: parseInt(req.body.groupId),
            },
          },
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
