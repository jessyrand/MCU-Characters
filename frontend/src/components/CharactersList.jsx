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
        <div>
            {characters.map((character, index) => (
                <div key={index}>
                    <div>
                        <p>{character.id}</p>
                        <h1>{character.name}</h1>
                        <p>{character.realName}</p>
                        <p>{character.universe}</p>
                    </div>
                    <div>
                        <button>Update</button>
                        <button>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
