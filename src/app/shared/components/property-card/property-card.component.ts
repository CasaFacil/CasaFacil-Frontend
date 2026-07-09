import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Property } from '../../../core/models/property.model';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './property-card.component.html',
})
export class PropertyCardComponent {
  @Input({ required: true }) property!: Property;

  get precioTexto(): string {
    const p = this.property;
    const formato = (n: number) =>
      n.toLocaleString('es-MX', { style: 'currency', currency: p.moneda, maximumFractionDigits: 0 });

    if (p.operacion === 'venta' && p.precioVenta) return formato(p.precioVenta);
    if (p.operacion === 'renta' && p.precioRenta) return `${formato(p.precioRenta)} / mes`;
    if (p.operacion === 'ambas') {
      const partes: string[] = [];
      if (p.precioVenta) partes.push(`Venta ${formato(p.precioVenta)}`);
      if (p.precioRenta) partes.push(`Renta ${formato(p.precioRenta)}/mes`);
      return partes.join(' · ');
    }
    return 'Precio a consultar';
  }

  get badgeClase(): string {
    switch (this.property.estatus) {
      case 'disponible':
        return 'bg-brand-100 text-brand-700';
      case 'reservado':
        return 'bg-sand-200 text-sand-800';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  }
}
