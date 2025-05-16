import { useMatch } from "@tanstack/react-router";

export function useProductId(): number | null {
  const match = useMatch({
    strict: false,
  }) as { params: { id: number } };

  const id = match.params.id ? Number(match.params.id) : null;

  if (id !== null && (isNaN(id) || id <= 0)) {
    return null;
  }

  return id;
}
