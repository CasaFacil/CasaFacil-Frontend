import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

const SEED_USERS: User[] = [
  {
    id: 1,
    nombre: 'Ana Martínez',
    email: 'admin@casafacil.com',
    password: 'admin123',
    telefono: '2281234567',
    role: 'admin',
    activo: true,
    fechaRegistro: '2024-01-10',
  },
  {
    id: 2,
    nombre: 'Luis Herrera',
    email: 'agente@casafacil.com',
    password: 'agente123',
    telefono: '2287654321',
    role: 'agente',
    activo: true,
    fechaRegistro: '2024-02-15',
  },
  {
    id: 3,
    nombre: 'Sofía Reyes',
    email: 'cliente@casafacil.com',
    password: 'cliente123',
    telefono: '2289988776',
    role: 'cliente',
    activo: true,
    fechaRegistro: '2024-03-20',
  },
];

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly usersSignal = signal<User[]>([...SEED_USERS]);
  readonly users = this.usersSignal.asReadonly();

  private nextId = SEED_USERS.length + 1;

  findByCredentials(email: string, password: string): User | undefined {
    return this.usersSignal().find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
  }

  findByEmail(email: string): User | undefined {
    return this.usersSignal().find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  create(data: Omit<User, 'id' | 'fechaRegistro'>): User {
    const user: User = {
      ...data,
      id: this.nextId++,
      fechaRegistro: new Date().toISOString().slice(0, 10),
    };
    this.usersSignal.update((list) => [...list, user]);
    return user;
  }

  toggleActivo(id: number): void {
    this.usersSignal.update((list) =>
      list.map((u) => (u.id === id ? { ...u, activo: !u.activo } : u))
    );
  }

  updateRole(id: number, role: User['role']): void {
    this.usersSignal.update((list) => list.map((u) => (u.id === id ? { ...u, role } : u)));
  }

  delete(id: number): void {
    this.usersSignal.update((list) => list.filter((u) => u.id !== id));
  }
}
