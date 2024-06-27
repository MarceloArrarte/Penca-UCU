CREATE TABLE equipo (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    pais VARCHAR(100) NOT NULL,
    grupo VARCHAR(10) NOT NULL
);

CREATE TABLE fase (
	nombre VARCHAR(50) PRIMARY KEY
);

CREATE TABLE carrera (
	nombre VARCHAR(100) PRIMARY KEY
);

CREATE TABLE usuario (
	documento VARCHAR(15) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(100) NOT NULL
);

CREATE TABLE `admin` (
	documento_usuario VARCHAR(15) PRIMARY KEY,
    CONSTRAINT fk_admin_usuario FOREIGN KEY (documento_usuario) REFERENCES usuario (documento)
);

CREATE TABLE alumno (
	documento_usuario VARCHAR(15) PRIMARY KEY,
    id_campeon INT UNSIGNED NOT NULL,
    id_subcampeon INT UNSIGNED NOT NULL,
    CONSTRAINT fk_alumno_usuario FOREIGN KEY (documento_usuario) REFERENCES usuario (documento),
    CONSTRAINT fk_alumno_campeon FOREIGN KEY (id_campeon) REFERENCES equipo (id),
    CONSTRAINT fk_alumno_subcampeon FOREIGN KEY (id_subcampeon) REFERENCES equipo (id)
);

CREATE TABLE cursa (
	documento_alumno VARCHAR(15) NOT NULL,
    nombre_carrera VARCHAR(100) NOT NULL,
    CONSTRAINT pk_cursa PRIMARY KEY (documento_alumno, nombre_carrera),
    CONSTRAINT fk_cursa_alumno FOREIGN KEY (documento_alumno) REFERENCES alumno (documento_usuario),
    CONSTRAINT fk_cursa_carrera FOREIGN KEY (nombre_carrera) REFERENCES carrera (nombre)
);

CREATE TABLE partido (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    fecha_hora DATETIME NOT NULL,
    nombre_fase VARCHAR(50) NOT NULL,
    CONSTRAINT fk_partido_fase FOREIGN KEY (nombre_fase) REFERENCES fase (nombre)
);

CREATE TABLE notifica (
	id_partido INT UNSIGNED,
    documento_alumno VARCHAR(15),
    fecha_envio DATETIME,
    mensaje TEXT NOT NULL,
    CONSTRAINT pk_notifica PRIMARY KEY (id_partido, documento_alumno),
    CONSTRAINT fk_notifica_alumno FOREIGN KEY (documento_alumno) REFERENCES alumno (documento_usuario),
    CONSTRAINT fk_notifica_partido FOREIGN KEY (id_partido) REFERENCES partido (id)
);

CREATE TABLE juega (
	id_equipo INT UNSIGNED,
    id_partido INT UNSIGNED,
    goles INT UNSIGNED,
    penales INT UNSIGNED,
    CONSTRAINT pk_juega PRIMARY KEY (id_equipo, id_partido),
    CONSTRAINT fk_juega_equipo FOREIGN KEY (id_equipo) REFERENCES equipo (id),
    CONSTRAINT fk_juega_partido FOREIGN KEY (id_partido) REFERENCES partido (id) 
);

CREATE TABLE predice (
	id_equipo INT UNSIGNED,
    id_partido INT UNSIGNED,
    documento_alumno VARCHAR(15),
    goles INT UNSIGNED,
    CONSTRAINT pk_predice PRIMARY KEY (id_equipo, id_partido, documento_alumno),
    CONSTRAINT fk_predice_juega FOREIGN KEY (id_equipo, id_partido) REFERENCES juega (id_equipo, id_partido),
    CONSTRAINT fk_predice_alumno FOREIGN KEY (documento_alumno) REFERENCES alumno (documento_usuario)
);
