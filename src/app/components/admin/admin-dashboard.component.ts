import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  title = 'Tableau de bord - Administratif';

  stats = [
    { label: 'Campagnes actives', value: 2 },
    { label: 'Dossiers en attente', value: 14 },
    { label: 'Utilisateurs', value: 124 }
  ];

  actions = [
    { label: 'Gérer campagnes', link: ['/admin/campaigns'] },
    { label: 'Planification', link: ['/admin/planning'] },
    { label: 'Gestion utilisateurs', link: ['/admin/user-management'] }
  ];

  recent = [
    { title: 'Nouvelle campagne', date: '2025-09-20', desc: 'Une nouvelle campagne a été créée.' }
  ];
}
