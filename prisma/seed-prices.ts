import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding price data...');

    // Create Material: Acero
    const acero = await prisma.material.upsert({
        where: { id: 'material-acero' },
        update: {},
        create: {
            id: 'material-acero',
            name: 'Acero',
            description: 'Acero de construcción grado 60',
            unit: 'quintal',
            category: 'Metales',
        },
    });

    // Create Price Entries for Acero (History)
    const prices = [
        { price: 450, date: new Date('2024-06-01') },
        { price: 445, date: new Date('2024-07-01') },
        { price: 460, date: new Date('2024-08-01') },
        { price: 455, date: new Date('2024-09-01') },
        { price: 440, date: new Date('2024-10-01') },
        { price: 435, date: new Date('2024-11-01') },
        { price: 430, date: new Date('2024-12-01') }, // Current best price
    ];

    for (const p of prices) {
        await prisma.priceEntry.create({
            data: {
                materialId: acero.id,
                price: p.price,
                provider: 'Distribuidora Central',
                validFrom: p.date,
                createdAt: p.date,
            },
        });
    }

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
