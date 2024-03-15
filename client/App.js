import AppComponent from "./components/AppComponents";
import { Hooks } from "./components/hooks/Hooks";

const App = () => {
  return (
    <Hooks>
      <AppComponent />
    </Hooks>
  );
};

export default App;
