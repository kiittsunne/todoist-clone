import React, { useState, useEffect } from "react";
import { VscEye } from "react-icons/vsc";
import { IoMdAdd } from "react-icons/io";
import TaskForm from "./TaskForm";
import Task from "./Task";
import EditTaskForm from "./EditTaskForm";
import CompletedTask from "./CompletedTask";

const TaskContainer = () => {
  /* Handles toggling between Add Task button & New Task Form */
  const [showTaskForm, setShowTaskForm] = useState(false);
  const handleShowTaskForm = () => {
    showTaskForm === false ? setShowTaskForm(true) : setShowTaskForm(false);
  };

  /* Handles Adding of New Task Data */
  const [taskList, setNewTaskList] = useState([]);
  // const [task, setTask] = useState({});
  // const [name, setName] = useState("");
  const handleAddNewTask = (task) => {
    setNewTaskList([...taskList, task]);
  };
  /* Handles Editing of Existing Task Data */
  const handleInitEditStatus = (task, index) => {
    setNewTaskList(
      taskList.map((d, i) => (i === index ? { ...d, editStatus: true } : d))
    );
  };
  const handleEditedTask = (task, index) => {
    setNewTaskList(
      taskList.map((d, i) => (i === index ? { ...task, editStatus: false } : d))
    );
  };
  const handleDeleteTask = (index) => {
    setNewTaskList(taskList.filter((d, i) => i !== index));
  };
  const [showCompleted, setShowCompleted] = useState(false);
  const handleShowCompleted = () => {
    showCompleted === false ? setShowCompleted(true) : setShowCompleted(false);
  };
  const handleCompleteTask = (index) => {
    setNewTaskList(
      taskList.map((d, i) =>
        i === index ? { ...d, completedStatus: true } : d
      )
    );
  };
  function showEditComponent(task, index) {
    if (task.editStatus === true) {
      return (
        <EditTaskForm
          task={task}
          index={index}
          key={index}
          handleEditedTask={handleEditedTask}
          handleDeleteTask={handleDeleteTask}
        />
      );
    }
    if (
      task.editStatus === false &&
      task.completedStatus === false &&
      showCompleted === false
    ) {
      return (
        <Task
          task={task}
          index={index}
          key={index}
          handleEditStatus={handleInitEditStatus}
          handleCompleteTask={handleCompleteTask}
        />
      );
    }
    if (
      task.editStatus === false &&
      task.completedStatus === true &&
      showCompleted === true
    ) {
      return (
        <CompletedTask
          task={task}
          index={index}
          key={index}
          handleEditStatus={handleInitEditStatus}
        />
      );
    }
    if (
      task.editStatus === false &&
      task.completedStatus === false &&
      showCompleted === true
    ) {
      return (
        <Task
          task={task}
          index={index}
          key={index}
          handleEditStatus={handleInitEditStatus}
        />
      );
    }
    if (
      task.editStatus === false &&
      task.completedStatus === true &&
      showCompleted === false
    ) {
      return;
    }
  }

  /* API data fetching / posting */
  // post
  useEffect(() => {
    let postRequestOptions = {
      method: "POST",
      body: JSON.stringify(taskList[taskList.length - 1]),
      redirect: "follow",
    };

    fetch(
      `https://todoist-clone-e2dd8-default-rtdb.firebaseio.com/tasklist.json`,
      postRequestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result.name))
      .catch((error) => console.log("error", error));
  }, [taskList]);
  console.log(taskList);

  // useEffect(() => {

  // }, [name])

  // get
  // useEffect(() => {
  //   let getRequestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };
  //   fetch(
  //     `https://todoist-clone-e2dd8-default-rtdb.firebaseio.com/tasklist.json`,
  //     getRequestOptions
  //   )
  //     .then((response) => response.json())
  //     .then((result) => console.log(result));
  // }, []);

  return (
    <div className="taskContainer masked-overflow">
      <div className="headerContainer">
        <h1>Inbox</h1>
        <div onClick={handleShowCompleted}>
          {showCompleted === false ? (
            <VscEye className="icon" style={{ fill: "var(--textColor)" }} />
          ) : (
            <VscEye className="icon" style={{ fill: "var(--todoistRed)" }} />
          )}
        </div>
      </div>
      <div className="contentContainer">
        <div className="existingTaskContainer">
          {taskList.length === 0
            ? ""
            : taskList.map((task, index) => {
                return showEditComponent(task, index);
              })}
        </div>
        <div className="addTaskContainer" data-addspacing={showTaskForm}>
          {showTaskForm ? (
            <TaskForm
              handleShowTaskForm={handleShowTaskForm}
              handleAddNewTask={handleAddNewTask}
            />
          ) : (
            <div
              id="addTaskButton"
              className="addTaskButton"
              onClick={handleShowTaskForm}
            >
              <IoMdAdd className="icon" />
              <h2>Add Task</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TaskContainer;
