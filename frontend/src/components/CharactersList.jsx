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

}
