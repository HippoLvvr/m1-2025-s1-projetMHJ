import { createFileRoute } from '@tanstack/react-router'
import { AuthorDetailPage } from '../../authors/pages/AuthorDetailPage' // Ce fichier n'existe pas encore

export const Route = createFileRoute('/authors/$authorId')({
  component: AuthorDetailPage,
})