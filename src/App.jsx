import { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    // Verificamos si la casilla en el índice 'index' está vacía ("")
    if (board[index] === "") {
      // Si la casilla está vacía, creamos una copia del tablero actual usando el operador spread (...)
      const newBoard = [...board];
      // Colocamos el símbolo del jugador actual ('X' o 'O') en la casilla correspondiente
      newBoard[index] = xIsNext ? "X" : "O";
     
      // Actualizamos el estado 'board' con el nuevo tablero que contiene la jugada actual
      setBoard(newBoard);
      // Alternamos el turno del jugador actual para el próximo movimiento
      setXIsNext(!xIsNext);
  
      // Llamamos a la función 'calculateWinner' para verificar si hay un ganador en el nuevo tablero
      const winner = calculateWinner(newBoard);
      // Actualizamos el estado 'winner' con el símbolo del ganador o null si no hay ganador
      setWinner(winner);

      if (winner) {
        setShowBoard(false);
      }

    }
  };



  function calculateWinner(board) {
    // Array que contiene todas las combinaciones posibles de casillas que podrían llevar a una victoria
    const posiblesvictorias = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Líneas horizontales
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Líneas verticales
      [0, 4, 8], [2, 4, 6] // Líneas diagonales
    ];
  
    // Iteramos a través de cada combinación de casillas en winPatterns
    for (const casillas of posiblesvictorias) {
      // pattern representa cada combinación de casillas, por ejemplo, [0, 1, 2]
      const [a, b, c] = casillas; // Extraemos los índices a, b y c de la combinación actual
  
      // Verificamos si las casillas en los índices a, b y c tienen el mismo símbolo ("X" o "O")
      // y si no están vacías ("")
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        // Si se cumple la condición, hay un ganador y la función devuelve el símbolo del ganador ("X" o "O")
        return board[a]; // Devuelve el símbolo del ganador
      }
    }
  
    // Si no se encuentra ninguna combinación ganadora después de recorrer todas las combinaciones en winPatterns,
    // la función devuelve null, lo que significa que no hay un ganador en el tablero.
    return null; // No hay ganador, devuelve null
  }

  const handleReset = () => {
    // Reiniciar el estado del tablero a un arreglo de strings vacíos
    setBoard(Array(9).fill(""));
    // Reiniciar el estado del turno a true (es el turno del jugador "X")
    setXIsNext(true);
    // Reiniciar el estado del ganador a null (no hay ganador)
    setWinner(null);

  };
  

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <h1 className="text-4xl font-bold mb-10 animate-fade">Tic-Tac-Toe</h1> 
      {winner ? (
      <p className="text-2xl font-bold mb-20 text-black border-2 border-black p-5 animate-fade">Win: {winner}</p>
    ) : (
      <p className="text-2xl font-bold mb-20 animate-fade">Play: {xIsNext ? 'X' : 'O'}</p>
    )}
        <div className="grid grid-cols-3 grid-rows-3 ${showBoard ? '' : 'hidden'}">
          {board.map((cell,index)=>(
            <div 
            key={index}
            className="border-2 border-black text-4xl font-bold  w-24 h-28 flex justify-center items-center cursor-pointer animate-fade"
            onClick={() => handleClick(index)}>{cell}</div>
          ))}
          
      </div>
      <button className="border-2 border-black text-black font-bold py-2 px-4 rounded mt-10 animate-fade" onClick={handleReset}>Reset Game</button>
    </div>
  );
}

export default App;
