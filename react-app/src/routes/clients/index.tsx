import { createFileRoute } from '@tanstack/react-router'
import { ClientListPage } from '../../clients/pages/ClientListPage'

export const Route = createFileRoute('/clients/')({
  component: ClientListPage,
})

