import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Venta, VentasService } from '../../../../services/ventas.service';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class registrarComponent implements OnInit {

    ventas: Venta[] = [];
  paginatedVentas: Venta[] = [];

  pageSize = 10;             // registros por página
  currentPage = 1;           // página actual


  constructor(private ventasService: VentasService) {}

  ngOnInit() {
    this.cargarVentas();
  }

  cargarVentas() {
    this.ventasService.getVentas().subscribe({
      next: (data) => {
        this.ventas = data;
        console.log(data);
        this.updatePagination();
      },
      error: (err) => console.error('Error al cargar ventas:', err)
    });
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedVentas = this.ventas.slice(start, end);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  get totalPages(): number {
    return Math.ceil(this.ventas.length / this.pageSize);
  }



  fechaDesde: string = '2025-01-01';
fechaHasta: string = '2025-12-31';

filtrarVentas() {
  const desde = new Date(this.fechaDesde);
  const hasta = new Date(this.fechaHasta);

  const filtradas = this.ventas.filter(v => {
    const fechaVenta = new Date(v.fechaDeMision);
    return fechaVenta >= desde && fechaVenta <= hasta;
  });

  this.paginatedVentas = filtradas;
  this.currentPage = 1;
  this.updatePagination();
}



}
