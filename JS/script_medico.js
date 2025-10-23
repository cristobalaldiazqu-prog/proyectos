// Datos del médico actual
const medicoActual = {
  id: 1,
  nombre: "Dr. Carlos Ruiz",
  especialidad: "Cardiología",
  rut: "15.234.567-8",
  email: "carlos.ruiz@hospital.com",
  telefono: "+56 9 8765 4321",
  recintoId: "hospital-central",
  recintoNombre: "Hospital Central",
  departamentoId: "cardiologia",
  diasAtencion: [1, 2, 3, 4, 5], // Lun-Vie
  horarios: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
}

// Citas del médico
const citasMedico = [
  {
    id: 1,
    pacienteId: 1,
    pacienteNombre: "María González Pérez",
    pacienteRut: "12.345.678-9",
    fecha: "2024-03-20",
    hora: "09:00",
    motivo: "Control cardiológico rutinario",
    sintomas: "Sin síntomas actuales",
    estado: "confirmada",
    consultorio: "205",
    urgente: false,
    fichaClinicaId: 1,
  },
  {
    id: 5,
    pacienteId: 3,
    pacienteNombre: "Pedro Sánchez López",
    pacienteRut: "18.765.432-1",
    fecha: "2024-03-20",
    hora: "10:00",
    motivo: "Dolor en el pecho",
    sintomas: "Dolor intermitente en el pecho desde hace 2 días",
    estado: "pendiente",
    consultorio: "205",
    urgente: true,
    fichaClinicaId: null,
  },
  {
    id: 8,
    pacienteId: 5,
    pacienteNombre: "Ana Martínez Rojas",
    pacienteRut: "16.543.210-9",
    fecha: "2024-03-21",
    hora: "09:00",
    motivo: "Seguimiento post-operatorio",
    sintomas: "Control después de cirugía cardíaca",
    estado: "confirmada",
    consultorio: "205",
    urgente: false,
    fichaClinicaId: 3,
  },
]

// Pacientes del médico
const pacientesMedico = [
  {
    id: 1,
    nombre: "María González Pérez",
    rut: "12.345.678-9",
    edad: 35,
    telefono: "+56 9 1234 5678",
    email: "maria.gonzalez@email.com",
    ultimaConsulta: "2024-03-15",
    proximaCita: "2024-03-20",
  },
  {
    id: 3,
    nombre: "Pedro Sánchez López",
    rut: "18.765.432-1",
    edad: 52,
    telefono: "+56 9 2345 6789",
    email: "pedro.sanchez@email.com",
    ultimaConsulta: "2024-02-10",
    proximaCita: "2024-03-20",
  },
  {
    id: 5,
    nombre: "Ana Martínez Rojas",
    rut: "16.543.210-9",
    edad: 48,
    telefono: "+56 9 3456 7890",
    email: "ana.martinez@email.com",
    ultimaConsulta: "2024-03-01",
    proximaCita: "2024-03-21",
  },
]

// Verificar sesión
document.addEventListener("DOMContentLoaded", () => {
  verificarSesion()
  inicializarSistema()
  cargarDatosMedico()
  cargarEstadisticas()
  cargarCitasHoy()
  cargarAgendaSemanal()
  cargarPacientes()
})

function verificarSesion() {
  const sesion = localStorage.getItem("sesionActiva") || sessionStorage.getItem("sesionActiva")

  if (!sesion) {
    window.location.href = "login.html"
    return
  }

  const usuario = JSON.parse(sesion)

  if (usuario.rol !== "medico") {
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
  document.getElementById("nombreMedico").textContent = medicoActual.nombre.split(" ")[1]
  document.getElementById("perfilNombre").textContent = medicoActual.nombre
  document.getElementById("perfilEspecialidad").textContent = medicoActual.especialidad
  document.getElementById("perfilRecinto").textContent = medicoActual.recintoNombre
}

function cargarDatosMedico() {
  document.getElementById("fichaMedicoNombre").textContent = medicoActual.nombre
  document.getElementById("fichaMedicoEspecialidad").textContent = medicoActual.especialidad
  document.getElementById("fichaMedicoRut").textContent = medicoActual.rut
  document.getElementById("fichaMedicoEmail").textContent = medicoActual.email
  document.getElementById("fichaMedicoTelefono").textContent = medicoActual.telefono
  document.getElementById("fichaMedicoRecinto").textContent = medicoActual.recintoNombre
}

function cargarEstadisticas() {
  const hoy = new Date().toISOString().split("T")[0]
  const citasHoy = citasMedico.filter((c) => c.fecha === hoy).length
  const citasPendientes = citasMedico.filter((c) => c.estado === "pendiente").length
  const pacientesTotal = pacientesMedico.length
  const citasUrgentes = citasMedico.filter((c) => c.urgente && c.estado !== "completada").length

  document.getElementById("citasHoy").textContent = citasHoy
  document.getElementById("citasPendientes").textContent = citasPendientes
  document.getElementById("pacientesTotal").textContent = pacientesTotal
  document.getElementById("citasUrgentes").textContent = citasUrgentes
}

function cargarCitasHoy() {
  const hoy = new Date().toISOString().split("T")[0]
  const citasHoy = citasMedico.filter((c) => c.fecha === hoy).sort((a, b) => a.hora.localeCompare(b.hora))

  const container = document.getElementById("citasHoyLista")

  if (citasHoy.length === 0) {
    container.innerHTML = '<p class="text-muted text-center py-4">No hay citas programadas para hoy</p>'
    return
  }

  container.innerHTML = citasHoy
    .map(
      (cita) => `
        <div class="cita-item ${cita.urgente ? "urgente" : ""}">
            <div class="cita-hora">${cita.hora}</div>
            <div class="cita-info">
                <div class="cita-paciente">${cita.pacienteNombre}</div>
                <div class="cita-motivo">${cita.motivo}</div>
                ${cita.urgente ? '<span class="badge bg-danger">Urgente</span>' : ""}
            </div>
            <div class="cita-actions">
                <button class="btn btn-sm btn-primary" onclick="atenderPaciente(${cita.id})">
                    <i class="bi bi-clipboard-pulse me-1"></i>Atender
                </button>
            </div>
        </div>
    `,
    )
    .join("")
}

function cargarAgendaSemanal() {
  const container = document.getElementById("agendaSemanal")
  const hoy = new Date()
  const diasSemana = []

  for (let i = 0; i < 7; i++) {
    const dia = new Date(hoy)
    dia.setDate(hoy.getDate() + i)
    diasSemana.push(dia)
  }

  container.innerHTML = diasSemana
    .map((dia) => {
      const fechaStr = dia.toISOString().split("T")[0]
      const citasDia = citasMedico.filter((c) => c.fecha === fechaStr)
      const diaSemana = dia.toLocaleDateString("es-ES", { weekday: "short" })
      const diaNum = dia.getDate()

      return `
            <div class="agenda-dia ${citasDia.length > 0 ? "con-citas" : ""}">
                <div class="agenda-dia-header">
                    <div class="dia-semana">${diaSemana}</div>
                    <div class="dia-numero">${diaNum}</div>
                </div>
                <div class="agenda-dia-citas">
                    ${citasDia.length} cita${citasDia.length !== 1 ? "s" : ""}
                </div>
            </div>
        `
    })
    .join("")
}

function cargarPacientes() {
  const container = document.getElementById("listaPacientes")

  container.innerHTML = pacientesMedico
    .map(
      (paciente) => `
        <div class="paciente-item">
            <div class="paciente-info">
                <div class="paciente-nombre">${paciente.nombre}</div>
                <div class="paciente-detalles">
                    RUT: ${paciente.rut} | Edad: ${paciente.edad} años
                </div>
                <div class="paciente-contacto">
                    <i class="bi bi-telephone me-1"></i>${paciente.telefono}
                    <i class="bi bi-envelope ms-3 me-1"></i>${paciente.email}
                </div>
            </div>
            <div class="paciente-actions">
                <button class="btn btn-sm btn-outline-primary" onclick="verFichaPaciente(${paciente.id})">
                    <i class="bi bi-file-medical me-1"></i>Ver Ficha
                </button>
            </div>
        </div>
    `,
    )
    .join("")
}

function atenderPaciente(citaId) {
  const cita = citasMedico.find((c) => c.id === citaId)
  if (!cita) return

  alert(`Atendiendo a ${cita.pacienteNombre}\nMotivo: ${cita.motivo}`)
}

function verFichaPaciente(pacienteId) {
  const paciente = pacientesMedico.find((p) => p.id === pacienteId)
  if (!paciente) return

  alert(`Ficha clínica de ${paciente.nombre}\nEsta funcionalidad se completará con la integración de la base de datos.`)
}

function formatearFecha(fecha) {
  const date = new Date(fecha)
  return date.toLocaleDateString("es-ES")
}
