import prisma from '../src/utils/prisma';
import bcrypt from 'bcrypt';

async function main() {
  const password = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      password,
      tasks: {
        create: [
          { title: 'Learn Prisma', description: 'Explore Prisma ORM for Node.js', status: 'IN_PROGRESS' },
          { title: 'Build TaskForge', description: 'Create a task management API', status: 'TODO' }
        ]
      }
    }
  });
  console.log(`Seeded user with id: ${user.id}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
