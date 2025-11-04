import { ScrapingService, ProductoScraping, ProductosResponse } from './../../../../services/scraping.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos-relacionados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos-relacionados.component.html',
  styleUrls: ['./productos-relacionados.component.scss'],
  providers: [DatePipe]
})
export class ProductosRelacionadosComponent implements OnInit {

  // ===========================
  // VARIABLES PRINCIPALES
  // ===========================
  productos: ProductoScraping[] = [];
  paginatedProductos: ProductoScraping[] = [];
  fuenteSeleccionada = 'entrelanas';
  isLoading = false;
  errorMsg = '';
  error = '';
  consultaRealizada = false;


  // Paginación
  pageSize = 8;
  currentPage = 1;

  constructor(
    private scrapingService: ScrapingService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    // no cargar nada hasta que se presione el botón
  }

  // ===========================
  // CONSULTAR PRODUCTOS
  // ===========================
  consultarProductos(): void {
    this.isLoading = true;
    this.errorMsg = '';
    this.productos = [];
    this.paginatedProductos = [];

    let apiCall;

    if (this.fuenteSeleccionada === 'entrelanas') {
      apiCall = this.scrapingService.obtenerEntrelanas();
    } else if (this.fuenteSeleccionada === 'lanapolis') {
      apiCall = this.scrapingService.obtenerLanapolis();
    }

    apiCall?.subscribe({
      next: (data: ProductosResponse) => {
        // Aseguramos compatibilidad con "productos"
        const lista = (data as any).productos || [];
        this.productos = lista.map((p: any) => ({
          ...p,
          fecha_consulta: this.datePipe.transform(p.fecha_consulta, 'dd/MM/yyyy HH:mm:ss') || ''
        }));

        this.currentPage = 1;
        this.updatePagination();
        this.isLoading = false;

        // subir scroll arriba
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (err) => {
        this.errorMsg = 'Error al obtener los productos.';
        console.error('Error:', err);
        this.isLoading = false;
      }
    });
  }

  // ===========================
  // PAGINACIÓN
  // ===========================
  updatePagination(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProductos = this.productos.slice(start, end);
  }

changePage(page: number | string): void {
  if (typeof page !== 'number' || page < 1 || page > this.totalPages) return;
  this.currentPage = page;
  this.updatePagination();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

  get totalPages(): number {
    return Math.ceil(this.productos.length / this.pageSize);
  }

  // Paginación con “...”
  visiblePages(): (number | string)[] {
  const total = this.totalPages;
  const current = this.currentPage;
  const delta = 2;
  const range: (number | string)[] = [];
  const rangeWithDots: (number | string)[] = [];
  let last: number | null = null;

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (last !== null && typeof i === 'number') {
      if (i - last === 2) {
        rangeWithDots.push(last + 1);
      } else if (i - last > 2) {
        rangeWithDots.push('...');
      }
    }

    rangeWithDots.push(i);
    last = typeof i === 'number' ? i : last;
  }

  return rangeWithDots;
}
}
