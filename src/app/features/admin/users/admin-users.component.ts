import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { UserRole } from '../../../core/models/user.model';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.component.html',
})
export class AdminUsersComponent {
  constructor(public userService: UserService) {}

  cambiarRol(id: number, role: UserRole): void {
    this.userService.updateRole(id, role);
  }

  alternarActivo(id: number): void {
    this.userService.toggleActivo(id);
  }
}
