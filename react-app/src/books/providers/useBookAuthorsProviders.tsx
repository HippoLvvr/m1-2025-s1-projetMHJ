import { useState } from 'react'
import type { BookModel } from '../BookModel'
import axios from 'axios'
import { API_BASE_URL } from '../../api/config.ts'

export const useBookAuthorsProviders = () => {
  const [authors, setAuthors] = useState<BookModel['author'][]>([])

  const loadAuthors = () => {
    axios
      .get(`${API_BASE_URL}/authors`)
      .then(data => {
        console.log(data)
        setAuthors(data.data)
      })
      .catch(err => console.error(err))
  }

  return { authors, loadAuthors }
}
