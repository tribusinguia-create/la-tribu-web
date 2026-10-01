import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';
import TarjetaPerfil from './TarjetaPerfil';
import { motion } from 'framer-motion';

export default function Directorio({ modoOscuro }) {
  const [perfiles, setPerfiles] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerPerfiles();
  }, []);

  const obtenerPerfiles = async () => {
    try {
      // Excluimos explícitamente el campo 'whatsapp' para proteger la privacidad
      const { data, error } = await supabase
        .from('perfiles')
        .select('id, nombre, foto_perfil, profesion, ubicacion, sobre_ti, dato_curioso, fecha_nacimiento, intereses_categorias, saberes_compartir, redes_portafolio')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPerfiles(data || []);
    } catch (error) {
      console.error('Error al obtener perfiles:', error);
    } finally {
      setCargando(false);
    }
  };

  const perfilesFiltrados = perfiles.filter((p) => {
    const termino = busqueda.toLowerCase();
    return (
      p.nombre?.toLowerCase().includes(termino) ||
      p.profesion?.toLowerCase().includes(termino) ||
      p.ubicacion?.toLowerCase().includes(termino)
    );
  });

  if (cargando) {
    return (
      <div className="text-center py-20">
        <p className="text-green-500 font-bold text-lg animate-pulse">Cargando La Tribu... ⛰️</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <h1 className={`text-4xl font-black tracking-tight mb-2 ${
          modoOscuro ? 'text-white' : 'text-gray-900'
        }`}>
          Comunidad La Tribu 🌲
        </h1>
        <p className={modoOscuro ? 'text-slate-400' : 'text-gray-600'}>
          Conoce a las personas que hacen parte de nuestras rutas y aventuras.
        </p>

        <div className="mt-6 max-w-md mx-auto">
          <input
            type="text"
            placeholder="🔍 Buscar por nombre, profesión o ciudad..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className={`w-full p-3.5 rounded-2xl border outline-none transition shadow-sm text-sm ${
              modoOscuro
                ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-400 focus:border-green-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-green-500'
            }`}
          />
        </div>
      </div>

      {perfilesFiltrados.length === 0 ? (
        <p className={`text-center py-10 font-semibold ${modoOscuro ? 'text-slate-400' : 'text-gray-500'}`}>
          No se encontraron miembros con esa búsqueda.
        </p>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center"
        >
          {perfilesFiltrados.map((perfil) => (
            <TarjetaPerfil key={perfil.id} perfil={perfil} />
          ))}
        </motion.div>
      )}
    </div>
  );
}