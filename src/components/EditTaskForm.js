import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import {
  BsCheck,
  BsFillCalendarPlusFill,
  BsFolderFill,
  BsTagFill,
  BsFlagFill,
  BsFillTrashFill,
} from "react-icons/bs";
import Microphone from "./Microphone";

const EditTaskForm = (props) => {
  const [editedTask, setEditedTask] = useState(props.task);
  const handleOnChange = (evt) => {
    evt.preventDefault();
    const { id, value } = evt.target;
    setEditedTask({ ...editedTask, [id]: value });
  };
  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    props.handleEditedTask(editedTask, props.index);
  };
  const handleDelete = (evt) => {
    evt.preventDefault();
    props.handleDeleteTask(props.index);
  };
  function formatDate() {
    const monthString = editedTask.date.slice(5, 7);
    const dayString = editedTask.date.slice(8, 11);
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
    <form id="editTaskForm" onSubmit={handleOnSubmit}>
      <div className="taskBodyContainer">
        <div className="taskCheckboxEdit">
          <BsCheck className="icon" />
        </div>
        <div className="taskContent">
          <textarea
            id="title"
            className="titleEdit"
            autoFocus
            value={editedTask.title}
            onChange={handleOnChange}
          ></textarea>
          <textarea
            id="description"
            className="descriptionEdit"
            value={editedTask.description}
            onChange={handleOnChange}
          ></textarea>
          <div className="taskDataEdit">
            <div className="dataToggles">
              <div className="dueDate">
                <input
                  id="date"
                  type="date"
                  name="Due Date"
                  className="datePicker"
                  onChange={handleOnChange}
                  value={editedTask.date}
                />
                <BsFillCalendarPlusFill className="icon" />
                {formatDate()}
              </div>

              <div className="project">
                <BsFolderFill className="icon" />
                Inbox
              </div>
              <div className="label">
                <BsTagFill className="icon" />
                Label name
              </div>
              <div className="flag">
                <BsFlagFill className="icon" />
              </div>
            </div>
            <div className="taskToggles">
              <Microphone />
              <div
                id="taskDelete"
                className="taskDelete"
                onClick={handleDelete}
              >
                <BsFillTrashFill className="icon" />
              </div>
            </div>
          </div>
        </div>
        <button
          className="taskEditSubmit"
          type="submit"
          onClick={handleOnSubmit}
        >
          <AiOutlineEdit className="icon" />
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
