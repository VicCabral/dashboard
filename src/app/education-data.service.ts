import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationDataService {

  private mockData = {
    courseCompletionRate: {
      labels: ['Ingeniería', 'Medicina', 'Derecho', 'Economía', 'Humanidades'],
      datasets: [
        {
          data: [85, 78, 82, 76, 88],
          label: 'Tasa de finalización (%)'
        }
      ]
    },

    studentEngagement: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [
        {
          data: [65, 72, 78, 75, 82, 88],
          label: 'Participación en foros',
          borderColor: '#4285F4',
          backgroundColor: 'rgba(66, 133, 244, 0.1)'
        },
        {
          data: [70, 82, 85, 83, 90, 92],
          label: 'Visualización de contenido',
          borderColor: '#34A853',
          backgroundColor: 'rgba(52, 168, 83, 0.1)'
        },
        {
          data: [60, 65, 70, 68, 75, 80],
          label: 'Entrega de tareas',
          borderColor: '#FBBC05',
          backgroundColor: 'rgba(251, 188, 5, 0.1)'
        }
      ]
    },

    resourcesUsage: {
      labels: ['Videos', 'PDFs', 'Cuestionarios', 'Foros', 'Tareas'],
      datasets: [
        {
          data: [35, 25, 15, 10, 15],
          backgroundColor: [
            '#4285F4', // Azul
            '#34A853', // Verde
            '#FBBC05', // Amarillo
            '#EA4335', // Rojo
            '#9C27B0'  // Morado
          ]
        }
      ]
    },

    assessmentResults: {
      labels: ['Excelente', 'Bueno', 'Satisfactorio', 'Necesita mejorar', 'Insuficiente'],
      datasets: [
        {
          data: [15, 30, 35, 15, 5],
          backgroundColor: [
            '#34A853', // Verde
            '#4285F4', // Azul
            '#FBBC05', // Amarillo
            '#FF9800', // Naranja
            '#EA4335'  // Rojo
          ]
        }
      ]
    },

    studentProgressByArea: {
      labels: ['Conocimiento teórico', 'Habilidades prácticas', 'Comunicación', 'Trabajo en equipo', 'Resolución de problemas', 'Pensamiento crítico'],
      datasets: [
        {
          label: 'Promedio actual',
          data: [78, 72, 68, 83, 75, 70],
          fill: true,
          backgroundColor: 'rgba(66, 133, 244, 0.2)',
          borderColor: '#4285F4',
          pointBackgroundColor: '#4285F4',
          pointBorderColor: '#fff'
        },
        {
          label: 'Objetivo del programa',
          data: [85, 80, 75, 85, 80, 80],
          fill: true,
          backgroundColor: 'rgba(52, 168, 83, 0.2)',
          borderColor: '#34A853',
          pointBackgroundColor: '#34A853',
          pointBorderColor: '#fff'
        }
      ]
    },

    enrollmentTrends: {
      labels: ['2020', '2021', '2022', '2023', '2024'],
      datasets: [
        {
          type: 'bar',
          label: 'Presencial',
          data: [120, 100, 40, 80, 95],
          backgroundColor: '#4285F4'
        },
        {
          type: 'bar',
          label: 'Híbrido',
          data: [30, 45, 60, 70, 65],
          backgroundColor: '#34A853'
        },
        {
          type: 'bar',
          label: 'Online',
          data: [50, 75, 150, 135, 160],
          backgroundColor: '#FBBC05'
        },
        {
          type: 'line',
          label: 'Total',
          data: [200, 220, 250, 285, 320],
          borderColor: '#EA4335',
          backgroundColor: 'transparent',
          pointBackgroundColor: '#EA4335',
          pointBorderColor: '#fff'
        }
      ]
    }
  };

  constructor() { }

  getCourseCompletionRate(): Observable<any> {
    return of(this.mockData.courseCompletionRate);
  }

  getStudentEngagement(): Observable<any> {
    return of(this.mockData.studentEngagement);
  }

  getResourcesUsage(): Observable<any> {
    return of(this.mockData.resourcesUsage);
  }

  getAssessmentResults(): Observable<any> {
    return of(this.mockData.assessmentResults);
  }

  getStudentProgressByArea(): Observable<any> {
    return of(this.mockData.studentProgressByArea);
  }

  getEnrollmentTrends(): Observable<any> {
    return of(this.mockData.enrollmentTrends);
  }

  // Estadísticas generales para cards
  getGeneralStats(): Observable<any> {
    return of({
      activeStudents: 3245,
      activeCourses: 87,
      completionRate: 78.5,
      averageGrade: 8.2,
      averageEngagement: 72.3
    });
  }
}
