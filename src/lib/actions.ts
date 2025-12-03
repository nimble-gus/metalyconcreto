'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
): Promise<string | undefined> {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function logout() {
    await signOut();
}

import { db } from './db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getBestPrice(materialId: string) {
    const bestPrice = await db.priceEntry.findFirst({
        where: { materialId },
        orderBy: [
            { price: 'asc' },
            { createdAt: 'desc' }
        ],
    });
    return bestPrice;
}

export async function createQuote(formData: FormData) {
    const clientName = formData.get('clientName') as string;
    const projectName = formData.get('projectName') as string;
    const materialId = formData.get('materialId') as string;
    const quantity = parseFloat(formData.get('quantity') as string);
    const unitPrice = parseFloat(formData.get('unitPrice') as string);

    if (!clientName || !materialId || !quantity || !unitPrice) {
        throw new Error('Missing required fields');
    }

    const quote = await db.quote.create({
        data: {
            clientName,
            projectName,
            status: 'DRAFT',
            items: {
                create: {
                    materialId,
                    quantity,
                    unitPrice,
                    total: quantity * unitPrice,
                },
            },
        },
    });

    revalidatePath('/admin/quotes');
    redirect('/admin/quotes');
}

export async function createMaterial(formData: FormData) {
    const name = formData.get('name') as string;
    const unit = formData.get('unit') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;

    if (!name || !unit) {
        throw new Error('Missing required fields');
    }

    await db.material.create({
        data: {
            name,
            unit,
            category,
            description,
        },
    });

    revalidatePath('/admin/materials');
    redirect('/admin/materials');
}

export async function updateMaterial(id: string, formData: FormData) {
    const name = formData.get('name') as string;
    const unit = formData.get('unit') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;

    if (!name || !unit) {
        throw new Error('Missing required fields');
    }

    await db.material.update({
        where: { id },
        data: {
            name,
            unit,
            category,
            description,
        },
    });

    revalidatePath('/admin/materials');
    redirect('/admin/materials');
}

export async function deleteMaterial(id: string) {
    await db.material.delete({
        where: { id },
    });
    revalidatePath('/admin/materials');
}

export async function createPriceEntry(formData: FormData) {
    const materialId = formData.get('materialId') as string;
    const provider = formData.get('provider') as string;
    const price = parseFloat(formData.get('price') as string);
    const validFrom = new Date(formData.get('validFrom') as string);
    const validToStr = formData.get('validTo') as string;
    const validTo = validToStr ? new Date(validToStr) : null;

    if (!materialId || !price || !validFrom) {
        throw new Error('Missing required fields');
    }

    await db.priceEntry.create({
        data: {
            materialId,
            provider,
            price,
            validFrom,
            validTo,
        },
    });

    revalidatePath('/admin/prices');
    revalidatePath('/admin/materials');
    redirect('/admin/prices');
}

export async function updatePriceEntry(id: string, formData: FormData) {
    const materialId = formData.get('materialId') as string;
    const provider = formData.get('provider') as string;
    const price = parseFloat(formData.get('price') as string);
    const validFrom = new Date(formData.get('validFrom') as string);
    const validToStr = formData.get('validTo') as string;
    const validTo = validToStr ? new Date(validToStr) : null;

    if (!materialId || !price || !validFrom) {
        throw new Error('Missing required fields');
    }

    await db.priceEntry.update({
        where: { id },
        data: {
            materialId,
            provider,
            price,
            validFrom,
            validTo,
        },
    });

    revalidatePath('/admin/prices');
    revalidatePath('/admin/materials');
    redirect('/admin/prices');
}

export async function deletePriceEntry(id: string) {
    await db.priceEntry.delete({
        where: { id },
    });
    revalidatePath('/admin/prices');
    revalidatePath('/admin/materials');
}
