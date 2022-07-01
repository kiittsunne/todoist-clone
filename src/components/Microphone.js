import React, { useState, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

const Microphone = () => {
  const [recordingState, setRecordingState] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note]);
    setNote("");
  };

  const handleEvtStyling = (evt) => {
    switch (evt.type) {
      case "click":
        if (recordingState === false) {
          setRecordingState(true);
        } else setRecordingState(false);
        break;
      default:
        console.error();
        break;
    }
  };

  return (
    <div id="microphone" className="voiceToggle">
      {isListening ? (
        <FaMicrophone
          name="Voice Recorder"
          className="formIcon"
          id="microphone"
          data-recording="true"
          onClick={() => {
            handleSaveNote();
            setIsListening((prevState) => !prevState);
          }}
          disabled={!note}
        />
      ) : (
        <FaMicrophone
          name="Voice Recorder"
          className="formIcon"
          id="microphone"
          data-recording="false"
          onClick={() => setIsListening((prevState) => !prevState)}
        />
      )}
      {savedNotes.map((n) => (
        <p key={n}>{n}</p>
      ))}
    </div>
  );
};

export default Microphone;
