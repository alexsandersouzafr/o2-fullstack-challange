import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/edit-product')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/edit-product"!</div>
}
