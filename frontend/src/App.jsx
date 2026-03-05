import {BrowserRouter , Routes , Route} from "react-router";
import Events from "./pages/Events";

export default function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Events/>}/>
    </Routes>
    </BrowserRouter>
  );
}