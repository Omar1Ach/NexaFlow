import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
  categoryId: z.string().uuid(),
  supplierId: z.string().uuid().nullable().optional(),
});

export const updateProductSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().nullable(),
    price: z.number().nonnegative(),
    stock: z.number().int().nonnegative(),
    status: z.enum(['ACTIVE', 'INACTIVE']),
    categoryId: z.string().uuid(),
    supplierId: z.string().uuid().nullable(),
  })
  .partial();

export type CreateProductBody = z.infer<typeof createProductSchema>;
export type UpdateProductBody = z.infer<typeof updateProductSchema>;
