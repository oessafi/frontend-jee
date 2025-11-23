import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validate-dossiers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validate-dossiers.component.html',
  styleUrls: ['./validate-dossiers.component.css']
})
export class ValidateDossiersComponent {
  title = 'Validation administrative des dossiers';
}
