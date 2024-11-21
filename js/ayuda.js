
function verMas(index){
    parteNoSeVe = document.querySelectorAll(".noSeVe");
    buton = document.querySelectorAll("button");

    if( buton[index].innerHTML.endsWith("Más")){
        parteNoSeVe[index].style.display = "block";
        buton[index].innerHTML = "Ver Menos";
        buton[index].style.background = " #a48bb7";


    }else{
        parteNoSeVe[index].style.display = "none";
        buton[index].innerHTML = "Ver Más";
        buton[index].style.background = "white";

    }
    //console.log("has elegido "+ index);
}
