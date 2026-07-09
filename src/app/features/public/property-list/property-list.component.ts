import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../../core/services/property.service';
import { PropertyCardComponent } from '../../../shared/components/property-card/property-card.component';
import { Property, PropertyFilter } from '../../../core/models/property.model';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PropertyCardComponent],
  templateUrl: './property-list.component.html',
})
export class PropertyListComponent implements OnInit {
  filtro: PropertyFilter = { tipo: 'todos', operacion: 'todos' };
  resultados: Property[] = [];
  ciudades: string[] = [];

  constructor(private propertyService: PropertyService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.ciudades = this.propertyService.ciudadesDisponibles();
    const q = this.route.snapshot.queryParamMap.get('q');
    if (q) this.filtro.busqueda = q;
    this.aplicarFiltro();
  }

  aplicarFiltro(): void {
    this.resultados = this.propertyService.filter(this.filtro);
  }

  limpiarFiltro(): void {
    this.filtro = { tipo: 'todos', operacion: 'todos' };
    this.aplicarFiltro();
  }
}
