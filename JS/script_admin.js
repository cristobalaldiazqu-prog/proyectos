// Datos del administrador
const adminActual = {
  id: 3,
  nombre: "Administrador Sistema",
  email: "admin@sistema.com",
  rol: "admin",
}

// Datos de recintos
const recintos = [
  {
    id: "hospital-central",
    nombre: "Hospital Central",
    direccion: "Av. Principal 123, Santiago",
    telefono: "+56 2 2345 6789",
    email: "contacto@hospitalcentral.cl",
    activo: true,
  },
  {
    id: "clinica-norte",
    nombre: "Clínica Norte",
    direccion: "Calle Norte 456, Santiago",
    telefono: "+56 2 3456 7890",
    email: "info@clinicanorte.cl",
    activo: true,
  },
]

// Datos de departamentos
const departamentos = [
  { id: "cardiologia", nombre: "Cardiología", recintoId: "hospital-central", activo: true },
  { id: "pediatria", nombre: "Pediatría", recintoId: "hospital-central", activo: true },
  { id: "medicina-general", nombre: "Medicina General", recintoId: "hospital-central", activo: true },
  { id: "dermatologia", nombre: "Dermatología", recintoId: "clinica-norte", activo: true },
  { id: "ginecologia", nombre: "Ginecología", recintoId: "clinica-norte", activo: true },
]

// Datos de médicos
const medicos = [
  {
    id: 1,
    nombre: "Dr. Carlos Ruiz",
    rut: "15.234.567-8",
    especialidad: "Cardiología",
    email: "carlos.ruiz@hospital.com",
    telefono: "+56 9 8765 4321",
    recintoId: "hospital-central",
    departamentoId: "cardiologia",
    activo: true,
  },
  {
    id: 2,
    nombre: "Dra. Patricia López",
    rut: "16.345.678-9",
    especialidad: "Cardiología",
    email: "patricia.lopez@hospital.com",
    telefono: "+56 9 7654 3210",
    recintoId: "hospital-central",
    departamentoId: "cardiologia",
    activo: true,
  },
  {
    id: 3,
    nombre: "Dra. Laura Sánchez",
    rut: "14.567.890-1",
    especialidad: "Pediatría",
    email: "laura.sanchez@hospital.com",
    telefono: "+56 9 6543 2109",
    recintoId: "hospital-central",
    departamentoId: "pediatria",
    activo: true,
  },
]

// Estadísticas generales
const estadisticas = {
  totalPacientes: 156,
  totalMedicos: 12,
  totalCitas: 342,
  citasHoy: 28,
  citasPendientes: 45,
  citasCompletadas: 267,
  citasCanceladas: 30,
}

// Verificar sesión
document.addEventListener("DOMContentLoaded", () => {
  verificarSesion()
  inicializarSistema()
  cargarEstadisticas()
  cargarRecintos()
  cargarDepartamentos()
  cargarMedicos()
})

function verificarSesion() {
  const sesion = localStorage.getItem("sesionActiva") || sessionStorage.getItem("sesionActiva")

  if (!sesion) {
    window.location.href = "login.html"
    return
  }

  const usuario = JSON.parse(sesion)

  if (usuario.rol !== "admin") {
    alert("Acceso no autorizado")
    cerrarSesion()
  }
}

function cerrarSesion() {
  localStorage.removeItem("sesionActiva")
  sessionStorage.removeItem("sesionActiva")
  window.location.href = "login.html"
}

function inicializarSistema() {
  document.getElementById("nombreAdmin").textContent = adminActual.nombre.split(" ")[0]
  document.getElementById("perfilNombre").textContent = adminActual.nombre
  document.getElementById("perfilEmail").textContent = adminActual.email
}

function cargarEstadisticas() {
  document.getElementById("totalPacientes").textContent = estadisticas.totalPacientes
  document.getElementById("totalMedicos").textContent = estadisticas.totalMedicos
  document.getElementById("totalCitas").textContent = estadisticas.totalCitas
  document.getElementById("citasHoy").textContent = estadisticas.citasHoy
  document.getElementById("citasPendientes").textContent = estadisticas.citasPendientes
  document.getElementById("citasCompletadas").textContent = estadisticas.citasCompletadas
}

function cargarRecintos() {
  const container = document.getElementById("listaRecintos")

  container.innerHTML = recintos
    .map(
      (recinto) => `
        <div class="item-card">
            <div class="item-info">
                <div class="item-nombre">${recinto.nombre}</div>
                <div class="item-detalles">
                    <i class="bi bi-geo-alt me-1"></i>${recinto.direccion}
                </div>
                <div class="item-contacto">
                    <i class="bi bi-telephone me-1"></i>${recinto.telefono}
                    <i class="bi bi-envelope ms-3 me-1"></i>${recinto.email}
                </div>
            </div>
            <div class="item-actions">
                <span class="badge ${recinto.activo ? "bg-success" : "bg-secondary"}">
                    ${recinto.activo ? "Activo" : "Inactivo"}
                </span>
                <button class="btn btn-sm btn-outline-primary" onclick="editarRecinto('${recinto.id}')">
                    <i class="bi bi-pencil me-1"></i>Editar
                </button>
            </div>
        </div>
    `,
    )
    .join("")
}

function cargarDepartamentos() {
  const container = document.getElementById("listaDepartamentos")

  container.innerHTML = departamentos
    .map((dept) => {
      const recinto = recintos.find((r) => r.id === dept.recintoId)
      return `
            <div class="item-card">
                <div class="item-info">
                    <div class="item-nombre">${dept.nombre}</div>
                    <div class="item-detalles">
                        <i class="bi bi-hospital me-1"></i>${recinto ? recinto.nombre : "N/A"}
                    </div>
                </div>
                <div class="item-actions">
                    <span class="badge ${dept.activo ? "bg-success" : "bg-secondary"}">
                        ${dept.activo ? "Activo" : "Inactivo"}
                    </span>
                    <button class="btn btn-sm btn-outline-primary" onclick="editarDepartamento('${dept.id}')">
                        <i class="bi bi-pencil me-1"></i>Editar
                    </button>
                </div>
            </div>
        `
    })
    .join("")
}

function cargarMedicos() {
  const container = document.getElementById("listaMedicos")

  container.innerHTML = medicos
    .map((medico) => {
      const recinto = recintos.find((r) => r.id === medico.recintoId)
      const dept = departamentos.find((d) => d.id === medico.departamentoId)

      return `
            <div class="item-card">
                <div class="item-info">
                    <div class="item-nombre">${medico.nombre}</div>
                    <div class="item-detalles">
                        <strong>${medico.especialidad}</strong> | RUT: ${medico.rut}
                    </div>
                    <div class="item-detalles">
                        <i class="bi bi-hospital me-1"></i>${recinto ? recinto.nombre : "N/A"} - ${dept ? dept.nombre : "N/A"}
                    </div>
                    <div class="item-contacto">
                        <i class="bi bi-telephone me-1"></i>${medico.telefono}
                        <i class="bi bi-envelope ms-3 me-1"></i>${medico.email}
                    </div>
                </div>
                <div class="item-actions">
                    <span class="badge ${medico.activo ? "bg-success" : "bg-secondary"}">
                        ${medico.activo ? "Activo" : "Inactivo"}
                    </span>
                    <button class="btn btn-sm btn-outline-primary" onclick="editarMedico(${medico.id})">
                        <i class="bi bi-pencil me-1"></i>Editar
                    </button>
                </div>
            </div>
        `
    })
    .join("")
}

function editarRecinto(id) {
  alert("Función de edición en desarrollo. ID: " + id)
}

function editarDepartamento(id) {
  alert("Función de edición en desarrollo. ID: " + id)
}

function editarMedico(id) {
  alert("Función de edición en desarrollo. ID: " + id)
}

function agregarRecinto() {
  alert("Función para agregar recinto en desarrollo")
}

function agregarDepartamento() {
  alert("Función para agregar departamento en desarrollo")
}

function agregarMedico() {
  alert("Función para agregar médico en desarrollo")
}
