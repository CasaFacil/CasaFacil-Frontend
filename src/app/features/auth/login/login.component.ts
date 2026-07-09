import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  error = '';
  cargando = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  cuentasDemo = [
    { rol: 'Admin', email: 'admin@casafacil.com', password: 'admin123' },
    { rol: 'Agente', email: 'agente@casafacil.com', password: 'agente123' },
    { rol: 'Cliente', email: 'cliente@casafacil.com', password: 'cliente123' },
  ];

  constructor(private auth: AuthService, private router: Router) {}

  usarCuentaDemo(email: string, password: string): void {
    this.form.setValue({ email, password });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.error = '';
    this.cargando = true;
    const { email, password } = this.form.getRawValue();
    const result = this.auth.login(email!, password!);
    this.cargando = false;

    if (!result.ok) {
      this.error = result.message ?? 'No se pudo iniciar sesión.';
      return;
    }

    if (this.auth.hasRole('admin', 'agente')) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
