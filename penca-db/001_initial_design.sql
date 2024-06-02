CREATE TABLE equipo (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    pais VARCHAR(100) NOT NULL
);

CREATE TABLE copa (
	nombre VARCHAR(100) PRIMARY KEY,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    pais_anfitrion VARCHAR(100) NOT NULL,
    id_campeon INT UNSIGNED,
    id_subcampeon INT UNSIGNED,
    CONSTRAINT fk_copa_campeon FOREIGN KEY (id_campeon) REFERENCES equipo (id),
    CONSTRAINT fk_copa_subcampeon FOREIGN KEY (id_subcampeon) REFERENCES equipo (id)
);

CREATE TABLE fase (
	nombre VARCHAR(50),
    nombre_copa VARCHAR(100),
    CONSTRAINT fk_fase_copa FOREIGN KEY (nombre_copa) REFERENCES copa (nombre),
    CONSTRAINT pk_fase PRIMARY KEY (nombre, nombre_copa)
);

CREATE TABLE penca (
	nombre VARCHAR(50) PRIMARY KEY,
    fecha_inicio_inscripcion DATETIME NOT NULL,
    fecha_fin_inscripcion DATETIME NOT NULL,
    nombre_copa VARCHAR(100) NOT NULL,
    CONSTRAINT fk_penca_copa FOREIGN KEY (nombre_copa) REFERENCES copa (nombre)
);

CREATE TABLE alumno (
	documento VARCHAR(15) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE carrera (
	nombre VARCHAR(100) PRIMARY KEY
);

CREATE TABLE cursa (
	documento_alumno VARCHAR(15) NOT NULL,
    nombre_carrera VARCHAR(100) NOT NULL,
    CONSTRAINT pk_cursa PRIMARY KEY (documento_alumno, nombre_carrera),
    CONSTRAINT fk_cursa_alumno FOREIGN KEY (documento_alumno) REFERENCES alumno (documento),
    CONSTRAINT fk_cursa_carrera FOREIGN KEY (nombre_carrera) REFERENCES carrera (nombre)
);

CREATE TABLE usuario (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    documento_alumno VARCHAR(15) NOT NULL,
    nombre_penca VARCHAR(50) NOT NULL,
    contraseña VARCHAR(200) NOT NULL,
    CONSTRAINT unq_alumno_penca UNIQUE (documento_alumno, nombre_penca),
    CONSTRAINT fk_usuario_alumno FOREIGN KEY (documento_alumno) REFERENCES alumno (documento),
    CONSTRAINT fk_usuario_penca FOREIGN KEY (nombre_penca) REFERENCES penca (nombre)
);

CREATE TABLE `admin` (
	id_usuario INT UNSIGNED PRIMARY KEY,
    CONSTRAINT fk_admin_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id)
);

CREATE TABLE participante (
	id_usuario INT UNSIGNED PRIMARY KEY,
    id_campeon INT UNSIGNED NOT NULL,
    id_subcampeon INT UNSIGNED NOT NULL,
    CONSTRAINT fk_participante_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id),
    CONSTRAINT fk_participante_campeon FOREIGN KEY (id_campeon) REFERENCES equipo (id),
    CONSTRAINT fk_participante_subcampeon FOREIGN KEY (id_subcampeon) REFERENCES equipo (id)
);

CREATE TABLE partido (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    fecha_hora DATETIME NOT NULL,
    finalizado TINYINT(1) NOT NULL,
    numero_en_torneo INT UNSIGNED,
    nombre_copa VARCHAR(100) NOT NULL,
    nombre_fase VARCHAR(50) NOT NULL,
    CONSTRAINT unq_numero_torneo_copa UNIQUE (numero_en_torneo, nombre_copa),
    CONSTRAINT fk_partido_fase FOREIGN KEY (nombre_copa, nombre_fase) REFERENCES fase (nombre, nombre_copa)
);

CREATE TABLE notifica (
	id_partido INT UNSIGNED,
    id_usuario INT UNSIGNED,
    fecha_envio DATETIME,
    mensaje TEXT NOT NULL,
    CONSTRAINT pk_notifica PRIMARY KEY (id_partido, id_usuario),
    CONSTRAINT fk_notifica_participante FOREIGN KEY (id_usuario) REFERENCES participante (id_usuario),
    CONSTRAINT fk_notifica_partido FOREIGN KEY (id_partido) REFERENCES partido (id)
);

CREATE TABLE juega (
	id_equipo INT UNSIGNED,
    id_partido INT UNSIGNED,
    goles INT UNSIGNED,
    CONSTRAINT pk_juega PRIMARY KEY (id_equipo, id_partido),
    CONSTRAINT fk_juega_equipo FOREIGN KEY (id_equipo) REFERENCES equipo (id),
    CONSTRAINT fk_juega_partido FOREIGN KEY (id_partido) REFERENCES partido (id) 
);

CREATE TABLE predice (
	id_equipo INT UNSIGNED,
    id_partido INT UNSIGNED,
    id_participante INT UNSIGNED,
    goles INT UNSIGNED,
    CONSTRAINT pk_predice PRIMARY KEY (id_equipo, id_partido, id_participante),
    CONSTRAINT fk_predice_juega FOREIGN KEY (id_equipo, id_partido) REFERENCES juega (id_equipo, id_partido),
    CONSTRAINT fk_predice_participante FOREIGN KEY (id_participante) REFERENCES participante (id_usuario)
)