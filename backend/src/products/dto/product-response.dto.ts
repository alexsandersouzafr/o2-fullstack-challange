import { Product } from '@prisma/client';

export interface ProductListDTO {
  products: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
}
