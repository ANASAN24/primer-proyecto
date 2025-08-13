import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/model/user.model';
import { SoundService } from 'src/app/services/sound.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  isLoginView: boolean = true;


  userRegisterObj: User ={
    userName: '',
    password: '',
    emailId: ''
  }

    userLoginObj: User ={
    userName: '',
    password: ''
  }

  // router = inject(Router);

  constructor(private SoundService:SoundService, private authService:AuthService){

  }

onRegister(){
const usernameInput = (document.getElementById('usernameInput') as HTMLInputElement).value;
const passwordInput = (document.getElementById('passwordInput') as HTMLInputElement).value;

if (usernameInput === '' || passwordInput === '') {return;}

this.authService.onRegister(this.userRegisterObj);

    this.userRegisterObj = {
      userName: '',
      password: '',
      emailId: ''
    }
}

  onLogin(){
    this.authService.onLogin(this.userLoginObj); 
  }
  
  playSounds(id:string):void{
    this.SoundService.playAudio(id);
  }

  checkLogin(nameElement:any, password:any, small:any){
    
    const text = document.getElementById(small) as HTMLElement
    const name = document.getElementById(nameElement) as HTMLInputElement;
    const pass = document.getElementById(password) as HTMLInputElement;

    if(name.value==="" || pass.value===""){
        text.style.visibility = 'visible';
    } else {
        text.style.visibility = 'hidden';
        this.onLogin();
    }
  }

    checkRegister(nameElement:any, password:any, email:any, small:any){
    
    const text = document.getElementById(small) as HTMLElement
    const name = document.getElementById(nameElement) as HTMLInputElement;
    const pass = document.getElementById(password) as HTMLInputElement;
    const em = document.getElementById(email) as HTMLInputElement;

    if(name.value==="" || pass.value==="" || em.value === ""){
        text.style.visibility = 'visible';
    } else {
        text.style.visibility = 'hidden';
        this.onRegister();
    }
  }

}
