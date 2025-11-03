import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistorialImportacion, Venta, VentasService } from '../../../../../../src/app/services/ventas.service';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  isLoading = false;
  ventas: HistorialImportacion[] = [];
  paginatedVentas: HistorialImportacion[] = [];

  pageSize = 10;             // registros por página
  currentPage = 1;           // página actual

  constructor(private ventasService: VentasService) {}

  ngOnInit() {
    this.cargarVentas();
  }

  cargarVentas() {
    this.ventasService.getVentasHistorial().subscribe({
      next: (data) => {
        this.ventas = data;
        this.updatePagination();
      },
      error: (err) => console.error('error al cargar historial:', err)
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


  /*************************importar registros************************************* */

  fileToUpload: File | null = null;

onFileSelected(event: any) {
  this.fileToUpload = event.target.files[0];
}

importarExcel() {
  if (!this.fileToUpload) {
    alert("Seleccione un archivo primero");
    return;
  }

  this.isLoading = true; // ← mostrar loader

  this.ventasService.importarArchivo(this.fileToUpload).subscribe({
    next: (resp) => {
      console.log("Respuesta del backend:", resp);
      this.cargarVentas();
      this.isLoading = false; // ← ocultar loader
    },
    error: (err) => {
      console.error("Error al importar:", err);
      alert("Error al importar archivo");
      this.isLoading = false; // ← ocultar loader también en error
    }
  });
}



}
