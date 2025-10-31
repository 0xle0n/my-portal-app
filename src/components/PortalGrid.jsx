import React from "react";

export default function PortalGrid({ portals, form, toggleSelectPortal, deletePortal }) {
    if (!portals.length) return null;

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {portals.map((p) => {
                const isSelected = form.id === p.id;

                return (
                    <div
                        key={p.id}
                        onClick={() => toggleSelectPortal(p)}
                        className={`relative p-4 rounded-xl shadow cursor-pointer transition-transform duration-200 hover:scale-[1.02]
                            ${p.type === "nether" ? "bg-red-600 text-white" : "bg-green-600 text-white"}
                            ${isSelected ? "ring-4 ring-yellow-400" : ""}
                        `}
                    >
                        {/* 🗑️ Delete Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                deletePortal(p.id);
                            }}
                            className="absolute top-2 right-2 bg-black/40 hover:bg-black/60 rounded-full w-7 h-7 flex items-center justify-center text-sm cursor-pointer transition"
                            title="Portal löschen"
                        >
                            ✕
                        </button>

                        {/* 📍 Portal Info */}
                        <div className="text-center">
                            <h3 className="font-semibold mb-1">{p.name}</h3>
                            <p className="text-sm mb-1">
                                {p.type === "nether" ? "🔥 Nether" : "🌍 Overworld"}
                            </p>
                            <p className="text-xs font-mono bg-black/10 rounded px-2 py-1 inline-block">
                                X: {p.x}, Y: {p.y}, Z: {p.z}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
