import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { register } from "../../Actions/ApiCall"
import { useState } from "react";

const New = ({ inputs, title }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [phonenumber, setPhonenumber] = useState("");
  const [role, setRole] = useState("admin");

  const onChangeInput = (e, id) => {
    let result = e.target.value
    if (id == "name") {
      setName(result)
    }
    if (id == "email") {
      setEmail(result)
    }
    if (id == "password") {
      setPassword(result)
    }
    if (id == "role") {
      setRole(result)
      console.log("check: ", role)
    }
    if (id == "phonenumber") {
      setPhonenumber(result)
    }

  }

  const handleAddNewUser = async () => {
    if (name == "" || email == "" || password == "" || phonenumber == "") {
      alert("Missing!")
    } else {
      await register({
        name: name,
        email: email,
        password: password,
        phonenumber: phonenumber,
        role: role
      })
    }

  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">

          <div className="right">
            <form>



              <div className="formInput" >
                <label>Name</label>
                <input type="text" onChange={(e) => onChangeInput(e, "name")} />
              </div>
              <div className="formInput" >
                <label>Email</label>
                <input type="email" onChange={(e) => onChangeInput(e, "email")} />
              </div>
              <div className="formInput" >
                <label>Phone number</label>
                <input type="number" onChange={(e) => onChangeInput(e, "phonenumber")} />
              </div>

              <div className="formInput" >
                <label>Password</label>
                <input type="password" onChange={(e) => onChangeInput(e, "password")} />
              </div>
              <div className="formInput" >
                <label>Role</label>
                <select onChange={(e) => onChangeInput(e, "role")}>
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                </select>
              </div>

              <button onClick={() => handleAddNewUser()}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
