import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { VentasService, FiltrosRequest, Prediccion, PrediccionesResponse } from '../../../../services/ventas.service';

Chart.register(...registerables);

interface Filtros {
  horizontePrediccion: string;
  region: string;
  metodoPago: string;
}

@Component({
  selector: 'app-generar-prediccion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generar-prediccion.component.html',
  styleUrls: ['./generar-prediccion.component.scss'],
})
export class GenerarPrediccionComponent implements AfterViewInit {

  @ViewChild('grafico', { static: false }) grafico!: ElementRef<HTMLCanvasElement>;
  chart: Chart | undefined;

  filtros: Filtros = {
    horizontePrediccion: '7dias',
    region: '',
    metodoPago: ''
  };

  horizontes = [
    { label: 'Próximos 7 días', value: '7dias' },
    { label: 'Siguiente mes', value: '1mes' },
    { label: 'Próximo trimestre', value: '3meses' },
    { label: 'Próximo año', value: '1año' }
  ];

  regiones: string[] = ['Lima', 'Arequipa', 'Cusco'];
  metodosPago: string[] = ['Efectivo', 'Tarjeta', 'Yape'];

  predicciones: Prediccion[] = [];
  cargando: boolean = false;

  constructor(private prediccionService: VentasService) {}

  ngAfterViewInit() {}

  generarPrediccion() {
    this.cargando = true;
    this.predicciones = [];
    if (this.chart) this.chart.destroy();

    // ✅ Enviar solo propiedades válidas según FiltrosRequest
    const filtrosBackend: FiltrosRequest = {
      HorizontePrediccion: this.filtros.horizontePrediccion,
      Region: this.filtros.region,
      MetodoPago: this.filtros.metodoPago
    };

    this.prediccionService.obtenerPredicciones(filtrosBackend)
      .subscribe(
        (data: PrediccionesResponse) => {
          this.predicciones = data.predicciones ?? [];
          console.log('Predicciones recibidas:', this.predicciones);
          console.log('Resumen:', data.reporteResumen);

          this.cargando = false;

          setTimeout(() => {
            if (this.predicciones.length > 0 && this.grafico?.nativeElement) {
              this.crearGrafico();
            }
          });
        },
        (err) => {
          console.error('Error al obtener predicciones', err);
          this.predicciones = [];
          this.cargando = false;
          if (this.chart) this.chart.destroy();
        }
      );
  }

  crearGrafico() {
    if (!this.predicciones || this.predicciones.length === 0 || !this.grafico?.nativeElement) return;

    if (this.chart) this.chart.destroy();

    this.chart = new Chart(this.grafico.nativeElement, {
      type: 'bar',
      data: {
        labels: this.predicciones.map(p => p.fecha),
        datasets: [{
          label: 'Predicción Ventas',
          data: this.predicciones.map(p => p.prediccion),
          backgroundColor: this.predicciones.map((_, i) =>
            ['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF'][i % 5]
          )
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Monto de Ventas' }
          },
          x: {
            title: { display: true, text: 'Fecha' }
          }
        }
      }
    });
  }
}
