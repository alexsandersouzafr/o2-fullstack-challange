export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  stock: number;
  unitPrice: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Movement {
  id: number;
  productId: number;
  product: Product;
  quantity: number;
  totalValue: number;
  type: "ENTRY" | "EXIT";
  date: string;
}

export interface StockTotals {
  totalStockValue: number;
  totalItemsSold: number;
  totalSales: number;
  period:
    | {
        startDate: Date;
        endDate: Date;
      }
    | undefined;
}

export interface TopProduct extends Product {
  movementStats: {
    totalCount: number;
    entryCount: number;
    exitCount: number;
    entryTotal: number;
    exitTotal: number;
    netTotal: number;
  };
}

export interface MovementsResponse {
  movements: Movement[];
  totals: {
    entry: number;
    exit: number;
    totalItemsSold: number;
  };
}

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface CreateProductResponse {
  id: number;
  name: string;
  description?: string;
  stock: number;
  unitPrice: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}

export interface DateRangeSearchParams {
  startDate?: string;
  endDate?: string;
}
