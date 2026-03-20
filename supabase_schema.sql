-- SUPABASE DATABASE SCHEMA PARA AMAUI MVP
-- Ejecutar este archivo en la pestaña "SQL Editor" de Supabase

-- 1. Tabla de Usuarios (Perfiles 50+)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone_number TEXT UNIQUE NOT NULL,
  full_name TEXT,
  age INTEGER,
  main_condition TEXT,
  other_condition TEXT,
  -- Datos de la persona de confianza
  trusted_person_name TEXT,
  trusted_person_phone TEXT,
  trusted_person_role TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Tabla de Medicamentos
CREATE TABLE medications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  purpose TEXT,
  first_dose_time TIME NOT NULL,
  frequency_hours INTEGER, -- Ej: 24 (una vez al día), 12, 8
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 3. Tabla de Registro de Tomas (Log de Medicación)
CREATE TABLE medication_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  medication_id UUID REFERENCES medications(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  taken_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  status TEXT CHECK (status IN ('taken', 'skipped', 'missed')) DEFAULT 'taken'
);

-- 4. Tabla de Registro de Salud (Presión Arterial, etc.)
CREATE TABLE health_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  systolic INTEGER NOT NULL, -- Número alto (Ej: 120)
  diastolic INTEGER NOT NULL, -- Número bajo (Ej: 80)
  state TEXT CHECK (state IN ('normal', 'attention', 'alert')) NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Seguridad: Configurar Row Level Security (RLS) para requerimientos de anonimato/auth real
-- Por ahora, para el MVP / Demo en Supabase sin Auth complejo, puedes habilitar policies públicas o anónimas.
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_logs ENABLE ROW LEVEL SECURITY;

-- Políticas de Permisos Públicos (Demo) - ADVERTENCIA: Solo para propósitos de Demo rápida
CREATE POLICY "Permitir lectura y escritura pública en profiles" ON profiles FOR ALL USING (true);
CREATE POLICY "Permitir lectura y escritura pública en medications" ON medications FOR ALL USING (true);
CREATE POLICY "Permitir lectura y escritura pública en medication_logs" ON medication_logs FOR ALL USING (true);
CREATE POLICY "Permitir lectura y escritura pública en health_logs" ON health_logs FOR ALL USING (true);
