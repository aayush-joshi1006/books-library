import { Outlet } from "react-router";
import Header from "./components/Header";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  return (
    <>
    {/* COntainer to provide the access to the store */}
      <Provider store={appStore}>
        <Header />
        {/* outlet where rendered element will be displayed */}
        <Outlet />
      </Provider>
    </>
  );
}

export default App;
