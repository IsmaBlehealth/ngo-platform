import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import seedData from "../seed_content.json";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const directUrl = (process.env.DIRECT_URL || process.env.DATABASE_URL || "").replace("-pooler.", ".");
const adapter = new PrismaPg({
  connectionString: directUrl,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // ─── Programs ────────────────────────────────────────────
  for (const program of seedData.programs) {
    await prisma.program.upsert({
      where: { slug: program.slug },
      update: {},
      create: {
        slug: program.slug,
        title: program.title,
        shortDescription: program.shortDescription,
        fullDescription: program.fullDescription,
        heroImage: program.heroImage,
        icon: program.icon,
        sortOrder: program.sortOrder,
        isActive: program.isActive,
      },
    });
    console.log(`  ✓ Program: ${program.title}`);
  }

  // ─── Projects ────────────────────────────────────────────
  for (const project of seedData.projects) {
    const program = await prisma.program.findUnique({
      where: { slug: project.programSlug },
    });
    if (!program) continue;

    await prisma.project.deleteMany({
      where: { programId: program.id, name: project.name },
    });
    await prisma.project.create({
      data: {
        programId: program.id,
        name: project.name,
        country: project.country,
        description: project.description,
        stats: project.stats,
      },
    });
    console.log(`  ✓ Project: ${project.name}`);
  }

  // ─── Impact Stories ──────────────────────────────────────
  for (const story of seedData.impactStories) {
    await prisma.impactStory.deleteMany({
      where: { title: story.title },
    });
    await prisma.impactStory.create({
      data: {
        title: story.title,
        subtitle: story.subtitle,
        description: story.description,
        ctaText: story.ctaText,
        image: story.image,
        sortOrder: story.sortOrder,
        isActive: story.isActive,
      },
    });
    console.log(`  ✓ Impact Story: ${story.title}`);
  }

  // ─── Admin User ──────────────────────────────────────────
  const adminEmail = "admin@gad.org";
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    const password = process.env.ADMIN_PASSWORD || crypto.randomBytes(16).toString("hex");
    if (!process.env.ADMIN_PASSWORD) {
      console.log(`  ⚠ No ADMIN_PASSWORD set. Generated: ${password}`);
    }
    const hash = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: {
        firstName: "Admin",
        lastName: "User",
        email: adminEmail,
        passwordHash: hash,
        role: "ADMIN",
        emailVerified: new Date(),
      },
    });
    console.log(`  ✓ Admin user: ${adminEmail}`);
  }

  console.log("\nSeed complete!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
