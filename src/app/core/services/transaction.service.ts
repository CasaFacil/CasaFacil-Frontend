import { Injectable, signal } from '@angular/core';
import { Transaction, TransactionStatus, TransactionType } from '../models/transaction.model';

const SEED_TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    propertyId: 2,
    propertyTitulo: 'Departamento con vista en Zona Universitaria',
    userId: 3,
    userNombre: 'Sofía Reyes',
    tipo: 'renta',
    estatus: 'en_proceso',
    mensaje: 'Me interesa rentar a partir de agosto.',
    fechaCreacion: '2026-06-20',
    fechaVisita: '2026-06-25',
  },
  {
    id: 2,
    propertyId: 1,
    propertyTitulo: 'Casa moderna en Xalapa Centro',
    userId: 3,
    userNombre: 'Sofía Reyes',
    tipo: 'cotizacion',
    estatus: 'pendiente',
    mensaje: '¿Aceptan crédito Infonavit?',
    fechaCreacion: '2026-06-28',
  },
];

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly transactionsSignal = signal<Transaction[]>([...SEED_TRANSACTIONS]);
  readonly transactions = this.transactionsSignal.asReadonly();

  private nextId = SEED_TRANSACTIONS.length + 1;

  forUser(userId: number): Transaction[] {
    return this.transactionsSignal().filter((t) => t.userId === userId);
  }

  create(data: {
    propertyId: number;
    propertyTitulo: string;
    userId: number;
    userNombre: string;
    tipo: TransactionType;
    mensaje?: string;
    montoOfrecido?: number;
    fechaVisita?: string;
  }): Transaction {
    const transaction: Transaction = {
      ...data,
      id: this.nextId++,
      estatus: 'pendiente',
      fechaCreacion: new Date().toISOString().slice(0, 10),
    };
    this.transactionsSignal.update((list) => [transaction, ...list]);
    return transaction;
  }

  updateEstatus(id: number, estatus: TransactionStatus): void {
    this.transactionsSignal.update((list) =>
      list.map((t) => (t.id === id ? { ...t, estatus } : t))
    );
  }
}
