let botonIniciar      = document.getElementById("iniciarJuego");
let botonAgregar      = document.getElementById("agregarPalabra");
let palabraIndividual = document.querySelector(".letras");
let puntos            = document.getElementById("puntos");
let mostrarinfo       = document.getElementById("mostrarInfo");  
let palabrasTotales   = document.getElementById("palabrasTotales");
let intentosRestantes = document.getElementById("intentosRestantes");
let imagen            = document.getElementById("imagen");

let puntaje = 0;
let i = 0;
let intentos = 7;
let letra = ""; 
let palabra = "";

let sonido = new Audio("audio/click.wav")

let nuevaPalabra  = "";
let nuevaPalabraArreglo = [];
let ingresos = [];
let correctas = [];
let nuevoArregloPalabras   = [];
let arregloPalabrasDefault = ["ARAÑA","ESCOBA","ESCORPION","COMPUTADORA","CELULAR","INTERNET","PROGRAMACION","BALLENA","SILLA","TERMO"];


//EVENTOS DE BOTONES
botonIniciar.addEventListener("click",iniciarJuego);
botonAgregar.addEventListener("click",agregarPalabra);

function dibujar(intentos) {
    if (intentos == 6){ imagen.src = "img/5.png" }
    if (intentos == 5){ imagen.src = "img/4.png" }
    if (intentos == 4){ imagen.src = "img/3.png" }
    if (intentos == 3){ imagen.src = "img/2.png" }
    if (intentos == 2){ imagen.src = "img/1.png" }
    if (intentos == 1){ imagen.src = "img/0.png" }
}

function mostrarInfo() {
    if (palabra != "")
    {
    mostrarinfo.innerHTML = "Cada palabra correcta equivale a 100 pts. menos 5ptos por cada error.";
    }
}

function ocultarInfo() {
    mostrarinfo.innerHTML = null;
}

// FUNCION PARA ELEGIR PALABRA ALEATORIA
function elegirPalabra(){
    return Math.floor(Math.random()*arregloPalabrasDefault.length);
}

// FUNCION PARA INICIAR JUEGO
function iniciarJuego(){
    botonIniciar.innerHTML="Nueva Palabra";
    palabrasTotales.innerHTML=(`Palabras restantes en juego: ${arregloPalabrasDefault.length}`) 
    
    if (arregloPalabrasDefault.length >= 1){
        i = elegirPalabra();
        palabra = arregloPalabrasDefault[i].toUpperCase().slice("");
        dibujarGuiones(palabra.length);
    } else {
        alert("Felicidades a completado todas las Palabras. El juego se reiniciará.");
        reiniciarPalabras();
    }
}

//FUNCION PARA DIBUJAR GUIONES
function dibujarGuiones(largo) {
    palabraIndividual.innerHTML = ""; 
    for (let index = 0; index < largo; index++) {
        palabraIndividual.innerHTML += `<div class="letraIndividual"></div>`      
  }
}

//FUNCION PARA REINICIAR EL JUEGO CON LAS PALABRAS AGREGADAS
function reiniciarPalabras() {
    console.log("Reinciando Juego");
    puntaje = 0;
    puntos.innerHTML = "";
    arregloPalabrasDefault = ["ARAÑA","ESCOBA","ESCORPION","COMPUTADORA","CELULAR","INTERNET","PROGRAMACION","BALLENA","SILLA","TERMO"];
    arregloPalabrasDefault = arregloPalabrasDefault.concat(nuevoArregloPalabras);
    iniciarJuego();
}



//FUNCION PARA AGREGAR PALABRA
function agregarPalabra(){
   nuevaPalabra = prompt("Ingrese Nueva Palabra");
   if(nuevaPalabra === null){
       return
   } else {
    if (comprobarNuevaPalabra(nuevaPalabra)){
        arregloPalabrasDefault.push(nuevaPalabra.toUpperCase());
        nuevoArregloPalabras.push(nuevaPalabra.toUpperCase());
        iniciarJuego();
       }
   }
  
}

//FUNCION DETECTAR LAS PRESIONES DEL TECLADO
function teclaPresionada(event) {
    const regular = /[^A-z^Ñ]+/gm;
    if (palabra != ""){
        let key = event.key.toUpperCase(); 
        if (regular.test(key) !=true)
        {
            if (key === "ENTER"){
                agregarPalabra();
            } else{
           // sonido.play();
            jugando(key)}
        }
    }else {
        iniciarJuego();
    }
}

function presion() {
    if (palabra !=""){
        letra = prompt("Ingrese una letra");
        if (letra === null || letra.length > 1){
            return
        } else 
            jugando(letra);
        } else{   
        iniciarJuego();
        letra = prompt("Ingrese una letra");
        jugando(letra.toLocaleUpperCase());
        }
}

//FUNCION DE JUEGO
function jugando(key)
{
    for (let index = 0; index <= palabra.length; index++) 
    {
      if (key === palabra[index] )
      {
        correctas.push(key);   
        nuevaPalabraArreglo[index] = key;
        palabraIndividual.children[index].innerHTML = key;
      }
    }
    
    if (!ingresos.includes(key) && !correctas.includes(key)) {
        console.log(intentos);
        intentos--;
        ingresos.push(key); 
        dibujar(intentos);  
    } 
    
    if (intentos < 1)  {
            dibujar(intentos)
            alert(`Se terminaron los intentos. La palabra correcta era ${palabra}`);
            limpieza(i);
            iniciarJuego();
        }

    if (nuevaPalabraArreglo.join("").length === palabra.length)
    {
        puntaje = puntaje + 100 - (ingresos.length * 5);
        puntos.innerHTML = `Puntaje ${puntaje}`;
        limpieza(i);
        iniciarJuego();
    }
} 
    
//FUNCION QUE COMPRUEBA QUE LA PALABRA NO ESTE REPETIDA NI TENGA CARACTERES ERRONEOS
function comprobarNuevaPalabra(nuevaPalabra){
    const regular = /[^A-z^ñ""]+/gm;
    if (nuevaPalabra.length != 0)
    {
        if (regular.test(nuevaPalabra) !=true && nuevaPalabra.length >= 3 && nuevaPalabra.length <= 13)
        {
            if (!arregloPalabrasDefault.includes(nuevaPalabra.toUpperCase())){
                return true;
            } else{
                alert("La palabra ingresada ya se encuentra en el listado");  
                
            }
        }
        else {
            alert("La palabra debe ser mayor o igual a 3 y menor o igual a 13 caracteres, ademas no debe contener caracteres especiales, espacios o numeros");
        }
    }
    else
    {
        alert("El texto no puede estar vacio");
        return false;
    }
}

//FUNCION LIMPIEZA DE ARREGLOS
function limpieza(i){
    ingresos            = [];
    correctas           = [];
    intentos            = 7;
    nuevaPalabraArreglo = [];
    arregloPalabrasDefault.splice(i,1);
    imagen.src = "img/6.png"
    
}