export type PropertyType = 'casa' | 'departamento' | 'terreno' | 'oficina';
export type PropertyOperation = 'venta' | 'renta' | 'ambas';
export type PropertyStatus = 'disponible' | 'reservado' | 'vendido' | 'rentado';

export interface Property {
  id: number;
  titulo: string;
  descripcion: string;
  tipo: PropertyType;
  operacion: PropertyOperation;
  precioVenta?: number;
  precioRenta?: number;
  moneda: 'MXN' | 'USD';
  ciudad: string;
  colonia: string;
  direccion: string;
  recamaras: number;
  banos: number;
  estacionamientos: number;
  superficieM2: number;
  construccionM2: number;
  amenidades: string[];
  imagenPrincipal: string;
  imagenes: string[];
  estatus: PropertyStatus;
  destacado: boolean;
  fechaPublicacion: string;
  agenteId: number;
}

export interface PropertyFilter {
  busqueda?: string;
  tipo?: PropertyType | 'todos';
  operacion?: PropertyOperation | 'todos';
  ciudad?: string;
  precioMin?: number;
  precioMax?: number;
  recamarasMin?: number;
}
