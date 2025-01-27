import { Injectable } from "@angular/core";
import { Observable, ObservableLike } from "rxjs";
import { UserResponse } from "../models/user.model";
import { BASE_URL } from "../shared/constants/constants";
import { HttpClient } from "@angular/common/http";
import { Book, bookIssue, BookResponse, IssuedBookDetail, IssuedBookDetailResponse } from "../models/book.model";
import { bookReturn } from "../models/book.model";
@Injectable({
  providedIn: 'root'

})


export class BookService  {
  constructor(private httpClient: HttpClient) {}

  addBook(book: any): Observable<any> {
    return this.httpClient.post<any>(`${BASE_URL}/books`, book);
  }
    getAllBooks(): Observable<BookResponse> {
        return this.httpClient
          .get<BookResponse>(
            `${BASE_URL}/books`
          );
      }
    deleteUser(bookId: string): Observable<{
        code: number;
        message: string;
      }> {
        return this.httpClient.delete<{
          code: number;
          message: string;
        }>(`${BASE_URL}/books/${bookId}`);
      }
      getBookDetail(bookId: string): Observable<IssuedBookDetailResponse> {
        return this.httpClient
        .get<IssuedBookDetailResponse>(
          `${BASE_URL}/books/${bookId}`
        );
      }

      returnBook(book: bookReturn): Observable<any> {
        return this.httpClient.post<any>(`${BASE_URL}/books/return`,book)
      }
      issueBook(book: bookIssue): Observable<any> {
        return this.httpClient.post<any>(`${BASE_URL}/books/issue`,book)
      }
      getIssuedBookDetails(userName: string) : Observable<any> {
        return this.httpClient.get<any>(`${BASE_URL}/users/${userName}/issued-books`)
      }
}
        