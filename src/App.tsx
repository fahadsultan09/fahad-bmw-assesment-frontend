import Layout from "./Layout";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App"> {/* Add this wrapper */}
        <Layout />
      </div>
    </BrowserRouter>
  );
};

export default App;
