import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const email = 'admin@metalyconcreto.com'
    const password = 'adminpassword' // Change this in production
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name: 'Admin User',
            hashedPassword,
            role: 'ADMIN',
        },
    })

    console.log({ user })

    // Materials
    const materials = [
        {
            name: 'Viga IPE 80',
            description: 'Viga de acero IPE 80',
            unit: 'unidad',
            category: 'Acero',
            prices: [
                { price: 200, validFrom: new Date('2023-01-01'), validTo: new Date('2023-12-31') },
                { price: 250, validFrom: new Date('2024-01-01') }, // Current price
            ]
        },
        {
            name: 'Cemento UGC',
            description: 'Saco de cemento 42.5kg',
            unit: 'saco',
            category: 'Concreto',
            prices: [
                { price: 75, validFrom: new Date('2024-01-01') },
            ]
        },
        {
            name: 'Arena de Río',
            description: 'Metro cúbico de arena',
            unit: 'm³',
            category: 'Agregados',
            prices: [
                { price: 150, validFrom: new Date('2024-01-01') },
            ]
        }
    ]

    for (const m of materials) {
        const material = await prisma.material.create({
            data: {
                name: m.name,
                description: m.description,
                unit: m.unit,
                category: m.category,
                prices: {
                    create: m.prices
                }
            }
        })
        console.log(`Created material with id: ${material.id}`)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
