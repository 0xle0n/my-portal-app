import { useEffect, useRef, useState } from "react";
import InfoAccordion from "./components/InfoAccordion.jsx";
import PortalForm from "./components/PortalForm.jsx";
import PortalDistances from "./components/PortalDistances.jsx";
import PortalGrid from "./components/PortalGrid.jsx";
import PortalLinks from "./components/PortalLinks.jsx";



export default function App() {
    const [portals, setPortals] = useState([
        { id: crypto.randomUUID(), name: "Overworld Base", type: "overworld", x: 800, y: 70, z: -320 },
        { id: crypto.randomUUID(), name: "Nether Hub", type: "nether", x: 100, y: 70, z: -40 },
    ]);

    const [form, setForm] = useState({ name: "", type: "overworld", x: "", y: "", z: "", id: null });
    const [error, setError] = useState("");
    const [showAll, setShowAll] = useState(false);


    const handleChange = (e) => {
        setError("");
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const nameExists = (name, excludeId = null) => {
        return portals.some((p) => p.name.toLowerCase() === name.toLowerCase() && p.id !== excludeId);
    };

    const addPortal = () => {
        if (!form.name) {
            setError("Bitte einen Namen eingeben!");
            return;
        }

        if (nameExists(form.name)) {
            setError("Ein Portal mit diesem Namen existiert bereits!");
            return;
        }

        if (coordsExist(form.x, form.y, form.z, form.type)) {
            setError(`Ein ${form.type === "overworld" ? "Overworld" : "Nether"}-Portal mit diesen Koordinaten existiert bereits!`);
            return;
        }

        if (isNaN(parseFloat(form.x)) || isNaN(parseFloat(form.y)) || isNaN(parseFloat(form.z))) {
            setError("Bitte gültige Zahlen für X, Y und Z eingeben!");
            return;
        }
        setError("");

        setPortals([
            ...portals,
            {
                id: crypto.randomUUID(),
                name: form.name,
                type: form.type,
                x: parseFloat(form.x),
                y: parseFloat(form.y),
                z: parseFloat(form.z),
            },
        ]);
        setForm({ name: "", type: "overworld", x: "", y: "", z: "", id: null });
    };


    const updatePortal = () => {
        if (!form.name) return;

        if (nameExists(form.name, form.id)) {
            setError("Ein anderes Portal hat bereits diesen Namen!");
            return;
        }

        if (coordsExist(form.x, form.y, form.z, form.type, form.id)) {
            setError(`Ein ${form.type === "overworld" ? "Overworld" : "Nether"}-Portal mit diesen Koordinaten existiert bereits!`);
            return;
        }

        if (isNaN(parseFloat(form.x)) || isNaN(parseFloat(form.y)) || isNaN(parseFloat(form.z))) {
            setError("Bitte gültige Zahlen für X, Y und Z eingeben!");
            return;
        }

        setError("");

        setPortals(
            portals.map((p) =>
                p.id === form.id
                    ? { ...p, name: form.name, type: form.type, x: parseFloat(form.x), y: parseFloat(form.y), z: parseFloat(form.z) }
                    : p
            )
        );
    };

    const deletePortal = (id) => setPortals(portals.filter((p) => p.id !== id));

    const toggleSelectPortal = (p) => {
        if (form.id === p.id) {
            setForm({ name: "", type: "overworld", x: "", y: "", z: "", id: null });
        } else {
            setForm({ ...p });
        }
        setError("");
    };

    const calcDistance = (p1, p2) => {
        const convert = (p) => (p.type === "nether" ? { x: p.x * 8, y: p.y, z: p.z * 8 } : p);
        const a = convert(p1), b = convert(p2);
        return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2).toFixed(2);
    };

    // 🔹 Minecraft-accurate linking logic
    const findLinkedPortal = (from, allPortals) => {
        const candidates = allPortals.filter((p) => p.type !== from.type);
        if (candidates.length === 0) return null;

        // Convert "from" position into the other dimension’s coordinate space
        let fx = from.x, fz = from.z;
        if (from.type === "overworld") {
            fx = from.x / 8;
            fz = from.z / 8;
        } else if (from.type === "nether") {
            fx = from.x * 8;
            fz = from.z * 8;
        }

        // Define square range
        const range = from.type === "overworld" ? 128 / 8 : 16 * 8;

        // Step 1: filter portals that are inside the square range (centered at converted coords)
        const inSquare = candidates.filter((p) => {
            const dx = Math.abs(p.x - fx);
            const dz = Math.abs(p.z - fz);
            return dx <= range && dz <= range;
        });

        if (inSquare.length === 0) return null;

        // Step 2: among those, pick the one with the smallest true 3D Euclidean distance
        const nearest = inSquare.reduce((a, b) => {
            const distA = Math.sqrt((calcDistance(from, a)) ** 2);
            const distB = Math.sqrt((calcDistance(from, b)) ** 2);
            return distA < distB ? a : b;
        });

        return nearest;
    };


    const coordsExist = (x, y, z, type, excludeId = null) => {
        return portals.some(
            (p) =>
                p.type === type &&
                p.x === parseFloat(x) &&
                p.y === parseFloat(y) &&
                p.z === parseFloat(z) &&
                p.id !== excludeId
        );
    };



    return (
        <div className="min-h-screen bg-gray-100 p-6 px-4 md:px-20 lg:px-32">
            <h1 className="text-3xl font-bold text-center mb-2">Nether Portal Distanz Rechner</h1>
            <div className="text-center text-gray-700 mb-6 max-w-2xl mx-auto">
                <p>
                    Mit diesem Tool kannst du Overworld- und Nether-Portale verwalten und die Distanzen zwischen ihnen berechnen.
                    Klicke auf eine Portalkachel, um sie zu bearbeiten, füge neue hinzu oder lösche bestehende.
                    Die App berechnet automatisch die euklidische Distanz und zeigt, welche Portale miteinander "verbunden" sind.
                </p>
            </div>

            <InfoAccordion />

            <PortalForm
                form={form}
                handleChange={handleChange}
                addPortal={addPortal}
                updatePortal={updatePortal}
                error={error}
            />

            <PortalGrid
                portals={portals}
                form={form}
                toggleSelectPortal={toggleSelectPortal}
                deletePortal={deletePortal}
            />

            <PortalDistances
                portals={portals}
                calcDistance={calcDistance}
                form={form}
                showAll={showAll}
                setShowAll={setShowAll}
            />

            <PortalLinks
                portals={portals}
                form={form}
                calcDistance={calcDistance}
                findLinkedPortal={findLinkedPortal}
            />

            <footer className="mt-10 text-center text-gray-400 text-sm">
                Powered by <span className="font-semibold">Vite</span> & <span className="font-semibold">React</span>
            </footer>
        </div>

    );



}
