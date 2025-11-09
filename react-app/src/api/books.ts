import { API_BASE_URL } from './config';
import type {
  Book,
  BookListItem,
  BookDetails,
  BookUpdateInput,
  BookSaleInput,
  Sale,
} from '../types/models';

// Définit le point de terminaison de base pour ce module
const ENDPOINT: string = `${API_BASE_URL}/books`;


export const getBooks = async (): Promise<BookListItem[]> => {
  const response = await fetch(ENDPOINT);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des livres');
  }
  return response.json();
};


export const getBookById = async (id: string): Promise<BookDetails> => {
  const response = await fetch(`${ENDPOINT}/${id}`);
  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération du livre ${id}`);
  }
  return response.json();
};


export const updateBook = async (id: string, data: BookUpdateInput): Promise<Book> => {
  const response = await fetch(`${ENDPOINT}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Erreur lors de la mise à jour du livre ${id}`);
  }
  return response.json();
};


export const deleteBook = async (id: string): Promise<void> => {
  const response = await fetch(`${ENDPOINT}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Erreur lors de la suppression du livre ${id}`);
  }
};


export const createBookSale = async (bookId: string, data: BookSaleInput): Promise<Sale> => {
  // L'URL peut être /sales ou /books/:id/sales, à ajuster selon le backend
  const response = await fetch(`${ENDPOINT}/${bookId}/sales`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de l'enregistrement de l'achat");
  }
  return response.json();
};