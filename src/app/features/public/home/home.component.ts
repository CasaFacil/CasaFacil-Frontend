import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PropertyService } from '../../../core/services/property.service';
import { PropertyCardComponent } from '../../../shared/components/property-card/property-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PropertyCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  busqueda = '';

  constructor(public propertyService: PropertyService, private router: Router) {}

  buscar(): void {
    this.router.navigate(['/propiedades'], {
      queryParams: this.busqueda ? { q: this.busqueda } : {},
    });
  }
}
