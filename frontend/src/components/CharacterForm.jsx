import { useState } from "react";

export default function CharacterForm({ onAdd }) {
    const [name, setName] = useState("");
    const [realName, setRealName] = useState("");
    const [universe, setUniverse] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !realName || !universe) return;
        onAdd({ name, realName, universe });
        setName("");
        setRealName("");
        setUniverse("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 border rounded bg-white/80">
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
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Add
            </button>
        </form>
    );
}
