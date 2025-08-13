import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { storageService } from 'src/app/services/localStorage.service';
import { User } from 'src/app/model/user.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'publish',
    standalone: true,
  imports: [CommonModule, FormsModule], // 👈 Importa esto aquí pa lo del ngIf ese raro
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.css'
})
export class Publish {

      currentUser:User = {
            userName: "N/A",
            password: "N/A",
            emailId: "N/A",
      };

      posts: { 
        fecha?: any; 
        text?: string | null; 
        image?: string | null }[] = [];

          formattedDate: string | null = null;
          currentDate = new Date();


    private localStorageService = inject(storageService); // 👈 se inyecta aquí sin constructor
    imageURL = signal<string | null>(null);
    textIMG = signal<string | null>(null);

    object = localStorage.getItem(this.currentUser.userName + "_posts")
    object2 = this.object ? JSON.parse(this.object): null;

      constructor(private authService:AuthService, private datePipe: DatePipe){
       }

  ngOnInit(){
  this.userRegistered();
  const stored = localStorage.getItem(this.currentUser.userName + "_posts");
  this.posts = stored ? JSON.parse(stored) : [];
  this.formattedDate;
  }

  returnDate(){
  this.formattedDate = this.datePipe.transform(this.currentDate, 'M/d/yy, h:mm a');
    return this.formattedDate;
  }
  userRegistered(){ // CARGA EL USUARIO ACTUAL QUE ESTÁ LOGGEADO
    this.currentUser = this.authService.userRegistered();
  }

onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement; // para convertirlo en input y usar files(?)

    if (!input.files?.length) { //sino hay archivos seleccionados...
      this.imageURL.set(null);
      return;
    }

    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string; // Aquí guardamos la imagen en base64
         this.imageURL.set(base64);
      localStorage.setItem(this.currentUser.userName + "_posts", JSON.stringify(this.imageURL())) //para guardar la img y txt en el localStorage
    };
    reader.readAsDataURL(file);
  }

  buttonPublish(event:Event){

    this.onFileSelected

          let newPost =  {
          fecha: this.returnDate(),
          text: this.textIMG(),
          image: this.imageURL()
      }

      const isLocalData= localStorage.getItem(this.currentUser.userName + "_posts");
      
      if(isLocalData){
      // newPost = JSON.parse(isLocalData); //leer y carga la data si ya existe algo guardandola ahí
      this.posts.push(newPost);
      localStorage.setItem(this.currentUser.userName + "_posts", JSON.stringify(this.posts)) //y aqui se guarda en el localdata
      }
  }

onTextSelected(event:Event){
const  textInput = (event.target as HTMLInputElement).value;
this.textIMG.set(textInput);
}

}

