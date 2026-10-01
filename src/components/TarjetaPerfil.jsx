import { useState } from 'react';
import logoTribu from '../assets/logo.jpeg';

export default function TarjetaPerfil({ perfil }) {
  const [modalAbierto, setModalAbierto] = useState(false);

  // OPTIMIZACIÓN DE CLOUDINARY: Reduce fotos pesadas a solo ~40KB al vuelo
  const fotoOptimizada = perfil.foto_perfil 
    ? perfil.foto_perfil.replace('/upload/', '/upload/f_auto,q_auto,w_400/') 
    : 'https://via.placeholder.com/300';

  // Cálculo de edad y cumpleaños
  const obtenerEdadYCumple = (fechaStr) => {
    if (!fechaStr) return { edad: null, cumpleaños: null };

    const hoy = new Date();
    const nacimiento = new Date(fechaStr + 'T00:00:00');

    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    const opciones = { day: 'numeric', month: 'long' };
    const cumpleaños = nacimiento.toLocaleDateString('es-ES', opciones);

    return { edad, cumpleaños };
  };

  const { edad, cumpleaños } = obtenerEdadYCumple(perfil.fecha_nacimiento);

  return (
    <>
      <div className="uiverse-card mx-auto cursor-pointer" onClick={() => setModalAbierto(true)}>
        <div className="top-section">
          {/* Usamos fotoOptimizada aquí */}
          <img 
            src={fotoOptimizada} 
            alt={perfil.nombre} 
            className="bg-photo"
          />
          <div className="border"></div>
          <div className="icons">
            <div className="logo flex items-center gap-1.5">
              <img src={logoTribu} alt="Logo" className="w-5 h-5 rounded-md object-cover border border-[#50f6ff]" />
              <span className="font-extrabold text-[10px] text-[#50f6ff] tracking-wider">TRIBU</span>
            </div>
            <div className="social-media">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" className="svg">
                <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bottom-section">
          <span className="title">{perfil.nombre || 'Miembro'}</span>
          <span className="subtitle">{perfil.profesion || 'Caminante'}</span>

          <div className="row">
            <div className="item">
              <span className="big-text">{edad ? `${edad} años` : 'Tribu'}</span>
              <span className="regular-text">Edad</span>
            </div>
            <div className="item">
              <span className="big-text">{cumpleaños || 'Pronto'}</span>
              <span className="regular-text">Cumpleaños</span>
            </div>
            <div className="item">
              <span className="big-text">{perfil.ubicacion ? perfil.ubicacion.split('/')[0] : 'Bogotá'}</span>
              <span className="regular-text">Ubicación</span>
            </div>
          </div>
        </div>
      </div>

      {modalAbierto && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#1b233d] text-white rounded-3xl max-w-lg w-full p-6 relative border border-cyan-500/30 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setModalAbierto(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold text-xl"
            >
              ✕
            </button>

            <div className="flex flex-col items-center text-center mb-6">
              {/* También usamos fotoOptimizada aquí */}
              <img 
                src={fotoOptimizada} 
                alt={perfil.nombre} 
                className="w-28 h-28 rounded-2xl object-cover border-2 border-[#50f6ff] shadow-lg mb-3"
              />
              <h2 className="text-2xl font-black tracking-wide text-white">{perfil.nombre}</h2>
              <p className="text-[#50f6ff] text-sm font-semibold">{perfil.profesion || 'Miembro de La Tribu'}</p>
              
              <div className="flex gap-3 text-xs mt-2 text-cyan-200 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/50">
                {edad && <span>🎂 {edad} años</span>}
                {cumpleaños && <span>🎉 Cumple el {cumpleaños}</span>}
              </div>
            </div>

            <div className="space-y-4 text-left border-t border-gray-700/60 pt-4 text-xs text-gray-300">
              {perfil.ubicacion && (
                <div>
                  <strong className="block text-[#50f6ff] text-sm mb-1">Origen / Residencia:</strong>
                  <p>{perfil.ubicacion}</p>
                </div>
              )}

              {perfil.sobre_ti && (
                <div>
                  <strong className="block text-[#50f6ff] text-sm mb-1">Sobre mí:</strong>
                  <p className="leading-relaxed">{perfil.sobre_ti}</p>
                </div>
              )}

              {perfil.dato_curioso && (
                <div>
                  <strong className="block text-[#50f6ff] text-sm mb-1">Dato Curioso / Random:</strong>
                  <p>{perfil.dato_curioso}</p>
                </div>
              )}

              {perfil.intereses_categorias?.length > 0 && (
                <div>
                  <strong className="block text-[#50f6ff] text-sm mb-1">Intereses Principales:</strong>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {perfil.intereses_categorias.map((cat, i) => (
                      <span key={i} className="bg-cyan-950 text-[#50f6ff] border border-cyan-800 px-2.5 py-1 rounded-lg text-[11px] font-bold">
                        #{cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {perfil.saberes_compartir && (
                <div>
                  <strong className="block text-[#50f6ff] text-sm mb-1">Saberes para compartir con La Tribu:</strong>
                  <p className="leading-relaxed">{perfil.saberes_compartir}</p>
                </div>
              )}

              {perfil.redes_portafolio && (
                <div>
                  <strong className="block text-[#50f6ff] text-sm mb-1">Redes / Portafolio:</strong>
                  <p className="font-mono text-cyan-200">{perfil.redes_portafolio}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}