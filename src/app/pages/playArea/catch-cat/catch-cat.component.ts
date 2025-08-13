import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-catch-cat',
  templateUrl: './catch-cat.component.html',
  styleUrls: ['./catch-cat.component.css']
})


export class CatchCatComponent {

  intervalActive = false;

  score = signal(0);

  ngOnInit() {

//     document.addEventListener('visibilitychange', () => { //???????????????????????????????
//   if (document.visibilityState === 'visible') {
//     console.log('La pestaña está visible para el usuario');
//   } else {
//     console.log('La pestaña NO está visible');
//   }
  
// });


// aqui se mueve al gato na mas iniciar, y se va actualizando posicion??
 setInterval(() => {
    this.moveCatRandomly();
  }, 500);
  }

  moveCatRandomly() {
    console.log("el gato se mueve")
  const img = document.getElementById("cat") as HTMLImageElement
  const container = document.querySelector(".game-container") as HTMLDivElement;

  //esto pa hacer que el gato no salga del container
  const maxTop = container.clientHeight - img.clientHeight;
  const maxLeft = container.clientWidth - img.clientWidth;

  const top = Math.round(Math.random() * maxTop)
  const left = Math.round(Math.random() * maxLeft)

  const topString = top.toString()
  const leftString = left.toString()

  if(img!=null){
  img.style.top = topString + "px"
  img.style.left = leftString + "px"
  }

//pa mover al gato al azar

  }
  catchCat() {
    this.score.update((s)=> s+1)
    this.moveCatRandomly(); // se vuvelve a mover gato
  }
}
