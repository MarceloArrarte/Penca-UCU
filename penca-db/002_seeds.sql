-- Grupo A --
INSERT INTO equipo (pais, grupo) VALUES ('Argentina', 'A');
INSERT INTO equipo (pais, grupo) VALUES ('Perú', 'A');
INSERT INTO equipo (pais, grupo) VALUES ('Chile', 'A');
INSERT INTO equipo (pais, grupo) VALUES ('Canadá', 'A');

-- Grupo B --
INSERT INTO equipo (pais, grupo) VALUES ('México', 'B');
INSERT INTO equipo (pais, grupo) VALUES ('Ecuador', 'B');
INSERT INTO equipo (pais, grupo) VALUES ('Venezuela', 'B');
INSERT INTO equipo (pais, grupo) VALUES ('Jamaica', 'B');

-- Grupo C --
INSERT INTO equipo (pais, grupo) VALUES ('Estados Unidos', 'C');
INSERT INTO equipo (pais, grupo) VALUES ('Uruguay', 'C');
INSERT INTO equipo (pais, grupo) VALUES ('Panamá', 'C');
INSERT INTO equipo (pais, grupo) VALUES ('Bolivia', 'C');

-- Grupo D --
INSERT INTO equipo (pais, grupo) VALUES ('Brasil', 'D');
INSERT INTO equipo (pais, grupo) VALUES ('Colombia', 'D');
INSERT INTO equipo (pais, grupo) VALUES ('Paraguay', 'D');
INSERT INTO equipo (pais, grupo) VALUES ('Costa Rica', 'D');

-- Fases --
INSERT INTO fase (nombre) VALUES ('Fase de grupos - Jornada 1');
INSERT INTO fase (nombre) VALUES ('Fase de grupos - Jornada 2');
INSERT INTO fase (nombre) VALUES ('Fase de grupos - Jornada 3');
INSERT INTO fase (nombre) VALUES ('Cuartos de final');
INSERT INTO fase (nombre) VALUES ('Semifinal');
INSERT INTO fase (nombre) VALUES ('Tercer lugar');
INSERT INTO fase (nombre) VALUES ('Final');

-- Partidos --

-- Fase de grupos - Jornada 1
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-06-20 21:00:00', 'Fase de grupos - Jornada 1');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-06-21 21:00:00', 'Fase de grupos - Jornada 1');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-06-22 19:00:00', 'Fase de grupos - Jornada 1');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-06-22 22:00:00', 'Fase de grupos - Jornada 1');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-06-23 19:00:00', 'Fase de grupos - Jornada 1');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-06-23 22:00:00', 'Fase de grupos - Jornada 1');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-06-24 19:00:00', 'Fase de grupos - Jornada 1');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-06-24 22:00:00', 'Fase de grupos - Jornada 1');

-- Fase de grupos - Jornada 2
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-06-25 19:00:00', 'Fase de grupos - Jornada 2');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-06-25 22:00:00', 'Fase de grupos - Jornada 2');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-06-26 19:00:00', 'Fase de grupos - Jornada 2');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-06-26 22:00:00', 'Fase de grupos - Jornada 2');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-06-27 19:00:00', 'Fase de grupos - Jornada 2');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-06-27 22:00:00', 'Fase de grupos - Jornada 2');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-06-28 19:00:00', 'Fase de grupos - Jornada 2');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-06-28 22:00:00', 'Fase de grupos - Jornada 2');

-- Fase de grupos - Jornada 3
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-06-29 21:00:00', 'Fase de grupos - Jornada 3');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-06-29 21:00:00', 'Fase de grupos - Jornada 3');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-06-30 21:00:00', 'Fase de grupos - Jornada 3');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-06-30 21:00:00', 'Fase de grupos - Jornada 3');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-07-01 22:00:00', 'Fase de grupos - Jornada 3');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-07-01 22:00:00', 'Fase de grupos - Jornada 3');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-07-02 22:00:00', 'Fase de grupos - Jornada 3');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-07-02 22:00:00', 'Fase de grupos - Jornada 3');

-- Cuartos de final --
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-07-04 22:00:00', 'Cuartos de final');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-07-05 22:00:00', 'Cuartos de final');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-07-06 19:00:00', 'Cuartos de final');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-07-06 22:00:00', 'Cuartos de final');

-- Semifinal --
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-07-09 21:00:00', 'Semifinal');
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-07-10 21:00:00', 'Semifinal');

-- Tercer lugar --
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-07-13 21:00:00', 'Tercer lugar');

-- Final --
INSERT INTO partido (fecha_hora, nombre_fase) VALUES ('2024-07-14 21:00:00', 'Final');

-- Enfrentamientos --

-- Partido 1: Argentina vs Canadá
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (1, 1, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (4, 1, null);

-- Partido 2: Perú vs Chile
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (2, 2, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (3, 2, null);

-- Partido 3: Ecuador vs Venezuela
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (6, 3, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (7, 3, null);

-- Partido 4: México vs Jamaica
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (5, 4, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (8, 4, null);

-- Partido 5: Estados Unidos vs Bolivia
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (9, 5, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (12, 5, null);

-- Partido 6: Uruguay vs Panamá
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (10, 6, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (11, 6, null);

-- Partido 7: Colombia vs Paraguay
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (14, 7, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (15, 7, null);

-- Partido 8: Brasil vs Costa Rica
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (13, 8, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (16, 8, null);

-- Partido 9: Perú vs Canadá
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (2, 9, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (4, 9, null);

-- Partido 10: Chile vs Argentina
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (3, 10, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (1, 10, null);

-- Partido 11: Ecuador vs Jamaica
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (6, 11, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (8, 11, null);

-- Partido 12: Venezuela vs México
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (7, 12, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (5, 12, null);

-- Partido 13: Panamá vs Estados Unidos
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (11, 13, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (9, 13, null);

-- Partido 14: Uruguay vs Bolivia
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (10, 14, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (12, 14, null);

-- Partido 15: Colombia vs Costa Rica
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (14, 15, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (16, 15, null);

-- Partido 16: Paraguay vs Brasil
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (15, 16, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (13, 16, null);

-- Partido 17: Argentina vs Perú
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (1, 17, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (2, 17, null);

-- Partido 18: Canadá vs Chile
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (4, 18, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (3, 18, null);

-- Partido 19: México vs Ecuador
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (5, 19, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (6, 19, null);

-- Partido 20: Jamaica vs Venezuela
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (8, 20, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (7, 20, null);

-- Partido 21: Bolivia vs Panamá
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (12, 21, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (11, 21, null);

-- Partido 22: Estados Unidos vs Uruguay
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (9, 22, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (10, 22, null);

-- Partido 23: Brasil vs Colombia
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (13, 23, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (14, 23, null);

-- Partido 24: Costa Rica vs Paraguay
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (16, 24, null);
INSERT INTO juega (id_equipo, id_partido, goles) VALUES (15, 24, null);

-- Usuario admin predeterminado (pass 1234)
INSERT INTO usuario (documento, nombre, email, contraseña)
VALUES ('12345678', 'Sr. Admin', 'admin@ucu.edu.uy', '$2a$10$06z.ZcR0pLcpZpS7L20z3O.FxbaPtO2RxgIjcMj1vgYMacG/RyoFG');
INSERT INTO admin VALUES ('12345678');

INSERT INTO carrera (nombre)
VALUES ('Ing. Informática'), ('Ing. Industrial'), ('Psicología'), ('Administración de empresas'), ('Odontología');
