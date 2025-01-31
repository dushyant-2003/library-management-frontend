// import { fakeAsync, TestBed, tick } from "@angular/core/testing"
// import { User, UserData, UserResponse } from "../../models/user.model"
// import { AuthService } from "./auth.service"


// import {
//     HttpClientTestingModule,
//     HttpTestingController,
//   } from '@angular/common/http/testing';
// import { inject } from "@angular/core";
// import { LoginResponse } from "../../models/auth.model";

// describe('AuthService',()=>{
//     let authService: AuthService
//     let httpTestingController: HttpTestingController

//     const testUser: User = {
//         "userId": "U8bb6b48",
//         "name": "Shailesh",
//         "userName": "Shailesh123",
//         "role": "ISSUER",
//         "gender": "MALE",
//         "dateOfBirth": "2003-01-04",
//         "department": "CSE",
//         "designation": "Student",
//         "contactNumber": "9922000220",
//         "email": "shailesh432004@gmail.com",
//         "address": "Sirohi",
//         "bookIssueLimit": 3,
//         "fine": 0.00
//     }
//     const testUserResponse: UserData = {
//         status: "SUCCESS",
//         message: 'User retreived successfully',
//         data: testUser,
//       };
//     const testToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6IkR1c2h5YW50MTIzIiwiaWF0IjoxNzM4MDU1OTYxLCJleHAiOjE3MzgwODQ3NjF9.vmiUyagM6MwBwil2ZJQgUraCxqcxCuDyK6xZ9cvmK5c'

//     beforeEach(()=>{
//         TestBed.configureTestingModule({
//             imports:[HttpClientTestingModule, HttpTestingController]
//         })
//         httpTestingController = inject(HttpTestingController)
//     })
//     it('should successfully login with valid credentials',(done)=>{
//         const mockResponse : LoginResponse = {
//             "status": "SUCCESS",
//             "message": "User logged in successfully",
//             "data": {
//                 "jwtToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6IkR1c2h5YW50MTIzIiwiaWF0IjoxNzM4MDM2NTAwLCJleHAiOjE3MzgwNjUzMDB9.DMl8R1mPUvhR_Mj6SF76a4HabBP7MB2qeusLqyqdc6M",
//                 "username": ""
//             }
//         }
//     const testEmail = 'test@example.com';
//     const testPassword = 'password123';

//     authService = TestBed.inject(AuthService);

//     authService.login(testEmail, testPassword).subscribe({
//       next: (response) => {
//         expect(response).toEqual(mockResponse);
//         done();
//       },
//     });

//     const req = httpTestingController.expectOne(`${BASE_URL}/auth/login`);
//     expect(req.request.method).toBe('POST');
//     expect(req.request.body).toEqual({
//       email: testEmail,
//       password: testPassword,
//     });
//     req.flush(mockResponse);
//     })
// })