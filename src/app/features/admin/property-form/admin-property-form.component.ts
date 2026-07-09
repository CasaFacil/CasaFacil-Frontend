import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PropertyService } from '../../../core/services/property.service';

@Component({
  selector: 'app-admin-property-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-property-form.component.html',
})
export class AdminPropertyFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  esEdicion = false;
  propertyId?: number;

  form = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    tipo: ['casa', Validators.required],
    operacion: ['venta', Validators.required],
    precioVenta: [null as number | null],
    precioRenta: [null as number | null],
    ciudad: ['', Validators.required],
    colonia: ['', Validators.required],
    direccion: ['', Validators.required],
    recamaras: [1, [Validators.required, Validators.min(0)]],
    banos: [1, [Validators.required, Validators.min(0)]],
    estacionamientos: [1, [Validators.required, Validators.min(0)]],
    superficieM2: [0, [Validators.required, Validators.min(1)]],
    construccionM2: [0, [Validators.required, Validators.min(0)]],
    destacado: [false],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.esEdicion = true;
      this.propertyId = Number(idParam);
      const property = this.propertyService.getById(this.propertyId);
      if (property) {
        this.form.patchValue(property);
      }
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const data = this.form.getRawValue();
    const payload = {
      ...data,
      moneda: 'MXN' as const,
      amenidades: [] as string[],
      imagenPrincipal: `https://picsum.photos/seed/prop-${Date.now()}/900/600`,
      imagenes: [`https://picsum.photos/seed/prop-${Date.now()}-2/900/600`],
      estatus: 'disponible' as const,
      agenteId: 1,
    };

    if (this.esEdicion && this.propertyId) {
      this.propertyService.update(this.propertyId, payload as any);
    } else {
      this.propertyService.create(payload as any);
    }
    this.router.navigate(['/admin/propiedades']);
  }
}
