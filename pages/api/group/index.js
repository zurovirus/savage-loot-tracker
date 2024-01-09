import { prisma } from "@/components/lib/prisma";
import { getServerSession } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";

export default async function handler(req, res) {
  const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      DiscordProvider({
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
      }),
    ],
    callbacks: {
      session: async ({ session, user }) => {
        if (session?.user) {
          session.user.id = user.id;
        }
        return session;
      },
    },
  };

  const session = await getServerSession(req, res, authOptions);

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
