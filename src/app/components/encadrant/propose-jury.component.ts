import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-propose-jury',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './propose-jury.component.html',
  styleUrls: ['./propose-jury.component.css']
})
export class ProposeJuryComponent {
  title = 'Proposition des membres du jury';
}
