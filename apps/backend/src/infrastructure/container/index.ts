import { prisma } from '../database/prismaClient';
import { env } from '../../config/env';

import { UserRepository } from '../repositories/UserRepository';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { SupplierRepository } from '../repositories/SupplierRepository';

import { HashService } from '../services/HashService';
import { JwtService } from '../services/JwtService';
import { N8nService } from '../services/N8nService';

import { LoginUseCase } from '../../application/use-cases/auth/LoginUseCase';
import { RegisterUseCase } from '../../application/use-cases/auth/RegisterUseCase';

import { GetAllCategoriesUseCase } from '../../application/use-cases/category/GetAllCategoriesUseCase';
import { GetCategoryByIdUseCase } from '../../application/use-cases/category/GetCategoryByIdUseCase';
import { CreateCategoryUseCase } from '../../application/use-cases/category/CreateCategoryUseCase';
import { UpdateCategoryUseCase } from '../../application/use-cases/category/UpdateCategoryUseCase';
import { DeleteCategoryUseCase } from '../../application/use-cases/category/DeleteCategoryUseCase';

import { GetAllProductsUseCase } from '../../application/use-cases/product/GetAllProductsUseCase';
import { GetProductByIdUseCase } from '../../application/use-cases/product/GetProductByIdUseCase';
import { CreateProductUseCase } from '../../application/use-cases/product/CreateProductUseCase';
import { UpdateProductUseCase } from '../../application/use-cases/product/UpdateProductUseCase';
import { DeleteProductUseCase } from '../../application/use-cases/product/DeleteProductUseCase';

import { GetAllSuppliersUseCase } from '../../application/use-cases/supplier/GetAllSuppliersUseCase';
import { GetSupplierByIdUseCase } from '../../application/use-cases/supplier/GetSupplierByIdUseCase';
import { CreateSupplierUseCase } from '../../application/use-cases/supplier/CreateSupplierUseCase';
import { UpdateSupplierUseCase } from '../../application/use-cases/supplier/UpdateSupplierUseCase';
import { DeleteSupplierUseCase } from '../../application/use-cases/supplier/DeleteSupplierUseCase';

import { TriggerEmailUseCase } from '../../application/use-cases/email/TriggerEmailUseCase';

import { AuthController } from '../../presentation/controllers/AuthController';
import { CategoryController } from '../../presentation/controllers/CategoryController';
import { ProductController } from '../../presentation/controllers/ProductController';
import { SupplierController } from '../../presentation/controllers/SupplierController';
import { EmailController } from '../../presentation/controllers/EmailController';

// Repositories
const userRepository = new UserRepository(prisma);
const categoryRepository = new CategoryRepository(prisma);
const productRepository = new ProductRepository(prisma);
const supplierRepository = new SupplierRepository(prisma);

// Services
const hashService = new HashService();
const jwtService = new JwtService(env.JWT_SECRET, env.JWT_EXPIRES_IN);
const n8nService = new N8nService(env.N8N_WEBHOOK_URL);

// Auth use-cases
const loginUseCase = new LoginUseCase(userRepository, hashService, jwtService);
const registerUseCase = new RegisterUseCase(userRepository, hashService);

// Category use-cases
const getAllCategories = new GetAllCategoriesUseCase(categoryRepository);
const getCategoryById = new GetCategoryByIdUseCase(categoryRepository);
const createCategory = new CreateCategoryUseCase(categoryRepository);
const updateCategory = new UpdateCategoryUseCase(categoryRepository);
const deleteCategory = new DeleteCategoryUseCase(categoryRepository);

// Product use-cases
const getAllProducts = new GetAllProductsUseCase(productRepository);
const getProductById = new GetProductByIdUseCase(productRepository);
const createProduct = new CreateProductUseCase(productRepository, categoryRepository);
const updateProduct = new UpdateProductUseCase(productRepository);
const deleteProduct = new DeleteProductUseCase(productRepository);

// Supplier use-cases
const getAllSuppliers = new GetAllSuppliersUseCase(supplierRepository);
const getSupplierById = new GetSupplierByIdUseCase(supplierRepository);
const createSupplier = new CreateSupplierUseCase(supplierRepository);
const updateSupplier = new UpdateSupplierUseCase(supplierRepository);
const deleteSupplier = new DeleteSupplierUseCase(supplierRepository);

// Email use-cases
const triggerEmail = new TriggerEmailUseCase(n8nService);

// Controllers
const authController = new AuthController(loginUseCase, registerUseCase);
const categoryController = new CategoryController(
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
);
const productController = new ProductController(
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
);
const supplierController = new SupplierController(
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
);
const emailController = new EmailController(triggerEmail);

export const container = {
  prisma,
  services: { hashService, jwtService, n8nService },
  controllers: {
    authController,
    categoryController,
    productController,
    supplierController,
    emailController,
  },
};

export type Container = typeof container;
