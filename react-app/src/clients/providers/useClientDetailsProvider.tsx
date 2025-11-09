import { useState } from 'react'
import axios from 'axios'
import type { ClientDetailsModel } from '../ClientModel'

const API_URL = 'http://localhost:3000/clients'

// Ce hook prend l'ID en argument, tout comme votre useBookDetailsProvider
export const useClientDetailsProvider = (clientId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [client, setClient] = useState<ClientDetailsModel | null>(null)

  // La fonction loadClient est exportée, pour être appelée par le composant
  const loadClient = () => {
    setIsLoading(true)
    axios
      .get(`${API_URL}/${clientId}`) // Utilise l'ID
      .then(response => {
        setClient(response.data)
      })
      .catch(err => {
        console.error(`Erreur lors du chargement du client ${clientId}:`, err)
        setClient(null)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // Il n'y a PAS de useEffect ici, pour suivre votre pattern
  
  return { isLoading, client, loadClient }
}