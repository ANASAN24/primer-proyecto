import { Component, inject, signal } from '@angular/core';
import { storageService } from 'src/app/services/localStorage.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/model/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  currentUser: User = { userName: '', password: '', emailId: '' };
  private localStorageService = inject(storageService);
  previewUrl = this.localStorageService.previewUrl;
  bannerImage = signal<string | null>("")

   //Listas de los usuarios del sistema(?)
    stored = localStorage.getItem("pinkApp_UsersList")
     users = this.stored ? JSON.parse(this.stored): []

  informacionAlmacenada = ""

  //Perfil del user
  years = signal<string>('N/A')
  location = signal<string>('N/A')
  likes = signal<string>('N/A')
  dislikes = signal<string>('N/A')


  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.userRegistered();

   if(localStorage.getItem(this.currentUser.userName + "_banner")){
    this.bannerImage.set(localStorage.getItem(this.currentUser.userName + "_banner"))
   } 

    const infoUser = localStorage.getItem(this.currentUser.userName + "_info")
    if(infoUser!=null){
    const infoUserString = infoUser ? JSON.parse(infoUser): ""

  this.years.set(infoUserString.years)
  this.location.set(infoUserString.location)
  this.likes.set(infoUserString.likes)
  this.dislikes.set(infoUserString.dislikes)
    }

  }

  onFileSelected(event: Event){
    
    const input = event.target as HTMLInputElement; // para convertirlo en input y usar files(?)

    if (!input.files?.length) { //sino hay archivos seleccionados...
        this.bannerImage.set(null);
      return;
    }

    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string; // Aquí guardamos la imagen en base64
        this.bannerImage.set(base64);
      localStorage.setItem(this.currentUser.userName + "_banner", JSON.stringify(base64)) //para guardar la img en el localStorage
    };

     reader.readAsDataURL(file);
}

     
  getImagesofUsers(){

    console.log("fuera del for")
    
  let stored = localStorage.getItem(this.currentUser.userName + "_posts");
  let perfil = stored ? JSON.parse(stored) : [];
  
  for(const info of perfil){
    console.log("dentro del fog")
     const html = 
     `
  <div class="post-card">
    <h5><strong>${this.currentUser.userName}</strong> • <small><small>${info.fecha}</small></small></h5> 
    <img src="${info.image}" alt="img" style="max-width:200px" />
    <br>
    <p>${info.text}</p>
    <hr>
  </div>
`;
this.informacionAlmacenada+=html;
  }
  return this.informacionAlmacenada
}

ShowInformationUser(valueDivElement:any, infoDivElement:any){

  const valueDiv = document.getElementById(valueDivElement) as HTMLDivElement
  const infoDiv = document.getElementById(infoDivElement) as HTMLDivElement
  valueDiv.style.display = "block";
  infoDiv.style.display = "none";

}
 
//SE USA EL ID Y NO TENGO QUE PASAR OCHENTA IDS EN EL METODO TUT
changeInformationUser(years:string, location:string, likes:string, dislikes:string, valueDivElement:any, infoDivElement:any){

  const yearsValue = document.getElementById(years) as HTMLInputElement
  const locationValue = document.getElementById(location) as HTMLInputElement
  const likesValue = document.getElementById(likes) as HTMLInputElement
  const dislikesValue = document.getElementById(dislikes) as HTMLInputElement

  this.years.set(yearsValue.value)
  this.location.set(locationValue.value)
  this.likes.set(likesValue.value)
  this.dislikes.set(dislikesValue.value)

  const infoObject = {
      years: yearsValue.value,
      location: locationValue.value,
      likes: likesValue.value,
      dislikes: dislikesValue.value
  }

  const valueDiv = document.getElementById(valueDivElement) as HTMLDivElement
  const infoDiv = document.getElementById(infoDivElement) as HTMLDivElement
  valueDiv.style.display = "none";
  infoDiv.style.display = "block";

  localStorage.setItem(this.currentUser.userName + "_info", JSON.stringify(infoObject))
  console.log("la info idk wojasdaosijdasd: " + JSON.stringify(infoObject))

}

}
