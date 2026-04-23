import { z } from 'zod';

export const createSupplierSchema = z.object({
  company: z.string().min(1),
  contact: z.string().min(1),
  email: z.string().email(),
  phone: z.string().nullable().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export const updateSupplierSchema = z
  .object({
    company: z.string().min(1),
    contact: z.string().min(1),
    email: z.string().email(),
    phone: z.string().nullable(),
    status: z.enum(['ACTIVE', 'INACTIVE']),
  })
  .partial();

export const triggerEmailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  body: z.string().min(1),
  metadata: z.record(z.unknown()).optional(),
});

export type CreateSupplierBody = z.infer<typeof createSupplierSchema>;
export type UpdateSupplierBody = z.infer<typeof updateSupplierSchema>;
export type TriggerEmailBody = z.infer<typeof triggerEmailSchema>;
