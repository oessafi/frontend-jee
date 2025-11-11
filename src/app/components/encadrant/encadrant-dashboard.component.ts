import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-encadrant-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './encadrant-dashboard.component.html',
  styleUrls: ['./encadrant-dashboard.component.css']
})
export class EncadrantDashboardComponent {
  title = 'Tableau de bord - Encadrant';
}
