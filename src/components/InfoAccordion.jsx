import { useRef, useEffect } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

function MathBlock({ formula }) {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            katex.render(formula, ref.current, {
                throwOnError: false,
                displayMode: true,
            });
        }
    }, [formula]);

    return <div ref={ref} className="text-center my-2" />;
}

function InlineMath({ formula }) {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            katex.render(formula, ref.current, {
                throwOnError: false,
                displayMode: false,
            });
        }
    }, [formula]);

    return <span ref={ref} className="mx-1" />;
}

export default function InfoAccordion() {
    return (
        <div className="bg-white rounded-xl shadow-md mb-6">
            <details className="group p-4">
                <summary className="cursor-pointer flex justify-between items-center font-semibold text-lg text-gray-800 select-none">
                    ℹ️ Erklärung & Mathematik
                    <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>

                <div className="mt-3 text-gray-700 text-sm space-y-2">
                    <p>
                        Die <em>Distanz</em> <InlineMath formula={`d`} /> zwischen zwei Koordinaten <InlineMath formula={`(x_1, y_1, z_1), (x_2, y_2, z_2)`} /> wird in Minecraft mit der <strong>euklidischen Formel</strong> berechnet:
                    </p>

                    <div className="font-mono bg-gray-100 rounded-lg p-2">
                        <MathBlock formula={`d = \\sqrt{(x_1 - x_2)^2 + (y_1 - y_2)^2 + (z_1 - z_2)^2}`} />
                    </div>

                    <p>
                        Das oft erwähnte Nether-Portal-Linking existiert im Allgemeinen nicht (Java-Version).
                        Es ist nicht so, dass immer ein Portal in der Overworld automatisch mit einem Portal im Nether verlinkt ist (und umgekehrt),
                        da der Spieler nicht unbedingt auf demselben Block wie der Nether-Portal-Block stehen muss und ein Nether-Portal aus mehreren Blöcken besteht.
                    </p>

                    <p>
                        Wenn ein Spieler einen Nether-Portal-Block betritt, werden seine aktuellen Koordinaten in die andere Dimension umgerechnet:
                        X- und Z-Koordinaten werden durch 8 geteilt (Overworld → Nether) oder mit 8 multipliziert (Nether → Overworld), Y bleibt unverändert. Nach der Umrechnung wird immer abgerundet (<code>floor</code>).
                    </p>

                    <p>
                        Anschließend sucht das Spiel nach dem Portal in der anderen Dimension, das die geringste Distanz zu den umgerechneten Koordinaten hat,
                        aber nur innerhalb eines quadratischen Bereichs:
                        <code className="bg-gray-100 px-1 rounded">257×257</code>-Bereichs (Overworld)
                        oder <code className="bg-gray-100 px-1 rounded">33×33</code>-Bereichs (Nether).
                    </p>

                    <p>
                        Soweit bekannt wird ein Portal während der Distanzbewertung als eine Koordinate repräsentiert (z.B. bottom-left oder bottom-middle Block).
                    </p>

                    <p>
                        Bei mehreren Kandidaten mit identischer Distanz priorisiert das Spiel:
                        1. niedrigste Y-Koordinate,
                        2. niedrigste X-Koordinate,
                        3. niedrigste Z-Koordinate.
                    </p>

                    <p>
                        Wird kein Portal im Suchbereich gefunden, wird ein neues Portal in der Nähe der umgerechneten Koordinaten erstellt.
                    </p>

                    <p>
                        Die Platzierung des Spielers innerhalb des Portals wird proportional versucht beizubehalten.
                    </p>

                    <p>
                        Für mehr Details schau auf dem <a
                            href="https://minecraft.fandom.com/wiki/Nether_portal"
                            className="text-blue-600 hover:text-blue-800 underline font-medium"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Nether Portal Wiki
                        </a> vorbei.
                    </p>

                    <p className="text-sm text-gray-500 italic mt-2">
                        Footnote: Im Moment wird hier noch nicht richtig gerundet und es wird noch keine Priorisierung bei gleichen Distanzen angewendet. Des Weiteren möchte ich ein Diagramm der Portale hinzufügen.
                    </p>
                </div>
            </details>
        </div>
    );
}
