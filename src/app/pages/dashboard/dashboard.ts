import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { storageService } from 'src/app/services/localStorage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
    standalone: true,
  imports: [CommonModule], // 👈 Importa esto aquí pa lo del ngIf ese raro
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  private router = inject(Router);

  currentUser:User = {
        userName: "N/A",
        password: "N/A",
        emailId: "N/A",
  };

  private localStorageService = inject(storageService); // 👈 se inyecta aquí sin constructor
  previewUrl = this.localStorageService.previewUrl;
  
  constructor(private authService:AuthService){ }
  

//esto pa que se active na mas se incie??
  ngOnInit(){
    this.userRegistered();
    const stored = localStorage.getItem(this.currentUser.userName);
    this.previewUrl.set(stored ? JSON.parse(stored) : null); //to esto pa que siempre que reabra la page se quede la ultima img guarda
  }

  userRegistered(){ // CARGA EL USUARIO ACTUAL QUE ESTÁ LOGGEADO
    this.currentUser = this.authService.userRegistered();
  }

// onFileSelected(event: Event): void {

//     const input = event.target as HTMLInputElement; // para convertirlo en input y usar files(?)

//     if (!input.files?.length) { //sino hay archivos seleccionados...
//       this.previewUrl = null;
//       return;
//     }

//     const file = input.files[0];

//     const reader = new FileReader();
//     reader.onload = () => {
//       this.previewUrl = reader.result; // Aquí guardamos la imagen en base64

//       localStorage.setItem(this.currentUser.userName, JSON.stringify(this.previewUrl)) //para guardar la img en el localStorage
//     };

//     reader.readAsDataURL(file);
//   }

onFileSelected(event: Event){
  this.localStorageService.onFileSelected(event, this.currentUser); // guarda la imagen
}

showUploadInput = false;

goToDiary() {
  this.router.navigate(['/profile']);
}

goToPosts() {
  this.router.navigate(['/postwall']);
}

}