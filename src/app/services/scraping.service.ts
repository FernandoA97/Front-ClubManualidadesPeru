import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ======== MODELOS PARA PRODUCTOS ========
export interface ProductoScraping {
  nombre: string;
  precio: number;
  imagen: string;
  fecha_consulta: string;
}

export interface ProductosResponse {
  productos: ProductoScraping[]; 
  reporteResumen: {
    fuente: string;
    fechaConsulta: string;
    total: number;
  };
}

// ======== MODELOS PARA TENDENCIAS ========
export interface Tendencia {
  tendencia: string;
  volumen: number;
  fecha_consulta: string;
}

export interface TendenciasResponse {
  tendencias: Tendencia[];
  reporteResumen: {
    fuente: string;
    fechaConsulta: string;
    total: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ScrapingService {

  private baseUrl = 'https://localhost:7278/api/Scraping';

  constructor(private http: HttpClient) {}

  // Google Trends
  obtenerTendencias(): Observable<TendenciasResponse> {
    return this.http.get<TendenciasResponse>(`${this.baseUrl}/tendencias`);
  }

  // Productos LanaPolis
  obtenerLanapolis(): Observable<ProductosResponse> {
    return this.http.get<ProductosResponse>(`${this.baseUrl}/lanapolis`);
  }

  // Productos Entrelanas
  obtenerEntrelanas(): Observable<ProductosResponse> {
    return this.http.get<ProductosResponse>(`${this.baseUrl}/entrelanas`);
  }
}
