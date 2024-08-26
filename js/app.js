
//La letra "e" es convertida para "enter"
//La letra "i" es convertida para "imes"
//La letra "a" es convertida para "ai"
//La letra "o" es convertida para "ober"
//La letra "u" es convertida para "ufat"

const mensaje = document.querySelector(".mensaje");
const texto = document.querySelector(".texto");

function btnEncriptar() {
  const textoEncriptado = transformarTexto(mensaje.value, true);
  texto.value = textoEncriptado;
  mensaje.value = "";
  ocultarElementos();
  mostrarBotonCopiar();
}

function btnDesencriptar() {
  const textoDesencriptado = transformarTexto(mensaje.value, false);
  texto.value = textoDesencriptado;
  mensaje.value = "";
  ocultarElementos();
  mostrarBotonCopiar();
}

function validarTexto(texto) {
  const regex = /^[a-z\s]+$/; // Solo letras minúsculas y espacios
  return regex.test(texto);
}


function transformarTexto(string, esEncriptar) {
  const matrizCodigo = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
  ];
  string = string.toLowerCase();

  for (let i = 0; i < matrizCodigo.length; i++) {
    const [letra, codigo] = matrizCodigo[i];
    const buscar = esEncriptar ? letra : codigo;
    const reemplazo = esEncriptar ? codigo : letra;
    string = string.replaceAll(buscar, reemplazo);
  }
  return string;
}

// Función para copiar el texto
function copiar() {
  navigator.clipboard.writeText(texto.value)
    .then(() => {
      alert("Texto copiado al portapapeles");
      // Cambiar temporalmente el texto del botón para indicar que se copió
      const btnCopiar = document.querySelector(".btn-copiar");
      const textoOriginal = btnCopiar.textContent;
      btnCopiar.textContent = "Copiado!";
      setTimeout(() => btnCopiar.textContent = textoOriginal, 2000);
    })
    .catch(err => {
      console.error("Error al copiar el texto: ", err);
    });
}

// Mostrar botón de copiar al tener texto
function mostrarBotonCopiar() {
  const btnCopiar = document.querySelector(".btn-copiar");
  btnCopiar.style.visibility = texto.value ? "visible" : "hidden";
}

// Función para ocultar la imagen y los textos
function ocultarElementos() {
  document.querySelector(".imagen-muñeco").style.display = "none";
  document.querySelector(".texto1").style.display = "none";
  document.querySelector(".texto2").style.display = "none";
}


// Validación en tiempo real mientras el usuario escribe
mensaje.addEventListener("input", () => {
  const textoIngresado = mensaje.value;
  
  // Verifica si el último carácter ingresado es válido
  if (!validarTexto(textoIngresado)) {
    alert("Solo se permiten letras minúsculas y sin acentos.");
    
    // Elimina el último carácter inválido
    mensaje.value = textoIngresado.slice(0, -1);
  }
});