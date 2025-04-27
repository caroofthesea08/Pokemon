import axios from "axios"; // Para pedir a la API externa
import { Pokes } from "../interface/Poke";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

export const pokeConnection = async (id: number): Promise<Pokes> => {
    const response = await axios.get(`${API_URL}${id}`);
    const { name, sprites } = response.data;
    return {
        name: name,
        image: sprites.other["official-artwork"].front_default
    };
};
