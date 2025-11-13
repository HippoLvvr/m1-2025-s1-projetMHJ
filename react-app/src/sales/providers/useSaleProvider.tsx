import { useState, useCallback } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../api/config'
import type { SaleListModel, CreateSaleModel } from '../SaleModel'

const API_URL = `${API_BASE_URL}/sales`

export const useSaleProvider = () => {
  const [sales, setSales] = useState<SaleListModel[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadSales = useCallback(() => {
    setIsLoading(true)
    axios
      .get(API_URL)
      .then(response => {
        // Mapping pour correspondre au modèle simplifié (extraction des IDs)
        // On gère le cas où le back renverrait l'objet complet ou déjà l'ID
        const mappedSales: SaleListModel[] = response.data.map((item: any) => ({
          id: item.id,
          date: item.date,
          clientId: typeof item.client === 'object' ? item.client?.id : item.clientId,
          // Idem pour book
          bookId: typeof item.book === 'object' ? item.book?.id : item.bookId,
        }))
        setSales(mappedSales)
      })
      .catch(err => console.error('Erreur chargement ventes:', err))
      .finally(() => setIsLoading(false))
  }, [])

  const createSale = async (saleData: CreateSaleModel) => {
    try {
      await axios.post(API_URL, saleData)
      loadSales() // Rafraîchir la liste après création
    } catch (err) {
      console.error('Erreur création vente:', err)
      throw err
    }
  }

  return { sales, isLoading, loadSales, createSale }
}