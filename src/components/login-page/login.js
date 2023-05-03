import { Button } from "@mui/material";
import { color } from "@mui/system";
import React from "react";
import { NavLink } from "react-router-dom";
import "./login.css";
function Login(props) {

  return (
    <>
      <div className="background">
      <div class="center">
        <h1>Login</h1>
        <form method="post">
          <div class="txt_field">
            <input type="text" required="" />
            <span></span>
            <label>Username</label>
          </div>
          <div class="txt_field">
            <input type="password" required="" />
            <span></span>
            <label>Password</label>
          </div>
          <div class="pass">Forgot Password?</div>
          {/* <button type="submit"> Login </button> */}
         
          <NavLink to="/inventory"> <Button
          type="submit"
            sx={{
              marginTop: 3,
              width: 165,
              fontSize: 15,
              fontWeight: "bold",
              marginBottom: 5,
              backgroundColor: "#2691d9",
              color: "#fff",
              ":hover": {backgroundColor: "#000"}
            }}
            
            onClick={() => {}}
          >
            Login
          </Button></NavLink>
          <div class="signup_link">
            Not a member? <a href="#">Signup</a>
          </div>
        </form>
      </div>
      </div>
    </>
  );
}

export default Login;
