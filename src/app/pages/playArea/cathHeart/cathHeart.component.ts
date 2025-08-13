import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catch-hearts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catchHeart.component.html',
  styleUrls: ['./catchHeart.component.css']
})

export class CatchHeartsComponent {

    score = signal(0);
}
