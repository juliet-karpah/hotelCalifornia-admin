'use server'
import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({invalid_type_error: 'Please select a customer.'}),
    amount: z.coerce.number().gt(0, { message: "Please enter an amount greater than $0" }),
    status: z.enum(['pending', 'paid'], { invalid_type_error: 'Please select an invoice status.' }),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createBookings(prevState: State, formData: FormData) {
    try {
        const rawFormData = {
            customerId: formData.get('customerId'),
            amount: formData.get('amount'),
            status: formData.get('status'),
        };

        const validatedFields = CreateInvoice.safeParse(rawFormData)
        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Missing Fields. failed to Create Invoice.'
            }
        }

        const { customerId, amount, status } = validatedFields.data
        const amountInCents = amount * 100;
        const date = new Date().toISOString().split('T')[0];

        await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    } catch (error) {
        console.error(error)
        return {message: "Error creating bookings"}
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');

}


// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// ...
export async function updateInvoice(id: string, prevState: State, formData: FormData) {
    try {
        const validatedFields = UpdateInvoice.safeParse({
            customerId: formData.get('customerId'),
            amount: formData.get('amount'),
            status: formData.get('status'),
        });
        if(!validatedFields.success){
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: "Missing Fields. Failed to Update Booking."
            }
        }

        const {customerId, amount, status} = validatedFields.data

        const amountInCents = amount * 100;

        await sql`
            UPDATE invoices
            SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
            WHERE id = ${id}
          `;

    } catch (error) {
        console.error(error)
        return {message: "Error updating booking"}
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
    } catch (error) {
        console.error(error)
        return {message: "Error in deleting booking"}
    }

    revalidatePath('/dashboard/invoices');
}

export async function authenticate(prevState: String | undefined, formData: FormData){
    try{
        await signIn('credentials', formData);
    }catch(error){
        if (error instanceof AuthError){
            switch(error.type){
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}