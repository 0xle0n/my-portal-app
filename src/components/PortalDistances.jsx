import React from "react";

export default function PortalDistances({ portals, calcDistance, form, showAll, setShowAll }) {
    if (portals.length <= 1) return null;

    // 🔹 Paare bilden: nur Overworld ↔ Nether
    const crossDimPairs = [];
    for (let i = 0; i < portals.length; i++) {
        for (let j = i + 1; j < portals.length; j++) {
            const p1 = portals[i];
            const p2 = portals[j];
            if (p1.type !== p2.type) {
                crossDimPairs.push({ p1, p2, dist: calcDistance(p1, p2) });
            }
        }
    }

    // 🔹 Nach Distanz sortieren
    crossDimPairs.sort((a, b) => a.dist - b.dist);

    const visiblePairs = showAll ? crossDimPairs : crossDimPairs.slice(0, 20);

    return (
        <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto">
            <h2 className="text-xl font-semibold mb-2">
                Distanzen zwischen Portalen <span className="text-gray-600 text-sm">(normiert in Overworld-Koordinaten)</span>
            </h2>

            <table className="w-full border-collapse text-center text-sm sm:text-base">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="border p-2">Portal 1</th>
                        <th className="border p-2">Portal 2</th>
                        <th className="border p-2">Distanz (Blöcke)</th>
                    </tr>
                </thead>
                <tbody>
                    {visiblePairs.map(({ p1, p2, dist }, idx) => {
                        const isSelected = form.id && (p1.id === form.id || p2.id === form.id);
                        return (
                            <tr
                                key={idx}
                                className={`${isSelected ? "bg-yellow-50" : "hover:bg-gray-50"} transition`}
                            >
                                <td className="border p-2">
                                    {p1.type === "overworld" ? "🌍" : "🔥"} {p1.name}
                                </td>
                                <td className="border p-2">
                                    {p2.type === "overworld" ? "🌍" : "🔥"} {p2.name}
                                </td>
                                <td className="border p-2 font-mono">{dist}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {crossDimPairs.length > 100000 && (
                <div className="text-center mt-3">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-blue-600 hover:text-blue-800 underline font-medium"
                    >
                        {showAll ? "Weniger anzeigen" : "Mehr anzeigen"}
                    </button>
                </div>
            )}
        </div>
    );
}
