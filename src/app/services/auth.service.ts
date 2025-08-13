import { inject, Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
    router = inject(Router);


    onRegister(userRegisterObj: User){
    const isLocalData= localStorage.getItem("pinkApp_UsersList");
    if(isLocalData != null){ //SI HAY DATA
      const localArray = JSON.parse(isLocalData); //leer y carga la data si ya existe algo guardandola ahi
      const isUserFound = localArray.find( (m: any) => m.userName == userRegisterObj.userName && m.userName !== "")
      if(isUserFound != undefined){
        alert("Este nombre de usuario ya existe");
      }else{
      localArray.push(userRegisterObj);    //guarda
      localStorage.setItem("pinkApp_UsersList", JSON.stringify(localArray)) //y aqui se guarda en el localdata
      alert("Registration Success");
      }
    } else { //NO HAY DATA
      const localArray = [];
      localArray.push(userRegisterObj);    //si no hay data se pasa la info del user en el array de data
      localStorage.setItem("pinkApp_UsersList", JSON.stringify(localArray)) //y aqui se guarda en el localdata
      alert("Registration Success");
    }
    // TODO: AQUI LIMPIO EL FORMULARIO PARA QUE AL REGISTRARSE SE QUITE LO ESCRITO:
    // userRegisterObj = {
    //   userName: '',
    //   password: '',
    //   emailId: ''
    // }
    
  }

    onLogin(userLoginObj:User){
    const isLocalData= localStorage.getItem("pinkApp_UsersList");
    if(isLocalData != null){

      const users = JSON.parse(isLocalData)

      const isUserFound = users.find( (m: any) => m.userName == userLoginObj.userName && m.password== userLoginObj.password)
      if(isUserFound != undefined){ // si encuentra el usuario justo que se escribio

        localStorage.setItem("currentUser", JSON.stringify(isUserFound)); // esto guarda el actual encontrado con la clave de currentUser pa saber el user logeado
        alert("Inicio de sesión correcto");
        this.router.navigateByUrl('dashboard'); // y te lleva a la app o wherever idk 
      } else {
        alert("User name or password wrong") // si da undefined porque no es correcto
      }
    } else{
      alert("No user found");
    }
  }

    userRegistered():User{

    const stored = localStorage.getItem("currentUser");
    
    if(stored != null){
     return JSON.parse(stored);
    } else {
     return {
        userName: "N/A",
        password: "N/A",
        emailId: "N/A",
      };
    }
  }

  
  

  
}
