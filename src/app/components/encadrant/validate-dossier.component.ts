import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validate-dossier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validate-dossier.component.html',
  styleUrls: ['./validate-dossier.component.css']
})
export class ValidateDossierComponent {
  title = 'Validation des dossiers';
}
