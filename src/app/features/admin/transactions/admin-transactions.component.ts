import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../../core/services/transaction.service';
import { TransactionStatus } from '../../../core/models/transaction.model';

@Component({
  selector: 'app-admin-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-transactions.component.html',
})
export class AdminTransactionsComponent {
  constructor(public transactionService: TransactionService) {}

  cambiarEstatus(id: number, estatus: TransactionStatus): void {
    this.transactionService.updateEstatus(id, estatus);
  }

  claseEstatus(estatus: string): string {
    switch (estatus) {
      case 'pendiente':
        return 'bg-sand-200 text-sand-800';
      case 'en_proceso':
        return 'bg-brand-100 text-brand-700';
      case 'aprobada':
      case 'completada':
        return 'bg-emerald-100 text-emerald-700';
      case 'rechazada':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
}
