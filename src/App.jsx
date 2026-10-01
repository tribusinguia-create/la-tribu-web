import { useState } from 'react';
import Formulario from './components/Formulario';
import Directorio from './components/Directorio';
import BotonAntorcha from './components/BotonAntorcha';
import logoTribu from './assets/logo.jpeg'; // IMPORTANTE

function App() {
  const [vista, setVista] = useState('directorio');
  const [modoOscuro, setModoOscuro] = useState(true);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      modoOscuro ? 'bg-[#0f172a] text-white' : 'bg-slate-50 text-gray-900'
    }`}>
      {/* Navbar con Logo */}
      <nav className={`sticky top-0 z-40 border-b transition-colors duration-500 ${
        modoOscuro ? 'bg-[#1e293b]/90 border-slate-700/60 backdrop-blur-md' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          
          {/* Logo con bordes suavizados */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setVista('directorio')}>
            <img 
              src={logoTribu} 
              alt="Tribu Sin Guía Logo" 
              className="h-11 w-11 object-cover rounded-xl border-2 border-[#DE5499] shadow-md transition-transform hover:scale-105"
            />
            <span className="font-black text-lg text-green-500 tracking-wider hidden sm:inline">
              TRIBU SIN GUÍA ⛰️
            </span>
          </div>

          <div className="flex items-center gap-4">
            <BotonAntorcha modoOscuro={modoOscuro} setModoOscuro={setModoOscuro} />

            <div className={`flex gap-1 p-1 rounded-xl border ${
              modoOscuro ? 'bg-slate-900/60 border-slate-700' : 'bg-gray-100 border-gray-200'
            }`}>
              <button
                onClick={() => setVista('directorio')}
                className={`px-4 py-2 rounded-lg text-xs font-extrabold transition ${
                  vista === 'directorio' 
                    ? 'bg-green-600 text-white shadow-md' 
                    : modoOscuro ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Directorio
              </button>
              <button
                onClick={() => setVista('formulario')}
                className={`px-4 py-2 rounded-lg text-xs font-extrabold transition ${
                  vista === 'formulario' 
                    ? 'bg-green-600 text-white shadow-md' 
                    : modoOscuro ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Registrarme
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-6">
        {vista === 'formulario' ? (
          <Formulario modoOscuro={modoOscuro} />
        ) : (
          <Directorio modoOscuro={modoOscuro} />
        )}
      </main>
    </div>
  );
}

export default App;