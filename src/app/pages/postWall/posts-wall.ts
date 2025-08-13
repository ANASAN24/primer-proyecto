import { Component, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { storageService } from 'src/app/services/localStorage.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-posts-wall',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts-wall.html',
  styleUrls: ['./posts-wall.css']
})
export class PostsWall {

      posts: {
        fecha?: any; 
        text?: string | null; 
        image?: string | null }[] = [];

          formattedDate: string | null;
          currentDate = new Date();


    private localStorageService = inject(storageService); // 👈 se inyecta aquí sin constructor
    imageURL = signal<string | null>(null);
    textIMG = signal<string | null>(null);

    //Listas de los usuarios del sistema(?)
    stored = localStorage.getItem("pinkApp_UsersList")
     users = this.stored ? JSON.parse(this.stored): []

      constructor(private authService:AuthService, private datePipe: DatePipe){
        this.formattedDate = this.datePipe.transform(this.currentDate, 'M/d/yy, h:mm a');
       }

  ngOnInit(){
  const stored = localStorage.getItem(this.getUsersNames + "_posts");
  this.posts = stored ? JSON.parse(stored) : [];
  this.formattedDate;
  }

  getUsersNames(){
  const usernames = this.users.map((user: { userName: any; }) => user.userName);
    console.log(usernames);
    return usernames;
  }

getImagesofUsers(){
  return this.localStorageService.getImageofAllUsers();
}

}
