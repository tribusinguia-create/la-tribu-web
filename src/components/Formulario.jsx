import { useState } from 'react';
import { supabase } from '../config/supabaseClient';
import logoTribu from '../assets/logo.jpeg';

export default function Formulario() {
  const [cargando, setCargando] = useState(false);
  const [fotoArchivo, setFotoArchivo] = useState(null);

  const opcionesIntereses = [
    'Música',
    'Películas/Series',
    'Videojuegos',
    'Libros',
    'Deportes',
    'Viajes',
    'Gastronomía',
    'Arte / Diseño',
    'Fotografía',
    'Tecnología',
    'Naturaleza',
    'Conciertos / Eventos',
    'Otro hobby o interés que quieras compartir'
  ];

  const [interesesSeleccionados, setInteresesSeleccionados] = useState([]);

  const [formData, setFormData] = useState({
    nombre: '',
    fecha_nacimiento: '',
    whatsapp: '',
    ubicacion: '',
    profesion: '',
    sobre_ti: '',
    dato_curioso: '',
    saberes_compartir: '',
    redes_portafolio: '',
    consentimiento: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleInterestToggle = (interes) => {
    if (interesesSeleccionados.includes(interes)) {
      setInteresesSeleccionados(interesesSeleccionados.filter(item => item !== interes));
    } else {
      setInteresesSeleccionados([...interesesSeleccionados, interes]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consentimiento) {
      alert('Debes aceptar el consentimiento para continuar.');
      return;
    }

    setCargando(true);

    try {
      let fotoUrl = '';

      if (fotoArchivo) {
        const formDataCloudinary = new FormData();
        formDataCloudinary.append('file', fotoArchivo);
        formDataCloudinary.append('upload_preset', 'tribu_fotos');
        formDataCloudinary.append('cloud_name', 'itzrny6y');

        const resCloudinary = await fetch(
          'https://api.cloudinary.com/v1_1/itzrny6y/image/upload',
          { method: 'POST', body: formDataCloudinary }
        );

        const dataCloudinary = await resCloudinary.json();

        if (dataCloudinary.secure_url) {
          fotoUrl = dataCloudinary.secure_url;
        } else {
          throw new Error('Error al subir la imagen a Cloudinary');
        }
      }

      const { error } = await supabase
        .from('perfiles')
        .insert([
          {
            nombre: formData.nombre,
            fecha_nacimiento: formData.fecha_nacimiento || null,
            whatsapp: formData.whatsapp,
            ubicacion: formData.ubicacion,
            profesion: formData.profesion,
            sobre_ti: formData.sobre_ti,
            dato_curioso: formData.dato_curioso,
            saberes_compartir: formData.saberes_compartir,
            redes_portafolio: formData.redes_portafolio,
            consentimiento: formData.consentimiento,
            foto_perfil: fotoUrl,
            intereses_categorias: interesesSeleccionados,
          }
        ]);

      if (error) throw error;

      alert('¡Registro exitoso en La Tribu! ⛰️');

      setFormData({
        nombre: '', fecha_nacimiento: '', whatsapp: '', ubicacion: '',
        profesion: '', sobre_ti: '', dato_curioso: '', saberes_compartir: '',
        redes_portafolio: '', consentimiento: false,
      });
      setInteresesSeleccionados([]);
      setFotoArchivo(null);

    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Hubo un error al enviar tu registro.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="uiverse-form-container py-6">
      <div className="uiverse-form-area">
        
        {/* Encabezado con Logo */}
        <div className="flex flex-col items-center mb-4">
          <img 
            src={logoTribu} 
            alt="Logo Tribu Sin Guía" 
            className="w-24 h-24 object-cover rounded-2xl border-3 border-[#264143] shadow-[4px_4px_0px_0px_#E99F4C] mb-2"
          />
          <p className="title">TRIBU SIN GUÍA ⛰️</p>
        </div>

        {/* Intro para la comunidad de senderismo en Bogotá */}
        <div className="w-full mb-8 text-left border-b-2 border-[#264143]/20 pb-6">
          <div className="bg-white/80 border-2 border-[#264143] p-5 rounded-xl shadow-[3px_3px_0px_0px_#E99F4C] mb-4">
            <h3 className="text-sm font-black text-[#264143] tracking-wide uppercase mb-2 flex items-center gap-2">
              🥾 ¡Bienvenido a la comunidad!
            </h3>
            <p className="text-xs text-[#264143] font-medium leading-relaxed mb-2">
              Somos una red independiente de más de 300 caminantes y exploradores de la sabana y cerros de Bogotá. Caminamos juntos, aprendemos en equipo y compartimos la montaña sin ataduras.
            </p>
            <p className="text-xs text-[#264143] font-medium leading-relaxed">
              Queremos ponerle cara, nombre e historia a cada caminante de La Tribu. ✨
            </p>
          </div>

          <div className="bg-[#DE5499]/15 border-2 border-[#264143] p-3.5 rounded-xl flex items-start gap-3 shadow-[2px_2px_0px_0px_#264143]">
            <span className="text-lg">📢</span>
            <p className="text-[11px] text-[#264143] font-bold leading-snug">
              Ten en cuenta: La información y foto que nos brindes a continuación saldrá dentro del Portafolio interno de La Tribu para que todos podamos conectar, saber qué hacemos y ayudarnos en la ruta.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          {/* Nombre */}
          <div className="uiverse-form-group">
            <label className="uiverse-sub_title">Nombre *</label>
            <input 
              type="text" name="nombre" required
              value={formData.nombre} onChange={handleChange}
              placeholder="Ingresa tu nombre completo"
              className="uiverse-form-style"
            />
          </div>

          {/* Fecha de nacimiento */}
          <div className="uiverse-form-group">
            <label className="uiverse-sub_title">Fecha de nacimiento *</label>
            <input 
              type="date" name="fecha_nacimiento" required
              value={formData.fecha_nacimiento} onChange={handleChange}
              className="uiverse-form-style"
            />
          </div>

          {/* Foto de perfil */}
          <div className="uiverse-form-group">
            <label className="uiverse-sub_title">Foto de perfil *</label>
            <input 
              type="file" accept="image/*" required
              onChange={(e) => setFotoArchivo(e.target.files[0])}
              className="uiverse-form-style cursor-pointer text-xs"
            />
            <span className="text-[10px] text-[#264143] mt-1">Haz clic para seleccionar o arrastra tu imagen (máx 10 MB)</span>
          </div>

          {/* WhatsApp */}
          <div className="uiverse-form-group">
            <label className="uiverse-sub_title">Número o @ de WhatsApp *</label>
            <input 
              type="text" name="whatsapp" required
              value={formData.whatsapp} onChange={handleChange}
              placeholder="Ej. +57 300 000 0000"
              className="uiverse-form-style"
            />
          </div>

          {/* Ubicación */}
          <div className="uiverse-form-group">
            <label className="uiverse-sub_title">¿De dónde eres y en dónde vives? *</label>
            <input 
              type="text" name="ubicacion" required
              value={formData.ubicacion} onChange={handleChange}
              placeholder="Ej. Soy de Medellín, vivo en Bogotá"
              className="uiverse-form-style"
            />
          </div>

          {/* Ocupación */}
          <div className="uiverse-form-group">
            <label className="uiverse-sub_title">¿A qué te dedicas? ¿Cuál es tu rol, profesión o área? *</label>
            <input 
              type="text" name="profesion" required
              value={formData.profesion} onChange={handleChange}
              placeholder="Ej. Fotógrafo / Desarrollador"
              className="uiverse-form-style"
            />
          </div>

          {/* Sobre ti */}
          <div className="uiverse-form-group">
            <label className="uiverse-sub_title">Sobre ti *</label>
            <span className="text-[11px] text-[#264143] mb-1">Si tuvieras que presentarte en pocas palabras, ¿Qué nos contarías sobre ti?</span>
            <textarea 
              name="sobre_ti" rows="2" required
              value={formData.sobre_ti} onChange={handleChange}
              className="uiverse-form-style"
            />
          </div>

          {/* Dato curioso */}
          <div className="uiverse-form-group">
            <label className="uiverse-sub_title">Un dato curioso o random sobre ti *</label>
            <textarea 
              name="dato_curioso" rows="2" required
              value={formData.dato_curioso} onChange={handleChange}
              className="uiverse-form-style"
            />
          </div>

          {/* Intereses principales */}
          <div className="uiverse-form-group">
            <label className="uiverse-sub_title">Intereses principales *</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 w-full">
              {opcionesIntereses.map((interes, idx) => {
                const checked = interesesSeleccionados.includes(interes);
                return (
                  <div key={interes} className="checkbox-wrapper">
                    <input 
                      type="checkbox" 
                      id={`interes-${idx}`}
                      className="check"
                      checked={checked}
                      onChange={() => handleInterestToggle(interes)}
                    />
                    <label htmlFor={`interes-${idx}`} className="label border-2 border-[#264143] p-2 rounded-lg bg-white flex items-center gap-2 cursor-pointer shadow-[2px_2px_0px_0px_#E99F4C]">
                      <svg width="28" height="28" viewBox="0 0 95 95">
                        <rect x="30" y="20" width="50" height="50" stroke="#264143" fill="none" strokeWidth="5" rx="8" />
                        <g transform="translate(0,-952.36222)">
                          <path d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4" stroke="#DE5499" strokeWidth="6" fill="none" className="path1" />
                        </g>
                      </svg>
                      <span className="text-xs font-bold text-[#264143]">
                        {interes}
                      </span>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Saberes */}
          <div className="uiverse-form-group">
            <label className="uiverse-sub_title">¿Qué sabes hacer y podrías compartir con la Tribu?</label>
            <span className="text-[11px] text-[#264143] mb-1">Ejemplo: "Puedo ayudar con sesiones fotográficas."</span>
            <textarea 
              name="saberes_compartir" rows="2"
              value={formData.saberes_compartir} onChange={handleChange}
              className="uiverse-form-style"
            />
          </div>

          {/* Redes */}
          <div className="uiverse-form-group">
            <label className="uiverse-sub_title">¿Quieres compartir alguna red o portafolio?</label>
            <input 
              type="text" name="redes_portafolio"
              value={formData.redes_portafolio} onChange={handleChange}
              placeholder="Ej. @tu_usuario / tuweb.com"
              className="uiverse-form-style"
            />
          </div>

          {/* Consentimiento */}
          <div className="uiverse-form-group pt-3 border-t border-[#264143]/20">
            <label className="uiverse-sub_title">Consentimiento para uso de información y foto en el portafolio interno de La Tribu. *</label>
            <div className="checkbox-wrapper mt-2">
              <input 
                type="checkbox" 
                name="consentimiento"
                id="check-consentimiento"
                className="check"
                checked={formData.consentimiento}
                onChange={handleChange}
              />
              <label htmlFor="check-consentimiento" className="label flex items-center gap-2 cursor-pointer">
                <svg width="36" height="36" viewBox="0 0 95 95">
                  <rect x="30" y="20" width="50" height="50" stroke="#264143" fill="none" strokeWidth="5" rx="8" />
                  <g transform="translate(0,-952.36222)">
                    <path d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4" stroke="#DE5499" strokeWidth="6" fill="none" className="path1" />
                  </g>
                </svg>
                <span className="text-xs font-extrabold text-[#264143]">
                  Sí, acepto.
                </span>
              </label>
            </div>
          </div>

          {/* Botón enviar */}
          <button type="submit" disabled={cargando} className="uiverse-btn">
            {cargando ? 'ENVIANDO DATOS...' : 'ENVIAR REGISTRO'}
          </button>
        </form>
      </div>
    </div>
  );
}