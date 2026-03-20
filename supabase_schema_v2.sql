-- SUPABASE SCHEMA V2 (SOPORTE PARA USUARIOS MIXTOS Y MULTI-CUIDADOR)

-- 1. Tabla de Usuarios (Ambos roles en la misma base)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone_number TEXT UNIQUE NOT NULL,
  full_name TEXT,
  age INTEGER,
  role TEXT DEFAULT 'user', -- 'user', 'caregiver', 'mixed'
  main_condition TEXT,
  other_condition TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Tabla de Relaciones (Multi-Paciente)
-- Conecta al paciente con uno o más cuidadores
CREATE TABLE caregiver_relations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  caregiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  relationship TEXT, -- Ej: 'Hijo', 'Enfermera'
  permissions JSONB DEFAULT '{"view_health": true, "view_meds": true, "can_edit": false}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(caregiver_id, patient_id)
);

-- 3. Tabla de Medicamentos
CREATE TABLE medications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  purpose TEXT,
  first_dose_time TIME NOT NULL,
  frequency_hours INTEGER,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 4. Registro de Tomas Diarias
CREATE TABLE medication_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  medication_id UUID REFERENCES medications(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  taken_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  status TEXT CHECK (status IN ('taken', 'skipped', 'missed')) DEFAULT 'taken'
);

-- 5. Registro de Salud (Presión y Opcional Glucosa)
CREATE TABLE health_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  systolic INTEGER,
  diastolic INTEGER,
  glucose INTEGER,
  state TEXT CHECK (state IN ('normal', 'attention', 'alert')) NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- RLS (SEGURIDAD DE FILAS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE caregiver_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_logs ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE ACCESO (Permisos de lectura/escritura)
-- 1. El usuario puede ver y editar su propio perfil
CREATE POLICY "Dueño lee su perfil" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Dueño edita su perfil" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Un cuidador puede ver el perfil de un paciente si existe una relación activa
CREATE POLICY "Cuidador lee perfil de paciente" ON profiles FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM caregiver_relations WHERE caregiver_id = auth.uid() AND patient_id = profiles.id
  )
);

-- 3. Medicinas y logs pueden ser leídos por el dueño o por un cuidador vinculado
CREATE POLICY "Acceso a medicinas (Usuario y Cuidador)" ON medications FOR SELECT USING (
  user_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM caregiver_relations WHERE caregiver_id = auth.uid() AND patient_id = medications.user_id
  )
);

CREATE POLICY "Acceso a historial de salud (Usuario y Cuidador)" ON health_logs FOR SELECT USING (
  user_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM caregiver_relations WHERE caregiver_id = auth.uid() AND patient_id = health_logs.user_id
  )
);
