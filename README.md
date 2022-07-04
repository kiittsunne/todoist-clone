# Todoist Clone

![Firebase RTD in action](https://i.imgur.com/JFu6zKs.gif)

### Initial Goals vs Final Outcome

I initially proposed to complete a project that would do the following, and the marked items were what I ultimately achieved (fully/ partially):

❌ Contribute to open source
🟡 Integrate accessibility features (WebSpeech API for TTS/STT transcription)
✅ Be a full CRUD app, hosted on Firebase
🟡 Mimic Todoist's original UI, interaction design, and features as closely as time would allow

![CRUD operations](https://i.imgur.com/thyf0i7.gif)

![UI Design](https://i.imgur.com/9aDFOIg.gif)

### Technologies Used

- React
- Firebase (Realtime Database + REST API)
- WebSpeech API

### Project Architecture / Wireframes / User Story

![Component Architecture & Task Form UI Wireframe](https://i.imgur.com/TI5ssmR.jpeg)

**Uncompleted User Story**

- Being able to add additional data (labels/ priority)
- Group tasks by project & view project folders
- Adding notes by voice command/ through transcription

### Planning & Development Retrospective

I began the project with too many isolated goals and underestimated the difficulty/ time needed to realise each one. Project 2 has been both a humbling experience in discovering the limitations of my current skills, and a helpful one in terms of highlighting where I need to make efficiency/ task management improvements.

#### Obstacles & Problem-Solving Strategies

**1. Problems setting up CRUD RESTful API paths **

Create, Read & Update paths created some confusion - I originally tried to integrate them directly into the same reducer function/ handler ladder that the UI components used to manage state, but this often resulted in duplicate data.

Eventually this problem by setting up separate useStates for each C/U/D path, and used the Read path to init the value of task useReducer.

```javascript
//"master" tasklist and path functions
const [taskList, dispatch] = useReducer(handleTaskChange, []);

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

// useStates to manage data communicated to firebase realtime database
const [taskNames, setTaskNames] = useState([]);
const [postTask, setPostTask] = useState({});
const [putTask, setPutTask] = useState();
const [deleteTask, setDeleteTask] = useState();
```

**2. Conditional Rendering in Task Container**

There are multiple sets of conditional rendering:

- Add Task Button <-> Add Task Form
- Task <-> Edit Task Form
- Task <-> Completed Task
- No Existing Tasks to show <-> Show Existing Tasks

In order to manage state/ conditional rendering, I wrote this large if ladder in `TaskContainer.js` that I'm not entirely satisfied with as it's hard to read & may not be very resource efficient.

```javascript
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
```

#### Unsolved Problems

**1. WebSpeech API**

This was the primary "gimmick" I wanted to add to my Todoist clone to differentiate it from the original. However, I encountered quite a lot of difficulty integrating it into my app.

Will likely be able to resolve it given more time & might need to refactor state management in the Task Form/ Edit Task Form components.

### APIs Used

- Firebase RealTime DB REST APIs: [reference](https://firebase.google.com/docs/reference/rest/database)
- WebSpeech API: [reference](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API)
