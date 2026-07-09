import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PropertyService } from '../../../core/services/property.service';
import { UserService } from '../../../core/services/user.service';
import { TransactionService } from '../../../core/services/transaction.service';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, StatCardComponent],
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent {
  constructor(
    public propertyService: PropertyService,
    public userService: UserService,
    public transactionService: TransactionService
  ) {}

  get disponibles(): number {
    return this.propertyService.properties().filter((p) => p.estatus === 'disponible').length;
  }

  get pendientes(): number {
    return this.transactionService.transactions().filter((t) => t.estatus === 'pendiente').length;
  }

  get ultimasSolicitudes() {
    return this.transactionService.transactions().slice(0, 5);
  }
}
