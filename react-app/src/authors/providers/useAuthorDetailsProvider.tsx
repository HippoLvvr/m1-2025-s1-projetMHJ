import { useState } from 'react'
import axios from 'axios'
import type { AuthorDetailsModel } from '../AuthorModel'

const API_URL = 'http://localhost:3000/authors'

// Ce hook prend l'ID (string) en argument
export const useAuthorDetailsProvider = (authorId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [author, setAuthor] = useState<AuthorDetailsModel | null>(null)

  // La fonction loadAuthor est exportée, pour être appelée par le composant
  const loadAuthor = () => {
    setIsLoading(true)
    axios
      .get(`${API_URL}/${authorId}`) // Utilise l'ID de l'auteur
      .then(response => {
        setAuthor(response.data)
      })
      .catch(err => {
        console.error(`Erreur lors du chargement de l'auteur ${authorId}:`, err)
        setAuthor(null) // Met à null si l'auteur n'est pas trouvé
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // Pas de useEffect ici, il sera dans la page (comme pour vos livres)
  
  return { isLoading, author, loadAuthor }
}