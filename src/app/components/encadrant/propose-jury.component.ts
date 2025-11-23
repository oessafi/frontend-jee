
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SoutenanceService } from '../../services/soutenance.service';

export enum JuryRole {
  RAPPORTEUR = 'RAPPORTEUR',
  EXAMINATEUR = 'EXAMINATEUR',
  PRESIDENT = 'PRESIDENT',
  DIRECTEUR_THESE = 'DIRECTEUR_THESE'
}

export interface JuryMember {
  nomComplet: string;
  email: string;
  etablissement: string;
  role: JuryRole;
}

export interface PropositionJuryRequest {
  membres: JuryMember[];
}

@Component({
  selector: 'app-propose-jury',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './propose-jury.component.html',
  styleUrls: ['./propose-jury.component.css']
})
export class ProposeJuryComponent implements OnInit {
  demandeId!: string;
  juryForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  juryRoles = Object.values(JuryRole);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private soutenanceService: SoutenanceService
  ) {
    this.juryForm = this.fb.group({
      membres: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.demandeId = this.route.snapshot.paramMap.get('id') || '';
    this.addMember();
  }

  get membres(): FormArray {
    return this.juryForm.get('membres') as FormArray;
  }

  addMember(): void {
    this.membres.push(this.fb.group({
      nomComplet: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      etablissement: ['', Validators.required],
      role: ['', Validators.required]
    }));
  }

  removeMember(index: number): void {
    this.membres.removeAt(index);
  }

  onSubmit(): void {
    if (this.juryForm.invalid) return;
    const request: PropositionJuryRequest = {
      membres: this.juryForm.value.membres
    };
    this.soutenanceService.proposerJury(this.demandeId, request).subscribe({
      next: () => {
        this.successMessage = 'Proposition envoyée avec succès !';
        this.errorMessage = null;
        this.juryForm.reset();
        while (this.membres.length) this.membres.removeAt(0);
        this.addMember();
      },
      error: () => {
        this.errorMessage = 'Erreur lors de l\'envoi de la proposition.';
        this.successMessage = null;
      }
    });
  }
}
