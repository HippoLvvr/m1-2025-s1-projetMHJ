import { useState } from 'react'
import axios from 'axios'
import type {
  ClientListModel,
  CreateClientModel,
  UpdateClientModel,
} from '../ClientModel'
import { API_BASE_URL } from '../../api/config.ts' // Le fichier que vous venez de créer

// L'URL de votre API NestJS pour les clients
const API_URL = API_BASE_URL + '/clients'

export const useClientProvider = () => {
  // Typage explicite du useState
  const [clients, setClients] = useState<ClientListModel[]>([])

  // Récupérer la liste de tous les clients
  const loadClients = () => {
    axios
      .get(API_URL)
      .then(response => {
        // Le backend renvoie les clients avec la relation 'sales'
        // Nous pouvons calculer le nombre de livres achetés ici, comme demandé
        const clientsWithCount = response.data.map((client: any) => ({
          ...client,
          // Le PDF demande le nombre de livres achetés
          booksPurchasedCount: client.sales?.length || 0,
        }))
        setClients(clientsWithCount)
      })
      .catch(err => console.error('Erreur lors du chargement des clients:', err))
  }

  // Créer un nouveau client
  const createClient = (client: CreateClientModel) => {
    axios
      .post(API_URL, client)
      .then(() => {
        loadClients() // Recharge la liste après la création
      })
      .catch(err => console.error('Erreur lors de la création du client:', err))
  }

  // Mettre à jour un client
  const updateClient = (id: number, input: UpdateClientModel) => {
    axios
      .put(`${API_URL}/${id}`, input)
      .then(() => {
        loadClients() // Recharge la liste après la mise à jour
      })
      .catch(err => console.error('Erreur lors de la mise à jour du client:', err))
  }

  // Supprimer un client
  const deleteClient = (id: number) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        loadClients() // Recharge la liste après la suppression
      })
      .catch(err => console.error('Erreur lors de la suppression du client:', err))
  }

  return { clients, loadClients, createClient, updateClient, deleteClient }
}