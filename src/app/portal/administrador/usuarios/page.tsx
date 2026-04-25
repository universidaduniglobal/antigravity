'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  UserPlus,
  Mail,
  Phone,
  User as UserIcon,
  Shield,
  X,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    rol: '',
    curp: '',
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    email: '',
    celular: '',
    modalidad: '',
    estatus: 'Activo',
    comentarios: '',
    password: 'Un1GlobalUser' // Default password for new users
  });

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setUsuarios(data);
    setLoading(false);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    
    try {
      // 1. Create the user in Auth (Requires an API route for admin privileges)
      // Since I don't have an easy way to trigger auth signup from client for OTHERS without admin api,
      // I'll use a placeholder logic or assume the admin uses a helper API.
      // FOR DEMO: We will just insert into the profiles table directly if we assume auth is handled 
      // or we use a custom signup route.
      
      const response = await fetch('/api/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Error al crear usuario');

      setSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccess(false);
        fetchUsuarios();
        setFormData({
          rol: '', curp: '', nombre: '', apellido_paterno: '', apellido_materno: '',
          email: '', celular: '', modalidad: '', estatus: 'Activo', comentarios: '',
          password: 'Un1GlobalUser'
        });
      }, 2000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const filteredUsers = usuarios.filter(u => 
    `${u.nombre} ${u.apellido_paterno} ${u.apellido_materno}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.curp?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
            <Users className="text-primary" />
            Gestión de Usuarios
          </h1>
          <p className="text-slate-500 mt-1">Administra el personal y estudiantes de la universidad.</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-6 py-6 rounded-2xl font-bold shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2"
        >
          <UserPlus size={20} />
          Registrar Nuevo Usuario
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nombre, email o CURP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 rounded-xl border-slate-200 h-full py-3">
          <Filter size={18} />
          Filtros
        </Button>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Usuario</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Rol</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Contacto</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Modalidad</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Estatus</th>
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                [1, 2, 3].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="p-5 h-20 bg-slate-50/50"></td>
                  </tr>
                ))
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-slate-400">No se encontraron usuarios.</td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary font-bold">
                          {u.nombre[0]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-100">{u.nombre} {u.apellido_paterno}</p>
                          <p className="text-xs text-slate-400 font-medium">CURP: {u.curp || 'N/A'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100">
                        <Shield size={12} />
                        {u.rol}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="space-y-1">
                        <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                          <Mail size={12} /> {u.email}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                          <Phone size={12} /> {u.celular || 'N/A'}
                        </p>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{u.modalidad || 'N/A'}</span>
                    </td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        u.estatus === 'Activo' ? 'bg-green-100 text-green-700' : 
                        u.estatus === 'Suspendido' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {u.estatus}
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-400">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="bg-primary p-6 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <UserPlus size={24} />
                Nuevo Registro
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-all">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-8 space-y-6">
              {success ? (
                <div className="py-12 text-center space-y-4 animate-in slide-in-from-bottom duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">¡Usuario Creado!</h3>
                  <p className="text-slate-500">El usuario ha sido registrado correctamente en el sistema.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rol *</label>
                      <select 
                        required
                        value={formData.rol}
                        onChange={(e) => setFormData({...formData, rol: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Seleccionar Rol...</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Director">Director</option>
                        <option value="Administrativo">Administrativo</option>
                        <option value="Docente">Docente</option>
                        <option value="Estudiante">Estudiante</option>
                        <option value="Editor">Editor</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">CURP</label>
                      <input 
                        type="text" 
                        value={formData.curp}
                        onChange={(e) => setFormData({...formData, curp: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="CURP de 18 caracteres"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nombre(s) *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Apellido Paterno *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.apellido_paterno}
                        onChange={(e) => setFormData({...formData, apellido_paterno: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Correo Electrónico *</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">WhatsApp / Celular</label>
                      <input 
                        type="tel" 
                        value={formData.celular}
                        onChange={(e) => setFormData({...formData, celular: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="10 dígitos"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Modalidad</label>
                      <select 
                        value={formData.modalidad}
                        onChange={(e) => setFormData({...formData, modalidad: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Seleccionar...</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Virtual">Virtual</option>
                        <option value="Mixta">Mixta</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Estatus</label>
                      <select 
                        value={formData.estatus}
                        onChange={(e) => setFormData({...formData, estatus: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Activo">Activo</option>
                        <option value="Suspendido">Suspendido</option>
                        <option value="Baja">Baja</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Comentarios</label>
                    <textarea 
                      value={formData.comentarios}
                      onChange={(e) => setFormData({...formData, comentarios: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary h-24 resize-none"
                    ></textarea>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 h-12 rounded-xl"
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={formLoading}
                      className="flex-1 h-12 rounded-xl bg-primary text-white font-bold"
                    >
                      {formLoading ? <Loader2 className="animate-spin" /> : 'Guardar Usuario'}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
