import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  error = '';
  cargando = false;

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.error = '';
    this.cargando = true;
    const { nombre, email, telefono, password } = this.form.getRawValue();
    const result = this.auth.register(nombre!, email!, password!, telefono!);
    this.cargando = false;

    if (!result.ok) {
      this.error = result.message ?? 'No se pudo crear la cuenta.';
      return;
    }
    this.router.navigate(['/']);
  }
}
