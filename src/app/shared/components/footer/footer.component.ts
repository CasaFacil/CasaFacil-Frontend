import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-brand-950 text-sand-100 mt-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <span class="w-8 h-8 rounded-lg bg-sand-400 text-brand-950 grid place-items-center font-display font-bold">C</span>
            <span class="font-display text-lg font-semibold text-white">CasaFácil</span>
          </div>
          <p class="text-sm text-sand-200/80">
            Plataforma inmobiliaria para cotizar, comprar y rentar propiedades de forma simple y transparente.
          </p>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-white mb-3">Contacto</h3>
          <ul class="text-sm text-sand-200/80 space-y-1">
            <li>Xalapa de Enríquez, Veracruz</li>
            <li>contacto&#64;casafacil.com</li>
            <li>228 000 0000</li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-white mb-3">CasaFácil</h3>
          <p class="text-sm text-sand-200/80">&copy; {{ anio }} CasaFácil. Proyecto demo de portafolio.</p>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  anio = new Date().getFullYear();
}
