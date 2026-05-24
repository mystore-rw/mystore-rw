import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const neighborhoods = [
    { name: "Kimironko", city: "Kigali" },
    { name: "Remera", city: "Kigali" },
    { name: "Nyabugogo", city: "Kigali" },
    { name: "Gikondo", city: "Kigali" },
    { name: "Kacyiru", city: "Kigali" },
    { name: "Muhima", city: "Kigali" },
  ];

  for (const n of neighborhoods) {
    await prisma.neighborhood.upsert({
      where: { name: n.name },
      update: {},
      create: n,
    });
  }

  console.log("Seeded", neighborhoods.length, "neighborhoods");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
