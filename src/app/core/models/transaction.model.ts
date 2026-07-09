export type TransactionType = 'cotizacion' | 'compra' | 'renta';
export type TransactionStatus = 'pendiente' | 'en_proceso' | 'aprobada' | 'rechazada' | 'completada';

export interface Transaction {
  id: number;
  propertyId: number;
  propertyTitulo: string;
  userId: number;
  userNombre: string;
  tipo: TransactionType;
  estatus: TransactionStatus;
  mensaje?: string;
  montoOfrecido?: number;
  fechaCreacion: string;
  fechaVisita?: string;
}
