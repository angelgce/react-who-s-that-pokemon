import { useEffect, useState } from "react";
import { FetchAPI } from "../helpers/FetchAPI";

export const useFetchPokemon = (value: number) => {

    const [pokemons, setPokemons] = useState({})
    const [isLoadiong, setisLoadiong] = useState(true)

    const getPokemons = async () => {
        const response = await FetchAPI(value);
        setPokemons(response);
        setisLoadiong(false)
    }

    useEffect(() => {
        getPokemons()
    }, [value])


    return {
        ...pokemons,
        pokemons,
        isLoadiong
    };
}
