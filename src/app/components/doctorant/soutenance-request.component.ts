import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-soutenance-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './soutenance-request.component.html',
  styleUrls: ['./soutenance-request.component.css']
})
export class SoutenanceRequestComponent {
  title = 'Demande de soutenance';
}
