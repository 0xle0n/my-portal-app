import React from "react";

export default function PortalLinks({ portals, form, calcDistance, findLinkedPortal }) {
    if (portals.length <= 1) return null;

    return (
        <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto mt-6">
            <h2 className="text-xl font-semibold mb-4">Verbundene Portale</h2>
            <ul className="space-y-3">
                {portals.map((p) => {
                    const nearest = findLinkedPortal(p, portals);
                    const isSelected = form.id && (form.id === p.id || (nearest && form.id === nearest.id));

                    if (!nearest) {
                        return (
                            <li
                                key={p.id}
                                className={`bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center gap-3 transition-colors
                                    ${isSelected ? "bg-yellow-50" : "hover:bg-gray-100"}
                                `}
                            >
                                <span className="text-2xl">{p.type === "overworld" ? "🌍" : "🔥"}</span>
                                <div>
                                    <p className="font-semibold">
                                        {p.name} → <span className="text-gray-500 italic">❌ kein Zielportal</span>
                                    </p>
                                    <p className="text-sm text-gray-600 font-mono">
                                        Kein Portal im Suchbereich (257×257 bzw. 33×33)
                                    </p>
                                </div>
                            </li>
                        );
                    }

                    const dist = calcDistance(p, nearest);

                    return (
                        <li
                            key={p.id}
                            className={`flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4 transition-colors
                                ${isSelected ? "bg-yellow-50" : "hover:bg-gray-100"}
                            `}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{p.type === "overworld" ? "🌍" : "🔥"}</span>
                                <div>
                                    <p className="font-semibold">
                                        {p.name} → {nearest.type === "overworld" ? "🌍" : "🔥"} {nearest.name}
                                    </p>
                                    <p className="text-sm text-gray-600 font-mono">
                                        Distanz: {dist} Blöcke ✅
                                    </p>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
