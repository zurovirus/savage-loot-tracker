import { prisma } from "@/components/lib/prisma";

// Creates the group data in the database.
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const group = await prisma.group.create({
        data: {
          name: req.body.name,
          users: { connect: { id: req.body.id } },
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
