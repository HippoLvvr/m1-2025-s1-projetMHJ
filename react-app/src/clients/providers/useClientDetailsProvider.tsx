import { useState, useCallback } from 'react'
import axios from 'axios'
import type { ClientDetailsModel } from '../ClientModel'
import { API_BASE_URL } from '../../api/config.ts'

const API_URL = API_BASE_URL + '/clients'

export const useClientDetailsProvider = (clientId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [client, setClient] = useState<ClientDetailsModel | null>(null)

  const loadClient = useCallback(() => {
    setIsLoading(true)
    axios
      .get(`${API_URL}/${clientId}`)
      .then(response => {
        setClient(response.data)
      })
      .catch(err => {
        console.error(`Erreur lors du chargement du client ${clientId}:`, err)
        setClient(null)
      })
      .finally(() => {
        console.log('client loaded')
        setIsLoading(false)
      })
  }, [clientId])

  return { isLoading, client, loadClient }
}
