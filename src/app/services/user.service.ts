import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserData, UserResponse } from "../models/user.model";
import { BASE_URL } from "../shared/constants/constants";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'

})


export class UserService  {
  constructor(private httpClient: HttpClient) {}

    getAllUsers(
        limit: number = 10,
        offset: number = 0,
        substring: string = ''
      ): Observable<UserResponse> {
        return this.httpClient
          .get<UserResponse>(
            `${BASE_URL}/users`
          );
      }

      deleteUser(userId: string): Observable<{
        code: number;
        message: string;
      }> {
        return this.httpClient.delete<{
          code: number;
          message: string;
        }>(`${BASE_URL}/users/${userId}`);
      }
      addUser(user: any): Observable<any> {
        return this.httpClient.post<any>(`${BASE_URL}/users`, user);
      }
      getUser(userName: string): Observable<UserData> {
        return this.httpClient.get<UserData>(`${BASE_URL}/users/${userName}`)
      }
}
        