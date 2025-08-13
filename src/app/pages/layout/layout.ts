import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { storageService } from 'src/app/services/localStorage.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

  private localStorageService = inject(storageService);
  previewUrl = this.localStorageService.previewUrl;

  currentUser:User = {
    userName: "n/a",
    password: "N/A"
  }

  ngOnInit(){
    this.userRegistered();

    const stored = localStorage.getItem(this.currentUser.userName);
    this.previewUrl.set(stored ? JSON.parse(stored) : null); //to esto pa que siempre que reabra la page se quede la ultima img guarda

  }

  userRegistered(){ // CARGA EL USUARIO ACTUAL QUE ESTÁ LOGGEADO
    this.currentUser = this.authService.userRegistered();
  }

  constructor(private authService:AuthService){}

}
