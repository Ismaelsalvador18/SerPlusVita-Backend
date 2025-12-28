CREATE TABLE usuarios (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	correo VARCHAR(100) UNIQUE,
	contrasena VARCHAR(200),
	nombre VARCHAR(20) NOT NULL,
	altura INTEGER NOT NULL,
	peso NUMERIC(5,2) NOT NULL,
	fecha_nacimiento DATE NOT NULL,
	invitado BOOLEAN NOT NULL DEFAULT TRUE,
	creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE pesos (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	usuario_id BIGINT NOT NULL,
	peso NUMERIC(5,2) NOT NULL,
	fecha DATE NOT NULL DEFAULT CURRENT_DATE,
	CONSTRAINT fk_pesos
		FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX ux_pesos_usuario_fecha ON pesos (usuario_id, fecha);

CREATE TABLE habitos (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	usuario_id BIGINT NOT NULL,
	titulo VARCHAR(20) NOT NULL,
	descripcion TEXT NOT NULL,
	recordatorio TIME NOT NULL,
	habilitado BOOLEAN NOT NULL DEFAULT TRUE,
	CONSTRAINT fk_habitos_usuario
		FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE historial_habitos (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    habito_id BIGINT NOT NULL,
    fecha DATE NOT NULL,
    completado BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_historial_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_historial_habito
        FOREIGN KEY (habito_id) REFERENCES habitos(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX ux_historial_habitos_usuario_habito_fecha ON historial_habitos (usuario_id, habito_id, fecha);

CREATE TABLE metricas (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	nombre VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE historial_metricas (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	usuario_id BIGINT NOT NULL,
	nombre_metrica_id BIGINT NOT NULL,
	medida NUMERIC(6,2) NOT NULL,
	fecha DATE NOT NULL,
	CONSTRAINT fk_metricas_usuario
		FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
	CONSTRAINT fk_metricas_nombre
		FOREIGN KEY (nombre_metrica_id) REFERENCES metricas(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX ux_hist_metricas_usuario_metrica_fecha ON historial_metricas (usuario_id, nombre_metrica_id, fecha);

CREATE TABLE token_verificacion (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	usuario_id BIGINT NOT NULL,
	token VARCHAR(200) NOT NULL UNIQUE,
	creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	fecha_expiracion TIMESTAMPTZ NOT NULL,
	usado BOOLEAN NOT NULL DEFAULT FALSE,
	CONSTRAINT verificacion FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
