import { GetAllSuppliersUseCase } from '../GetAllSuppliersUseCase';
import { ISupplierRepository } from '../../../../domain/repositories/ISupplierRepository';
import { Supplier } from '../../../../domain/entities/Supplier';

describe('GetAllSuppliersUseCase', () => {
  let repo: jest.Mocked<ISupplierRepository>;
  let useCase: GetAllSuppliersUseCase;

  beforeEach(() => {
    repo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new GetAllSuppliersUseCase(repo);
  });

  it('should return array of suppliers', async () => {
    const list: Supplier[] = [
      {
        id: 's1',
        company: 'Acme',
        contact: 'John',
        email: 's@acme.com',
        phone: null,
        status: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    repo.findAll.mockResolvedValue(list);

    const result = await useCase.execute();
    expect(result).toEqual(list);
  });
});
