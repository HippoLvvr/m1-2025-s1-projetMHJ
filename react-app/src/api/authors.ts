import { API_BASE_URL } from './config';
import type {
  Author,
  AuthorListItem,
  AuthorDetails,
  AuthorCreateInput,
  AuthorUpdateInput,
} from '../types/models';

// Définit le point de terminaison de base pour ce module
const ENDPOINT: string = `${API_BASE_URL}/authors`;


export const getAuthors = async (): Promise<AuthorListItem[]> => {
  const response = await fetch(ENDPOINT);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des auteurs');
  }
  return response.json();
};


export const getAuthorById = async (id: string): Promise<AuthorDetails> => {
  const response = await fetch(`${ENDPOINT}/${id}`);
  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération de l'auteur ${id}`);
  }
  return response.json();
};


export const createAuthor = async (data: AuthorCreateInput): Promise<Author> => {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la création de l'auteur");
  }
  return response.json();
};


export const updateAuthor = async (id: string, data: AuthorUpdateInput): Promise<Author> => {
  const response = await fetch(`${ENDPOINT}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Erreur lors de la mise à jour de l'auteur ${id}`);
  }
  return response.json();
};


export const deleteAuthor = async (id: string): Promise<void> => {
  const response = await fetch(`${ENDPOINT}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Erreur lors de la suppression de l'auteur ${id}`);
  }
};