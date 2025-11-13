import { useState } from 'react'
import type { BookModel } from '../BookModel'
import { API_BASE_URL } from '../../api/config.ts'

const API_URL = API_BASE_URL + '/books'

export const useBookDetailsProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [book, setBook] = useState<BookModel | null>(null)

  const loadBook = async () => {
    setIsLoading(true)
    try {
      const [bookRes, salesRes] = await Promise.all([
        fetch(`${API_URL}/${id}`),
        fetch(`${API_BASE_URL}/sales/book/${id}/clients`)
      ])

      const [bookData, purchasersData] = await Promise.all([
        bookRes.json(),
        salesRes.json()
      ])

      setBook({
        ...bookData,
        purchasers: purchasersData
      })
    } catch (error) {
      console.error('Erreur lors du chargement du livre :', error)
    } finally {
      setIsLoading(false)
    }
  }


  return { isLoading, book, loadBook }
}
