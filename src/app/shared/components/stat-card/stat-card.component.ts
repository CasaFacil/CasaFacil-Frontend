import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  template: `
    <div class="card p-5 flex items-center gap-4">
      <div class="w-11 h-11 rounded-xl bg-brand-100 text-brand-700 grid place-items-center text-xl">
        {{ icono }}
      </div>
      <div>
        <p class="text-2xl font-display font-semibold text-brand-950">{{ valor }}</p>
        <p class="text-sm text-brand-600">{{ etiqueta }}</p>
      </div>
    </div>
  `,
})
export class StatCardComponent {
  @Input() icono = '🏠';
  @Input() valor: string | number = 0;
  @Input() etiqueta = '';
}
