

    var canvas = document.querySelector("#miCanva");
    var ctx = canvas.getContext("2d");
    var posicionCanvas = canvas.getBoundingClientRect();
    var NUM_FILAS = 6;
    var NUM_COLUMNAS = 7;

    var widthCasilla = canvas.width / NUM_COLUMNAS;
    var heightCasilla = canvas.height / NUM_FILAS;
    var mitadCasilla = widthCasilla / 2;

    var jugador1 = 1;
    var jugador2 = 2;
    var jugadorActual = jugador1;
    var colorJugador1 = "black";
    var colorJugador2 = "purple";
    var colorActual = colorJugador1;


    var tablero = [];

    function inicializaTablero() {
        for (var i = 0; i < NUM_FILAS; i++) {
            //a cada fila le asignamos un array 
            tablero[i] = [];
            for (var j = 0; j < NUM_COLUMNAS; j++) {
                tablero[i][j] = 0;
                // marcadas[i][j] = false;
            }
        }
    }



    inicializaTablero();
    function pintarTablero() {

        for (var j = 0; j < NUM_FILAS; j++) {
            for (var i = 0; i < NUM_COLUMNAS; i++) {

                ctx.fillStyle = '#2d3a2c';
                var coordenadaX = i * widthCasilla;
                var coordenadaY = j * heightCasilla;

                //console.log(widthCasella / 2)
                ctx.fillRect(coordenadaX, coordenadaY, widthCasilla, heightCasilla);
                //ctx.fill();

                ctx.beginPath();
                ctx.fillStyle = "#C6C7BF";
                ctx.arc(coordenadaX + mitadCasilla, coordenadaY + mitadCasilla, 48, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();
                ctx.closePath();

            }
        }
    }
    console.log(tablero)

    // pintar una partida guardada
    function partidaGuardada(numero) {
        var movimientos = "select fila,columna from movimiento where juega_id_juega =" + numero + ";"
        query(movimientos, pintarPartida);
    }

    function empate() {
        var turn = 0;
        for (var v = 0; v < tablero[0].length; v++) {
            if (tablero[0][v] === 0) {
                turn++;
            }
        }
        return turn === 0
    }

    function pintarPartida(json) {
        var turno = 0;
        var filas = []
        var columna = [];
        for (var f = 0; f < json.length; f++) {
            filas[f] = json[f].fila;
            columna[f] = json[f].columna;

            if (turno % 2 === 0) {
                ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.arc(filas[f] * widthCasilla + mitadCasilla, columna[f] * heightCasilla + mitadCasilla, 48, 0, 2 * Math.PI);
                ctx.fill();
                turno++;
            } else {
                ctx.fillStyle = "purple";
                ctx.beginPath();
                ctx.arc(filas[f] * widthCasilla + mitadCasilla, columna[f] * heightCasilla + mitadCasilla, 48, 0, 2 * Math.PI);
                ctx.fill();
                turno++;
            }
        }

    }

    function cambiarJugador(jugador) {
        jugadorActual = jugador;
    }

    //el jugador 1
    if (localStorage.getItem("infoJugador1")) {
        var infoJugador1 = localStorage.getItem("infoJugador1");
        var configJugador1 = JSON.parse(infoJugador1);
        var colorJugador1 = configJugador1.cl;
        cambiarJugador(jugador1);
    }


    //el jugador 2
    if (localStorage.getItem("infoJugador2")) {
        var infoJugador2 = localStorage.getItem("infoJugador2");
        var configJugador2 = JSON.parse(infoJugador2);
        var colorJugador2 = configJugador2.cl;
        cambiarJugador(jugador2);
    }

    if (colorJugador1 === colorJugador2) {
        alert("uno de los usuarios debe cambiar el color de su ficha, no se puede jugar con dos fichas del mismo color")
    } else {
        pintarTablero();
    }

    canvas.addEventListener('click', function (evento) {
        const x = evento.clientX - posicionCanvas.left;
        const y = evento.clientY - posicionCanvas.top;
        var fila = Math.floor(y / heightCasilla);
        var columna = Math.floor(x / widthCasilla);

        if (jugadorActual === jugador1) {
            colorActual = colorJugador1;
            cambiarJugador(jugador2);
        } else {
            colorActual = colorJugador2;
            cambiarJugador(jugador1);
        }

        console.log("el jugador actual", jugadorActual, "su color", colorActual);


        filaDis = filaDisponible(columna);


        if (filaDis <= tablero.length && filaDis !== 0) {
            var posY = (filaDis - 1) * heightCasilla + mitadCasilla;
            var posX = columna * widthCasilla + mitadCasilla;
            ctx.fillStyle = colorActual;
            ctx.beginPath();
            ctx.arc(posX, posY, 48, 0, 2 * Math.PI);
            ctx.fill();
            //marcadas[filaDis-1][columna] = true;
            tablero[filaDis - 1][columna] = jugadorActual;
            document.querySelector(".error").innerHTML = " ";

            //verificacion si hay un ganador
            if (verificarVictoria()) {
                document.querySelector(".error").innerHTML = "<b>Ha Ganado el jugador '" + colorActual + "'</b>";
                setTimeout(function () {
                    document.querySelector(".error").innerHTML = " ";
                    pintarTablero();
                    location.reload();
                }, 2000)
            } else if (empate()) {
                document.querySelector(".error").innerHTML = "<b> Empate</b>";
                setTimeout(function () {
                    document.querySelector(".error").innerHTML = " ";
                    pintarTablero();
                    location.reload();
                }, 2000)
            }
        } else {
            document.querySelector(".error").innerHTML = "<b>la columna esta completa ,Elige otra posición</b>";
        }
        console.log(tablero)


    });

    function filaDisponible(columna) {

        var contador = 0;

        for (var fila = 0; fila < NUM_FILAS; fila++) {
            if (tablero[fila][columna] === 0) {
                contador++;
            } else {
                break;
            }
        }
        console.log("contador " + contador)
        return contador;// devuelve -1 si no se encuentra una fila disponible en la columna*



    }

    function verificarVictoria() {
        return verificarColumnas() || verificarFilas() || verificarDiagonales1() || verificarDiagonales2();
    }


    function verificarFilas() {
        for (var i = tablero.length - 1; i >= 0; i--) {
            var contadorDeColumnas = 0;//cada vez disminuye 'i' el contador empieza desde 0 para la nueva fila
            for (var j = 1; j < tablero[0].length; j++) {//5-1 con 5-0
                if (tablero[i][j - 1] == tablero[i][j] && tablero[i][j - 1] !== 0) {
                    contadorDeColumnas++;
                } else {
                    contadorDeColumnas = 0;
                }
                if (ganar(contadorDeColumnas)) {
                    return true;
                }
            }
        }
        return false;
    }

    function ganar(contador) {
        var PUNTOS_PARA_GANAR = 3;//comprobar la casilla actual con su anterior si son 4 casillas pues son 3 comprobaciones
        return (contador == PUNTOS_PARA_GANAR);

    }


    function verificarColumnas() {
        for (var j = 0; j < tablero[0].length; j++) {
            var contadorFila = 0;
            for (var i = tablero.length - 1; i > 0; i--) {// 50 con 40
                if (tablero[i][j] == tablero[i - 1][j] && tablero[i][j] !== 0) {
                    contadorFila++;
                } else {
                    contadorFila = 0;
                }
                if (ganar(contadorFila)) {
                    return true;
                }
            }
        }
        return false;
    }

    function verificarDiagonales1() {
        //verificar las diagonales izquierda -> a derecha

        for (var columna = 0; columna < 4; columna++) {
            var contadorDeCasillasDiagonalesDeAbajo = 0;//cada vez recorrer una diagonal nueva el contador empieza desde 0
            for (var i = tablero.length - 1, j = columna; i > 0 && j < tablero[0].length - 1; i--, j++) {
                if (tablero[i][j] == tablero[i - 1][j + 1] && tablero[i][j] !== 0) {
                    contadorDeCasillasDiagonalesDeAbajo++;
                } else {
                    contadorDeCasillasDiagonalesDeAbajo = 0;//si encuentra una casilla diferente que la anterior , contador vuevle a 0
                }
                if (ganar(contadorDeCasillasDiagonalesDeAbajo)) {
                    return true;
                }
            }
        }

        //Recorrer diagonales arriba de la diagonal segundaria
        for (var fila = 4; fila > 2; fila--) {// no llega a la fila 2 porque no tiene 4 casillas
            var contadorDeCasillasDiagonalesDeArriba = 0;
            for (var j = 0, i = fila; j < tablero[0].length - 1 && i > 0; j++, i--) {
                if (tablero[i][j] == tablero[i - 1][j + 1] && tablero[i][j] !== 0) {
                    contadorDeCasillasDiagonalesDeArriba++;
                } else {
                    contadorDeCasillasDiagonalesDeArriba = 0;
                }
                if (ganar(contadorDeCasillasDiagonalesDeArriba)) {
                    return true;
                }
            }
        }
        return false;
    }

    function verificarDiagonales2() {
        //recorrer las diagonales de derecha <-- a izquierda


        for (var columna = tablero[0].length - 1; columna > 2; columna--) {
            var contadorDeCasillasAbajo = 0;
            for (var i = tablero.length - 1, j = columna; i > 0 && j > 0; i--, j--) {
                if (tablero[i][j] == tablero[i - 1][j - 1] && tablero[i][j] !== 0) {
                    contadorDeCasillasAbajo++;
                } else {
                    contadorDeCasillasAbajo = 0;
                }
                if (ganar(contadorDeCasillasAbajo)) {
                    return true;
                }
            }
        }
        for (var fila = 4; fila < 2; fila--) {
            var contadorDeCasillasArriba = 0;
            for (var i = fila, j = tablero[0].length; i > 0 && j > 0; i--, j--) {
                if (tablero[i][i] == tablero[i - 1][j - 1] && tablero[i][j] !== 0) {
                    contadorDeCasillasArriba++;
                } else {
                    contadorDeCasillasArriba = 0;
                }
                if (ganar(contadorDeCasillasArriba)) {
                    return true;
                }
            }
        }
        return false;

    }




    //pintarTablero();





