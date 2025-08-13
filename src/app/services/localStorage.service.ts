import { Injectable, signal } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class storageService {

      previewUrl = signal<string | null>(null);
      writtenText = signal<string | null>(null);

      posts = {
          text: this.writtenText,
          img: this.previewUrl
      }

    onFileSelected(event: Event, currentUser:User): any {

    const input = event.target as HTMLInputElement; // para convertirlo en input y usar files(?)

    if (!input.files?.length) { //sino hay archivos seleccionados...
        this.previewUrl.set(null);
      return;
    }

    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string; // Aquí guardamos la imagen en base64
        this.previewUrl.set(base64);
      localStorage.setItem(currentUser.userName, JSON.stringify(base64)) //para guardar la img en el localStorage
    };

     reader.readAsDataURL(file);
  }

      onImgSelected(event: Event, currentUser:User): any {
    const input = event.target as HTMLInputElement; // para convertirlo en input y usar files(?)

    if (!input.files?.length) { //sino hay archivos seleccionados...
        this.previewUrl.set(null);
      return;
    }

    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string; // Aquí guardamos la imagen en base64
        this.previewUrl.set(base64);
      localStorage.setItem(currentUser.userName + "_posts", JSON.stringify(this.posts)) //para guardar la img y txt en el localStorage
    };

     reader.readAsDataURL(file);
  }

      //Listas de los usuarios del sistema(?)
    stored = localStorage.getItem("pinkApp_UsersList")
     users = this.stored ? JSON.parse(this.stored): []

        informacionAlmacenada = ""

  getImageofAllUsers(){
        for (const profileData of this.users){
  let stored = localStorage.getItem(profileData.userName + "_posts");
  let perfiles = stored ? JSON.parse(stored) : [];
  console.log("el length del usuario: " + perfiles.length)
  for(const usuario of perfiles){
     const info = 
     `
  <div class="post-card">
    <h5><strong>${profileData.userName}</strong> • <small><small>${usuario.fecha}</small></small></h5> 
    <img src="${usuario.image}" alt="img" style="max-width:200px" />
    <br>
    <p>${usuario.text}</p>
    <hr>
  </div>
`;
this.informacionAlmacenada+=info;
  }
  }
  return this.informacionAlmacenada
  }
}
