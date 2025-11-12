import { useState } from 'react'
import type { BookModel } from '../BookModel'
import { API_BASE_URL } from '../../api/config.ts'

const API_URL = API_BASE_URL + '/books'

export const useBookDetailsProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [book, setBook] = useState<BookModel | null>(null)

  const loadBook = () => {
    setIsLoading(true)
    fetch(`${API_URL}/${id}`)
      .then(response => response.json())
      .then(data => setBook(data))
      .finally(() => setIsLoading(false))
  }

  return { isLoading, book, loadBook }
}
