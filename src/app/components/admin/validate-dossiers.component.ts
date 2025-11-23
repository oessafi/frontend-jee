
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionService } from '../../services/inscription.service';
import { Inscription } from '../../models/app.models';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-validate-dossiers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './validate-dossiers.component.html',
  styleUrls: ['./validate-dossiers.component.css']
})
export class ValidateDossiersComponent implements OnInit {
  inscriptions: Inscription[] = [];
  loading = false;
  error: string | null = null;
  selectedInscription: Inscription | null = null;
  showDetails = false;
  rejectForm: FormGroup;
  showRejectForm = false;

  constructor(
    private inscriptionService: InscriptionService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.rejectForm = this.fb.group({
      commentaire: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadInscriptions();
  }

  loadInscriptions(): void {
    this.loading = true;
    this.inscriptionService.getAll().subscribe({
      next: (data) => {
        this.inscriptions = data.filter(i => i.status === 'EN_ATTENTE_ADMIN');
        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur lors du chargement des inscriptions';
        this.loading = false;
      }
    });
  }

  openDetails(inscription: Inscription): void {
    this.selectedInscription = inscription;
    this.showDetails = true;
    this.showRejectForm = false;
  }

  closeDetails(): void {
    this.selectedInscription = null;
    this.showDetails = false;
    this.showRejectForm = false;
  }

  validateInscription(inscription: Inscription): void {
    this.inscriptionService.validate(inscription.id, { approved: true, commentaire: '' }).subscribe({
      next: () => {
        this.closeDetails();
        this.loadInscriptions();
      },
      error: () => {
        this.error = 'Erreur lors de la validation';
      }
    });
  }

  showReject(inscription: Inscription): void {
    this.selectedInscription = inscription;
    this.showRejectForm = true;
    this.showDetails = false;
    this.rejectForm.reset();
  }

  rejectInscription(): void {
    if (!this.selectedInscription || this.rejectForm.invalid) return;
    const commentaire = this.rejectForm.value.commentaire;
    this.inscriptionService.validate(this.selectedInscription.id, { approved: false, commentaire }).subscribe({
      next: () => {
        this.closeDetails();
        this.loadInscriptions();
      },
      error: () => {
        this.error = 'Erreur lors du rejet';
      }
    });
  }
}
