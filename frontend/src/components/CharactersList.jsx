import axios from "axios";
import { useEffect, useState } from "react";
import CharacterForm from "./CharacterForm.jsx";


const URL = "http://localhost:3000";

export default function CharactersList() {
    const [characters, setCharacters] = useState([]);
    const [editingCharacter, setEditingCharacter] = useState(null);
    const handleCancelEdit = () => setEditingCharacter(null);
    const handleAddOrUpdate = async (character) => {
        if (character.id) {
            await fetch(`${URL}/characters/${character.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(character)
            });
            setCharacters(characters.map(c => (c.id === character.id ? character : c)));
        } else {
            const res = await fetch(`${URL}/characters`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(character)
            });
            const newChar = await res.json();
            setCharacters([...characters, newChar]);
        }
        setEditingCharacter(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this character?")) return;
        await fetch(`${URL}/characters/${id}`, { method: "DELETE" });
        setCharacters(characters.filter(c => c.id !== id));
    };




    useEffect(() => {
        axios.get(`${URL}/characters`)
            .then((response) => {
                const charactersList = response.data.characters;
                setCharacters(charactersList);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="flex gap-10 flex-wrap justify-center">
            {characters.map((character, index) => (
                <div key={index} className="w-1/4 rounded-lg p-5 flex justify-between hover:scale-105 duration-500 shadow-black shadow-lg"
                     style={{ backgroundColor: 'rgba(160, 160, 160, 0.8)' }}>
                    <div className="flex flex-col justify-center gap-2">
                        <p className="text-rose-900 font-bold">{character.id}</p>
                        <h1 className="text-xl font-bold">{character.name}</h1>
                        <p>{character.realName}</p>
                        <p className="text-cyan-950">{character.universe}</p>
                    </div>
                    <div className="flex flex-col justify-center p-5 items-center gap-5">
                        <button onClick={() => setEditingCharacter(character)} className="border rounded-lg p-2 w-20 hover:bg-cyan-950
                        hover:text-white cursor-pointer duration-500">
                            Update
                        </button>
                        <button onClick={() => handleDelete(character.id)} className="border rounded-lg p-2 w-20 hover:bg-rose-900
                        hover:text-white cursor-pointer duration-500">
                            Delete
                        </button>
                    </div>
                </div>
            ))}
            <CharacterForm
                onAdd={handleAddOrUpdate}
                editingCharacter={editingCharacter}
                onCancel={handleCancelEdit}
            />

        </div>
    )
}
