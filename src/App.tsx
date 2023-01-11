import { useEffect, useState } from "react"
import { Pokedex } from "./components/Pokedex"


function App() {

  const list: number[] = [];
  const pokedexLimits = 898;
  const [pokeList, setPokeList] = useState(list)
  const [correct, setcorrect] = useState(0);
  const [count, setCount] = useState(0)

  const onPokemonChange = () => {
    const list = [getRandom(pokedexLimits), getRandom(pokedexLimits), getRandom(pokedexLimits)]
    setPokeList(list);
    const valueCorret = getRandom(3);
    setcorrect(valueCorret);
  }

  const getRandom = (limit: number) => {
    return Math.floor(Math.random() * limit);
  }

  const onCount = () => {
    setCount(count + 1)
    console.log('change count')
  }

  useEffect(() => {
    onPokemonChange();
  }, [count])




  return (
    <div className="w-screen h-screen border-4 border-dark bg-gradient-to-r from-blue-300 ... bg-opacity-10" >
      <Pokedex pokeList={pokeList} correct={correct} onCount={onCount} />
    </div>


  )
}

export default App
