// User domain entity — represents an authenticated user in the system
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'ADMIN' | 'USER';
  createdAt: Date;
  updatedAt: Date;
}
