import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Venta {
  id: number;
  serie: string;
  numero: string;
  fechaDeMision: string;
  idCliente: number;
  metodoPago: string;
  montoTotal: number;
  estadoPago: string;
  comentarios: string;
  fechaEntrega: string | null;
  estadoVenta: string;
  regionTienda: string;
  nombreCliente: string;
}

export interface Cliente {
  id: number;
  nombreCliente: string;
  ruc: string;
  telefono: string;
  email: string;
  direccion: string;
  tipoCliente: string;
}

export interface HistorialImportacion {
  id: number;
  fechaImportacion: string;
  usuario: string;
  registrosValidos: number;
  registrosRechazados: number;
  registrosDuplicados: number;
  nombreArchivo: string;
  estado: string;
}

// 🔹 Solo los filtros que necesitamos
export interface FiltrosRequest {
  HorizontePrediccion: string; // Ej: '7dias', '1mes', '3meses', '1año'
  Region: string;
  MetodoPago: string;
}

export interface Prediccion {
  fecha: string;
  prediccion: number;
}

export interface PrediccionesResponse {
  predicciones: Prediccion[];
  reporteResumen: {
    registrosValidos: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  
  private apiUrl = 'https://localhost:7278/api/ventas'; 
  private apiUrlHistorico = 'https://localhost:7278/api/ventas/ventas_historial'; 
  private apiUpload = 'https://localhost:7278/api/ml/importar-y-predecir';
  private basePredicc = 'https://localhost:7278/api/PrediccionVentas';

  constructor(private http: HttpClient) {}

  getVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.apiUrl);
  }

  getVentasHistorial(): Observable<HistorialImportacion[]> {
    return this.http.get<HistorialImportacion[]>(this.apiUrlHistorico);
  }

  importarArchivo(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.apiUpload, formData);
  }

  // 🔹 Método actualizado para enviar solo los 3 filtros requeridos
  obtenerPredicciones(filtros: FiltrosRequest): Observable<PrediccionesResponse> {
    return this.http.post<PrediccionesResponse>(this.basePredicc, filtros);
  }
}
