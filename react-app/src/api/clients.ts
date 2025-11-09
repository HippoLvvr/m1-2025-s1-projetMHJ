import { API_BASE_URL } from './config';
import type {
  Client,
  ClientListItem,
  ClientDetails,
  ClientCreateInput,
  ClientUpdateInput,
} from '../types/models';

// Définit le point de terminaison de base pour ce module
const ENDPOINT: string = `${API_BASE_URL}/clients`;


export const getClients = async (): Promise<ClientListItem[]> => {
  const response = await fetch(ENDPOINT);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des clients');
  }
  return response.json();
};


export const getClientById = async (id: string): Promise<ClientDetails> => {
  const response = await fetch(`${ENDPOINT}/${id}`);
  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération du client ${id}`);
  }
  return response.json();
};


export const createClient = async (data: ClientCreateInput): Promise<Client> => {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Erreur lors de la création du client');
  }
  return response.json();
};


export const updateClient = async (id: string, data: ClientUpdateInput): Promise<Client> => {
  const response = await fetch(`${ENDPOINT}/${id}`, {
    method: 'PATCH', // ou 'PUT' à voir avec Hippolyte
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Erreur lors de la mise à jour du client ${id}`);
  }
  return response.json();
};


export const deleteClient = async (id: string): Promise<void> => {
  const response = await fetch(`${ENDPOINT}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Erreur lors de la suppression du client ${id}`);
  }
  
};