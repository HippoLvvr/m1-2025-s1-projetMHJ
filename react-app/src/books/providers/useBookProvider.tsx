import { useState } from 'react'
import type { BookModel, CreateBookModel, UpdateBookModel } from '../BookModel'
import axios from 'axios'
import { API_BASE_URL } from '../../api/config.ts'

const API_URL = API_BASE_URL + '/books'

export const useBookProvider = () => {
  const [books, setBooks] = useState<BookModel[]>([])

  const loadBooks = (params: { limit?: number; offset?: number; search?: string } = {}) => {
    const {
      limit = 5,
      offset = 0,
      search = '',
    } = params

    const queryParams = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
      ...(search ? { search } : {}),
    })

    axios
      .get(`${API_URL}?${queryParams}`)
      .then(res => {
        setBooks(res.data.data)
      })
      .catch(err => console.error(err))
  }

  const createBook = (book: CreateBookModel) => {
    axios
      .post(API_URL, book)
      .then(() => {
        loadBooks()
      })
      .catch(err => console.error(err))
  }

  const updateBook = (id: string, input: UpdateBookModel) => {
    axios
      .patch(`${API_URL}/${id}`, input)
      .then(() => {
        loadBooks()
      })
      .catch(err => console.error(err))
  }

  const deleteBook = (id: string) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        loadBooks()
      })
      .catch(err => console.error(err))
  }

  return { books, loadBooks, createBook, updateBook, deleteBook }
}
