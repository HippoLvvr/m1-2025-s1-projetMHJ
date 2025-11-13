import { createFileRoute, Outlet } from '@tanstack/react-router'
export const Route = createFileRoute('/clients')({
  component: ClientsLayout,
})

function ClientsLayout() {
  return (
    <div>
      {/* Les pages /clients/ (liste) et /clients/$clientId (détail) 
          s'afficheront ici, à l'intérieur du <Outlet /> */}
      <Outlet />
    </div>
  )
}