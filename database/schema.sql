-- Script de creación de base de datos y tablas para Sistema Médico Integral
-- Compatible con MySQL 5.7+ y MariaDB 10.2+

-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS medico CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE medico;

-- Tabla de Recintos Médicos
CREATE TABLE IF NOT EXISTS recintos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    codigo VARCHAR(50) UNIQUE,
    direccion VARCHAR(300) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_estado (estado),
    INDEX idx_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Departamentos
CREATE TABLE IF NOT EXISTS departamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recinto_id INT NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (recinto_id) REFERENCES recintos(id) ON DELETE CASCADE,
    INDEX idx_recinto (recinto_id),
    INDEX idx_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Usuarios (Pacientes, Médicos, Administradores)
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(200) NOT NULL,
    rut VARCHAR(12) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    direccion VARCHAR(300),
    fecha_nacimiento DATE,
    genero ENUM('masculino', 'femenino', 'otro'),
    tipo_usuario ENUM('paciente', 'medico', 'admin') NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_rut (rut),
    INDEX idx_email (email),
    INDEX idx_tipo (tipo_usuario),
    INDEX idx_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Médicos (información adicional)
CREATE TABLE IF NOT EXISTS medicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    especialidad VARCHAR(100) NOT NULL,
    registro_medico VARCHAR(50),
    recinto_id INT,
    departamento_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (recinto_id) REFERENCES recintos(id) ON DELETE SET NULL,
    FOREIGN KEY (departamento_id) REFERENCES departamentos(id) ON DELETE SET NULL,
    INDEX idx_especialidad (especialidad),
    INDEX idx_recinto (recinto_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Disponibilidad de Médicos
CREATE TABLE IF NOT EXISTS disponibilidad_medicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    medico_id INT NOT NULL,
    dia_semana TINYINT NOT NULL COMMENT '0=Domingo, 1=Lunes, ..., 6=Sábado',
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    duracion_consulta INT DEFAULT 30 COMMENT 'Duración en minutos',
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (medico_id) REFERENCES medicos(id) ON DELETE CASCADE,
    INDEX idx_medico_dia (medico_id, dia_semana),
    INDEX idx_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Bloques No Disponibles (vacaciones, licencias, etc.)
CREATE TABLE IF NOT EXISTS bloques_no_disponibles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    medico_id INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    motivo ENUM('vacaciones', 'capacitacion', 'licencia', 'otro') NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (medico_id) REFERENCES medicos(id) ON DELETE CASCADE,
    INDEX idx_medico_fechas (medico_id, fecha_inicio, fecha_fin)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Pacientes (información adicional)
CREATE TABLE IF NOT EXISTS pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    contacto_emergencia_nombre VARCHAR(200),
    contacto_emergencia_telefono VARCHAR(20),
    grupo_sanguineo VARCHAR(5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Citas Médicas
CREATE TABLE IF NOT EXISTS citas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    medico_id INT NOT NULL,
    recinto_id INT NOT NULL,
    departamento_id INT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    duracion INT DEFAULT 30 COMMENT 'Duración en minutos',
    motivo TEXT NOT NULL,
    sintomas TEXT,
    estado ENUM('pendiente', 'confirmada', 'completada', 'cancelada') DEFAULT 'pendiente',
    es_urgente BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES medicos(id) ON DELETE CASCADE,
    FOREIGN KEY (recinto_id) REFERENCES recintos(id) ON DELETE CASCADE,
    FOREIGN KEY (departamento_id) REFERENCES departamentos(id) ON DELETE CASCADE,
    INDEX idx_paciente (paciente_id),
    INDEX idx_medico (medico_id),
    INDEX idx_fecha (fecha),
    INDEX idx_estado (estado),
    INDEX idx_medico_fecha (medico_id, fecha, hora)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Fichas Clínicas / Consultas
CREATE TABLE IF NOT EXISTS consultas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cita_id INT NOT NULL,
    paciente_id INT NOT NULL,
    medico_id INT NOT NULL,
    fecha_consulta DATETIME NOT NULL,
    diagnostico TEXT NOT NULL,
    tratamiento TEXT,
    observaciones TEXT,
    receta_medica TEXT,
    examenes_solicitados TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cita_id) REFERENCES citas(id) ON DELETE CASCADE,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES medicos(id) ON DELETE CASCADE,
    INDEX idx_paciente (paciente_id),
    INDEX idx_medico (medico_id),
    INDEX idx_fecha (fecha_consulta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Medicamentos
CREATE TABLE IF NOT EXISTS medicamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    consulta_id INT,
    nombre VARCHAR(200) NOT NULL,
    dosis VARCHAR(100) NOT NULL,
    frecuencia VARCHAR(100) NOT NULL,
    duracion VARCHAR(100),
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    medico_prescriptor_id INT NOT NULL,
    estado ENUM('activo', 'completado', 'suspendido') DEFAULT 'activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
    FOREIGN KEY (consulta_id) REFERENCES consultas(id) ON DELETE SET NULL,
    FOREIGN KEY (medico_prescriptor_id) REFERENCES medicos(id) ON DELETE CASCADE,
    INDEX idx_paciente (paciente_id),
    INDEX idx_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Exámenes
CREATE TABLE IF NOT EXISTS examenes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    consulta_id INT,
    tipo_examen VARCHAR(200) NOT NULL,
    fecha_solicitud DATE NOT NULL,
    fecha_realizacion DATE,
    resultado TEXT,
    archivo_url VARCHAR(500),
    medico_solicitante_id INT NOT NULL,
    estado ENUM('solicitado', 'realizado', 'cancelado') DEFAULT 'solicitado',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
    FOREIGN KEY (consulta_id) REFERENCES consultas(id) ON DELETE SET NULL,
    FOREIGN KEY (medico_solicitante_id) REFERENCES medicos(id) ON DELETE CASCADE,
    INDEX idx_paciente (paciente_id),
    INDEX idx_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Alergias
CREATE TABLE IF NOT EXISTS alergias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    tipo ENUM('medicamento', 'alimento', 'ambiental', 'otro') NOT NULL,
    gravedad ENUM('leve', 'moderada', 'severa') NOT NULL,
    reaccion TEXT,
    fecha_diagnostico DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE,
    INDEX idx_paciente (paciente_id),
    INDEX idx_tipo (tipo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar datos de ejemplo
-- Usuario administrador por defecto (contraseña: admin123)
INSERT INTO usuarios (nombre_completo, rut, email, telefono, tipo_usuario, password_hash, estado) 
VALUES ('Administrador Sistema', '11111111-1', 'admin@sistema.com', '+56912345678', 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'activo');

-- Recintos de ejemplo
INSERT INTO recintos (nombre, codigo, direccion, telefono, email) VALUES
('Hospital Central', 'HC001', 'Av. Principal 123, Santiago', '+56221234567', 'contacto@hospitalcentral.cl'),
('Clínica Norte', 'CN002', 'Calle Norte 456, Santiago', '+56221234568', 'info@clinicanorte.cl');

-- Departamentos de ejemplo
INSERT INTO departamentos (recinto_id, nombre) VALUES
(1, 'Medicina General'),
(1, 'Pediatría'),
(1, 'Cardiología'),
(2, 'Medicina General'),
(2, 'Traumatología');
