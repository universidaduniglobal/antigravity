import type { Metadata } from "next";
import { User, GraduationCap, Church, FileText, CalendarCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Inscripción | UniGlobal",
  description: "Formulario de Inscripción Digital para la Universidad UniGlobal.",
};

export default function InscripcionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <section className="pt-32 pb-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Formulario de Inscripción Digital</h1>
          <p className="text-lg text-primary-foreground/80">
            Estás a un paso de iniciar tu preparación ministerial y profesional. Por favor completa la siguiente información con tus datos reales.
          </p>
        </div>
      </section>

      {/* Main Form */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* 
              Formulario conectado a Formspree
            */}
            <form 
              action="https://formspree.io/f/xrerrjbk" 
              method="POST" 
              encType="multipart/form-data"
              className="space-y-12"
            >
              
              {/* Sección 1: Información Personal */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="bg-blue-50 dark:bg-blue-950/30 px-8 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <User className="text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Sección 1: Información Personal</h2>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nombre Completo *</label>
                    <input type="text" name="NombreCompleto" required className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ej. Juan Pérez García" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Fecha de Nacimiento *</label>
                    <input type="date" name="FechaNacimiento" required className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-300" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Documento de Identidad (Cédula/DNI/Pasaporte) *</label>
                    <input type="text" name="DocumentoIdentidad" required className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Correo Electrónico *</label>
                    <input type="email" name="Email" required className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="tu@correo.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Número de WhatsApp/Teléfono *</label>
                    <input type="tel" name="Telefono" required className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+52 ..." />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Dirección de Residencia *</label>
                    <textarea name="Direccion" required rows={3} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Calle, número, colonia, ciudad, código postal..."></textarea>
                  </div>
                </div>
              </div>

              {/* Sección 2: Perfil Académico y Profesional */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="bg-blue-50 dark:bg-blue-950/30 px-8 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <GraduationCap className="text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Sección 2: Perfil Académico y Profesional</h2>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Último grado académico obtenido *</label>
                    <select name="GradoAcademico" required className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-slate-700 dark:text-slate-300">
                      <option value="">Selecciona una opción...</option>
                      <option value="Bachillerato">Bachillerato / Preparatoria</option>
                      <option value="Técnico">Estudios Técnicos</option>
                      <option value="Licenciatura">Licenciatura / Ingeniería</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Institución de egreso *</label>
                    <input type="text" name="InstitucionEgreso" required className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Ocupación actual *</label>
                    <input type="text" name="Ocupacion" required className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>

              {/* Sección 3: Trasfondo Ministerial y Vocacional */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="bg-blue-50 dark:bg-blue-950/30 px-8 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <Church className="text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Sección 3: Trasfondo Ministerial y Vocacional</h2>
                </div>
                <div className="p-8 grid grid-cols-1 gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">¿A qué congregación o comunidad asiste actualmente? *</label>
                      <input type="text" name="Congregacion" required className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Tiempo de membresía/asistencia *</label>
                      <input type="text" name="TiempoAsistencia" required className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ej. 2 años, 6 meses..." />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Áreas de servicio en las que ha participado (Puedes marcar varias) *</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {['Escuela dominical', 'Jóvenes', 'Alabanza', 'Misiones', 'Ninguna', 'Otros'].map((area) => (
                        <label key={area} className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                          <input type="checkbox" name={`AreaServicio_${area}`} value={area} className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">{area}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">¿Por qué te interesa la Licenciatura en Teología y Consejería Familiar? *</label>
                    <textarea name="RazonInteres" required rows={4} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Cuéntanos brevemente tu motivación..."></textarea>
                  </div>
                </div>
              </div>

              {/* Sección 4: Carga de Documentos */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="bg-blue-50 dark:bg-blue-950/30 px-8 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <FileText className="text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Sección 4: Carga de Documentos</h2>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Foto del Título de Bachillerato (PDF/Imagen) *</label>
                    <input type="file" name="Doc_Titulo" accept=".pdf,image/*" required className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Copia de Identidad (PDF/Imagen) *</label>
                    <input type="file" name="Doc_Identidad" accept=".pdf,image/*" required className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Carta de Recomendación Pastoral (PDF) *</label>
                    <input type="file" name="Doc_CartaPastoral" accept=".pdf" required className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Foto formal para carnet (JPG/PNG) *</label>
                    <input type="file" name="Doc_FotoCarnet" accept="image/png, image/jpeg" required className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/30 dark:file:text-blue-400" />
                  </div>
                </div>
              </div>

              {/* Sección 5: Disponibilidad y Pago */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="bg-blue-50 dark:bg-blue-950/30 px-8 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <CalendarCheck className="text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Sección 5: Disponibilidad y Pago</h2>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Horario de preferencia *</label>
                    <select name="HorarioPreferencia" required className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-slate-700 dark:text-slate-300">
                      <option value="">Selecciona una opción...</option>
                      <option value="Mañana">Mañana</option>
                      <option value="Tarde">Tarde</option>
                      <option value="Noche">Noche</option>
                      <option value="Sabatino">Sabatino</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Método de pago de matrícula *</label>
                    <select name="MetodoPago" required className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-slate-700 dark:text-slate-300">
                      <option value="">Selecciona una opción...</option>
                      <option value="Transferencia bancaria">Transferencia bancaria</option>
                      <option value="Depósito">Depósito en efectivo</option>
                      <option value="Tarjeta de crédito">Tarjeta de crédito / débito</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Botón de Enviar */}
              <div className="flex justify-end pt-6">
                <Button type="submit" size="lg" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-full px-12 text-lg h-16 shadow-lg shadow-blue-500/30 transition-transform hover:scale-105 flex items-center justify-center gap-3">
                  <CheckCircle2 className="w-6 h-6" />
                  Enviar Solicitud de Inscripción
                </Button>
              </div>

            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
