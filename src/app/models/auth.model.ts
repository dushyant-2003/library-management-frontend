export type LoginResponse  = {
    status: string;
    message: string;
    data: {
      jwtToken: string;
      username: string;
    };
  }