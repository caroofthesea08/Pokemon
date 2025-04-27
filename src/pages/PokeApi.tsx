import { useEffect, useState } from "react";
import { pokeConnection } from "../services/PokeService";
import { Pokes } from "../interface/Poke";

export const PokeApi = () => {      
  const [pokemon, setPokemon] = useState<Pokes>({ 
    name: '',
    image: '',
  });
  const [input, setInput] = useState('');       
  const [revealed, setRevealed] = useState(false);  
  const [score, setScore] = useState(0);
  const correctSound = "/sounds/success.mp3";
  const errorSound = "/sounds/error.mp3";
  const [message, setMessage] = useState("");

  const getNewPokemon = async () => {
    const randomId = Math.floor(Math.random() * 151) + 1;  
    const data = await pokeConnection(randomId);
    setPokemon({
      name: data.name,
      image: data.image,
    });
    setRevealed(false);
    setInput('');
    setMessage("");
  };

  const checkAnswer = () => {
    if (input.toLowerCase() === pokemon.name.toLowerCase()) {
      setRevealed(true);
      setScore((prev) => prev + 1);
      new Audio(correctSound).play();
      setMessage("¡Correcto! 🎉");
    } else {
      new Audio(errorSound).play();
      setMessage("¡Incorrecto! Inténtalo otra vez. 😢");
    }
  };

  useEffect(() => {
    getNewPokemon();
  }, []);

  const style = {
    backgroundImage: `url(${pokemon.image})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    height: '400px',
    width: '400px',
    filter: revealed ? "brightness(1)" : "brightness(0)",
    transition: "filter 0.5s ease"
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cyan-50 text-gray-800 p-8" 
    style={{ fontFamily: 'Nunito, sans-serif' }}>
      <h1 className="text-6xl font-bold mb-6 text-indigo-950"
      style={{ fontFamily: 'Charm'}}>¿Quién es este Pokemon?</h1>

      <div style={style} 
        className={`pokemon-image mb-6 ${revealed ? 'scale-110 transition-transform duration-700' : ''}`}>
      </div>

      <input 
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe el nombre del Pokemon"
        className="text-black px-4 py-2 rounded-md mb-4 w-64"
      />

      <div className="flex gap-4">
        <button
          onClick={checkAnswer}
          className="bg-green-200 hover:bg-green-300 px-4 py-2 rounded-md"
        >
          ¡Adivinar!
        </button>
        <button
          onClick={getNewPokemon}
          className="bg-violet-300 hover:bg-violet-400 px-4 py-2 rounded-md"
        >
          Nuevo Pokemon
        </button>
      </div>

      {message && (
        <p className="mt-4 text-xl font-semibold" style={{ fontFamily: "Charm" }}>
          {message}
        </p>
      )}

      <p className="mt-6 text-xl" style={{ fontFamily: 'Charm'}}>Puntos: {score}</p>

    </div>
  );
};

