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
  await prisma.loot_Type.upsert({
    where: { name: "Mount" },
    update: {},
    create: {
      name: "Mount",
    },
  });
  await prisma.loot_Type.upsert({
    where: { name: "Weapon (Specific)" },
    update: {},
    create: {
      name: "Weapon (Specific)",
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

  response = await fetch("https://xivapi.com/Item?page=402");
  data = await response.json();

  for (let i = 0; i < data.Results.length; i++) {
    if (data.Results[i].ID > 40164 && data.Results[i].ID < 40184) {
      await prisma.loot.upsert({
        where: { name: data.Results[i].Name },
        update: { typeId: 18 },
        create: {
          name: data.Results[i].Name,
          image: data.Results[i].Icon,
          typeId: 18,
        },
      });
    }
  }

  await prisma.loot.upsert({
    where: { name: "Megaloambystoma Horn" },
    update: { image: "/i/026000/026038.png" },
    create: {
      name: "Megaloambystoma Horn",
      image: "/i/026000/026038.png",
      typeId: 17,
    },
  });
  await prisma.tier.upsert({
    where: { name: "Pandæmonium: Anabaseios Savage (P9S-P12S)" },
    update: { name: "Pandæmonium: Anabaseios Savage (P9S-P12S)" },
    create: {
      name: "Pandæmonium: Anabaseios Savage (P9S-P12S)",
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
    [6, 8, 10, 18, 19, 2],
    [7, 9, 16, 17, 3],
    [
      5, 4, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
      37, 38,
    ],
  ];

  for (let i = 0; i < data.Results.length; i++) {
    lootIds = lootArray[i];
    await prisma.fight.upsert({
      where: { name: data.Results[i].Name },
      update: {
        floor: i + 1,
        loots: {
          connect: lootIds.map((id) => ({ id })),
        },
      },
      create: {
        name: data.Results[i].Name,
        tierId: 1,
        floor: i + 1,
        loots: {
          connect: lootIds.map((id) => ({ id })),
        },
      },
    });
  }

  roleArray = ["Tank", "Healer", "DPS"];
  for (let i = 0; i < roleArray.length; i++) {
    await prisma.role.upsert({
      where: { name: roleArray[i] },
      update: {},
      create: {
        name: roleArray[i],
      },
    });
  }
  tanks = [
    { name: "Paladin", role: 1 },
    { name: "Warrior", role: 1 },
    { name: "Dark Knight", role: 1 },
    { name: "Gunbreaker", role: 1 },
  ];

  healers = [
    { name: "White Mage", role: 2 },
    { name: "Scholar", role: 2 },
    { name: "Astrologian", role: 2 },
    { name: "Sage", role: 2 },
  ];

  dps = [
    { name: "Monk", role: 3 },
    { name: "Dragoon", role: 3 },
    { name: "Ninja", role: 3 },
    { name: "Samurai", role: 3 },
    { name: "Reaper", role: 3 },
    { name: "Bard", role: 3 },
    { name: "Machinist", role: 3 },
    { name: "Dancer", role: 3 },
    { name: "Black Mage", role: 3 },
    { name: "Summoner", role: 3 },
    { name: "Red Mage", role: 3 },
  ];

  for (let i = 0; i < tanks.length; i++) {
    await prisma.class.upsert({
      where: { name: tanks[i].name },
      update: { roleId: 1 },
      create: {
        name: tanks[i].name,
        roleId: 1,
      },
    });
  }

  for (let i = 0; i < healers.length; i++) {
    await prisma.class.upsert({
      where: { name: healers[i].name },
      update: { roleId: 2 },
      create: {
        name: healers[i].name,
        roleId: 2,
      },
    });
  }

  for (let i = 0; i < dps.length; i++) {
    await prisma.class.upsert({
      where: { name: dps[i].name },
      update: { roleId: 3 },
      create: {
        name: dps[i].name,
        roleId: 3,
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
