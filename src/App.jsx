import { useState } from "react";

export default function App() {
  const [portals, setPortals] = useState([]);
  const [form, setForm] = useState({
    name: "",
    type: "overworld",
    x: "",
    y: "",
    z: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addPortal = (e) => {
    e.preventDefault();
    if (!form.name) return;
    setPortals([
      ...portals,
      {
        ...form,
        x: parseFloat(form.x),
        y: parseFloat(form.y),
        z: parseFloat(form.z),
      },
    ]);
    setForm({ name: "", type: "overworld", x: "", y: "", z: "" });
  };

  const calcDistance = (p1, p2) => {
    const convert = (p) =>
      p.type === "nether"
        ? { x: p.x * 8, y: p.y, z: p.z * 8 } // Nether → Overworld umrechnen
        : p;
    const a = convert(p1);
    const b = convert(p2);
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dz = a.z - b.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Minecraft Portal Tracker
      </h1>

      {/* Formular */}
      <form
        onSubmit={addPortal}
        className="bg-white p-4 rounded-2xl shadow-md grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-6"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="overworld">Overworld</option>
          <option value="nether">Nether</option>
        </select>
        <input
          type="number"
          name="x"
          placeholder="X"
          value={form.x}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="y"
          placeholder="Y"
          value={form.y}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="z"
          placeholder="Z"
          value={form.z}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
        >
          Hinzufügen
        </button>
      </form>

      {/* Portal Liste */}
      <div className="bg-white p-4 rounded-2xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">Gespeicherte Portale</h2>
        {portals.length === 0 ? (
          <p className="text-gray-500">Noch keine Portale hinzugefügt.</p>
        ) : (
          <ul className="space-y-1">
            {portals.map((p, i) => (
              <li key={i} className="border p-2 rounded">
                <strong>{p.name}</strong> ({p.type}) — X:{p.x}, Y:{p.y}, Z:{p.z}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Distanz Tabelle */}
      {portals.length > 1 && (
        <div className="bg-white p-4 rounded-2xl shadow-md overflow-x-auto">
          <h2 className="text-xl font-semibold mb-2">Distanzen</h2>
          <table className="w-full border-collapse text-center">
            <thead>
              <tr>
                <th className="border p-2">Portal 1</th>
                <th className="border p-2">Portal 2</th>
                <th className="border p-2">Distanz (m)</th>
              </tr>
            </thead>
            <tbody>
              {portals.map((p1, i) =>
                portals.slice(i + 1).map((p2, j) => (
                  <tr key={`${i}-${j}`}>
                    <td className="border p-2">{p1.name}</td>
                    <td className="border p-2">{p2.name}</td>
                    <td className="border p-2">{calcDistance(p1, p2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
