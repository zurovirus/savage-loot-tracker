import { prisma } from "@/components/lib/prisma";
import { getSession } from "@/helper/getSession";

// Retrieves the groups for a given user.
export default async function handler(req, res) {
  const session = await getSession(req, res);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const group = await prisma.group.findMany({
        where: {
          users: {
            some: {
              id: session.user.id,
            },
          },
        },
        include: { players: true },
        orderBy: [
          {
            id: "asc",
          },
        ],
      });
      return res.status(200).json(group);
    } catch (error) {
      return res.status(400).json(error);
    }
  } else {
    return res.status(500).json();
  }
}
