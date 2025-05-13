import type { MovementsResponse, StockTotals } from "./types";

const API = import.meta.env.VITE_API_URL;

export async function getStockTotals(): Promise<StockTotals> {
  const res = await fetch(API + "/products/stock-totals");
  const data = await res.json();
  return data;
}

export async function getAllProducts() {
  const res = await fetch(API + "/products");
  const data = await res.json();
  return data;
}

export async function getTopProducts(limit: number) {
  const res = await fetch(API + "/products/top-products?limit=" + limit);
  if (!res.ok) {
    throw new Error("Erro ao recuperar lista de produtos.");
  }
  const data = await res.json();
  return data;
}

export async function createProduct(product: {
  name: string;
  description?: string;
  stock: number;
  unitPrice: number;
  categoryId: number;
}) {
  const res = await fetch(API + "/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
  const data = await res.json();
  return data;
}

export async function getProductById(productId: number) {
  const res = await fetch(API + "/products/" + productId);
  const data = await res.json();
  return data;
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
) {
  const res = await fetch(API + "/products/" + productId, {
    method: "PUT",
    body: JSON.stringify(updatedProduct),
  });
  const data = await res.json();
  return data;
}

export async function deleteProduct(productId: number) {
  const res = await fetch(API + "/products/" + productId, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
}

export async function getCategories() {
  const res = await fetch(API + "/categories/");
  const data = await res.json();
  return data;
}

export async function createStockMovement(movement: {
  productId: number;
  quantity: number;
  totalValue: number;
  type: "ENTRY" | "EXIT";
}) {
  const res = await fetch(API + "/movements/", {
    method: "POST",
    body: JSON.stringify(movement),
  });
  const data = await res.json();
  return data;
}

export async function getMovements(
  productId?: number | undefined,
  startDate?: Date,
  endDate?: Date
): Promise<MovementsResponse> {
  const params = new URLSearchParams();

  if (productId !== undefined && productId !== null) {
    params.append("productId", String(productId));
  }

  if (startDate) {
    params.append("startDate", new Date(startDate).toISOString());
  }

  if (endDate) {
    params.append("endDate", new Date(endDate).toISOString());
  }

  const res = await fetch(API + `/movements?` + params.toString());
  const data = await res.json();
  return data;
}
