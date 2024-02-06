import { prisma } from "@/components/lib/prisma";

// Retrives data from the class table.
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const classes = await prisma.class.findMany();
      return res.status(200).json(classes);
    } catch (error) {
      console.log(error.message);
      return res.status(400).json(error);
    }
  } else {
    return res.status(500).json();
  }
}
