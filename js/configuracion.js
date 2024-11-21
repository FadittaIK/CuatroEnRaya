

    function guardar(){

        var jugadores = document.querySelector("#numero").value;
        var animacio = document.querySelector("#fallLeave").value;
        var colores = document.querySelectorAll('[name="color"]');
        var niveles = document.querySelectorAll('[name="nivel"]');
        var color, nivel;

        

        //guardar el valor elegido
        for (var i = 0; i < colores.length; i++) {
            if (colores[i].checked) {
                color = colores[i].id;
                break;
            }
        }
        //si no ha elegido un color le sale error 
        if(color === undefined){
            alert("ERROR,debes elegir un color")
        }


        for (var j = 0; j < niveles.length; j++) {
            if (niveles[j].checked) {
                nivel = niveles[j].id;
                break;
            }
        }

        var guardarConfig = {
            ad: animacio,
            cl: color,
            nvl: nivel,
            jug: jugadores,
        };

        

        //a cada jugador le guardamos un array de objetos
        var jugador = parseInt(jugadores);
      
        if (jugador === 1) {
            localStorage.setItem("infoJugador1", JSON.stringify(guardarConfig));
        } else if (jugador === 2) {
            localStorage.setItem("infoJugador2", JSON.stringify(guardarConfig));
        }

        console.log("Configuración guardada para el jugador", jugador);

        //var infoJugador1 = localStorage.getItem("infoJugador1");
        //var infoJugador2 = localStorage.getItem("infoJugador2");

        var activaDesactivar = localStorage.getItem("infoJugador1");
        var config = JSON.parse(activaDesactivar); 
        var anim = config.ad;

       
       
        console.log(anim);

        var info2 = localStorage.getItem("infoJugador2");
        var config = JSON.parse(info2);
        var jugador2 = parseInt(config.jug);
        console.log(jugador2);
    }

    function borrar(){
        localStorage.clear();

    }

