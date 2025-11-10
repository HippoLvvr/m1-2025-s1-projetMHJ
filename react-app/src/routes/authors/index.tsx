import { createFileRoute } from '@tanstack/react-router'
import { AuthorListPage } from '../../authors/pages/AuthorListPage' // Ce fichier n'existe pas encore

export const Route = createFileRoute('/authors/')({
  component: AuthorListPage,
})