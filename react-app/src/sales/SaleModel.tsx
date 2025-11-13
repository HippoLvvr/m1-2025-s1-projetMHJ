// Pour l'affichage (GET)
export type SaleListModel = {
  id: number
  date: string
  clientId: number
  bookId: string
}

// Pour la création (POST)
export interface CreateSaleModel {
  clientId: number
  bookId: string
  date: string // Format YYYY-MM-DD
}



