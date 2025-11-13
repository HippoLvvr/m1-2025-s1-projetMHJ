import { useState } from 'react'
import axios from 'axios'
import type { AuthorListModel, CreateAuthorModel } from '../AuthorModel'
import { API_BASE_URL } from '../../api/config.ts'

// L'URL de votre API NestJS pour les auteurs
const API_URL = API_BASE_URL + '/authors'

export const useAuthorProvider = () => {
  // Typage explicite du useState
  const [authors, setAuthors] = useState<AuthorListModel[]>([])

  // Récupérer la liste de tous les auteurs
  const loadAuthors = () => {
    axios
      .get(API_URL)
      .then(response => {
        const authorsWithCount = response.data.map((author: any) => ({
          ...author,
          booksWrittenCount: author.books?.length || 0,
        }))
        setAuthors(authorsWithCount)
      })
      .catch(err => console.error('Erreur lors du chargement des auteurs:', err))
  }

  // Créer un nouvel auteur
  const createAuthor = (author: CreateAuthorModel) => {
    const { photo, ...rest } = author
    const authorPayload = { ...rest, photoUrl: photo }

    return axios
      .post(API_URL, authorPayload)
      .then(() => {
        loadAuthors()
      })
      .catch(err => {
        console.error("Erreur lors de la création de l'auteur:", err)
        throw err
      })
  }


  // Supprimer un auteur
  const deleteAuthor = (id: string) => {
    // L'ID est un 'string' (UUID) pour les auteurs
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        loadAuthors() // Recharge la liste après la suppression
      })
      .catch(err => console.error('Erreur lors de la suppression de l\'auteur:', err))
  }

  return { authors, loadAuthors, createAuthor, deleteAuthor }
}