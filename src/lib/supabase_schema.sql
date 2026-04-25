-- Tablas para el Portal Académico UniGlobal

-- 1. Perfiles de Usuarios (Extensión de Auth.Users)
CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    rol TEXT NOT NULL CHECK (rol IN ('Administrador', 'Director', 'Estudiante', 'Docente', 'Administrativo', 'Editor')),
    curp TEXT UNIQUE,
    nombre TEXT NOT NULL,
    apellido_paterno TEXT NOT NULL,
    apellido_materno TEXT,
    email TEXT UNIQUE NOT NULL,
    celular TEXT,
    modalidad TEXT CHECK (modalidad IN ('Presencial', 'Virtual', 'Mixta')),
    estatus TEXT DEFAULT 'Activo' CHECK (estatus IN ('Activo', 'Suspendido', 'Baja')),
    comentarios TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Carreras / Cursos
CREATE TABLE IF NOT EXISTS carreras (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre TEXT NOT NULL,
    modalidad TEXT CHECK (modalidad IN ('Presencial', 'Virtual', 'Mixta')),
    num_materias INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Materias
CREATE TABLE IF NOT EXISTS materias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre TEXT NOT NULL,
    descripcion TEXT,
    creditos INTEGER,
    carrera_id UUID REFERENCES carreras(id) ON DELETE CASCADE,
    modalidad TEXT CHECK (modalidad IN ('Presencial', 'Virtual', 'Mixta')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Grupos
CREATE TABLE IF NOT EXISTS grupos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    grado TEXT NOT NULL,
    modalidad TEXT CHECK (modalidad IN ('Presencial', 'Virtual', 'Mixta')),
    horario_semanal JSONB, -- Estructura flexible para el horario
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Asignación de Materias (Docente + Grupo + Materia)
CREATE TABLE IF NOT EXISTS asignaciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    docente_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    grupo_id UUID REFERENCES grupos(id) ON DELETE CASCADE,
    materia_id UUID REFERENCES materias(id) ON DELETE CASCADE,
    google_meet_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Inscripciones (Estudiante + Grupo)
CREATE TABLE IF NOT EXISTS inscripciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estudiante_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    grupo_id UUID REFERENCES grupos(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Clases Grabadas
CREATE TABLE IF NOT EXISTS clases_grabadas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre_clase TEXT NOT NULL,
    materia_id UUID REFERENCES materias(id) ON DELETE CASCADE,
    num_videos INTEGER,
    youtube_playlist_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Asistencias (Alumnos)
CREATE TABLE IF NOT EXISTS asistencias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estudiante_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    materia_id UUID REFERENCES materias(id) ON DELETE CASCADE,
    grupo_id UUID REFERENCES grupos(id) ON DELETE CASCADE,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    presente BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Configuración de Evaluación (Por materia/grupo/docente)
CREATE TABLE IF NOT EXISTS evaluacion_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    docente_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    materia_id UUID REFERENCES materias(id) ON DELETE CASCADE,
    grupo_id UUID REFERENCES grupos(id) ON DELETE CASCADE,
    pct_asistencia INTEGER DEFAULT 0,
    pct_participacion INTEGER DEFAULT 0,
    pct_tareas INTEGER DEFAULT 0,
    pct_examen INTEGER DEFAULT 0,
    UNIQUE(docente_id, materia_id, grupo_id)
);

-- 10. Calificaciones
CREATE TABLE IF NOT EXISTS calificaciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estudiante_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    materia_id UUID REFERENCES materias(id) ON DELETE CASCADE,
    grupo_id UUID REFERENCES grupos(id) ON DELETE CASCADE,
    nota_asistencia NUMERIC DEFAULT 0,
    nota_participacion NUMERIC DEFAULT 0,
    nota_tareas NUMERIC DEFAULT 0,
    nota_examen NUMERIC DEFAULT 0,
    nota_final NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. Tracking de Videos
CREATE TABLE IF NOT EXISTS video_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estudiante_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    clase_grabada_id UUID REFERENCES clases_grabadas(id) ON DELETE CASCADE,
    video_index INTEGER NOT NULL,
    fecha_ingreso TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    completado BOOLEAN DEFAULT FALSE
);

-- 12. Pagos (Administración)
CREATE TABLE IF NOT EXISTS pagos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estudiante_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    concepto TEXT NOT NULL, -- Colegiatura, Mensualidad, Extraordinario, etc.
    monto NUMERIC NOT NULL,
    fecha_pago DATE DEFAULT CURRENT_DATE,
    estatus TEXT DEFAULT 'Pagado' CHECK (estatus IN ('Pagado', 'Pendiente', 'Vencido')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. Horarios Personal (Administrativo y Docente)
CREATE TABLE IF NOT EXISTS horarios_personal (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    horario JSONB, -- Estructura flexible
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 14. Asistencia Personal
CREATE TABLE IF NOT EXISTS asistencia_personal (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    hora_entrada TIME,
    hora_salida TIME,
    estatus TEXT CHECK (estatus IN ('Presente', 'Falta', 'Retardo', 'Permiso')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS (Row Level Security) - Por ahora lo dejamos permisivo para desarrollo o configuramos lo básico
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON usuarios FOR SELECT USING (true);
CREATE POLICY "Users can update own profile." ON usuarios FOR UPDATE USING (auth.uid() = id);
