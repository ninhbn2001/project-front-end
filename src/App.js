import { productInputs, userInputs } from "./formSource";
import { Route, Routes, Navigate, useParams } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import BoardMilestone from "./components/BoardMilestone/BoardMilestone";

import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import BoardContent from "./components/BoardContent/BoardContent";
import './components/BoardContent/BoardContent.scss';

import React from 'react';
import './App.scss';


function App() {
  const { id } = useParams();
  const user = localStorage.getItem("token");
  function checkuser() {
    if (user) {

      return <Navigate to={"/dashboard"} />
    } else {
      console.log("CHeck out")
      return <Navigate to={"/login"} />
    }
  }

  function checkDashboard() {
    if (user) {
      return <Dashboard />
    } else {
      return <Navigate to={"/login"} />
    }
  }

  console.log("check user: ", user)
  return (

    <Routes>
      <Route path="/dashboard" exact element={checkDashboard()} />
      <Route path="/users" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/home" exact element={<Home />} />
      <Route path="/milestone/:id" exact element={<BoardMilestone />} />

      <Route path="/boardcontent/:id" exact element={<BoardContent />} />
      <Route path="/accounts">
        <Route index element={<List />} />
        <Route path=":id" element={<Single />} />
        {/* <Route
          path="new"
          element={<New inputs={userInputs} title="Add New User" />} /> */}
      </Route>
      <Route path="/new" exact element={<New inputs={userInputs} title="Add New User" />} />
      <Route path="/" exact element={checkuser()} />
    </Routes>
  );
}


export default App;