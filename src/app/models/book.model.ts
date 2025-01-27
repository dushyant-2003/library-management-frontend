export type Book = {
    bookId: string,
    name: string,
    author: string,
    publication: string,
    edition: string,
    price: number,
    status: string
}

export type BookResponse = {
    status: string,
    message: string,
    data: Book[]
}
export type IssuedBookDetail =  {
    userId: string;
    userName: string;
    bookId: string;
    issuerName: string;
    email: string;
    bookName: string;
    author: string;
    price: number;
    issueDate: string; // Use `Date` if you're handling dates as objects
    deadline: string;  // Use `Date` if you're handling dates as objects
    fine: number;
  }
  
  export type IssuedBookDetailResponse =  {
    status: string,
    message: string,
    data: IssuedBookDetail[]
  }
  export type bookReturn = {
    bookId: string,
    userId: string,
    bookLostStatus: boolean
  }
  export type bookIssue = {
    bookId: string,
    userId: string
  }