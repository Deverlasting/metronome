import { useState, useEffect } from "react"
import sound from "./beat.mp3"
import "./App.css"
import { useForm } from "react-hook-form"
// import { Play } from "./Play";

const App = () => {
  function play() {
    new Audio(sound).play()
  }

  const [tempo, setTempo] = useState(60) // Initial tempo
  const [intervalo, setIntervalo] = useState(60000 / tempo) // Intervalo al que suena el beat
  const [isPlaying, setIsPlaying] = useState(false) // Playback state
  const [isRandomTempo, setIsRandomTempo] = useState(false) // Checkbox state
  const [beatColor, setBeatColor] = useState("white") // Text color

  const [randomIndex, setRandomIndex] = useState(0)
  const [changeTempoTimeState, setChangeTempoTimeState] = useState(15000)
  const [randomBeatsState, setRandomBeatsState] = useState([60, 90, 120, 150, 180])

  const listBeats = randomBeatsState.map((randomBeatsArray) => <ul key={randomBeatsArray}>{randomBeatsArray}</ul>)

  //elige un nuevo tempo aleatoriamente de los valores del array randomBeatsState
  function updateTempo() {
    let newRandomIndex = Math.floor(Math.random() * randomBeatsState.length) //genera un numero aleatorio entre los indices del array
    while (randomIndex == newRandomIndex) {
      console.log(` randomIndex ${randomIndex}  -  newRandomIndex${newRandomIndex}`)
      newRandomIndex = Math.floor(Math.random() * randomBeatsState.length)
    }
    setRandomIndex(newRandomIndex)
    const newTempo = randomBeatsState[newRandomIndex]
    setTempo(newTempo)
    setIntervalo(60000 / newTempo)

    console.log(`Segundos: ${new Date().getSeconds()} - newRandomIndex${newRandomIndex} -  randomIndex${randomIndex}`)
  }

  useEffect(() => {
    let metronome

    // Show beat and play sound
    if (isPlaying) {
      if (isRandomTempo) {
        console.log("isRandomTempo effect")
        setTimeout(updateTempo, changeTempoTimeState) // cada X segundos te da un tempo nuevo
      }
      metronome = setInterval(() => {
        setBeatColor("red")
        play()
        setTimeout(() => {
          setBeatColor("white")
        }, 100) // Color change duration
      }, intervalo)
    } else {
      clearInterval(metronome)
    }
    // Cleanup
    return () => clearInterval(metronome)
    // }, [isPlaying, intervalo, beatColor, isRandomTempo, randomBeatsState]);
  }, [isPlaying, intervalo, isRandomTempo])

  //actualiza el tempo al modificar el valor del cuadro de texto
  const handleTempoChange = (e) => {
    const newTempo = parseInt(e.target.value)
    setTempo(newTempo)
    setIntervalo(60000 / newTempo)
    console.log(`tempo=${tempo} - newTempo ${newTempo}`)
  }

  const handlePlayStop = () => {
    setIsPlaying(!isPlaying)
  }
  //activa o desactiva el que varie el tempo de manera aleatoria
  const handleRandomTempoChange = (e) => {
    setIsRandomTempo(e.target.checked)
  }

  //es algo del formulario pero no sé exactamente qué.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    // Access form data using data object (e.g., data.beat1, data.beat2, data.beat3)
    console.log(data)

    randomBeatsState[0] = data.beat1
    randomBeatsState[1] = data.beat2
    randomBeatsState[2] = data.beat3
    setRandomBeatsState([...randomBeatsState])
    setTempo(randomBeatsState[0])
    setIntervalo(60000 / randomBeatsState[0]) //actualiza el intervalo(60000/tempo) por defecto al de randomBeatsState[0]
    setChangeTempoTimeState(data.randomTime * 1000)
    // changeTempoTime = data.changeTempoTime;
  }

  return (
    <div className="">
      <div>
        <h1 style={{ color: beatColor }}>Metrónomo</h1>
        {/* <h2 style={{ color: beatColor }}>beat</h2> */}
        <p>Tempo: {tempo} BPM</p>
        <p>Aleatorio cada {changeTempoTimeState / 1000}s</p>

        <input name="bpm" type="number" value={tempo} onChange={handleTempoChange} />
        <button onClick={handlePlayStop}>{isPlaying ? "Detener" : "Iniciar"}</button>

        <label htmlFor="randomTempo">
          <p>
            Modo aleatorio:
            <input type="checkbox" id="randomTempo" checked={isRandomTempo} onChange={handleRandomTempoChange} />
          </p>
        </label>
      </div>

      <form name="beatsForm" onSubmit={handleSubmit(onSubmit)}>
        <h2>Ajustes de ritmo</h2>
        <ul>
          <label htmlFor="randomTime">Aleatorio cada </label>
          <input
            className="input"
            {...register("randomTime", { required: true })}
            id="randomTime"
            type="number"
            defaultValue={changeTempoTimeState / 1000} // Set initial value from state
          />
          {errors.randomTime && <p>{errors.randomTime.message}</p>}
        </ul>
        <ul>
          <label htmlFor="beat1">Beat 1</label>
          <input
            className="input"
            {...register("beat1", { required: true })} // Register using 'beat1' name
            id="beat1"
            type="number"
            defaultValue={randomBeatsState[0]} // Set initial value from state
          />
          {errors.beat1 && <p>{errors.beat1.message}</p>}
          Valor actual: {randomBeatsState[0]}
        </ul>
        <ul>
          <label htmlFor="beat2">Beat 2</label>
          <input
            className="input"
            {...register("beat2", { required: true })} // Register using 'beat2' name
            id="beat2"
            type="number"
            defaultValue={randomBeatsState[1]} // Set initial value from state
          />
          {errors.beat2 && <p>{errors.beat2.message}</p>}
          Valor actual: {randomBeatsState[1]}
        </ul>
        <ul>
          <label htmlFor="beat3">Beat 3</label>
          <input
            className="input"
            {...register("beat3", { required: true })} // Register using 'beat3' name
            id="beat3"
            type="number"
            defaultValue={randomBeatsState[2]} // Set initial value from state
          />
          {errors.beat3 && <p>{errors.beat3.message}</p>}
          Valor actual: {randomBeatsState[2]}
        </ul>
        <ul>
          <label htmlFor="beat4">Beat 4</label>
          <input
            className="input"
            {...register("beat4", { required: true })} // Register using 'beat3' name
            id="beat4"
            type="number"
            defaultValue={randomBeatsState[3]} // Set initial value from state
          />
          {errors.beat4 && <p>{errors.beat4.message}</p>}
          Valor actual: {randomBeatsState[3]}
        </ul>
        <ul>
          <label htmlFor="beat5">Beat 5</label>
          <input
            className="input"
            {...register("beat5", { required: true })} // Register using 'beat2' name
            id="beat5"
            type="number"
            defaultValue={randomBeatsState[4]} // Set initial value from state
          />
          {errors.beat5 && <p>{errors.beat5.message}</p>}
          Valor actual: {randomBeatsState[4]}
        </ul>

        <button className="submit" type="submit">
          Enviar
        </button>
      </form>
    </div>
  )
}

export default App
