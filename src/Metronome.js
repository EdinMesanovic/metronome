import React, {useState, useCallback, useEffect, useRef} from 'react'
import audio from "./sound.wav";

function Metronome() {
    const [sound] = useState(new Audio(audio));
    const timer = useRef();
    const [bpm, setBpm] = useState("40")
    const [isPlaying, setIsPlaying] = useState(false)
    const playClick = useCallback(() => { sound.play();  }, [sound]);

    useEffect(() => {
        if (isPlaying) {
          clearInterval(timer.current);
          timer.current = setInterval(playClick, (60 / bpm) * 1000);
        } else {
          clearInterval(timer.current);
        }
      }, [bpm, isPlaying, playClick]);

    const handleInputChange = event => {
        setBpm(event.target.value);
    }

    const startStop = () => {
        if (isPlaying) {
          setIsPlaying(false);
        } else {
          setIsPlaying(true);
        }
      }
    

    return (
        <div className="metronome">
            <h1>METRONOME</h1>
      <div className="bpm-slider">
        <p> {bpm} BPM</p>
        <input
          type="range"
          min="40"
          max="200"
          value={bpm}
          onChange={handleInputChange}
        />
        <button type="button" onClick={startStop}> {isPlaying ? "Stop" : "Start"}</button>
      </div>
      
    </div>
    )
}

export default Metronome
