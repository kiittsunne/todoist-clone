import "./App.css";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import TaskContainer from "./components/TaskContainer";

function App() {
  return (
    <div className="App">
      <Topbar />
      <div className="appContainer">
        <Navbar />
        <TaskContainer />
      </div>
    </div>
  );
}

export default App;
