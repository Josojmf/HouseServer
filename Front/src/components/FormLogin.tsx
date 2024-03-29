import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import MainMenu from "./MainMenu";
import { render } from "react-dom";

type User = {
  name: string;
  password: string;
};
type FormProps = {
  visible: boolean;
  refresh: (arr: Array<User>) => void;
};

type Styled_Form_Type = {
  width?: string;
  height?: string;
  state: boolean;
};
type mystate = {
  name: string;
  password: string;
  change: boolean;
};

class LogInComp extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      change: false,
      loggedIn: false,
      name: "",
      password: "",
      token: "",
    };
    this.login = this.login.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.checkLogin();
  }
  checkLogin() {
    const tokenGet: any = localStorage.getItem("token");
    if (tokenGet != null) {
      this.setState({ token: tokenGet });
      axios
        .get(`${process.env.REACT_APP_API_URL}/findUser?token=${tokenGet}`)
        .then((response) => {
          this.setState({ loggedIn: true });
          this.setState({ change: true });
        })
        .catch((error) => {
        });
      return this.state.loggedIn;
    }
  }

  async login() {
    if (this.state.name === "" || this.state.password === "") {
      this.setState({ change: false });
      this.checkLogin()
      alert("Missing params.");
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/login?username=${this.state.name}&password=${this.state.password}`
        )
        .then((res) => {
          localStorage.setItem("token", res.data);
          this.setState({ change: true });
        })
        .catch((error) => {
          alert(error.response.data);
        });
    }
  }
  render() {
    if (this.state.change) {
      return <MainMenu></MainMenu>;
    }
    return (
      <div className="input-group">
        <Styled_Form state={true}>
          <input
            type="text"
            name="name"
            placeholder="Enter Username"
            id=""
            onChange={(e) => this.setState({ name: e.target.value })}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            id=""
            onChange={(e) => this.setState({ password: e.target.value })}
          ></input>
        </Styled_Form>
        <Styled_botones>
          <button onClick={this.login}>LogIn</button>
        </Styled_botones>
      </div>
    );
  }
}

const Styled_Form = styled.div<Styled_Form_Type>`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  align-items: center;
  width: 400px;
  height: 200px;
  visibility: ${(props) => (props.state ? "visible" : "hidden")};
  background: rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  backdrop-filter: blur(10px);
  button {
    background: #333;
    border: none;
    border-radius: 3px;
    outline: none;
    color: #fff;
    width: 80px;
    height: 30px;
  }
  input {
    height: 20px;
    width: 60%;
  }
`;
const Styled_botones = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    background: #333;
    border: none;
    padding: 0 1rem;
    margin: 0.75rem;
    border-radius: 3px;
    outline: none;
    color: #fff;
    width: 100px;
    height: 50px;
  }
`;

export default LogInComp;
