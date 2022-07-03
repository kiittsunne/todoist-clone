import React, { useState, useEffect, useReducer } from "react";
import { VscEye } from "react-icons/vsc";
import { IoMdAdd } from "react-icons/io";
import TaskForm from "./TaskForm";
import Task from "./Task";
import EditTaskForm from "./EditTaskForm";
import CompletedTask from "./CompletedTask";

//======== handleTaskChange Reducer Function =========//

const task = {
  CREATE: "create",
  READ: "read",
  INIT_EDIT: "initEditStatus",
  UPDATE: "update",
  DELETE: "delete",
  COMPLETE: "complete",
};
const handleTaskChange = (taskList, action) => {
  switch (action.type) {
    case task.CREATE:
      return [...taskList, action.payload];
    case task.READ:
      action.payload.setTaskNames([...action.payload.names]);
      return [...action.payload.tasks];
    case task.UPDATE:
      return taskList.map((d, i) =>
        i === action.payload.index
          ? { ...action.payload.task, editStatus: false }
          : d
      );
    case task.INIT_EDIT:
      return taskList.map((d, i) =>
        i === action.payload ? { ...d, editStatus: true } : d
      );
    case task.DELETE:
      return taskList.filter((d, i) => i !== action.payload);
    case task.COMPLETE:
      return taskList.map((d, i) =>
        i === action.payload ? { ...d, completedStatus: true } : d
      );
    default:
      break;
  }
};
//==================================================//

const TaskContainer = () => {
  const [taskList, dispatch] = useReducer(handleTaskChange, []);
  const [taskNames, setTaskNames] = useState([]);
  const [postTask, setPostTask] = useState({});
  const [putTask, setPutTask] = useState();
  const [deleteTask, setDeleteTask] = useState();

  //================== API Requests ==================//
  /* Post */
  useEffect(() => {
    let postRequestOptions = {
      method: "POST",
      body: JSON.stringify(postTask),
      redirect: "follow",
    };

    fetch(
      `https://todoist-clone-e2dd8-default-rtdb.firebaseio.com/tasklist.json`,
      postRequestOptions
    )
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.log("error", error));
  }, [postTask]);

  /* Get */
  useEffect(() => {
    const fetchData = async () => {
      const getRequestOptions = {
        method: "GET",
        redirect: "follow",
      };
      const res = await fetch(
        `https://todoist-clone-e2dd8-default-rtdb.firebaseio.com/tasklist.json`,
        getRequestOptions
      );

      const data = await res.json();
      dispatch({
        type: "read",
        payload: {
          tasks: Object.values(data),
          names: Object.keys(data),
          setTaskNames,
        },
      });
    };
    fetchData();
  }, []);

  /* Put */
  useEffect(() => {
    if (putTask !== undefined) {
      let putRequestOptions = {
        method: "PUT",
        body: JSON.stringify(putTask.task),
        redirect: "follow",
      };
      fetch(
        `https://todoist-clone-e2dd8-default-rtdb.firebaseio.com/tasklist/${
          taskNames[putTask.index]
        }.json`,
        putRequestOptions
      )
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    }
  }, [putTask]);

  /* Delete */
  useEffect(() => {
    let deleteRequestOptions = {
      method: "DELETE",
      redirect: "follow",
    };
    fetch(
      `https://todoist-clone-e2dd8-default-rtdb.firebaseio.com/tasklist/${taskNames[deleteTask]}.json`,
      deleteRequestOptions
    );
  }, [deleteTask]);

  //==================================================//

  //========== Task CRUD Reducer Functions ===========//
  const handleAddNewTask = (task) => {
    dispatch({ type: "create", payload: task });
    setPostTask({ ...task });
  };
  const handleInitEditStatus = (index) => {
    dispatch({ type: "initEditStatus", payload: index });
  };
  const handleEditedTask = (task, index) => {
    dispatch({ type: "update", payload: { task, index } });
    setPutTask({ task: { ...task, editStatus: false }, index: index });
  };
  const handleCompleteTask = (task, index) => {
    dispatch({ type: "complete", payload: index });
    setPutTask({ task: { ...task, completedStatus: true }, index: index });
  };
  const handleDeleteTask = (index) => {
    dispatch({ type: "delete", payload: index });
    setDeleteTask(index);
  };

  //==================================================//

  //======== Conditional Rendering Functions =========//

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleShowTaskForm = () => {
    showTaskForm === false ? setShowTaskForm(true) : setShowTaskForm(false);
  };
  const handleShowCompleted = () => {
    showCompleted === false ? setShowCompleted(true) : setShowCompleted(false);
  };
  const showEditComponent = (task, index) => {
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
  };
  //==================================================//

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
