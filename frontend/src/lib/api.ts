import type {
  Category,
  CreateProductResponse,
  MovementsResponse,
  Product,
  ProductResponse,
  StockTotals,
  TopProduct,
} from "./types";

const API_BASE_URL = import.meta.env.VITE_API_URL as string;
const REQUEST_TIMEOUT = 10000; // 10 seconds

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const url = new URL(endpoint, API_BASE_URL).toString();
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        ...JSON_HEADERS,
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const message =
        errorData.message || `HTTP ${res.status}: ${res.statusText}`;
      throw new Error(`Erro na requisição para ${endpoint}: ${message}`);
    }

    return res.json() as Promise<T>;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(
        `Requisição para ${endpoint} excedeu o tempo limite de ${REQUEST_TIMEOUT / 1000} segundos`
      );
    }
    throw error instanceof Error
      ? new Error(`Erro na requisição para ${endpoint}: ${error.message}`)
      : new Error(`Erro desconhecido na requisição para ${endpoint}`);
  } finally {
    clearTimeout(timeoutId);
  }
}

// API Functions
export async function getStockTotals(): Promise<StockTotals> {
  return apiFetch<StockTotals>("/products/product-totals");
}

export async function getAllProducts(
  limit: number = 10,
  page: number = 1
): Promise<ProductResponse> {
  if (limit < 1 || page < 1) {
    throw new Error(
      "Parâmetros inválidos: limit e page devem ser maiores que 0"
    );
  }
  const params = new URLSearchParams({
    limit: String(limit),
    page: String(page),
  });
  return apiFetch<ProductResponse>(`/products?${params.toString()}`);
}

export async function getTopProducts(limit: number = 5): Promise<TopProduct[]> {
  if (limit < 1) {
    throw new Error("Parâmetro inválido: limit deve ser maior que 0");
  }
  const params = new URLSearchParams({ limit: String(limit) });
  return apiFetch<TopProduct[]>(`/products/top-products?${params.toString()}`);
}

export async function createProduct(product: {
  name: string;
  description?: string;
  stock: number;
  unitPrice: number;
  categoryId: number;
}): Promise<CreateProductResponse> {
  return apiFetch<CreateProductResponse>("/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
}

export async function getProductById(productId: number): Promise<Product> {
  if (productId < 1) {
    throw new Error("Parâmetro inválido: productId deve ser maior que 0");
  }
  return apiFetch<Product>(`/products/${productId}`);
}

export async function updateProduct(
  productId: number,
  updatedProduct: {
    id: number;
    name: string;
    description?: string;
    stock: number;
    unitPrice: number;
    categoryId: number;
  }
): Promise<ProductResponse> {
  if (productId < 1) {
    throw new Error("Parâmetro inválido: productId deve ser maior que 0");
  }
  return apiFetch<ProductResponse>(`/products/${productId}`, {
    method: "PUT",
    body: JSON.stringify(updatedProduct),
  });
}

export async function deleteProduct(productId: number): Promise<void> {
  if (productId < 1) {
    throw new Error("Parâmetro inválido: productId deve ser maior que 0");
  }
  return apiFetch<void>(`/products/${productId}`, {
    method: "DELETE",
  });
}

export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/categories");
}

export async function createStockMovement(movement: {
  productId: number;
  quantity: number;
  totalValue: number;
  type: "ENTRY" | "EXIT";
}): Promise<MovementsResponse> {
  if (movement.productId < 1 || movement.quantity < 0) {
    throw new Error(
      "Parâmetros inválidos: productId deve ser maior que 0 e quantity não pode ser negativo"
    );
  }
  return apiFetch<MovementsResponse>("/movements", {
    method: "POST",
    body: JSON.stringify(movement),
  });
}

export async function getMovements(
  productId?: number,
  startDate?: Date,
  endDate?: Date
): Promise<MovementsResponse> {
  const params = new URLSearchParams();

  if (productId !== undefined && productId !== null) {
    if (productId < 1) {
      throw new Error("Parâmetro inválido: productId deve ser maior que 0");
    }
    params.append("productId", String(productId));
  }

  if (startDate) {
    if (isNaN(startDate.getTime())) {
      throw new Error("Parâmetro inválido: startDate deve ser uma data válida");
    }
    params.append("startDate", startDate.toISOString());
  }

  if (endDate) {
    if (isNaN(endDate.getTime())) {
      throw new Error("Parâmetro inválido: endDate deve ser uma data válida");
    }
    params.append("endDate", endDate.toISOString());
  }

  return apiFetch<MovementsResponse>(`/movements?${params.toString()}`);
}
