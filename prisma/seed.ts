import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'ahmad.alshahal2@gmail.com' },
        update: {},
        create: {
            email: 'ahmad.alshahal2@gmail.com',
            name: 'Ahmad',
            verified: true,
            password: '12345678',
            phonenumber: '+963951737433',
        },
    });
    const project = await prisma.project.upsert({
        where: { id: 0 },
        update: {},
        create: {
            title: 'Default Project',
            description: 'Default Description',
            target: 1000000,
            tags: ['Default', 'Default'],
        },
    });
    console.log({ user, project });
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
