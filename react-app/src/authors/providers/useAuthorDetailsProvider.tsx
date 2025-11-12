import { useState } from 'react'
import axios from 'axios'
import type { AuthorDetailsModel } from '../AuthorModel'
import { API_BASE_URL } from '../../api/config.ts'

const API_URL = API_BASE_URL + '/authors'

// Ce hook prend l'ID (string) en argument
import { useCallback } from 'react'

export const useAuthorDetailsProvider = (authorId: string) => {
  const [isLoading, setIsLoading] = useState(true)
  const [author, setAuthor] = useState<AuthorDetailsModel | null>(null)

  const loadAuthor = useCallback(async () => {
    try {
      setIsLoading(true)
      const [authorRes, booksRes] = await Promise.all([
        axios.get(`${API_URL}/${authorId}`),
        axios.get(`${API_BASE_URL}/books/author/${authorId}`),
      ])
      setAuthor({ ...authorRes.data, books: booksRes.data })
    } catch (err) {
      console.error(`Erreur lors du chargement de l'auteur ${authorId}:`, err)
      setAuthor(null)
    } finally {
      setIsLoading(false)
    }
  }, [authorId]) // dépend seulement de authorId

  return { isLoading, author, loadAuthor }
}

