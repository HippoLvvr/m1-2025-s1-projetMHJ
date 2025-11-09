export type ClientListModel = {
  id: number 
  firstName: string
  lastName: string
  email?: string
  photoUrl?: string
  booksPurchasedCount: number 
}

// Ce type sera utilisé pour la page de détail
export type ClientDetailsModel = {
  id: number
  firstName: string
  lastName: string
  email?: string
  photoUrl?: string
  sales: Sale[] //
}

// Type pour une vente, nécessaire pour la page de détail
export type Sale = {
  id: number
  date: string // date de l'achat
  book: {
    id: string
    title: string
    author: { 
      id: string
      firstName: string
      lastName: string
    }
  }
}

// Ce type sera utilisé pour le formulaire de création
// Il correspond au DTO du backend
export type CreateClientModel = {
  firstName: string
  lastName: string
  email?: string
  photoUrl?: string
}

// Ce type sera utilisé pour l'édition
export type UpdateClientModel = Partial<CreateClientModel>