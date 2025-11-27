import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes/routes";
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  );
}

export default App;
