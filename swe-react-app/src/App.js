import "./App.css";
import { Route, Routes } from "react-router-dom";
import CrudPage from "./component/crudPage";
import SalaryForm from "./component/createForm";
import UpdateRecord from "./component/updateRecord";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CrudPage />} />
        <Route path="/create" element={<SalaryForm />} />
        <Route path="/update/:recordId" element={<UpdateRecord />} />
      </Routes>
    </div>
  );
}

export default App;
