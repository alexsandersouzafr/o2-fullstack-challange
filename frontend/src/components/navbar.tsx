import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="flex gap-4">
      <Button>Dashboard</Button>
      <Button>Produtos</Button>
      <Button>Movimentações</Button>
    </div>
  );
}
