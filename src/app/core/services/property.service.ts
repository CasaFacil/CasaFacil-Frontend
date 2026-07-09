import { Injectable, computed, signal } from '@angular/core';
import { Property, PropertyFilter } from '../models/property.model';

function img(seed: string, i: number): string {
  return `https://picsum.photos/seed/${seed}-${i}/900/600`;
}

const SEED_PROPERTIES: Property[] = [
  {
    id: 1,
    titulo: 'Casa moderna en Xalapa Centro',
    descripcion:
      'Amplia casa de dos niveles con acabados contemporáneos, jardín privado y excelente ubicación cerca de zonas comerciales.',
    tipo: 'casa',
    operacion: 'ambas',
    precioVenta: 3200000,
    precioRenta: 18000,
    moneda: 'MXN',
    ciudad: 'Xalapa',
    colonia: 'Centro',
    direccion: 'Calle Revolución 145',
    recamaras: 3,
    banos: 2,
    estacionamientos: 2,
    superficieM2: 180,
    construccionM2: 210,
    amenidades: ['Jardín', 'Cisterna', 'Cuarto de servicio', 'Terraza'],
    imagenPrincipal: img('casa1', 0),
    imagenes: [img('casa1', 1), img('casa1', 2), img('casa1', 3)],
    estatus: 'disponible',
    destacado: true,
    fechaPublicacion: '2026-05-02',
    agenteId: 2,
  },
  {
    id: 2,
    titulo: 'Departamento con vista en Zona Universitaria',
    descripcion:
      'Departamento de una recámara ideal para estudiantes o jóvenes profesionistas, con seguridad 24 horas y áreas comunes.',
    tipo: 'departamento',
    operacion: 'renta',
    precioRenta: 7500,
    moneda: 'MXN',
    ciudad: 'Xalapa',
    colonia: 'Zona Universitaria',
    direccion: 'Av. Lázaro Cárdenas 88, Depto 4B',
    recamaras: 1,
    banos: 1,
    estacionamientos: 1,
    superficieM2: 55,
    construccionM2: 55,
    amenidades: ['Seguridad 24h', 'Elevador', 'Área de lavado'],
    imagenPrincipal: img('depa1', 0),
    imagenes: [img('depa1', 1), img('depa1', 2)],
    estatus: 'disponible',
    destacado: true,
    fechaPublicacion: '2026-06-10',
    agenteId: 2,
  },
  {
    id: 3,
    titulo: 'Residencia con alberca en Coatepec',
    descripcion:
      'Espectacular residencia campestre rodeada de naturaleza, con alberca, asador y amplios espacios para reuniones familiares.',
    tipo: 'casa',
    operacion: 'venta',
    precioVenta: 6800000,
    moneda: 'MXN',
    ciudad: 'Coatepec',
    colonia: 'Los Pinos',
    direccion: 'Camino Real a Xico Km 3',
    recamaras: 4,
    banos: 4,
    estacionamientos: 3,
    superficieM2: 500,
    construccionM2: 320,
    amenidades: ['Alberca', 'Asador', 'Jardín amplio', 'Bodega'],
    imagenPrincipal: img('casa2', 0),
    imagenes: [img('casa2', 1), img('casa2', 2), img('casa2', 3)],
    estatus: 'disponible',
    destacado: false,
    fechaPublicacion: '2026-04-18',
    agenteId: 2,
  },
  {
    id: 4,
    titulo: 'Oficina corporativa Torre Ánimas',
    descripcion:
      'Oficina equipada en torre corporativa con recepción compartida, salas de juntas y estacionamiento para visitas.',
    tipo: 'oficina',
    operacion: 'renta',
    precioRenta: 22000,
    moneda: 'MXN',
    ciudad: 'Xalapa',
    colonia: 'Las Ánimas',
    direccion: 'Blvd. Ánimas 500, Piso 8',
    recamaras: 0,
    banos: 2,
    estacionamientos: 4,
    superficieM2: 120,
    construccionM2: 120,
    amenidades: ['Sala de juntas', 'Recepción', 'Internet dedicado'],
    imagenPrincipal: img('oficina1', 0),
    imagenes: [img('oficina1', 1), img('oficina1', 2)],
    estatus: 'disponible',
    destacado: false,
    fechaPublicacion: '2026-05-25',
    agenteId: 2,
  },
  {
    id: 5,
    titulo: 'Departamento loft en Zona Centro',
    descripcion:
      'Loft de diseño industrial con doble altura, ideal para parejas jóvenes que buscan un estilo de vida urbano.',
    tipo: 'departamento',
    operacion: 'ambas',
    precioVenta: 1950000,
    precioRenta: 11000,
    moneda: 'MXN',
    ciudad: 'Xalapa',
    colonia: 'Centro',
    direccion: 'Calle Enríquez 220',
    recamaras: 2,
    banos: 1,
    estacionamientos: 1,
    superficieM2: 70,
    construccionM2: 70,
    amenidades: ['Doble altura', 'Balcón', 'Roof garden común'],
    imagenPrincipal: img('depa2', 0),
    imagenes: [img('depa2', 1), img('depa2', 2)],
    estatus: 'reservado',
    destacado: true,
    fechaPublicacion: '2026-06-01',
    agenteId: 2,
  },
  {
    id: 6,
    titulo: 'Terreno residencial en Banderilla',
    descripcion:
      'Terreno plano listo para construir, dentro de fraccionamiento privado con servicios de agua, luz y drenaje.',
    tipo: 'terreno',
    operacion: 'venta',
    precioVenta: 980000,
    moneda: 'MXN',
    ciudad: 'Banderilla',
    colonia: 'Fraccionamiento Las Lomas',
    direccion: 'Lote 14, Manzana 3',
    recamaras: 0,
    banos: 0,
    estacionamientos: 0,
    superficieM2: 300,
    construccionM2: 0,
    amenidades: ['Servicios instalados', 'Caseta de vigilancia'],
    imagenPrincipal: img('terreno1', 0),
    imagenes: [img('terreno1', 1), img('terreno1', 2)],
    estatus: 'disponible',
    destacado: false,
    fechaPublicacion: '2026-03-30',
    agenteId: 2,
  },
];

@Injectable({ providedIn: 'root' })
export class PropertyService {
  private readonly propertiesSignal = signal<Property[]>([...SEED_PROPERTIES]);
  readonly properties = this.propertiesSignal.asReadonly();
  readonly destacados = computed(() => this.propertiesSignal().filter((p) => p.destacado));

  private nextId = SEED_PROPERTIES.length + 1;

  getById(id: number): Property | undefined {
    return this.propertiesSignal().find((p) => p.id === id);
  }

  filter(filtro: PropertyFilter): Property[] {
    return this.propertiesSignal().filter((p) => {
      if (filtro.busqueda) {
        const texto = `${p.titulo} ${p.ciudad} ${p.colonia}`.toLowerCase();
        if (!texto.includes(filtro.busqueda.toLowerCase())) return false;
      }
      if (filtro.tipo && filtro.tipo !== 'todos' && p.tipo !== filtro.tipo) return false;
      if (filtro.operacion && filtro.operacion !== 'todos') {
        if (p.operacion !== filtro.operacion && p.operacion !== 'ambas') return false;
      }
      if (filtro.ciudad && p.ciudad !== filtro.ciudad) return false;
      if (filtro.recamarasMin && p.recamaras < filtro.recamarasMin) return false;
      const precioRef = p.precioVenta ?? p.precioRenta ?? 0;
      if (filtro.precioMin && precioRef < filtro.precioMin) return false;
      if (filtro.precioMax && precioRef > filtro.precioMax) return false;
      return true;
    });
  }

  ciudadesDisponibles(): string[] {
    return [...new Set(this.propertiesSignal().map((p) => p.ciudad))];
  }

  create(data: Omit<Property, 'id' | 'fechaPublicacion'>): Property {
    const property: Property = {
      ...data,
      id: this.nextId++,
      fechaPublicacion: new Date().toISOString().slice(0, 10),
    };
    this.propertiesSignal.update((list) => [property, ...list]);
    return property;
  }

  update(id: number, data: Partial<Property>): void {
    this.propertiesSignal.update((list) =>
      list.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  }

  delete(id: number): void {
    this.propertiesSignal.update((list) => list.filter((p) => p.id !== id));
  }
}
