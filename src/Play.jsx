import { useState, useEffect } from "react";
import sound from "./beat.mp3";

export function Play({
  randomIndex = { randomIndex },
  randomBeatsState,
  isPlaying,
  isRandomTempo,
  intervalo,
}) {
  function play() {
    new Audio(sound).play();
  }
  //elige un nuevo tempo aleatoriamente de los valores del array randomBeatsState
  function updateTempo() {
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

  useEffect(() => {
    let metronome;

    // Show beat and play sound
    if (isPlaying) {
      if (isRandomTempo) {
        console.log("isRandomTempo effect");
        setTimeout(updateTempo, changeTempoTimeState); // cada X segundos te da un tempo nuevo
      }
      metronome = setInterval(() => {
        setBeatColor("red");
        play();
        setTimeout(() => {
          setBeatColor("white");
        }, 100); // Color change duration
      }, intervalo);
    } else {
      clearInterval(metronome);
    }
    // Cleanup
    return () => clearInterval(metronome);
    // }, [isPlaying, intervalo, beatColor, isRandomTempo, randomBeatsState]);
  }, [isPlaying, intervalo, isRandomTempo]);
}

export default Play;
