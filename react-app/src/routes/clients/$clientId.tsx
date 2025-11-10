import { createFileRoute } from '@tanstack/react-router'
import { ClientDetailPage } from '../../clients/pages/ClientDetailPage'

export const Route = createFileRoute('/clients/$clientId')({
  component: ClientDetailPage,
})


