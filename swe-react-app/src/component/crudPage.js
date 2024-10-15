import React from "react";
import ListRecords from "./listRecords";
import { useNavigate } from "react-router-dom";

export default function CrudPage() {
  const navigate = useNavigate();
  const createRecord = () => {
    navigate("/create");
  };

  return (
    <div className="mainPage">
      <h1 className="title">Software Engineer Salary Access Platform</h1>
      <button className="crudBtn" onClick={createRecord}>
        Create
      </button>
      <ListRecords />
    </div>
  );
}
