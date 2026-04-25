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

-- 6. Inscripciones de Alumnos a Grupos
CREATE TABLE IF NOT EXISTS inscripciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    alumno_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    grupo_id UUID REFERENCES grupos(id) ON DELETE CASCADE,
    fecha_inscripcion DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Pagos y Colegiaturas
CREATE TABLE IF NOT EXISTS pagos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    alumno_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    concepto TEXT NOT NULL, -- Colegiatura, Inscripción, Recargo, etc.
    monto DECIMAL(10,2) NOT NULL,
    fecha_pago DATE DEFAULT CURRENT_DATE,
    estatus_pago TEXT CHECK (estatus_pago IN ('Pagado', 'Pendiente', 'Vencido')),
    metodo_pago TEXT,
    comprobante_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Calificaciones
CREATE TABLE IF NOT EXISTS calificaciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inscripcion_id UUID REFERENCES inscripciones(id) ON DELETE CASCADE,
    materia_id UUID REFERENCES materias(id) ON DELETE CASCADE,
    calificacion_num DECIMAL(5,2),
    letra TEXT,
    periodo TEXT,
    comentarios TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Asistencias de Alumnos
CREATE TABLE IF NOT EXISTS asistencias_alumnos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    alumno_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    grupo_id UUID REFERENCES grupos(id) ON DELETE CASCADE,
    materia_id UUID REFERENCES materias(id) ON DELETE CASCADE,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    presente BOOLEAN DEFAULT true,
    comentarios TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Clases Grabadas (YouTube)
CREATE TABLE IF NOT EXISTS clases_grabadas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    materia_id UUID REFERENCES materias(id) ON DELETE CASCADE,
    grupo_id UUID REFERENCES grupos(id) ON DELETE CASCADE,
    titulo TEXT NOT NULL,
    youtube_url TEXT NOT NULL,
    orden INTEGER NOT NULL, -- Para el tracking secuencial
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. Progreso de Videos (Tracking para Estudiantes)
CREATE TABLE IF NOT EXISTS progreso_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    alumno_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    clase_id UUID REFERENCES clases_grabadas(id) ON DELETE CASCADE,
    completado BOOLEAN DEFAULT false,
    ultima_posicion INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(alumno_id, clase_id)
);

-- 12. Horarios y Asistencia de Personal (Docente/Administrativo)
CREATE TABLE IF NOT EXISTS asistencia_personal (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    hora_entrada TIME,
    hora_salida TIME,
    estatus TEXT CHECK (estatus IN ('Presente', 'Falta', 'Retardo', 'Permiso')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- Limpiar políticas existentes para evitar errores de duplicado
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON usuarios;
DROP POLICY IF EXISTS "Users can update own profile." ON usuarios;

-- Crear políticas
CREATE POLICY "Public profiles are viewable by everyone." ON usuarios FOR SELECT USING (true);
CREATE POLICY "Users can update own profile." ON usuarios FOR UPDATE USING (auth.uid() = id);
