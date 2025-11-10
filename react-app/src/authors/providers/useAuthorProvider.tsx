import { useState } from 'react'
import axios from 'axios'
import type { AuthorListModel, CreateAuthorModel } from '../AuthorModel'

// L'URL de votre API NestJS pour les auteurs
const API_URL = 'http://localhost:3000/authors'

export const useAuthorProvider = () => {
  // Typage explicite du useState
  const [authors, setAuthors] = useState<AuthorListModel[]>([])

  // Récupérer la liste de tous les auteurs
  const loadAuthors = () => {
    axios
      .get(API_URL)
      .then(response => {
        // Le backend renvoie les auteurs avec la relation 'books'
        // Nous pouvons calculer le 'booksWrittenCount' ici
        const authorsWithCount = response.data.map((author: any) => ({
          ...author,
          // Le PDF demande le nombre de livres écrits
          booksWrittenCount: author.books?.length || 0,
        }))
        setAuthors(authorsWithCount)
      })
      .catch(err => console.error('Erreur lors du chargement des auteurs:', err))
  }

  // Créer un nouvel auteur
  const createAuthor = (author: CreateAuthorModel) => {
    return axios // On retourne la promesse pour la modale
      .post(API_URL, author)
      .then(() => {
        loadAuthors() // Recharge la liste après la création
      })
      .catch(err => {
        console.error('Erreur lors de la création de l\'auteur:', err)
        throw err // Renvoie l'erreur pour la modale
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