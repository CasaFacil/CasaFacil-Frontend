export type UserRole = 'admin' | 'agente' | 'cliente';

export interface User {
  id: number;
  nombre: string;
  email: string;
  password: string;
  telefono: string;
  role: UserRole;
  activo: boolean;
  fechaRegistro: string;
  avatarUrl?: string;
}

export interface AuthSession {
  user: Omit<User, 'password'>;
  token: string;
}
