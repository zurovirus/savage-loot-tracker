import { prisma } from "@/components/lib/prisma";

// Finds the group's players and their associated loot.
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const groupId = parseInt(req.query.id);

      // Searches for the group based of the id in the query.
      const group = await prisma.group.findFirst({
        where: { id: groupId },
        include: {
          players: true,
        },
      });

      // Fetch playerloots and include loot data
      const playerloots = await prisma.playerLoot.findMany({
        where: {
          playerId: {
            in: group.players.map((player) => player.id),
          },
        },
        include: {
          loot: {
            include: {
              fights: true,
            },
          }, // Include loot data for each playerloot
        },
        orderBy: [{ date: "desc" }, { lootId: "desc" }],
      });

      // Associate groups with players and player loots (including loot data)
      const groupWithPlayerLoots = {
        ...group,
        players: group.players.map((player) => ({
          ...player,
          playerloots: playerloots.filter(
            (loot) => loot.playerId === player.id
          ),
        })),
      };

      return res.status(200).json(groupWithPlayerLoots);
    } catch (error) {
      console.log(error.message);
      return res.status(400).json(error);
    }
  } else {
    return res.status(500).json();
  }
}
