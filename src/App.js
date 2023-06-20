import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import MainNav from "./components/MainNav";
import Project from "./pages/Project";
import NewProject from "./pages/NewProject";
//container comp
function App() {
  let routes;

  routes = (
    <Routes>
      <Route exact={true} path="/" element={<Project />} />
      <Route path="/new" element={<NewProject />} />
      {/* <Route path="/:id" element={<Person />} />
      <Route path="/:id/edit" element={<UpdatePerson />} /> */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  return (
    <div className="App">
      <header>
        <MainNav />
      </header>
      <main>{routes}</main>
    </div>
  );
}

export default App;