<?php
/**
 * Configuración de conexión a base de datos RDS en AWS
 * 
 * IMPORTANTE: Reemplaza estos valores con los datos de tu instancia RDS
 */

// Configuración de la base de datos
define('DB_HOST', 'medico.ctmqqsmysdhv.us-east-1.rds.amazonaws.com'); // Endpoint de tu RDS
define('DB_PORT', '3306'); // Puerto por defecto de MySQL
define('DB_NAME', 'medico'); // Nombre de la base de datos
define('DB_USER', 'admin'); // Usuario de la base de datos
define('DB_PASS', 'MedicosAfro'); // Contraseña del usuario
define('DB_CHARSET', 'utf8mb4');

/**
 * Función para obtener conexión PDO a la base de datos
 * 
 * @return PDO Objeto de conexión PDO
 * @throws PDOException Si hay error en la conexión
 */
function getDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
        ];
        
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        
        return $pdo;
        
    } catch (PDOException $e) {
        // En producción, registra el error en un log en lugar de mostrarlo
        error_log("Error de conexión a la base de datos: " . $e->getMessage());
        throw new Exception("Error al conectar con la base de datos. Por favor, contacte al administrador.");
    }
}

/**
 * Función para cerrar la conexión
 * 
 * @param PDO $pdo Objeto de conexión PDO
 */
function closeDBConnection(&$pdo) {
    $pdo = null;
}

/**
 * Función para ejecutar consultas preparadas de forma segura
 * 
 * @param PDO $pdo Objeto de conexión PDO
 * @param string $sql Consulta SQL con placeholders
 * @param array $params Parámetros para la consulta
 * @return PDOStatement Resultado de la consulta
 */
function executeQuery($pdo, $sql, $params = []) {
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    } catch (PDOException $e) {
        error_log("Error en consulta SQL: " . $e->getMessage());
        throw new Exception("Error al ejecutar la consulta.");
    }
}

/**
 * Función para iniciar una transacción
 * 
 * @param PDO $pdo Objeto de conexión PDO
 */
function beginTransaction($pdo) {
    $pdo->beginTransaction();
}

/**
 * Función para confirmar una transacción
 * 
 * @param PDO $pdo Objeto de conexión PDO
 */
function commitTransaction($pdo) {
    $pdo->commit();
}

/**
 * Función para revertir una transacción
 * 
 * @param PDO $pdo Objeto de conexión PDO
 */
function rollbackTransaction($pdo) {
    $pdo->rollBack();
}
?>
