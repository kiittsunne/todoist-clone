import React, { useState, useEffect } from "react";
import {
  BsFillCalendarPlusFill,
  BsFolderFill,
  BsTagFill,
  BsFlagFill,
} from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { MdIncompleteCircle } from "react-icons/md";

//=============== WebSpeech API Initialisation ================//
// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;
// const mic = new SpeechRecognition();
// mic.continuous = true;
// mic.interimResults = true;
// mic.lang = "en-US";
//============================================================//

const TaskForm = (props) => {
  //=============== Microphone state handling ================//
  // const [recordingState, setRecordingState] = useState(false);
  // const [isListening, setIsListening] = useState(false);
  // const [savedNotes, setSavedNotes] = useState([]);
  // const handleEvtStyling = () => {
  //   if (recordingState === false) {
  //     setRecordingState(true);
  //   } else setRecordingState(false);
  // };
  // useEffect(() => {
  //   handleListen();
  // }, [isListening]);
  // const handleListen = () => {
  //   if (isListening) {
  //     mic.start();
  //     mic.onend = () => {
  //       console.log("continue..");
  //       mic.start();
  //     };
  //   } else {
  //     mic.stop();
  //     mic.onend = () => {
  //       console.log("Stopped Mic");
  //     };
  //   }
  //   mic.onstart = () => {
  //     console.log("Mics on");
  //   };

  //   mic.onresult = (event) => {
  //     const transcript = Array.from(event.results)
  //       .map((result) => result[0])
  //       .map((result) => result.transcript)
  //       .join("");
  //     console.log(transcript);
  //     setTask(transcript);
  //     mic.onerror = (event) => {
  //       console.log(event.error);
  //     };
  //   };
  // };
  // const handleSaveNote = () => {
  //   setSavedNotes([...savedNotes, task.description]);
  // };
  //=======================================================//

  /* Task in form state handling */
  const initNewTask = {
    title: "",
    description: "",
    date: "Due Date",
    editStatus: false,
    completedStatus: false,
  };
  const [task, setTask] = useState(initNewTask);
  const handleOnChange = (evt) => {
    evt.preventDefault();
    const { id, value } = evt.target;
    setTask({ ...task, [id]: value });
  };
  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddNewTask(task);
    setTask(initNewTask);
  };
  const handleCancel = (evt) => {
    props.handleShowTaskForm(evt);
    setTask(initNewTask);
  };
  function formatDate() {
    const monthString = task.date.slice(5, 7);
    const dayString = task.date.slice(8, 11);
    let month = "";
    let day = "";
    switch (monthString) {
      case "01":
        month = "Jan";
        break;
      case "02":
        month = "Feb";
        break;
      case "03":
        month = "Mar";
        break;
      case "04":
        month = "Apr";
        break;
      case "05":
        month = "May";
        break;
      case "06":
        month = "Jun";
        break;
      case "07":
        month = "Jul";
        break;
      case "08":
        month = "Aug";
        break;
      case "09":
        month = "Sep";
        break;
      case "10":
        month = "Oct";
        break;
      case "11":
        month = "Nov";
        break;
      case "12":
        month = "Dec";
        break;
      case "":
        month = "No Due Date";
      default:
        month = "Due Date";
        break;
    }
    if (dayString.charAt(0) == "0") {
      day = dayString.charAt(1);
    } else day = dayString;
    const date = `${day} ${month}`;
    return date;
  }

  return (
    <div className="taskFormContainer">
      <form id="generalTaskForm" className="taskForm" onSubmit={handleOnSubmit}>
        <div className="inputContainer" onk>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            autoFocus
            onChange={handleOnChange}
            value={task.title}
          />
          <textarea
            id="description"
            name="description"
            rows={5}
            placeholder="Description"
            onChange={handleOnChange}
            value={task.description}
          ></textarea>
          <div className="dataTogglesContainer">
            <div className="classificationDataToggleContainer">
              <div name="Due Date" id="dueDate" className="dateToggle">
                <div className="datePickerContainer">
                  <input
                    id="date"
                    type="date"
                    name="Due Date"
                    className="datePicker"
                    onChange={handleOnChange}
                    value={task.date}
                  />
                </div>
                <BsFillCalendarPlusFill className="formIcon" />
                {formatDate()}
              </div>
              <div name="Project" id="project" className="projectToggle">
                <BsFolderFill className="formIcon" />
                Project
              </div>
            </div>
            <div className="labelDataToggleContainer">
              <div name="Label" id="label" className="labelToggle">
                <BsTagFill className="formIcon" />
              </div>
              <div name="Priority Flag" id="flag" className="flagToggle">
                <BsFlagFill className="formIcon" />
              </div>
              <div
                name="Microphone Toggle"
                id="microphone"
                className="microphoneToggle"
              >
                <FaMicrophone
                  name="Voice Recorder"
                  className="formIcon"
                  id="microphone"
                  // data-recording={recordingState}
                  // onClick={() => {
                  //   setIsListening((prevState) => !prevState);
                  // }}
                />
              </div>
              <div name="Label" id="label" className="labelToggle">
                <MdIncompleteCircle
                  className="formIcon"
                  // onClick={handleSaveNote}
                  // disabled={!task.description}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="outputContainer">
          <div className="cancelButton" onClick={handleCancel}>
            Cancel
          </div>
          <input
            className="submitButton"
            type="submit"
            onClick={handleOnSubmit}
            value="Add Task"
          />
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
