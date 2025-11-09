import { createFileRoute, Outlet } from '@tanstack/react-router'

// Route "Layout" pour la section /authors
export const Route = createFileRoute('/authors')({
  component: () => <Outlet />,
})