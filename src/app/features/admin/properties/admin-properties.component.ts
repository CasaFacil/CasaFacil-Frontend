import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PropertyService } from '../../../core/services/property.service';

@Component({
  selector: 'app-admin-properties',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-properties.component.html',
})
export class AdminPropertiesComponent {
  constructor(public propertyService: PropertyService) {}

  eliminar(id: number, titulo: string): void {
    if (confirm(`¿Eliminar la propiedad "${titulo}"? Esta acción no se puede deshacer.`)) {
      this.propertyService.delete(id);
    }
  }

  cambiarEstatus(id: number, estatus: string): void {
    this.propertyService.update(id, { estatus: estatus as any });
  }
}
