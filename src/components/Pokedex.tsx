import React, { useEffect, useState } from 'react'
import { useFetchPokemon } from '../hooks/useFetchPokemon'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAudio } from 'react-use';
import { Life } from './Life';

export const Pokedex = ({ pokeList, correct, onCount }: { pokeList: [], correct: number }) => {
    const [count, setcount] = useState(0);
    const [lifes, setlifes] = useState(3)
    const [src, setsrc] = useState('https://play.pokemonshowdown.com/audio/cries/arceus.mp3')
    const [list, setlist] = useState([])
    const [isCorrect, setisCorrect] = useState(false)
    const [audio, state, controls, ref] = useAudio({
        src: src,
        autoPlay: false,
    });


    const pokemon1 = useFetchPokemon(list[0]);
    const pokemon2 = useFetchPokemon(list[1]);
    const pokemon3 = useFetchPokemon(list[2]);

    const pokemons = [pokemon1, pokemon2, pokemon3];


    const addCount = () => {
        setcount(count + 1);
    }
    const changeList = () => {
        setlist(pokeList)
    }

    const isLoading = () => {
        let isLoading = false;
        pokemons.map(poke => {
            if (poke.isLoadiong) isLoading = true;
        })
        return isLoading;
    }
    const reduceLife = () => {
        if (lifes > 0) {
            setlifes(lifes - 1)
            toast.error('🙅🏽 Incorrect !', {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

    }

    useEffect(() => {
        changeList()
    }, [pokeList])

    useEffect(() => {

        if (pokeList.length > 0 && isCorrect) {
            controls.play()
        }

    }, [isCorrect])

    const onValidation = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const button: HTMLButtonElement = event.currentTarget;
        const answer = pokemons[correct].name;
        if (button.name === answer) {
            setisCorrect(true);
            setsrc(`https://play.pokemonshowdown.com/audio/cries/${answer}.mp3`)
            addCount();
            toast.success('👏🏾 Correct !', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setTimeout(() => {
                setisCorrect(false);
                onCount();
            }, 3000);

            // 
        } else {
            reduceLife();

            if (lifes === 0) {
                setcount(0)
                toast.error('💀 Game-Over !', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setTimeout(() => {
                    setlifes(3)
                }, 3000);
            }
        }
    };

    return (
        <> {audio}
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            {isLoading() && <div> loading...</div>}
            {!isLoading() && pokemons.length === 3 &&

                <div className="flex flex-col justify-center w-screen h-screen">
                    <Life lifes={lifes} count={count} />
                    <div className="object-fill p-10 drop-shadow-xl">
                        <img className="rounded-md border-4 border-blue-300" src="https://images3.alphacoders.com/677/677583.png" />
                    </div>

                    <div className="absolute">
                        {!isCorrect && <img className="m-auto drop-shadow-lg brightness-0 w-3/4" src={pokemons[correct].image} />}
                        {isCorrect && <img className="m-auto drop-shadow-lg  w-3/4 brightness-100" src={pokemons[correct].image} />}
                    </div>
                    <div className='flex justify-center '>
                        {
                            pokemons.map(poke => poke.id > 0 &&
                                <button key={poke.id} onClick={onValidation} name={poke.name} className="drop-shadow-sm mx-2 uppercase bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-10 rounded" > {poke.name}</button>

                            )

                        }
                    </div>
                </div>


            }
        </>
    )
}
