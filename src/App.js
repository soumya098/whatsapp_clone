import "./App.css";
import Chatcomp from "./components/Chatcomp";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chatcomp />
      </div>
    </div>
  );
}

export default App;
