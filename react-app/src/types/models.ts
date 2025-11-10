
export interface Author {
  id: string;
  name: string;
  photo: string; // Lien vers l'image
}


export interface Book {
  id: string;
  title: string;
  author: Author; 
  photo: string; // Lien vers l'image
  
}


export interface Client {
  id: string;
  nom: string;
  prenom: string;
  email?: string; // Facultatif
  photo?: string; // Facultatif (lien)
}


export interface Sale {
  id: string;
  book: Book;
  client: Client;
  date: string; // Date de l'achat (format ISO)
}

// Types DTO pour les formulaires

export type ClientCreateInput = Omit<Client, 'id'>;
export type ClientUpdateInput = Partial<ClientCreateInput>;

export type AuthorCreateInput = Omit<Author, 'id'>;
export type AuthorUpdateInput = Partial<AuthorCreateInput>;

export type BookUpdateInput = Partial<Omit<Book, 'id' | 'author'>> & {
  authorId?: string; // Pour l'édition, on enverra sûrement juste l'ID
};

export interface BookSaleInput {
  clientId: string;
  date: string; // La date choisie dans la modale
}

export interface ClientListItem extends Client {
  booksPurchasedCount: number;
}


export interface BookListItem extends Book {
  purchasersCount: number;
}


export interface AuthorListItem extends Author {
  booksWrittenCount: number;
}


export interface ClientDetails extends Client {
  purchases: Sale[]; // Liste des ventes (livre, auteur, date)
}


export interface BookDetails extends Book {
  purchasers: (Client & { purchaseDate: string })[];
}


export interface AuthorDetails extends Author {
  books: Book[];
  averageSales: number;
}