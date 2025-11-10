// Type pour un livre (simplifié, pour la page détail auteur)
export type BookForAuthor = {
  id: string
  title: string
  yearPublished: number
  photo?: string
}

// Type pour la liste des auteurs
export type AuthorListModel = {
  id: string // Le backend utilise un UUID 'string'
  firstName: string
  lastName: string
  photo?: string // Le PDF demande une photo
  
  // Donnée agrégée requise par le PDF
  booksWrittenCount: number 
}

// Type pour les détails d'un auteur
export type AuthorDetailsModel = {
  id: string
  firstName: string
  lastName: string
  photo?: string
  books: BookForAuthor[] // Liste des livres écrits
  averageSales: number // Nombre moyen de ventes
}

// Type pour le formulaire de création
export type CreateAuthorModel = {
  firstName: string
  lastName: string
  photo?: string // Assurez-vous que le backend l'accepte (sinon, retirez-le)
}

// Type pour l'édition
export type UpdateAuthorModel = Partial<CreateAuthorModel>