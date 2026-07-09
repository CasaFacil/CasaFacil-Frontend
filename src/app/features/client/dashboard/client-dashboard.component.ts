import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TransactionService } from '../../../core/services/transaction.service';
import { Transaction } from '../../../core/models/transaction.model';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './client-dashboard.component.html',
})
export class ClientDashboardComponent implements OnInit {
  transacciones: Transaction[] = [];

  constructor(private auth: AuthService, private transactionService: TransactionService) {}

  ngOnInit(): void {
    const usuario = this.auth.currentUser();
    if (usuario) {
      this.transacciones = this.transactionService.forUser(usuario.id);
    }
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
