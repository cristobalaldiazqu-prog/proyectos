const pacienteActual = {
  id: 1,
  nombre: "María González Pérez",
  rut: "12.345.678-9",
  fechaNacimiento: "1989-03-15",
  edad: 35,
  genero: "Femenino",
  telefono: "+56 9 1234 5678",
  email: "maria.gonzalez@email.com",
  direccion: "Av. Principal 123, Santiago",
  contactoEmergencia: "Juan González - +56 9 8765 4321",
}

const fichaClinica = {
  pacienteId: 1,
  historialMedico: [
    {
      id: 1,
      fecha: "2024-03-15",
      medico: "Dr. Carlos Ruiz",
      especialidad: "Cardiología",
      diagnostico: "Control cardiológico rutinario",
      tratamiento: "Presión arterial normal. Continuar con medicación actual. Control en 3 meses.",
      citaId: 1,
    },
    {
      id: 2,
      fecha: "2024-02-28",
      medico: "Dra. Laura Sánchez",
      especialidad: "Medicina General",
      diagnostico: "Chequeo anual",
      tratamiento: "Exámenes de laboratorio normales. Mantener hábitos saludables.",
      citaId: null,
    },
  ],
  medicamentos: [
    {
      id: 1,
      nombre: "Enalapril 10mg",
      dosis: "1 tableta cada 12 horas",
      prescriptor: "Dr. Carlos Ruiz",
      fechaInicio: "2023-06-15",
      activo: true,
    },
    {
      id: 2,
      nombre: "Aspirina 100mg",
      dosis: "1 tableta diaria",
      prescriptor: "Dr. Carlos Ruiz",
      fechaInicio: "2023-06-15",
      activo: true,
    },
  ],
  examenes: [
    {
      id: 1,
      tipo: "Hemograma completo",
      fecha: "2024-02-20",
      resultado: "Valores dentro de rangos normales",
      archivo: null,
    },
    {
      id: 2,
      tipo: "Perfil lipídico",
      fecha: "2024-02-20",
      resultado: "Colesterol total: 180 mg/dL, HDL: 55 mg/dL, LDL: 110 mg/dL",
      archivo: null,
    },
  ],
  alergias: [
    {
      id: 1,
      nombre: "Penicilina",
      tipo: "Medicamento",
      reaccion: "Erupción cutánea",
      gravedad: "Moderada",
    },
  ],
}

const citas = [
  {
    id: 1,
    pacienteId: 1,
    recintoId: "hospital-central",
    recintoNombre: "Hospital Central",
    departamentoId: "cardiologia",
    departamentoNombre: "Cardiología",
    medicoId: 1,
    medicoNombre: "Dr. Carlos Ruiz",
    fecha: "2024-03-20",
    hora: "09:00",
    motivo: "Control cardiológico rutinario",
    sintomas: "Sin síntomas actuales",
    estado: "confirmada",
    ubicacion: "Consultorio 205",
    urgente: false,
    fichaClinicaId: 1,
  },
  {
    id: 2,
    pacienteId: 1,
    recintoId: "clinica-norte",
    recintoNombre: "Clínica Norte",
    departamentoId: "dermatologia",
    departamentoNombre: "Dermatología",
    medicoId: 7,
    medicoNombre: "Dra. Ana Martínez",
    fecha: "2024-03-25",
    hora: "14:30",
    motivo: "Revisión lunar",
    sintomas: "Lunar con cambios de color",
    estado: "pendiente",
    ubicacion: "Consultorio 301",
    urgente: false,
    fichaClinicaId: null,
  },
]

const recintosMedicos = {
  "hospital-central": {
    nombre: "Hospital Central",
    direccion: "Av. Principal 123",
    departamentos: {
      cardiologia: {
        nombre: "Cardiología",
        medicos: [
          {
            id: 1,
            nombre: "Dr. Carlos Ruiz",
            horarios: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
            diasAtencion: [1, 2, 3, 4, 5], // Lun-Vie
          },
          {
            id: 2,
            nombre: "Dra. Patricia López",
            horarios: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
            diasAtencion: [2, 3, 4, 5, 6], // Mar-Sáb
          },
        ],
      },
      pediatria: {
        nombre: "Pediatría",
        medicos: [
          {
            id: 3,
            nombre: "Dra. Laura Sánchez",
            horarios: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"],
            diasAtencion: [1, 2, 3, 4, 5],
          },
        ],
      },
      "medicina-general": {
        nombre: "Medicina General",
        medicos: [
          {
            id: 5,
            nombre: "Dr. Miguel Torres",
            horarios: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
            diasAtencion: [1, 2, 3, 4, 5],
          },
        ],
      },
    },
  },
  "clinica-norte": {
    nombre: "Clínica Norte",
    direccion: "Calle Norte 456",
    departamentos: {
      dermatologia: {
        nombre: "Dermatología",
        medicos: [
          {
            id: 7,
            nombre: "Dra. Ana Martínez",
            horarios: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
            diasAtencion: [2, 3, 4, 5],
          },
        ],
      },
      ginecologia: {
        nombre: "Ginecología",
        medicos: [
          {
            id: 9,
            nombre: "Dra. Isabel Morales",
            horarios: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00"],
            diasAtencion: [1, 2, 3, 4, 5],
          },
        ],
      },
    },
  },
}

const bootstrap = window.bootstrap
let citaEditandoId = null

document.addEventListener("DOMContentLoaded", () => {
  inicializarSistema()
  cargarDatosPaciente()
  cargarEstadisticas()
  cargarCitas()
  cargarRecintos()
  configurarFechaMinima()
})

function inicializarSistema() {
  // Cargar nombre del paciente
  document.getElementById("nombrePaciente").textContent = pacienteActual.nombre.split(" ")[0]
  document.getElementById("perfilNombre").textContent = pacienteActual.nombre
  document.getElementById("perfilRut").textContent = pacienteActual.rut
  document.getElementById("perfilEdad").textContent = pacienteActual.edad
}

function cargarDatosPaciente() {
  // Cargar datos en la ficha clínica
  document.getElementById("fichaNombre").textContent = pacienteActual.nombre
  document.getElementById("fichaRut").textContent = pacienteActual.rut
  document.getElementById("fichaFechaNacimiento").textContent = formatearFecha(pacienteActual.fechaNacimiento)
  document.getElementById("fichaEdad").textContent = `${pacienteActual.edad} años`
  document.getElementById("fichaGenero").textContent = pacienteActual.genero
  document.getElementById("fichaTelefono").textContent = pacienteActual.telefono
  document.getElementById("fichaEmail").textContent = pacienteActual.email
  document.getElementById("fichaDireccion").textContent = pacienteActual.direccion
  document.getElementById("fichaEmergencia").textContent = pacienteActual.contactoEmergencia
}

function cargarEstadisticas() {
  const hoy = new Date()
  const citasProximas = citas.filter((c) => {
    const fechaCita = new Date(c.fecha)
    return fechaCita >= hoy && c.estado !== "cancelada"
  }).length

  const consultasRealizadas = fichaClinica.historialMedico.length
  const recetasActivas = fichaClinica.medicamentos.filter((m) => m.activo).length
  const examenesPendientes = 0 // Calcular según lógica de negocio

  document.getElementById("proximasCitas").textContent = citasProximas
  document.getElementById("consultasRealizadas").textContent = consultasRealizadas
  document.getElementById("recetasActivas").textContent = recetasActivas
  document.getElementById("examenesPendientes").textContent = examenesPendientes

  // Mostrar próxima cita
  mostrarProximaCita()
}

function mostrarProximaCita() {
  const hoy = new Date()
  const proximaCita = citas
    .filter((c) => new Date(c.fecha) >= hoy && c.estado !== "cancelada")
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))[0]

  if (proximaCita) {
    const card = document.getElementById("proximaCitaCard")
    const info = document.getElementById("proximaCitaInfo")

    info.innerHTML = `
      <h5 class="text-dark">${proximaCita.medicoNombre}</h5>
      <p class="mb-1"><strong>${proximaCita.departamentoNombre}</strong></p>
      <p class="mb-1">${formatearFechaLarga(proximaCita.fecha)} - ${proximaCita.hora}</p>
      <p class="text-muted mb-3">${proximaCita.motivo}</p>
      <button class="btn btn-warning btn-sm" onclick="verDetalleCita(${proximaCita.id})">
        <i class="bi bi-info-circle me-1"></i>Ver Detalles
      </button>
    `

    card.style.display = "block"
  }
}

function cargarCitas() {
  const listaCitas = document.getElementById("listaCitas")
  const citasFiltradas = filtrarCitas()

  if (citasFiltradas.length === 0) {
    listaCitas.innerHTML = `
      <div class="text-center py-4">
        <i class="bi bi-calendar-x fs-1 text-muted mb-3"></i>
        <p class="text-muted">No hay citas que mostrar</p>
        <button class="btn btn-primary" onclick="abrirModalNuevaCita()">
          <i class="bi bi-calendar-plus me-2"></i>Agendar Primera Cita
        </button>
      </div>
    `
    return
  }

  listaCitas.innerHTML = citasFiltradas
    .map((cita) => {
      const estadoClass = `status-${cita.estado}`
      const estadoTexto = {
        confirmada: "Confirmada",
        pendiente: "Pendiente",
        completada: "Completada",
        cancelada: "Cancelada",
      }

      return `
      <div class="cita-item ${cita.urgente ? "urgente" : ""} fade-in">
        <div class="cita-header">
          <div>
            <div class="cita-fecha-hora">
              <i class="bi bi-calendar me-1"></i>${formatearFechaLarga(cita.fecha)} - ${cita.hora}
            </div>
            ${cita.urgente ? '<span class="badge-urgente"><i class="bi bi-exclamation-triangle me-1"></i>Urgente</span>' : ""}
          </div>
          <span class="status-badge ${estadoClass}">${estadoTexto[cita.estado]}</span>
        </div>
        <div class="cita-medico">${cita.medicoNombre}</div>
        <div class="cita-especialidad">
          <i class="bi bi-hospital me-1"></i>${cita.departamentoNombre} - ${cita.recintoNombre}
        </div>
        <div class="cita-motivo">
          <i class="bi bi-clipboard-heart me-1"></i>${cita.motivo}
        </div>
        <div class="cita-ubicacion">
          <i class="bi bi-geo-alt me-1"></i>${cita.ubicacion}
        </div>
        <div class="cita-actions">
          <button class="btn btn-sm btn-outline-primary" onclick="verDetalleCita(${cita.id})">
            <i class="bi bi-eye me-1"></i>Ver Detalles
          </button>
          ${
            cita.estado !== "cancelada" && cita.estado !== "completada"
              ? `
            <button class="btn btn-sm btn-outline-warning" onclick="editarCita(${cita.id})">
              <i class="bi bi-pencil me-1"></i>Modificar
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="confirmarCancelarCita(${cita.id})">
              <i class="bi bi-x-circle me-1"></i>Cancelar
            </button>
          `
              : ""
          }
          ${
            cita.fichaClinicaId
              ? `
            <button class="btn btn-sm btn-outline-info" onclick="verFichaClinicaCita(${cita.id})">
              <i class="bi bi-file-medical me-1"></i>Ver Ficha
            </button>
          `
              : ""
          }
        </div>
      </div>
    `
    })
    .join("")
}

function filtrarCitas() {
  const estadoFiltro = document.getElementById("filtroCitasEstado")?.value || ""
  const fechaFiltro = document.getElementById("filtroCitasFecha")?.value || ""

  return citas
    .filter((cita) => {
      const cumpleEstado = !estadoFiltro || cita.estado === estadoFiltro
      const cumpleFecha = !fechaFiltro || cita.fecha === fechaFiltro
      return cumpleEstado && cumpleFecha
    })
    .sort((a, b) => {
      const fechaA = new Date(`${a.fecha} ${a.hora}`)
      const fechaB = new Date(`${b.fecha} ${b.hora}`)
      return fechaA - fechaB
    })
}

function abrirModalNuevaCita() {
  citaEditandoId = null
  document.getElementById("modalCitaTitulo").innerHTML = '<i class="bi bi-calendar-plus me-2"></i>Agendar Nueva Cita'
  document.getElementById("formCita").reset()
  document.getElementById("citaId").value = ""
  document.getElementById("btnCancelarCita").style.display = "none"

  // Resetear selects
  document.getElementById("citaDepartamento").disabled = true
  document.getElementById("citaMedico").disabled = true
  document.getElementById("citaHorario").disabled = true

  const modal = new bootstrap.Modal(document.getElementById("modalCita"))
  modal.show()
}

function cargarRecintos() {
  const select = document.getElementById("citaRecinto")
  select.innerHTML = '<option value="">Seleccionar recinto...</option>'

  Object.keys(recintosMedicos).forEach((key) => {
    const option = document.createElement("option")
    option.value = key
    option.textContent = recintosMedicos[key].nombre
    select.appendChild(option)
  })
}

function cargarDepartamentos() {
  const recintoId = document.getElementById("citaRecinto").value
  const selectDepartamento = document.getElementById("citaDepartamento")
  const selectMedico = document.getElementById("citaMedico")
  const selectHorario = document.getElementById("citaHorario")

  // Reset
  selectDepartamento.innerHTML = '<option value="">Seleccionar departamento...</option>'
  selectMedico.innerHTML = '<option value="">Seleccionar médico...</option>'
  selectHorario.innerHTML = '<option value="">Seleccionar horario...</option>'
  selectDepartamento.disabled = true
  selectMedico.disabled = true
  selectHorario.disabled = true

  if (recintoId && recintosMedicos[recintoId]) {
    const departamentos = recintosMedicos[recintoId].departamentos
    selectDepartamento.disabled = false

    Object.keys(departamentos).forEach((key) => {
      const option = document.createElement("option")
      option.value = key
      option.textContent = departamentos[key].nombre
      selectDepartamento.appendChild(option)
    })
  }
}

function cargarMedicos() {
  const recintoId = document.getElementById("citaRecinto").value
  const departamentoId = document.getElementById("citaDepartamento").value
  const selectMedico = document.getElementById("citaMedico")
  const selectHorario = document.getElementById("citaHorario")

  // Reset
  selectMedico.innerHTML = '<option value="">Seleccionar médico...</option>'
  selectHorario.innerHTML = '<option value="">Seleccionar horario...</option>'
  selectMedico.disabled = true
  selectHorario.disabled = true

  if (recintoId && departamentoId && recintosMedicos[recintoId]?.departamentos[departamentoId]) {
    const medicos = recintosMedicos[recintoId].departamentos[departamentoId].medicos
    selectMedico.disabled = false

    medicos.forEach((medico) => {
      const option = document.createElement("option")
      option.value = medico.id
      option.textContent = medico.nombre
      selectMedico.appendChild(option)
    })
  }
}

function cargarHorariosDisponibles() {
  const recintoId = document.getElementById("citaRecinto").value
  const departamentoId = document.getElementById("citaDepartamento").value
  const medicoId = Number.parseInt(document.getElementById("citaMedico").value)
  const fecha = document.getElementById("citaFecha").value
  const selectHorario = document.getElementById("citaHorario")

  selectHorario.innerHTML = '<option value="">Seleccionar horario...</option>'
  selectHorario.disabled = true

  if (!recintoId || !departamentoId || !medicoId || !fecha) return

  const medico = recintosMedicos[recintoId].departamentos[departamentoId].medicos.find((m) => m.id === medicoId)
  if (!medico) return

  // Verificar día de la semana
  const fechaSeleccionada = new Date(fecha + "T00:00:00")
  const diaSemana = fechaSeleccionada.getDay()

  if (!medico.diasAtencion.includes(diaSemana)) {
    selectHorario.innerHTML = '<option value="">El médico no atiende este día</option>'
    return
  }

  // Obtener citas ocupadas para ese médico y fecha
  const citasOcupadas = citas
    .filter((c) => c.medicoId === medicoId && c.fecha === fecha && c.estado !== "cancelada")
    .map((c) => c.hora)

  selectHorario.disabled = false

  medico.horarios.forEach((horario) => {
    const option = document.createElement("option")
    option.value = horario

    if (citasOcupadas.includes(horario)) {
      option.textContent = `${horario} (Ocupado)`
      option.disabled = true
    } else {
      option.textContent = horario
    }

    selectHorario.appendChild(option)
  })
}

function guardarCita() {
  const form = document.getElementById("formCita")

  // Validar campos requeridos
  const recintoId = document.getElementById("citaRecinto").value
  const departamentoId = document.getElementById("citaDepartamento").value
  const medicoId = Number.parseInt(document.getElementById("citaMedico").value)
  const fecha = document.getElementById("citaFecha").value
  const hora = document.getElementById("citaHorario").value
  const motivo = document.getElementById("citaMotivo").value

  if (!recintoId || !departamentoId || !medicoId || !fecha || !hora || !motivo) {
    mostrarAlerta("Por favor, complete todos los campos requeridos", "warning")
    return
  }

  // Obtener datos adicionales
  const recinto = recintosMedicos[recintoId]
  const departamento = recinto.departamentos[departamentoId]
  const medico = departamento.medicos.find((m) => m.id === medicoId)
  const sintomas = document.getElementById("citaSintomas").value
  const urgente = document.getElementById("citaUrgente").checked

  if (citaEditandoId) {
    // Actualizar cita existente
    const index = citas.findIndex((c) => c.id === citaEditandoId)
    citas[index] = {
      ...citas[index],
      recintoId,
      recintoNombre: recinto.nombre,
      departamentoId,
      departamentoNombre: departamento.nombre,
      medicoId,
      medicoNombre: medico.nombre,
      fecha,
      hora,
      motivo,
      sintomas,
      urgente,
    }
    mostrarAlerta("Cita modificada exitosamente", "success")
  } else {
    // Crear nueva cita
    const nuevaCita = {
      id: Math.max(...citas.map((c) => c.id), 0) + 1,
      pacienteId: pacienteActual.id,
      recintoId,
      recintoNombre: recinto.nombre,
      departamentoId,
      departamentoNombre: departamento.nombre,
      medicoId,
      medicoNombre: medico.nombre,
      fecha,
      hora,
      motivo,
      sintomas,
      estado: "pendiente",
      ubicacion: "Por confirmar",
      urgente,
      fichaClinicaId: null,
    }

    citas.push(nuevaCita)
    mostrarAlerta("Cita agendada exitosamente. Recibirás confirmación pronto.", "success")
  }

  // Cerrar modal y actualizar vistas
  bootstrap.Modal.getInstance(document.getElementById("modalCita")).hide()
  cargarCitas()
  cargarEstadisticas()
}

function editarCita(id) {
  const cita = citas.find((c) => c.id === id)
  if (!cita) return

  citaEditandoId = id
  document.getElementById("modalCitaTitulo").innerHTML = '<i class="bi bi-pencil me-2"></i>Modificar Cita'
  document.getElementById("citaId").value = cita.id
  document.getElementById("btnCancelarCita").style.display = "inline-block"

  // Cargar datos
  document.getElementById("citaRecinto").value = cita.recintoId
  cargarDepartamentos()

  setTimeout(() => {
    document.getElementById("citaDepartamento").value = cita.departamentoId
    cargarMedicos()

    setTimeout(() => {
      document.getElementById("citaMedico").value = cita.medicoId
      document.getElementById("citaFecha").value = cita.fecha
      cargarHorariosDisponibles()

      setTimeout(() => {
        document.getElementById("citaHorario").value = cita.hora
        document.getElementById("citaMotivo").value = cita.motivo
        document.getElementById("citaSintomas").value = cita.sintomas || ""
        document.getElementById("citaUrgente").checked = cita.urgente
      }, 100)
    }, 100)
  }, 100)

  const modal = new bootstrap.Modal(document.getElementById("modalCita"))
  modal.show()
}

function confirmarCancelarCita(id) {
  if (confirm("¿Estás seguro de que deseas cancelar esta cita?")) {
    const index = citas.findIndex((c) => c.id === id)
    if (index !== -1) {
      citas[index].estado = "cancelada"
      cargarCitas()
      cargarEstadisticas()
      mostrarAlerta("Cita cancelada exitosamente", "warning")
    }
  }
}

function cancelarCita() {
  if (citaEditandoId && confirm("¿Estás seguro de que deseas cancelar esta cita?")) {
    const index = citas.findIndex((c) => c.id === citaEditandoId)
    if (index !== -1) {
      citas[index].estado = "cancelada"
      bootstrap.Modal.getInstance(document.getElementById("modalCita")).hide()
      cargarCitas()
      cargarEstadisticas()
      mostrarAlerta("Cita cancelada exitosamente", "warning")
    }
  }
}

function verDetalleCita(id) {
  const cita = citas.find((c) => c.id === id)
  if (!cita) return

  const detalles = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${cita.medicoNombre}</h5>
        <p class="card-text">
          <strong>Especialidad:</strong> ${cita.departamentoNombre}<br>
          <strong>Recinto:</strong> ${cita.recintoNombre}<br>
          <strong>Fecha:</strong> ${formatearFechaLarga(cita.fecha)}<br>
          <strong>Hora:</strong> ${cita.hora}<br>
          <strong>Ubicación:</strong> ${cita.ubicacion}<br>
          <strong>Motivo:</strong> ${cita.motivo}<br>
          ${cita.sintomas ? `<strong>Síntomas:</strong> ${cita.sintomas}<br>` : ""}
          <strong>Estado:</strong> <span class="status-badge status-${cita.estado}">${cita.estado}</span>
          ${cita.urgente ? '<br><span class="badge-urgente"><i class="bi bi-exclamation-triangle me-1"></i>Urgente</span>' : ""}
        </p>
      </div>
    </div>
  `

  mostrarAlerta(detalles, "info", 10000)
}

function verFichaClinica() {
  cargarHistorialMedico()
  cargarMedicamentos()
  cargarExamenes()
  cargarAlergias()

  const modal = new bootstrap.Modal(document.getElementById("modalFichaClinica"))
  modal.show()
}

function cargarHistorialMedico() {
  const container = document.getElementById("historialMedico")

  if (fichaClinica.historialMedico.length === 0) {
    container.innerHTML = '<p class="text-muted text-center py-4">No hay registros en el historial médico</p>'
    return
  }

  container.innerHTML = fichaClinica.historialMedico
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .map(
      (registro) => `
      <div class="historial-item fade-in">
        <div class="historial-fecha">
          <i class="bi bi-calendar me-2"></i>${formatearFechaLarga(registro.fecha)}
        </div>
        <div class="historial-medico">
          ${registro.medico} - ${registro.especialidad}
        </div>
        <div class="historial-diagnostico">
          <strong>Diagnóstico:</strong> ${registro.diagnostico}
        </div>
        <div class="historial-tratamiento">
          <strong>Tratamiento:</strong><br>${registro.tratamiento}
        </div>
        ${
          registro.citaId
            ? `
          <button class="btn btn-sm btn-outline-primary mt-2" onclick="verDetalleCita(${registro.citaId})">
            <i class="bi bi-eye me-1"></i>Ver Cita Relacionada
          </button>
        `
            : ""
        }
      </div>
    `,
    )
    .join("")
}

function cargarMedicamentos() {
  const container = document.getElementById("medicamentosActivos")
  const medicamentosActivos = fichaClinica.medicamentos.filter((m) => m.activo)

  if (medicamentosActivos.length === 0) {
    container.innerHTML = '<p class="text-muted text-center py-4">No hay medicamentos activos</p>'
    return
  }

  container.innerHTML = medicamentosActivos
    .map(
      (med) => `
    <div class="medicamento-item fade-in">
      <div class="medicamento-nombre">
        <i class="bi bi-capsule me-2"></i>${med.nombre}
      </div>
      <div class="medicamento-dosis">
        <strong>Dosis:</strong> ${med.dosis}
      </div>
      <div class="medicamento-prescriptor">
        Prescrito por ${med.prescriptor} el ${formatearFecha(med.fechaInicio)}
      </div>
    </div>
  `,
    )
    .join("")
}

function cargarExamenes() {
  const container = document.getElementById("examenesRealizados")

  if (fichaClinica.examenes.length === 0) {
    container.innerHTML = '<p class="text-muted text-center py-4">No hay exámenes registrados</p>'
    return
  }

  container.innerHTML = fichaClinica.examenes
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .map(
      (examen) => `
      <div class="examen-item fade-in">
        <div class="examen-tipo">
          <i class="bi bi-clipboard-data me-2"></i>${examen.tipo}
        </div>
        <div class="examen-fecha">
          Realizado el ${formatearFechaLarga(examen.fecha)}
        </div>
        <div class="examen-resultado">
          <strong>Resultado:</strong><br>${examen.resultado}
        </div>
        ${
          examen.archivo
            ? `
          <button class="btn btn-sm btn-outline-primary mt-2">
            <i class="bi bi-download me-1"></i>Descargar Resultado
          </button>
        `
            : ""
        }
      </div>
    `,
    )
    .join("")
}

function cargarAlergias() {
  const container = document.getElementById("alergiasRegistradas")

  if (fichaClinica.alergias.length === 0) {
    container.innerHTML = '<p class="text-muted text-center py-4">No hay alergias registradas</p>'
    return
  }

  container.innerHTML = fichaClinica.alergias
    .map(
      (alergia) => `
    <div class="alergia-item fade-in">
      <div class="alergia-nombre">
        <i class="bi bi-exclamation-triangle me-2"></i>${alergia.nombre}
      </div>
      <div class="alergia-tipo">
        Tipo: ${alergia.tipo} | Gravedad: ${alergia.gravedad}
      </div>
      <div class="alergia-reaccion">
        <strong>Reacción:</strong> ${alergia.reaccion}
      </div>
    </div>
  `,
    )
    .join("")
}

function verFichaClinicaCita(citaId) {
  const cita = citas.find((c) => c.id === citaId)
  if (cita && cita.fichaClinicaId) {
    verFichaClinica()
    // Cambiar a la pestaña de historial
    const historialTab = new bootstrap.Tab(document.getElementById("historial-tab"))
    historialTab.show()
  }
}

function descargarFichaClinica() {
  mostrarAlerta(
    "Función de descarga de ficha clínica en desarrollo. Próximamente podrás descargar tu ficha en formato PDF.",
    "info",
  )
}

// Funciones auxiliares
function configurarFechaMinima() {
  const hoy = new Date()
  hoy.setDate(hoy.getDate() + 1) // Mínimo mañana
  const minFecha = hoy.toISOString().split("T")[0]

  const inputFecha = document.getElementById("citaFecha")
  if (inputFecha) {
    inputFecha.min = minFecha
  }
}

function formatearFecha(fecha) {
  const date = new Date(fecha)
  return date.toLocaleDateString("es-ES")
}

function formatearFechaLarga(fecha) {
  const date = new Date(fecha + "T00:00:00")
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function mostrarAlerta(mensaje, tipo = "info", duracion = 5000) {
  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${tipo} alert-dismissible fade show position-fixed`
  alertDiv.style.cssText = "top: 20px; right: 20px; z-index: 9999; min-width: 300px; max-width: 500px;"
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

function editarPerfil() {
  mostrarAlerta("Función de edición de perfil en desarrollo", "info")
}
