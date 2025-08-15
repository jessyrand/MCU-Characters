import { useState, useEffect } from "react";

export default function CharacterForm({ onAdd, editingCharacter, onCancel }) {
    const [name, setName] = useState("");
    const [realName, setRealName] = useState("");
    const [universe, setUniverse] = useState("");
    const [id, setId] = useState(null);

    useEffect(() => {
        if (editingCharacter) {
            setId(editingCharacter.id);
            setName(editingCharacter.name);
            setRealName(editingCharacter.realName);
            setUniverse(editingCharacter.universe);
        } else {
            setId(null);
            setName("");
            setRealName("");
            setUniverse("");
        }
    }, [editingCharacter]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !realName || !universe) return;
        onAdd({ id, name, realName, universe });
        setId(null);
        setName("");
        setRealName("");
        setUniverse("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 border rounded bg-white/80">
            {id !== null && (
                <input
                    type="number"
                    placeholder="ID"
                    value={id}
                    onChange={(e) => setId(Number(e.target.value))}
                    className="border p-2 rounded"
                />
            )}
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Real Name"
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                className="border p-2 rounded"
            />
            <input
                type="text"
                placeholder="Universe"
                value={universe}
                onChange={(e) => setUniverse(e.target.value)}
                className="border p-2 rounded"
            />
            <div className="flex gap-2">
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    {id !== null ? "Update" : "Add"}
                </button>
                {id !== null && (
                    <button type="button" onClick={onCancel} className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
