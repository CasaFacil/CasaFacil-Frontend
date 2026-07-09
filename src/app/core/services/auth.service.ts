import { Injectable, computed, signal } from '@angular/core';
import { User, UserRole } from '../models/user.model';
import { UserService } from './user.service';

const STORAGE_KEY = 'casafacil_session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly currentUserSignal = signal<User | null>(this.restoreSession());

  readonly currentUser = computed(() => this.currentUserSignal());
  readonly isAuthenticated = computed(() => this.currentUserSignal() !== null);
  readonly role = computed<UserRole | null>(() => this.currentUserSignal()?.role ?? null);

  constructor(private userService: UserService) {}

  private restoreSession(): User | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  }

  login(email: string, password: string): { ok: boolean; message?: string } {
    const user = this.userService.findByCredentials(email, password);
    if (!user) {
      return { ok: false, message: 'Correo o contraseña incorrectos.' };
    }
    if (!user.activo) {
      return { ok: false, message: 'Esta cuenta se encuentra desactivada.' };
    }
    this.currentUserSignal.set(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return { ok: true };
  }

  register(nombre: string, email: string, password: string, telefono: string): { ok: boolean; message?: string } {
    if (this.userService.findByEmail(email)) {
      return { ok: false, message: 'Ya existe una cuenta con ese correo.' };
    }
    const user = this.userService.create({
      nombre,
      email,
      password,
      telefono,
      role: 'cliente',
      activo: true,
    });
    this.currentUserSignal.set(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return { ok: true };
  }

  logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  hasRole(...roles: UserRole[]): boolean {
    const current = this.currentUserSignal();
    return !!current && roles.includes(current.role);
  }
}
