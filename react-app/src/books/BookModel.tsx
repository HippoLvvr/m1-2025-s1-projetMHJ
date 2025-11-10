export type AuthorModel = {
  id: string
  firstName: string
  lastName: string
}

export type BookModel = {
  id: string
  title: string
  yearPublished: number
  author: AuthorModel
  photo?: string 
}

export type CreateBookModel = {
  authorId: string
  title: string
  yearPublished: number
  photo?: string 
}

export type UpdateBookModel = Partial<CreateBookModel>


type Purchaser = {
  id: number // ID du client
  firstName: string
  lastName: string
  purchaseDate: string // La date d'achat de CE livre
}

export interface BookDetailsModel extends BookModel {
  purchasers: Purchaser[] 
}

export interface BookListModel extends BookModel {
  purchasersCount: number
}


export type CreateSaleModel = {
  clientId: number 
  date: string // La date de l'achat (format ISO)
}