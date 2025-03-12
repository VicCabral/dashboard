import { Component, OnInit } from '@angular/core';
import { EducationDataService } from '../education-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Data for charts
  courseCompletionData: any;
  studentEngagementData: any;
  resourcesUsageData: any;
  assessmentResultsData: any;
  studentProgressData: any;
  enrollmentTrendsData: any;
  generalStats: any;

  // Filter values
  selectedPeriod: string = '2025-1';
  selectedProgram: string = 'all';
  selectedCourseType: string = 'all';

  // Predictive data
  predictiveData: any;

  // Comparison data
  comparisonData: any;

  // Loading state
  loading = true;

  constructor(
    private dataService: EducationDataService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  /**
   * Carga todos los datos del dashboard
   */
  loadDashboardData(): void {
    this.loading = true;

    // Get general stats
    this.dataService.getGeneralStats().subscribe(data => {
      this.generalStats = data;
    });

    // Get chart data
    this.dataService.getCourseCompletionRate().subscribe(data => {
      this.courseCompletionData = data;
    });

    this.dataService.getStudentEngagement().subscribe(data => {
      this.studentEngagementData = data;
    });

    this.dataService.getResourcesUsage().subscribe(data => {
      this.resourcesUsageData = data;
    });

    this.dataService.getAssessmentResults().subscribe(data => {
      this.assessmentResultsData = data;
    });

    this.dataService.getStudentProgressByArea().subscribe(data => {
      this.studentProgressData = data;
    });

    this.dataService.getEnrollmentTrends().subscribe(data => {
      this.enrollmentTrendsData = data;
      this.loading = false; // Set loading to false when all data is loaded
    });

    // Simular carga de datos predictivos
    setTimeout(() => {
      this.loadPredictiveData();
      this.loadComparisonData();
    }, 800);
  }

  /**
   * Aplica los filtros seleccionados
   */
  applyFilters(): void {
    this.loading = true;

    // Simulamos un tiempo de carga para aplicar filtros
    setTimeout(() => {
      this.loadDashboardData();

      this.snackBar.open(
        `Filtros aplicados: Período ${this.selectedPeriod}, Carrera: ${this.getReadableProgram()}, Tipo: ${this.getReadableCourseType()}`,
        'Cerrar',
        { duration: 5000 }
      );
    }, 1000);
  }

  /**
   * Restablece los filtros a sus valores por defecto
   */
  resetFilters(): void {
    this.selectedPeriod = '2025-1';
    this.selectedProgram = 'all';
    this.selectedCourseType = 'all';

    this.applyFilters();
  }

  /**
   * Exporta el dashboard a PDF
   */
  exportToPDF(): void {
    this.snackBar.open('Exportando dashboard a PDF...', 'Cerrar', { duration: 3000 });
    // Aquí iría la lógica real de exportación a PDF
  }

  /**
   * Exporta los datos a Excel
   */
  exportToExcel(): void {
    this.snackBar.open('Exportando datos a Excel...', 'Cerrar', { duration: 3000 });
    // Aquí iría la lógica real de exportación a Excel
  }

  /**
   * Comparte el dashboard por correo
   */
  shareDashboard(): void {
    this.snackBar.open('Preparando informe para compartir...', 'Cerrar', { duration: 3000 });
    // Aquí iría la lógica para compartir
  }

  /**
   * Carga datos de predicciones
   */
  private loadPredictiveData(): void {
    // Simulación de carga de datos predictivos
    this.predictiveData = {
      enrollmentPrediction: {
        nextPeriod: 3450,
        percentageChange: 6.3,
        trend: 'up'
      },
      atRiskStudents: {
        highRisk: 8,
        mediumRisk: 15,
        lowRisk: 77,
        highRiskCount: 85
      }
    };
  }

  /**
   * Carga datos comparativos
   */
  private loadComparisonData(): void {
    // Simulación de carga de datos comparativos
    this.comparisonData = {
      byModality: [
        { modality: 'Presencial', participation: 85, completion: 92, averageGrade: 8.5 },
        { modality: 'Híbrida', participation: 78, completion: 85, averageGrade: 8.2 },
        { modality: 'Virtual', participation: 72, completion: 79, averageGrade: 7.9 }
      ]
    };
  }

  /**
   * Obtiene una versión legible del programa seleccionado
   */
  private getReadableProgram(): string {
    switch(this.selectedProgram) {
      case 'all': return 'Todas las carreras';
      case 'ingenieria': return 'Ingeniería';
      case 'medicina': return 'Medicina';
      case 'derecho': return 'Derecho';
      case 'economia': return 'Economía';
      case 'humanidades': return 'Humanidades';
      default: return this.selectedProgram;
    }
  }

  /**
   * Obtiene una versión legible del tipo de curso seleccionado
   */
  private getReadableCourseType(): string {
    switch(this.selectedCourseType) {
      case 'all': return 'Todos los tipos';
      case 'obligatorio': return 'Obligatorios';
      case 'electivo': return 'Electivos';
      case 'complementario': return 'Complementarios';
      default: return this.selectedCourseType;
    }
  }
}
