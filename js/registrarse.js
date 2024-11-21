
function insertarDatos(json) {

    
    var nombre = document.querySelector("#nombre").value;
    var ap1 = document.querySelector("#ap1").value;
    var ap2 = document.querySelector("#ap2").value;
    var email = document.querySelector("#email").value;
    var tel = document.querySelector("#telefono").value;
    var fechaNaci = document.querySelector("#fehcaNacimiento").value;
    var ciudad = document.querySelector("#ciudad").value;

    var ciudadInsert = parseInt(ciudad);
    console.log(ciudadInsert)



    var insert = "insert into usuario(nombre,apellido1,apellido2,correo,telefono,fecha_naci,ciudad_id_ciudad) VALUES ('" + nombre + "', '" + ap1 + "', '" + ap2 + "', '" + email + "', '" + tel + "', '" + fechaNaci + "','"+ciudadInsert+ "')";


    query(insert, resultado);
}


function resultado() {
    document.querySelector(".missatge").innerHTML += "<h1> USUARI INSERIT AMB EXIT </h1>";
    setTimeout(function(){
        window.location.reload();
    },3000)

}



function porcentajeUsuariosQueHanParticipado(json) {
    console.log(json);
    console.log(json[0].total);
    var totalUsuarios = json[0].total;

    var procentaje = (json[0].usuariosP / totalUsuarios) * 100;

    document.querySelector(".procentaje").innerHTML += procentaje+"%";
}

var p = "select count(distinct t.usuario_id_usuario) as usuariosP, (select count(id_usuario) from usuario) as total from usuario_torneo as t join usuario as s on s.id_usuario = t.usuario_id_usuario";

query(p, porcentajeUsuariosQueHanParticipado);


function usuariosClasificados(json) {
    console.log(json);
    var resultado = " ";
    for (var i = 0; i < json.length; i++) {
        resultado += "<li>" + json[i].nombre+" "+json[i].apellido1 + " " +json[i].clasificacion+"</li>";
    }
    
    document.querySelector(".infoUsers").innerHTML += resultado;
    //pintar al dom


}

var usuarios_clasificados = "select  distinct nombre,apellido1,clasificacion from usuario join usuario_torneo on usuario.id_usuario = usuario_torneo.usuario_id_usuario order by clasificacion desc limit 3;"
query(usuarios_clasificados,usuariosClasificados);


