import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient';
import TarjetaPerfil from './TarjetaPerfil';
import { motion } from 'framer-motion';

export default function Directorio({ modoOscuro }) {
  const [perfiles, setPerfiles] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [filtroActivo, setFiltroActivo] = useState(null); // Nuevo estado para el filtro de colores

  // Mapeo de los 13 intereses del formulario con 13 colores vibrantes
  const coloresIntereses = [
    { name: 'Música', color: '#facc15' },               /* Amarillo */
    { name: 'Películas/Series', color: '#e11d48' },     /* Rojo Rosa */
    { name: 'Videojuegos', color: '#3b82f6' },          /* Azul Rey */
    { name: 'Libros', color: '#8b5cf6' },               /* Morado */
    { name: 'Deportes', color: '#fb923c' },             /* Naranja */
    { name: 'Viajes', color: '#0ea5e9' },               /* Azul Cielo */
    { name: 'Gastronomía', color: '#f472b6' },          /* Rosa */
    { name: 'Arte / Diseño', color: '#84cc16' },        /* Verde Lima */
    { name: 'Fotografía', color: '#10b981' },           /* Esmeralda */
    { name: 'Tecnología', color: '#64748b' },           /* Gris Pizarra */
    { name: 'Naturaleza', color: '#22c55e' },           /* Verde Naturaleza */
    { name: 'Conciertos / Eventos', color: '#6366f1' }, /* Índigo */
    { name: 'Otro hobby o interés que quieras compartir', color: '#14b8a6' }, /* Teal */
  ];

  useEffect(() => {
    obtenerPerfiles();
  }, []);

  const obtenerPerfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('perfiles')
        .select('id, nombre, foto_perfil, profesion, ubicacion, sobre_ti, dato_curioso, fecha_nacimiento, fecha_ingreso_tribu, intereses_categorias, saberes_compartir, redes_portafolio')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPerfiles(data || []);
    } catch (error) {
      console.error('Error al obtener perfiles:', error);
    } finally {
      setCargando(false);
    }
  };

  const handleToggleFiltro = (interesName) => {
    // Si cliquea el mismo filtro, lo quita; si cliquea otro, lo cambia.
    if (filtroActivo === interesName) {
      setFiltroActivo(null);
    } else {
      setFiltroActivo(interesName);
    }
  };

  // Filtrado doble: Por barra de búsqueda Y por Botonera de colores
  const perfilesFiltrados = perfiles.filter((p) => {
    const termino = busqueda.toLowerCase();
    
    // Condición 1: Texto
    const coincideTexto = 
      p.nombre?.toLowerCase().includes(termino) ||
      p.profesion?.toLowerCase().includes(termino) ||
      p.ubicacion?.toLowerCase().includes(termino);

    // Condición 2: Interés de color
    const coincideColor = filtroActivo 
      ? p.intereses_categorias?.includes(filtroActivo) 
      : true;

    return coincideTexto && coincideColor;
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

        {/* Buscador de Texto */}
        <div className="mt-6 max-w-md mx-auto mb-6">
          <input
            type="text"
            placeholder="🔍 Buscar por nombre, profesión o ciudad..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className={`w-full p-3.5 rounded-2xl border outline-none transition shadow-[3px_4px_0px_0px_#E99F4C] text-sm font-semibold ${
              modoOscuro
                ? 'bg-[#1b233d] border-[#50f6ff]/50 text-white placeholder-slate-400 focus:border-[#50f6ff]'
                : 'bg-[#EDDCD9] border-[#264143] text-[#264143] placeholder-[#264143]/70 focus:border-[#DE5499]'
            }`}
          />
        </div>

        {/* Botonera de Colores Comic (Filtros) */}
        <div className="flex flex-col items-center">
          <p className={`text-xs font-bold mb-2 uppercase tracking-wide ${modoOscuro ? 'text-[#50f6ff]' : 'text-[#DE5499]'}`}>
            👇 Filtra por intereses 👇
          </p>
          <div className="comic-panel-wrapper">
            <div className="comic-panel">
              <div className="container-items">
                {coloresIntereses.map((item) => (
                  <button
                    key={item.name}
                    className={`item-color ${filtroActivo === item.name ? 'active' : ''}`}
                    style={{ '--color': item.color }}
                    data-interest={item.name}
                    onClick={() => handleToggleFiltro(item.name)}
                    aria-label={`Filtrar por ${item.name}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
          {/* Botón para limpiar filtros */}
          {filtroActivo && (
            <button 
              onClick={() => setFiltroActivo(null)}
              className={`mt-2 text-xs font-bold underline ${modoOscuro ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}
            >
              Quitar filtro: {filtroActivo} ✕
            </button>
          )}
        </div>
      </div>

      {/* Resultados */}
      {perfilesFiltrados.length === 0 ? (
        <p className={`text-center py-10 font-bold ${modoOscuro ? 'text-slate-400' : 'text-gray-500'}`}>
          No hay caminantes que coincidan con esta búsqueda.
        </p>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center"
        >
          {perfilesFiltrados.map((perfil) => (
            <TarjetaPerfil key={perfil.id} perfil={perfil} />
          ))}
        </motion.div>
      )}
    </div>
  );
}