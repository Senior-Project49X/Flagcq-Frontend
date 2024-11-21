export interface DecodedToken {
    // Define the structure based on your JWT payload
    first_name: string; // Subject (user ID)
    last_name: string; // User's name
    AccType: string; // Expiration time
    faculty: string;
    student_id: number;
    iat: number
    exp: number
    points: string
  }