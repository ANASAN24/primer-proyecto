import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  playAudio(id:string): void {
    const audio = document.getElementById(id) as HTMLAudioElement
    if(audio){ //si no es nulo
        audio.currentTime = 0;
        audio.play();
    } else{
        alert("No existe el audio");
    }
  }
  
}
