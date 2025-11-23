import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dossier-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dossier-status.component.html',
  styleUrls: ['./dossier-status.component.css']
})
export class DossierStatusComponent {
  title = 'Suivi de l\'état du dossier';
}
