import axios from "axios";
import { useEffect, useState } from "react";

const URL = "http://localhost:3000";

export default function CharactersList() {
    const [characters, setCharacters] = useState([]);

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
                <div key={index} className="w-1/4 rounded-lg p-5 flex justify-between hover:scale-105 duration-500"
                     style={{ backgroundColor: 'rgba(156, 163, 175, 0.8)' }}>
                    <div className="flex flex-col justify-center gap-2">
                        <p className="text-rose-900 font-bold">{character.id}</p>
                        <h1 className="text-xl font-bold">{character.name}</h1>
                        <p>{character.realName}</p>
                        <p className="text-cyan-950">{character.universe}</p>
                    </div>
                    <div className="flex flex-col justify-center p-5 items-center gap-5">
                        <button className="border rounded-lg p-2 w-20 hover:bg-cyan-950
                        hover:text-white cursor-pointer duration-500">
                            Update
                        </button>
                        <button className="border rounded-lg p-2 w-20 hover:bg-rose-900
                        hover:text-white cursor-pointer duration-500">
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
