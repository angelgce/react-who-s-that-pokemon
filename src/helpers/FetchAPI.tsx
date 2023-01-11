export const FetchAPI = async (value: number) => {
    if (value === undefined) return {}
    const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}/`);
    const response = await api.json();
    const pokemon = {
        id: value,
        name: response.name,
        image: response.sprites.other.home.front_default
    }
    return pokemon;
}
