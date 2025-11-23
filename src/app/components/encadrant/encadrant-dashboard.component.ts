import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-encadrant-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './encadrant-dashboard.component.html',
  styleUrls: ['./encadrant-dashboard.component.css']
})
export class EncadrantDashboardComponent {
  title = 'Tableau de bord - Encadrant';

  stats = [
    { label: 'Encadrés actifs', value: 8 },
    { label: 'Demandes à valider', value: 2 },
    { label: 'Propositions jury', value: 1 }
  ];

  actions = [
    { label: 'Valider dossier', link: ['/encadrant/validate-dossiers'] },
    { label: 'Proposer jury', link: ['/encadrant/propose-jury'] },
    { label: 'Mes doctorants', link: ['/encadrant/supervisees'] }
  ];

  recent = [
    { title: 'Nouveau document', date: '2025-11-08', desc: 'Un doctorant a ajouté un document.' }
  ];
}
