import { useRoutes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Browse from "./routes/Browse";
import Home from "./routes/Home";

function App() {
  // let element = useRoutes([
  //   {
  //     path: "/",
  //     element: <Browse />
  //   },
  //   {
  //     path: "/home",
  //     element: <Browse />
  //   }
  // ]);
  // return element;
  return (
    <div className="App">
      <Browse/>
    </div>
  );
}

export default App;
