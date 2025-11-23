import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctorant-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doctorant-dashboard.component.html',
  styleUrls: ['./doctorant-dashboard.component.css']
})
export class DoctorantDashboardComponent {
  title = 'Tableau de bord';

  // Sample stats and content to show in the improved UI. Replace with real API data later.
  stats = [
    { label: 'Dossiers soumis', value: 5 },
    { label: 'Documents à télécharger', value: 2 },
    { label: 'Soutenances proposées', value: 1 },
    { label: "Messages non lus", value: 3 }
  ];

  actions = [
    { label: "S'inscrire", link: ['/doctorant/inscription'] },
    { label: 'Téléverser docs', link: ['/doctorant/upload-docs'] },
    { label: 'Voir statut', link: ['/doctorant/dossier-status'] },
    { label: 'Demande soutenance', link: ['/doctorant/soutenance-request'] }
  ];

  recent = [
    { title: 'CV téléchargé', date: '2025-11-10', desc: 'Votre CV a été ajouté au dossier.' },
    { title: 'Convocation soutenance', date: '2025-10-01', desc: 'Une proposition de soutenance est disponible.' }
  ];
}
