export type User =  {
    userId: string;
    name: string;
    userName: string;
    role: string;
    gender: string;
    dateOfBirth: string; 
    department: string;
    designation: string;
    contactNumber: string;
    email: string;
    address: string;
    bookIssueLimit: number;
    fine: number; 
  }
  
  export type UserResponse =  {
    status: string;
    message: string;
    data: User[];
  }

export type UserData = {
  status: string;
  message: string;
  data: User
}
  