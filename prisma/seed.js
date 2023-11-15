const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.loot_Type.upsert({
    where: { name: "Book" },
    update: {},
    create: {
      name: "Book",
    },
  });
  await prisma.loot_Type.upsert({
    where: { name: "Weapon" },
    update: {},
    create: {
      name: "Weapon",
    },
  });
  await prisma.loot_Type.upsert({
    where: { name: "Head" },
    update: {},
    create: {
      name: "Head",
    },
  });
  await prisma.loot_Type.upsert({
    where: { name: "Chest" },
    update: {},
    create: {
      name: "Chest",
    },
  });
  await prisma.loot_Type.upsert({
    where: { name: "Hand" },
    update: {},
    create: {
      name: "Hand",
    },
  });
  await prisma.loot_Type.upsert({
    where: { name: "Leg" },
    update: {},
    create: {
      name: "Leg",
    },
  });
  await prisma.loot_Type.upsert({
    where: { name: "Foot" },
    update: {},
    create: {
      name: "Foot",
    },
  });
  await prisma.loot_Type.upsert({
    where: { name: "Earring" },
    update: {},
    create: {
      name: "Earring",
    },
  });
  await prisma.loot_Type.upsert({
    where: { name: "Necklace" },
    update: {},
    create: {
      name: "Necklace",
    },
  });
  await prisma.loot_Type.upsert({
    where: { name: "Bracelet" },
    update: {},
    create: {
      name: "Bracelet",
    },
  });
  await prisma.loot_Type.upsert({
    where: { name: "Ring" },
    update: {},
    create: {
      name: "Ring",
    },
  });
  await prisma.loot_Type.upsert({
    where: { name: "Other" },
    update: {},
    create: {
      name: "Other",
    },
  });
  await prisma.loot_Type.upsert({
    where: { name: "Weapon upgrade" },
    update: {},
    create: {
      name: "Weapon upgrade",
    },
  });
  await prisma.loot_Type.upsert({
    where: { name: "Armor upgrade" },
    update: {},
    create: {
      name: "Armor upgrade",
    },
  });
  await prisma.loot_Type.upsert({
    where: { name: "Accessory upgrade" },
    update: {},
    create: {
      name: "Accessory upgrade",
    },
  });
  await prisma.loot_Type.upsert({
    where: { name: "Tomestone" },
    update: {},
    create: {
      name: "Tomestone",
    },
  });
  response = await fetch("https://xivapi.com/Item?page=404");
  data = await response.json();
  for (let i = 0; i < data.Results.length; i++) {
    if (data.Results[i].ID > 40302 && data.Results[i].ID < 40307) {
      await prisma.loot.upsert({
        where: { name: data.Results[i].Name },
        update: {},
        create: {
          name: data.Results[i].Name,
          image: data.Results[i].Icon,
          typeId: 1,
        },
      });
    }
    if (data.Results[i].ID > 40306 && data.Results[i].ID < 40322) {
      await prisma.loot.upsert({
        where: { name: data.Results[i].Name },
        update: { typeId: i - 4 },
        create: {
          name: data.Results[i].Name,
          image: data.Results[i].Icon,
          typeId: i - 6,
        },
      });
    }
  }

  await prisma.tier.upsert({
    where: { name: "Anabaseios Savage (P9S-P12S)" },
    update: {},
    create: {
      name: "Anabaseios Savage (P9S-P12S)",
    },
  });

  searchString = "Anabaseios: * (Savage)";
  searchQuery = `https://xivapi.com/search?string=${encodeURIComponent(
    searchString
  )}&string_algo=wildcard`;

  response = await fetch(searchQuery);
  data = await response.json();

  lootArray = [
    [11, 12, 13, 14, 1],
    [6, 8, 10, 19, 18, 2],
    [7, 9, 16, 17, 3],
    [5, 4],
  ];

  for (let i = 0; i < data.Results.length; i++) {
    lootIds = lootArray[i];
    await prisma.fight.upsert({
      where: { name: data.Results[i].Name },
      update: {
        loots: {
          connect: lootIds.map((id) => ({ id })),
        },
      },
      create: {
        name: data.Results[i].Name,
        tierId: 1,
        loots: {
          connect: lootIds.map((id) => ({ id })),
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
