'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  User, 
  MapPin, 
  Church, 
  BookOpen, 
  FileText, 
  Send, 
  CheckCircle2, 
  Loader2, 
  AlertCircle,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function InscripcionPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    nombre_completo: '',
    fecha_nacimiento: '',
    documento_identidad: '',
    email: '',
    telefono: '',
    direccion: '',
    iglesia_asiste: '',
    pastor: '',
    tiempo_asistencia: '',
    areas_servicio: [] as string[],
    carrera_interes: '',
    modalidad_interes: '',
    comentarios: ''
  });

  const [files, setFiles] = useState({
    identificacion: null as File | null,
    estudios: null as File | null,
    foto: null as File | null
  });

  const areasDisponibles = [
    "Alabanza", "Ujieres", "Niños", "Jóvenes", "Misiones", "Multimedia", "Intercesión", "Otro"
  ];

  const handleCheckboxChange = (area: string) => {
    setFormData(prev => ({
      ...prev,
      areas_servicio: prev.areas_servicio.includes(area)
        ? prev.areas_servicio.filter(a => a !== area)
        : [...prev.areas_servicio, area]
    }));
  };

  const uploadFile = async (file: File, folder: string) => {
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
    const { data, error } = await supabase.storage
      .from('inscripciones')
      .upload(`${folder}/${fileName}`, file);
    
    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from('inscripciones')
      .getPublicUrl(data.path);
      
    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let url_identificacion = '';
      let url_estudios = '';
      let url_foto = '';

      // Subir archivos si existen
      if (files.identificacion) url_identificacion = await uploadFile(files.identificacion, 'identificaciones');
      if (files.estudios) url_estudios = await uploadFile(files.estudios, 'estudios');
      if (files.foto) url_foto = await uploadFile(files.foto, 'fotos');

      // Insertar en Base de Datos
      const { error: insertError } = await supabase
        .from('solicitudes_inscripcion')
        .insert([{
          ...formData,
          url_identificacion,
          url_estudios,
          url_foto
        }]);

      if (insertError) throw insertError;

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Error en inscripción:', err);
      setError(err.message || 'Hubo un error al procesar tu solicitud. Revisa el tamaño de tus archivos.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in duration-700">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 size={48} />
            </div>
            <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100">¡Solicitud Enviada con Éxito!</h1>
            <p className="text-xl text-slate-500 leading-relaxed">
              Gracias por tu interés en formar parte de <strong>UniGlobal</strong>. Hemos recibido tus datos y documentos correctamente.
            </p>
            <div className="p-8 bg-blue-50 dark:bg-blue-900/20 rounded-[2.5rem] border border-blue-100 dark:border-blue-800">
              <p className="text-blue-700 dark:text-blue-300 font-bold">¿Qué sigue ahora?</p>
              <p className="text-sm text-blue-600/80 dark:text-blue-400/80 mt-2">
                Nuestro equipo de admisiones revisará tu papelería y se pondrá en contacto contigo a través de WhatsApp o Correo Electrónico en un lapso de 24 a 48 horas hábiles.
              </p>
            </div>
            <Button asChild className="px-10 py-6 rounded-2xl font-bold bg-primary hover:bg-primary/90 transition-all">
              <a href="/">Volver al Inicio</a>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 -z-10"></div>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-slate-800 dark:text-slate-100 mb-6 tracking-tight">
            Inicia tu <span className="text-primary italic">Legado</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Completa tu solicitud de inscripción digital. Estás a un paso de comenzar tu formación académica y ministerial de excelencia.
          </p>
        </div>
      </section>

      {/* Main Form */}
      <section className="py-12 md:py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {error && (
              <div className="mb-8 p-6 bg-red-50 border border-red-100 text-red-700 rounded-3xl flex items-center gap-4 animate-shake">
                <AlertCircle />
                <p className="font-bold">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-12">
              
              {/* Sección 1: Información Personal */}
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="bg-blue-50/50 dark:bg-blue-900/10 px-10 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg">
                    <User size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Información Personal</h2>
                </div>
                <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nombre Completo *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.nombre_completo}
                      onChange={e => setFormData({...formData, nombre_completo: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all" 
                      placeholder="Ej. Juan Pérez García" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fecha de Nacimiento *</label>
                    <input 
                      type="date" 
                      required 
                      value={formData.fecha_nacimiento}
                      onChange={e => setFormData({...formData, fecha_nacimiento: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Documento de Identidad (INE/Pasaporte) *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.documento_identidad}
                      onChange={e => setFormData({...formData, documento_identidad: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all" 
                      placeholder="Ej. INE 912548755" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Correo Electrónico *</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all" 
                      placeholder="tu@correo.com" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Número de WhatsApp *</label>
                    <input 
                      type="tel" 
                      required 
                      value={formData.telefono}
                      onChange={e => setFormData({...formData, telefono: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all" 
                      placeholder="+52 ..." 
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dirección Completa *</label>
                    <textarea 
                      required 
                      rows={3} 
                      value={formData.direccion}
                      onChange={e => setFormData({...formData, direccion: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none" 
                      placeholder="Calle, número, colonia, ciudad, código postal..."
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Sección 2: Perfil Ministerial */}
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="bg-emerald-50/50 dark:bg-emerald-900/10 px-10 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-lg">
                    <Church size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Información Ministerial</h2>
                </div>
                <div className="p-10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Iglesia a la que asiste *</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.iglesia_asiste}
                        onChange={e => setFormData({...formData, iglesia_asiste: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nombre de su Pastor *</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.pastor}
                        onChange={e => setFormData({...formData, pastor: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Áreas de servicio en las que ha participado</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {areasDisponibles.map((area) => (
                        <label key={area} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl cursor-pointer hover:bg-slate-100 transition-all border border-transparent has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50/50">
                          <input 
                            type="checkbox" 
                            className="w-5 h-5 rounded-lg border-slate-300 text-emerald-600 focus:ring-emerald-500" 
                            checked={formData.areas_servicio.includes(area)}
                            onChange={() => handleCheckboxChange(area)}
                          />
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{area}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección 3: Interés Académico */}
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="bg-purple-50/50 dark:bg-purple-900/10 px-10 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-600 text-white rounded-xl flex items-center justify-center shadow-lg">
                    <BookOpen size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Interés Académico</h2>
                </div>
                <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Carrera de Interés *</label>
                    <select 
                      required 
                      value={formData.carrera_interes}
                      onChange={e => setFormData({...formData, carrera_interes: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    >
                      <option value="">Selecciona una opción...</option>
                      <option value="Teología">Licenciatura en Teología</option>
                      <option value="Administración Eclesiástica">Administración Eclesiástica</option>
                      <option value="Música y Adoración">Música y Adoración</option>
                      <option value="Educación Cristiana">Educación Cristiana</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Modalidad *</label>
                    <select 
                      required 
                      value={formData.modalidad_interes}
                      onChange={e => setFormData({...formData, modalidad_interes: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    >
                      <option value="">Selecciona una opción...</option>
                      <option value="Presencial">Presencial (Sábados)</option>
                      <option value="Virtual">Virtual (En línea)</option>
                      <option value="Híbrido">Híbrido</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Sección 4: Documentación Digital */}
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="bg-orange-50/50 dark:bg-orange-900/10 px-10 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-600 text-white rounded-xl flex items-center justify-center shadow-lg">
                    <FileText size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Documentación (Opcional por ahora)</h2>
                </div>
                <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Identificación Oficial</label>
                    <div className="relative group">
                      <input 
                        type="file" 
                        className="hidden" 
                        id="file-id" 
                        onChange={e => setFiles({...files, identificacion: e.target.files?.[0] || null})}
                      />
                      <label htmlFor="file-id" className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[2rem] cursor-pointer hover:border-primary hover:bg-slate-50 transition-all">
                        <Upload className="text-slate-400 mb-2 group-hover:text-primary transition-colors" />
                        <span className="text-xs font-bold text-slate-500">{files.identificacion ? files.identificacion.name : "Subir Foto/PDF"}</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Comprobante de Estudios</label>
                    <div className="relative group">
                      <input 
                        type="file" 
                        className="hidden" 
                        id="file-study" 
                        onChange={e => setFiles({...files, estudios: e.target.files?.[0] || null})}
                      />
                      <label htmlFor="file-study" className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[2rem] cursor-pointer hover:border-primary hover:bg-slate-50 transition-all">
                        <Upload className="text-slate-400 mb-2 group-hover:text-primary transition-colors" />
                        <span className="text-xs font-bold text-slate-500">{files.estudios ? files.estudios.name : "Subir Foto/PDF"}</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Foto para Credencial</label>
                    <div className="relative group">
                      <input 
                        type="file" 
                        className="hidden" 
                        id="file-photo" 
                        onChange={e => setFiles({...files, foto: e.target.files?.[0] || null})}
                      />
                      <label htmlFor="file-photo" className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[2rem] cursor-pointer hover:border-primary hover:bg-slate-50 transition-all">
                        <Upload className="text-slate-400 mb-2 group-hover:text-primary transition-colors" />
                        <span className="text-xs font-bold text-slate-500">{files.foto ? files.foto.name : "Subir Imagen"}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón de envío */}
              <div className="text-center pb-20">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-primary text-white text-xl font-black px-16 py-10 rounded-[2rem] shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-4 mx-auto"
                >
                  {loading ? (
                    <><Loader2 className="animate-spin" /> Procesando Solicitud...</>
                  ) : (
                    <><Send size={24} /> Enviar Solicitud Digital</>
                  )}
                </Button>
                <p className="mt-6 text-sm text-slate-400">
                  Al hacer clic, aceptas nuestros términos y condiciones de privacidad.
                </p>
              </div>

            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
