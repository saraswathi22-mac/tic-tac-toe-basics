import { useState } from "react";
import "./Game.css";
import { Board } from "../Board/Board";
import { ResultModal } from "../ResultModal/ResultModal";
import { calculateWinner } from "../../utils/WinnerCalculator";

export const Game = () => {
  const [cellValues, setCellValues] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [noOfTurnsLeft, setNoOfTurnsLeft] = useState(9);
  const [winner, setWinner] = useState();
  const [winningCombination, setWinningCombination] = useState([]);

  const isCellEmpty = (cellIndex) => cellValues[cellIndex] === "";

  const restartGame = () => {
    setCellValues(["", "", "", "", "", "", "", "", ""]);
    setXIsNext(true);
    setIsGameOver(false);
    setNoOfTurnsLeft(9);
    setWinner(undefined);
    setWinningCombination([]);
  };

  const onCellClicked = (cellIndex) => {
    if (isCellEmpty(cellIndex)) {
      const newCellValues = [...cellValues];
      newCellValues[cellIndex] = xIsNext ? "X" : "O";
      const newNoOfTurnsLeft = noOfTurnsLeft - 1;
      const calcResult = calculateWinner(
        newCellValues,
        newNoOfTurnsLeft,
        cellIndex
      );
      setCellValues(newCellValues);
      setXIsNext(!xIsNext);
      setIsGameOver(calcResult.hasResult);
      setNoOfTurnsLeft(newNoOfTurnsLeft);
      setWinner(calcResult.winner);
      setWinningCombination(winningCombination);
    }
  };

  return (
    <>
      <div id="game">
        <h1>Tic Tac Toe</h1>
        <Board
          cellValues={cellValues}
          winningCombination={winningCombination}
          cellClicked={onCellClicked}
        />
      </div>
      <ResultModal
        isGameOver={isGameOver}
        winner={winner}
        onNewGameClicked={restartGame}
      />
    </>
  );
};
