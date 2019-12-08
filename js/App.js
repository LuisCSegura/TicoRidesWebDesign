class Usuario {
  constructor(usuario, nombre, apellidos, telefono, correo, contrasenna) {
    this.usuario = usuario;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.telefono = telefono;
    this.correo = correo;
    this.contrasenna = contrasenna;
    this.velocidad = 60;
    this.informacion = "";
    this.rides = [];
  }
}
class Ride {
  constructor(
    nombre,
    partida,
    destino,
    descripcion,
    hora_partida,
    hora_llegada,
    dias
  ) {
    this.nombre = nombre;
    this.partida = partida;
    this.destino = destino;
    this.descripcion = descripcion;
    this.hora_partida = hora_partida;
    this.hora_llegada = hora_llegada;
    this.dias = dias;
  }
}
//Funciones de Usuario___________________________________________________________

function guardar_usuario(usuario) {
  localStorage.setItem(usuario.usuario, JSON.stringify(usuario));
}
function obtener_usuario(id) {
  return JSON.parse(localStorage.getItem(id));
}
function validar_usuario(usuario, recontrasenna) {
  var errormsj = "";
  if (localStorage.getItem(usuario.usuario)) {
    errormsj = "El nombre de usuario no está disponible";
  } else if (usuario.contrasenna != recontrasenna) {
    errormsj = "Las contraseñas no coinciden";
  } else if (usuario.contrasenna.length < 8) {
    errormsj = "La contraseña debe de ser de un minimo de 8 caracteres";
  }
  return errormsj;
}
/**
 * retorna TRUE en caso de que los datos de usuario sean validos y de lo contrario devuelve FALSE
 * @param {string con el nombre de usuario introducido} usuario
 * @param {string con la contraseña introducida} contrasenna
 */
function autenticar_usuario(usuario, contrasenna) {
  if (localStorage.getItem(usuario) && usuario != "SesionIniciada") {
    const u = obtener_usuario(usuario);
    if (u.contrasenna == contrasenna) {
      localStorage.setItem("SesionIniciada", u.usuario);
      return true;
    } else {
      alert("La contraseña no corresponde con el usuario especificado");
    }
  } else {
    alert("El usuario especificado no está registrado");
  }
  return false;
}
/**
 * retorna el valor de la sesión actual
 */
function obtener_sesion() {
  return localStorage.getItem("SesionIniciada");
}

//Funciones de Rides_________________________________________________________
/**
 * valida si un ride es correcto para guardar
 * @param {ride a validar} ride
 */
function validar_ride(ride) {
  var usu = obtener_usuario(obtener_sesion());
  var errormsj = "";
  var repetido = false;
  for (i = 0; i < usu.rides.length; i++) {
    if (usu.rides[i].noombre == ride.nombre) {
      repetido = true;
    }
  }
  if (repetido == true) {
    errormsj = "El nombre del ride no está disponible";
  }
  return errormsj;
}
/**
 * guarda un ride en su respectivo usuario
 * @param {ride a guardar} ride
 */
function guardar_ride(ride) {
  var usu = obtener_usuario(obtener_sesion());
  usu.rides.push(ride);
  guardar_usuario(usu);
}

/**
 * obtiene los rides del usuario logueado
 */
function obtener_rides() {
  var usu = obtener_usuario(obtener_sesion());
  return usu.rides;
}
/**
 * elimina el ride que le indica el botón
 * @param {boton que ejecuta la orden de eliminar} boton
 */
function eliminar_ride(boton) {
  const idRide = boton.id;
  var opt = confirm("¿Desea eliminar el ride " + idRide + "?");
  if (opt == 1) {
    var usu = obtener_usuario(obtener_sesion());
    for (let i = 0; i < usu.rides.length; i++) {
      if (usu.rides[i].nombre == idRide) {
        usu.rides.splice(i,1);
      }
    }
    guardar_usuario(usu);
    location.reload();
  }
}
/**
 * envia el id del ride a editar a la pagina correspondiente
 * @param {bton que ejecuta la orden} boton 
 */
function editar_ride(boton){
  var pagina = "EditarRide.html";
  pagina +=  "?ride=" + escape(boton.id);
  location.href=pagina;
}
/**
 * envia el id del ride para visualizar en la pagina correspondiente
 * @param {bton que ejecuta la orden} boton 
 */
function ver_ride(boton){
  var pagina = "VerrRide.html";
  pagina +=  "?ride=" + escape(boton.id);
  location.href=pagina;
}
/**
 * carga un ride según su nombre
 * @param {nombre del ride a cargar} idRide 
 */
function obtener_ridePorId(idRide){
  const listaRides=obtener_rides();
  var ride;
  for (let i = 0; i < listaRides.length; i++) {
    if(listaRides[i].nombre==idRide){
        ride=listaRides[i];
    }
    
  }
  return ride;
}
/**
 * guarda un ride editado
 * @param {ride a editar} ride 
 */
function guardar_rideEditado(ride){
  var usu = obtener_usuario(obtener_sesion());
  for (let i = 0; i < usu.rides.length; i++) {
     if(usu.rides[i].nombre==ride.nombre){
       usu.rides[i]=ride;
     }
     guardar_usuario(usu);
   }
}
