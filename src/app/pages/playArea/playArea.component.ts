import { Component } from "@angular/core";
import { CatchCatComponent } from "./catch-cat/catch-cat.component";
import { CatchHeartsComponent } from "./cathHeart/cathHeart.component";
import { DressUp } from "./dressUp/dressUp.component";

@Component({
  selector: 'playArea',
    standalone: true,
  imports: [CatchCatComponent, CatchHeartsComponent, DressUp],
  templateUrl: './playArea.component.html',
  styleUrl: './playArea.component.css'
})
export class PlayArea {}