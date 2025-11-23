import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InscriptionService } from '../../services/inscription.service';
import { SoutenanceService } from '../../services/soutenance.service';
import { User, Inscription } from '../../models/app.models';

@Component({
  selector: 'app-doctorant-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doctorant-dashboard.component.html',
  styleUrls: ['./doctorant-dashboard.component.css']
})
export class DoctorantDashboardComponent implements OnInit {
  title = 'Tableau de bord';
  user: User | null = null;
  inscriptions: Inscription[] = [];
  latestInscription: Inscription | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private inscriptionService: InscriptionService,
    private soutenanceService: SoutenanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.user$();
    if (this.user?.id) {
      this.inscriptionService.getMyInscriptions(this.user.id).subscribe({
        next: (data) => {
          this.inscriptions = data;
          this.latestInscription = this.inscriptions.length > 0
            ? this.inscriptions[this.inscriptions.length - 1]
            : null;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Erreur lors du chargement des inscriptions';
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
      this.error = 'Utilisateur non connecté';
    }
  }

  hasActiveInscription(): boolean {
    return !!this.latestInscription && this.latestInscription.status !== 'BROUILLON';
  }

  onNewInscription(): void {
    this.router.navigate(['/doctorant/inscription']);
  }
}
