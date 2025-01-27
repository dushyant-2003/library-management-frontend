import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserData, UserResponse } from "../models/user.model";
import { BASE_URL } from "../shared/constants/constants";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'

})

export class NotificationService {
    constructor(private httpClient: HttpClient) {

    }
    sendNotification(data: any): Observable<any> {
        return this.httpClient.post<any>(`${BASE_URL}/notifications`, data);
      }
      readNotification(userName: string): Observable<any> {
        return this.httpClient.get<any>(`${BASE_URL}/users/${userName}/notifications`)
      }
}