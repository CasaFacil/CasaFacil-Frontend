import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PropertyService } from '../../../core/services/property.service';
import { TransactionService } from '../../../core/services/transaction.service';
import { AuthService } from '../../../core/services/auth.service';
import { Property } from '../../../core/models/property.model';
import { TransactionType } from '../../../core/models/transaction.model';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './property-detail.component.html',
})
export class PropertyDetailComponent implements OnInit {
  private fb = inject(FormBuilder);
  property?: Property;
  imagenActiva = '';
  accionSeleccionada: TransactionType | null = null;
  enviado = false;

  form = this.fb.group({
    tipo: ['cotizacion' as TransactionType, Validators.required],
    mensaje: ['', Validators.required],
    montoOfrecido: [null as number | null],
    fechaVisita: [''],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
    private transactionService: TransactionService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.property = this.propertyService.getById(id);
    if (this.property) this.imagenActiva = this.property.imagenPrincipal;
  }

  seleccionarAccion(tipo: TransactionType): void {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.accionSeleccionada = tipo;
    this.enviado = false;
    this.form.patchValue({ tipo });
  }

  enviarSolicitud(): void {
    if (this.form.invalid || !this.property) {
      this.form.markAllAsTouched();
      return;
    }
    const usuario = this.auth.currentUser();
    if (!usuario) return;

    const { tipo, mensaje, montoOfrecido, fechaVisita } = this.form.getRawValue();

    this.transactionService.create({
      propertyId: this.property.id,
      propertyTitulo: this.property.titulo,
      userId: usuario.id,
      userNombre: usuario.nombre,
      tipo: tipo!,
      mensaje: mensaje ?? undefined,
      montoOfrecido: montoOfrecido ?? undefined,
      fechaVisita: fechaVisita || undefined,
    });

    this.enviado = true;
  }

  formato(n?: number, moneda: 'MXN' | 'USD' = 'MXN'): string {
    if (!n) return '';
    return n.toLocaleString('es-MX', { style: 'currency', currency: moneda, maximumFractionDigits: 0 });
  }
}
