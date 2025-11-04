import { ScrapingService, Tendencia } from './../../../../services/scraping.service';
import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-tendencias',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe], //  para formatear fecha
  templateUrl: './tendencias.component.html',
  styleUrls: ['./tendencias.component.scss']
})
export class TendenciasComponent {

  tendencias: Tendencia[] = [];
  paginatedTendencias: Tendencia[] = [];

  isLoading = false;
  currentPage = 1;
  pageSize = 10;
  error = '';
  consultaRealizada = false; //  indica si ya se consultó

  constructor(
    private scrapingService: ScrapingService,
    private datePipe: DatePipe
  ) {}

  /** Ejecuta la consulta */
  consultarTendencias(): void {
    this.isLoading = true;
    this.error = '';
    this.consultaRealizada = true;

    this.scrapingService.obtenerTendencias().subscribe({
      next: (data) => {
        this.tendencias = (data.tendencias || []).map(t => ({
          ...t,
          //  formatea la fecha a dd/MM/yyyy HH:mm:ss
          fecha_consulta: this.datePipe.transform(t.fecha_consulta, 'dd/MM/yyyy HH:mm:ss') || ''
        }));
        this.currentPage = 1;
        this.updatePagination();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener tendencias:', err);
        this.error = 'No se pudieron cargar las tendencias.';
        this.isLoading = false;
      }
    });
  }

  /** Controla la paginación */
  updatePagination(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedTendencias = this.tendencias.slice(start, end);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  get totalPages(): number {
    return Math.ceil(this.tendencias.length / this.pageSize);
  }
}
