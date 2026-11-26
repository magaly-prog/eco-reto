const pantallaInicio =
document.getElementById("pantallaInicio");

const pantallaRegistro =
document.getElementById("pantallaRegistro");

const pantallaLogin =
document.getElementById("pantallaLogin");

const dashboard =
document.getElementById("dashboard");

document
.getElementById("btnRegistro")
.addEventListener("click", () => {

    pantallaInicio.classList.add("oculto");

    pantallaRegistro.classList.remove("oculto");

});

document
.getElementById("btnLogin")
.addEventListener("click", () => {

    pantallaInicio.classList.add("oculto");

    pantallaLogin.classList.remove("oculto");

});

document
.getElementById("guardarUsuario")
.addEventListener("click", () => {

    const usuario = {

        nombre:
        document.getElementById("nombre").value,

        carrera:
        document.getElementById("carrera").value,

        semestre:
        document.getElementById("semestre").value,

        correo:
        document.getElementById("correo").value,

        password:
        document.getElementById("password").value,

        puntos: 0

    };

    localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
    );

    alert("Cuenta creada");

    pantallaRegistro.classList.add("oculto");

    pantallaLogin.classList.remove("oculto");

});

document
.getElementById("entrarSistema")
.addEventListener("click", () => {

    const correo =
    document.getElementById("loginCorreo").value;

    const password =
    document.getElementById("loginPassword").value;

    const usuario =
    JSON.parse(
        localStorage.getItem("usuario")
    );

    if(
        correo === usuario.correo &&
        password === usuario.password
    ){

        pantallaLogin.classList.add("oculto");

        dashboard.classList.remove("oculto");

        document.getElementById(
            "nombreUsuario"
        ).textContent =
        usuario.nombre;
        document.getElementById(
    "carreraUsuario"
).textContent =
"Carrera: " +
usuario.carrera;

document.getElementById(
    "semestreUsuario"
).textContent =
"Semestre: " +
usuario.semestre;

        document.getElementById(
            "ecoPuntos"
        ).textContent =
        usuario.puntos;
        actualizarArbol(usuario.puntos);
        

    }else{

        alert(
            "Correo o contraseña incorrectos"
        );

    }

});

function actualizarArbol(puntos){

    const arbol =
    document.getElementById("arbolVirtual");

    if(puntos < 20){

        arbol.textContent = "🌱";

    }
    else if(puntos < 50){

        arbol.textContent = "🌿";

    }
    else if(puntos < 100){

        arbol.textContent = "🌳";

    }
    else{

        arbol.textContent = "🌲";

    }

}

document
.getElementById("sumarPuntos")
.addEventListener("click", () => {

    let usuario =
    JSON.parse(
        localStorage.getItem("usuario")
    );

    usuario.puntos += 10;
    

    localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
    );

    document.getElementById(
        "ecoPuntos"
    ).textContent =
    usuario.puntos;


    actualizarInsignias(
    usuario.puntos
);

actualizarNivel(
    usuario.puntos
);
actualizarNivel(
    usuario.puntos
);

actualizarProgreso(
    usuario.puntos
);

actualizarProgreso(
    usuario.puntos
);

crearGrafica();
actualizarRanking(usuario);


});

let miGrafica = null;

function crearGrafica() {
    console.log("Creando gráfica...");

    const canvas =
    document.getElementById("graficaReciclaje");

    if (!canvas) return;

    const ctx =
    canvas.getContext("2d");

    if (miGrafica) {
        miGrafica.destroy();
    }

    miGrafica = new Chart(ctx, {

        type: "pie",

        data: {

            labels: [
                "Plástico",
                "Papel",
                "Vidrio",
                "Metal"
            ],

            datasets: [{
                data: [35, 25, 20, 20],

                backgroundColor: [
                    "#4CAF50",
                    "#2196F3",
                    "#FFC107",
                    "#F44336"
                ]
            }]
        },

        options: {

            responsive: true,

            maintainAspectRatio: false

        }

    });

}
let qrIniciado = false;

document
.getElementById("abrirQR")
.addEventListener("click", iniciarQR);

function iniciarQR(){

    if(qrIniciado) return;

    qrIniciado = true;

    const html5QrCode =
    new Html5Qrcode("reader");

    html5QrCode.start(

        { facingMode: "environment" },

        {
            fps: 10,
            qrbox: 250
        },

        (textoQR) => {

            document
            .getElementById("resultadoQR")
            .textContent =
            "QR Detectado: " +
            textoQR;

            let usuario =
            JSON.parse(
                localStorage.getItem("usuario")
            );

if(textoQR === "PLASTICO"){

    usuario.puntos += 20;

}
else if(textoQR === "PAPEL"){

    usuario.puntos += 15;

}
else if(textoQR === "VIDRIO"){

    usuario.puntos += 25;

}
else if(textoQR === "METAL"){

    usuario.puntos += 35;

}

            document
            .getElementById("ecoPuntos")
            .textContent =
            usuario.puntos;

            actualizarArbol(
                usuario.puntos
            );

        }

    );

}
function actualizarInsignias(puntos){

    const ins1 =
    document.getElementById("ins1");

    const ins2 =
    document.getElementById("ins2");

    const ins3 =
    document.getElementById("ins3");

    if(puntos >= 20){

        ins1.textContent = "♻️";

    }

    if(puntos >= 50){

        ins2.textContent = "🌿";

    }

    if(puntos >= 100){

        ins3.textContent = "🌎";

    }

}
function actualizarNivel(puntos){

    let nivel =
    "Semilla 🌱";

    if(puntos >= 20){

        nivel =
        "Brote 🌿";

    }

    if(puntos >= 50){

        nivel =
        "Árbol 🌳";

    }

    if(puntos >= 100){

        nivel =
        "Bosque 🌲";

    }

    if(puntos >= 200){

        nivel =
        "Guardián del Planeta 🌎";

    }

    document
    .getElementById(
        "nivelUsuario"
    )
    .textContent = nivel;

}
function actualizarProgreso(puntos){

    let porcentaje =
    puntos;

    if(porcentaje > 100){

        porcentaje = 100;

    }

    document
    .getElementById(
        "progreso"
    )
    .style.width =
    porcentaje + "%";

    document
    .getElementById(
        "textoProgreso"
    )
    .textContent =
    porcentaje + "%";
}
document
.getElementById("cerrarSesion")
.addEventListener("click", () => {

    dashboard.classList.add(
        "oculto"
    );

    pantallaInicio.classList.remove(
        "oculto"
    );
    setTimeout(() => {

    crearGrafica();

}, 1000);

});
function canjear(costo){

    let usuario =
    JSON.parse(
        localStorage.getItem("usuario")
    );

    if(usuario.puntos >= costo){

        usuario.puntos -= costo;

        localStorage.setItem(
            "usuario",
            JSON.stringify(usuario)
        );

        document
        .getElementById("ecoPuntos")
        .textContent =
        usuario.puntos;

        actualizarArbol(usuario.puntos);
        actualizarInsignias(usuario.puntos);
        actualizarNivel(usuario.puntos);
        actualizarProgreso(usuario.puntos);

        alert("Recompensa obtenida");

    }else{

        alert(
            "No tienes suficientes Eco Puntos"
        );

    }

}
function actualizarRanking(usuario){

    document
    .getElementById(
        "rankingCarreras"
    )
    .innerHTML = `

    <li>${usuario.carrera}</li>
    <li>TIC'S</li>
    <li>Gestión Empresarial</li>
    <li>Industrial</li>
    <li>Administración</li>

    `;
}