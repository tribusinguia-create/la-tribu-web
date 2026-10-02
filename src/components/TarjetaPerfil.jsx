import { useState } from 'react';
import logoTribu from '../assets/logo.jpeg';
import hikerSvg from '../assets/HbxrC01.svg';

export default function TarjetaPerfil({ perfil }) {
  const [modalAbierto, setModalAbierto] = useState(false);

  const esAdmin = perfil.es_admin === true;

  const fotoOptimizada = perfil.foto_perfil 
    ? perfil.foto_perfil.replace('/upload/', '/upload/f_auto,q_auto,w_400/') 
    : 'https://via.placeholder.com/300';

  const obtenerEdadYCumple = (fechaStr) => {
    if (!fechaStr) return { edad: null, cumpleaños: null };
    const hoy = new Date();
    const nacimiento = new Date(fechaStr + 'T00:00:00');
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) { edad--; }
    const cumpleaños = nacimiento.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
    return { edad, cumpleaños };
  };

  const obtenerTiempoTribu = (fechaIngresoStr) => {
    if (!fechaIngresoStr) return 'Reciente';
    const hoy = new Date();
    const ingreso = new Date(fechaIngresoStr + 'T00:00:00');
    let meses = (hoy.getFullYear() - ingreso.getFullYear()) * 12 + (hoy.getMonth() - ingreso.getMonth());
    if (meses <= 0) return 'Recién llegado';
    if (meses === 1) return '1 mes';
    if (meses < 12) return `${meses} meses`;
    const años = Math.floor(meses / 12);
    const mesesRestantes = meses % 12;
    if (mesesRestantes === 0) return `${años} ${años === 1 ? 'año' : 'años'}`;
    return `${años} a, ${mesesRestantes} m`;
  };

  const { edad, cumpleaños } = obtenerEdadYCumple(perfil.fecha_nacimiento);
  const tiempoTribu = obtenerTiempoTribu(perfil.fecha_ingreso_tribu);

  return (
    <>
      {esAdmin ? (
        // 🌟 TARJETA 3D EXCLUSIVA PARA ADMINISTRADORES 🌟
        <div className="admin-card mx-auto cursor-pointer" onClick={() => setModalAbierto(true)}>
          <div className="admin-content">
            <div className="admin-front">
              <div className="admin-img">
                <div className="admin-circle"></div>
                <div className="admin-circle" id="admin-right"></div>
                <div className="admin-circle" id="admin-bottom"></div>
                <img src={fotoOptimizada} alt={perfil.nombre} className="admin-profile-pic" />
              </div>
              <div className="admin-front-content">
                <small className="admin-badge">👑 FUNDADOR</small>
                <div className="admin-description">
                  <div className="admin-title-container">
                    <p className="admin-title">
                      <strong>{perfil.nombre}</strong>
                    </p>
                    {/* Restaurado el logo cuadrado en el frente */}
                    <img src={logoTribu} alt="Logo" className="w-6 h-6 rounded-md object-cover" />
                  </div>
                  <p className="admin-card-footer">
                    {tiempoTribu} en Tribu &nbsp; | &nbsp; {edad ? `${edad} años` : ''}
                  </p>
                </div>
              </div>
            </div>
            <div className="admin-back">
              <div className="admin-back-content shadow-inner">
                {/* 👇 AQUÍ ES EL ÚNICO LUGAR DONDE USAMOS LA SILUETA DEL CAMINANTE 👇 */}
                <img src={hikerSvg} alt="Silueta Caminante" className="w-24 h-24 mb-2 drop-shadow-md" />
                <strong className="text-xl font-black tracking-widest text-[#012e29]">VER PERFIL</strong>
                <span className="text-xs font-bold text-[#a54d17] mt-1">Administrador</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // ⛺ TARJETA NORMAL PARA EL RESTO DE LA TRIBU ⛺
        <div className="uiverse-card mx-auto cursor-pointer" onClick={() => setModalAbierto(true)}>
          <div className="top-section">
            <img src={fotoOptimizada} alt={perfil.nombre} className="bg-photo" />
            <div className="icons">
              <div className="logo flex items-center gap-1.5 drop-shadow-md">
                {/* Restaurado el logo cuadrado original */}
                <img src={logoTribu} alt="Logo" className="w-5 h-5 rounded-md object-cover border border-[#f6ebd4]" />
                <span className="font-extrabold text-[10px] text-[#f6ebd4] tracking-wider drop-shadow-lg">TRIBU</span>
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
                <span className="big-text">{tiempoTribu}</span>
                <span className="regular-text">En Tribu</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL GLOBAL DE DETALLES */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#f6ebd4] text-[#012e29] rounded-3xl max-w-lg w-full p-6 relative border-4 border-[#012e29] shadow-[6px_6px_0px_0px_#a54d17] max-h-[90vh] overflow-y-auto">
            <button onClick={() => setModalAbierto(false)} className="absolute top-4 right-4 text-[#012e29] hover:text-[#a54d17] font-black text-xl">✕</button>
            <div className="flex flex-col items-center text-center mb-6">
              <img src={fotoOptimizada} alt={perfil.nombre} className="w-28 h-28 rounded-2xl object-cover border-4 border-[#012e29] shadow-[4px_4px_0px_0px_#a54d17] mb-3" />
              <h2 className="text-2xl font-black tracking-wide font-titulos">
                {perfil.nombre} {esAdmin && '👑'}
              </h2>
              <p className="text-[#a54d17] text-sm font-black uppercase tracking-wider">{perfil.profesion || 'Miembro de La Tribu'}</p>
              <div className="flex flex-wrap justify-center gap-2 text-xs mt-3 text-[#f6ebd4] bg-[#012e29] px-4 py-2 rounded-xl font-bold">
                {edad && <span>🎂 {edad} años</span>}
                {cumpleaños && <span>🎉 Cumple el {cumpleaños}</span>}
                <span>🥾 LLEVA: {tiempoTribu}</span>
              </div>
            </div>
            <div className="space-y-4 text-left border-t-2 border-[#012e29]/20 pt-4 text-sm font-semibold text-[#012e29]">
              {perfil.ubicacion && (<div><strong className="block text-[#a54d17] mb-1 font-black">Origen / Residencia:</strong><p>{perfil.ubicacion}</p></div>)}
              {perfil.sobre_ti && (<div><strong className="block text-[#a54d17] mb-1 font-black">Sobre mí:</strong><p className="leading-relaxed">{perfil.sobre_ti}</p></div>)}
              {perfil.dato_curioso && (<div><strong className="block text-[#a54d17] mb-1 font-black">Dato Curioso / Random:</strong><p>{perfil.dato_curioso}</p></div>)}
              {perfil.intereses_categorias?.length > 0 && (<div><strong className="block text-[#a54d17] mb-1 font-black">Intereses Principales:</strong><div className="flex flex-wrap gap-1.5 mt-2">{perfil.intereses_categorias.map((cat, i) => (<span key={i} className="bg-[#1b4f4b] text-[#f6ebd4] border-2 border-[#012e29] px-2.5 py-1 rounded-md text-[11px] font-bold shadow-[2px_2px_0px_0px_#012e29]">#{cat}</span>))}</div></div>)}
              {perfil.saberes_compartir && (<div><strong className="block text-[#a54d17] mb-1 font-black">Saberes para compartir con La Tribu:</strong><p className="leading-relaxed">{perfil.saberes_compartir}</p></div>)}
              {perfil.redes_portafolio && (<div><strong className="block text-[#a54d17] mb-1 font-black">Redes / Portafolio:</strong><p className="font-bold text-[#1b4f4b]">{perfil.redes_portafolio}</p></div>)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}