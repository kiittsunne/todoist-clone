import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import {
  BsCheck,
  BsFillCalendarPlusFill,
  BsFolderFill,
  BsTagFill,
  BsFlagFill,
} from "react-icons/bs";

const CompletedTask = (props) => {
  /* Handle date display in task body */
  function formatDate() {
    const today = new Date().toISOString().slice(0, 10);
    const monthString = today.slice(5, 7);
    const dayString = today.slice(8, 11);
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
      default:
        month = "No Due Date";
        break;
    }
    if (dayString.charAt(0) == "0") {
      day = dayString.charAt(1);
    } else day = dayString;
    const date = `${day} ${month}`;
    return date;
  }

  /* Handle "Collapse" button display */
  const [show, setShow] = useState(false);
  const handleShow = (evt) => {
    if (evt.target.id === "taskCollapse") {
      setShow(false);
    } else setShow(true);
  };

  const [task, setTask] = useState(props.task);

  /* Initiate Editing Interaction */
  const handleInitEdit = () => {
    props.handleEditStatus(props.task, props.index);
  };

  return (
    <div className="taskBodyContainer completed" data-showall={show}>
      <div className="completedTaskCheckBox">
        <BsCheck className="completedIcon" />
      </div>
      <div className="taskContent">
        <div
          className="title completed"
          data-showall={show}
          onClick={handleShow}
        >
          {task.title}
        </div>
        <div
          className="description completed"
          data-showall={show}
          onClick={handleShow}
        >
          {task.description}
        </div>
        <div className="taskData">
          <div className="dueDate completed">
            <BsFillCalendarPlusFill className="icon completed" />
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
          <div
            id="taskCollapse"
            className="taskCollapse"
            data-showall={show}
            onClick={handleShow}
          >
            Collapse
          </div>
        </div>
      </div>
      <div className="taskEdit" onClick={handleInitEdit}>
        <AiOutlineEdit className="icon" />
      </div>
    </div>
  );
};

export default CompletedTask;
