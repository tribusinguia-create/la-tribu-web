export default function BotonAntorcha({ modoOscuro, setModoOscuro }) {
  return (
    <label className="torch-container" title="Modo Nocturno">
      <input 
        type="checkbox" 
        checked={modoOscuro} 
        onChange={(e) => setModoOscuro(e.target.checked)} 
      />
      <div className="torch-wrapper">
        <div className="torch">
          <div className="head">
            <div className="face top"><div></div><div></div><div></div><div></div></div>
            <div className="face left"><div></div><div></div><div></div><div></div></div>
            <div className="face right"><div></div><div></div><div></div><div></div></div>
          </div>
          <div className="stick">
            <div className="side side-left">
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
            <div className="side side-right">
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
          </div>
        </div>
      </div>
    </label>
  );
}