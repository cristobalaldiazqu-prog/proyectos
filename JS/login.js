// Usuarios de demostración (simulando base de datos)
const usuariosDemo = [
  {
    id: 1,
    usuario: "paciente",
    password: "paciente123",
    rol: "paciente",
    nombre: "María González Pérez",
    email: "maria.gonzalez@email.com",
  },
  {
    id: 2,
    usuario: "medico",
    password: "medico123",
    rol: "medico",
    nombre: "Dr. Carlos Ruiz",
    email: "carlos.ruiz@hospital.com",
  },
  {
    id: 3,
    usuario: "admin",
    password: "admin123",
    rol: "admin",
    nombre: "Administrador Sistema",
    email: "admin@sistema.com",
  },
]

// Verificar si ya hay sesión activa
document.addEventListener("DOMContentLoaded", () => {
  verificarSesionActiva()

  // Configurar formulario de login
  const loginForm = document.getElementById("loginForm")
  loginForm.addEventListener("submit", handleLogin)
})

function verificarSesionActiva() {
  const sesion = localStorage.getItem("sesionActiva")

  if (sesion) {
    const usuario = JSON.parse(sesion)
    redirigirSegunRol(usuario.rol)
  }
}

function handleLogin(e) {
  e.preventDefault()

  const usuario = document.getElementById("usuario").value.trim()
  const password = document.getElementById("password").value
  const recordar = document.getElementById("recordar").checked

  // Validar credenciales
  const usuarioEncontrado = usuariosDemo.find((u) => u.usuario === usuario && u.password === password)

  if (usuarioEncontrado) {
    // Login exitoso
    const sesionData = {
      id: usuarioEncontrado.id,
      usuario: usuarioEncontrado.usuario,
      rol: usuarioEncontrado.rol,
      nombre: usuarioEncontrado.nombre,
      email: usuarioEncontrado.email,
      timestamp: new Date().toISOString(),
    }

    // Guardar sesión
    if (recordar) {
      localStorage.setItem("sesionActiva", JSON.stringify(sesionData))
    } else {
      sessionStorage.setItem("sesionActiva", JSON.stringify(sesionData))
    }

    mostrarAlerta("Inicio de sesión exitoso. Redirigiendo...", "success")

    // Redirigir después de 1 segundo
    setTimeout(() => {
      redirigirSegunRol(usuarioEncontrado.rol)
    }, 1000)
  } else {
    // Login fallido
    mostrarAlerta("Usuario o contraseña incorrectos", "danger")

    // Limpiar campos
    document.getElementById("password").value = ""
    document.getElementById("password").focus()
  }
}

function redirigirSegunRol(rol) {
  const rutas = {
    paciente: "index_paciente.html",
    medico: "index_medico.html",
    admin: "index_admin.html",
  }

  const ruta = rutas[rol]

  if (ruta) {
    window.location.href = ruta
  } else {
    mostrarAlerta("Error: Rol de usuario no válido", "danger")
  }
}

function togglePassword() {
  const passwordInput = document.getElementById("password")
  const toggleIcon = document.getElementById("toggleIcon")

  if (passwordInput.type === "password") {
    passwordInput.type = "text"
    toggleIcon.classList.remove("bi-eye")
    toggleIcon.classList.add("bi-eye-slash")
  } else {
    passwordInput.type = "password"
    toggleIcon.classList.remove("bi-eye-slash")
    toggleIcon.classList.add("bi-eye")
  }
}

function mostrarRecuperarPassword() {
  mostrarAlerta(
    "Para recuperar su contraseña, contacte al administrador del sistema en admin@sistema.com",
    "info",
    8000,
  )
}

function mostrarAlerta(mensaje, tipo = "info", duracion = 3000) {
  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${tipo} alert-dismissible fade show alert-floating`
  alertDiv.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `

  document.body.appendChild(alertDiv)

  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove()
    }
  }, duracion)
}

// Prevenir envío del formulario con Enter en campos de texto
document.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && e.target.tagName !== "BUTTON") {
    e.preventDefault()
    document.getElementById("loginForm").dispatchEvent(new Event("submit"))
  }
})
