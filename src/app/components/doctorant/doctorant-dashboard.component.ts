import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctorant-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctorant-dashboard.component.html',
  styleUrls: ['./doctorant-dashboard.component.css']
})
export class DoctorantDashboardComponent {
  title = 'Tableau de bord - Doctorant';
}
