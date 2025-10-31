

export default function PortalForm({ form, handleChange, addPortal, updatePortal, error }) {
    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-white p-4 rounded-xl shadow-md grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-6"
        >
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="p-2 border rounded focus:ring-2 focus:ring-blue-400" />
            <select name="type" value={form.type} onChange={handleChange} className="p-2 border rounded focus:ring-2 focus:ring-blue-400">
                <option value="overworld">Overworld</option>
                <option value="nether">Nether</option>
            </select>
            <input type="number" name="x" placeholder="X" value={form.x} onChange={handleChange} className="p-2 border rounded focus:ring-2 focus:ring-blue-400" />
            <input type="number" name="y" placeholder="Y" value={form.y} onChange={handleChange} className="p-2 border rounded focus:ring-2 focus:ring-blue-400" />
            <input type="number" name="z" placeholder="Z" value={form.z} onChange={handleChange} className="p-2 border rounded focus:ring-2 focus:ring-blue-400" />

            <div className="col-span-2 sm:col-span-3 md:col-span-6 flex gap-2">
                {form.id && (
                    <button
                        type="button"
                        onClick={updatePortal}
                        className="bg-yellow-500 text-white rounded-lg p-2 hover:bg-yellow-600 transition flex-1 cursor-pointer"
                    >
                        Update
                    </button>
                )}
                <button
                    type="button"
                    onClick={addPortal}
                    className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition flex-1 cursor-pointer"
                >
                    Hinzufügen
                </button>
            </div>

            {error && (
                <div className="col-span-full text-center text-red-500 text-sm mt-2">
                    {error}
                </div>
            )}
        </form>
    );
}
