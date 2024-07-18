import { useState } from "react";

export function updateTempo() {
  const [randomIndex, setRandomIndex] = useState(0);
  const [randomBeatsState, setRandomBeatsState] = useState([
    60, 90, 120, 150, 180,
  ]);
  const [tempo, setTempo] = useState(60); // Initial tempo
  const [intervalo, setIntervalo] = useState(60000 / tempo); // Intervalo al que suena el beat

  let newRandomIndex = Math.floor(Math.random() * randomBeatsState.length); //genera un numero aleatorio entre los indices del array
  while (randomIndex == newRandomIndex) {
    console.log(
      ` randomIndex ${randomIndex}  -  newRandomIndex${newRandomIndex}`
    );
    newRandomIndex = Math.floor(Math.random() * randomBeatsState.length);
  }
  setRandomIndex(newRandomIndex);
  const newTempo = randomBeatsState[newRandomIndex];
  setTempo(newTempo);
  setIntervalo(60000 / newTempo);

  console.log(
    `Segundos: ${new Date().getSeconds()} - newRandomIndex${newRandomIndex} -  randomIndex${randomIndex}`
  );
}
