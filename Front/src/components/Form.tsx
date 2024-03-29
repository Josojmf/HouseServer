import React, { FC, useEffect, useState } from "react";
import styled from '@emotion/styled'
import axios, { AxiosError, AxiosResponse } from "axios"
type User = {
    name: string,
    password: string
}
type FormProps = {
    visible: boolean;
    refresh: (arr: Array<User>) => void;
}

type Styled_Form_Type = {
    width?: string;
    height?: string;
    state: boolean;
}

class Form extends React.PureComponent<any,any> {
    constructor(props: any){
        super(props);
        this.state={ 
            change:false,
            name:"",
            password:""
        }
        this.signin = this.signin.bind(this);
    }
    signin(){
	
        if(this.state.name == "" || this.state.password == "")alert("Missing params.")
        else{
            axios.post(`${process.env.REACT_APP_API_URL}/signin?username=${this.state.name}&password=${this.state.password}`).then((res) => {
                alert("Dado de alta correctamente")
            }).catch((error) => {
                    alert(error.response.data);
                     console.log(error);
            })}

    }
    render() {   
    return (
        <div className="input-group">
            <Styled_Form state={true}>
            <input type="text" name="name" placeholder="Enter Username" id="" onChange={(e) => this.setState({name: e.target.value})}></input>
            <input type="password" name="password" placeholder="Enter password" id="" onChange={(e) => this.setState({password: e.target.value})}></input>
            </Styled_Form>
            <Styled_botones> <button onClick= {this.signin}>Register</button></Styled_botones>
            </div>
    )
  
        
    }
    
}

const Styled_Form = styled.div<Styled_Form_Type>`
display:flex;
flex-flow: column wrap;
justify-content:space-around;
align-items: center;
width:400px;
height:200px;
visibility:${(props) => props.state ? "visible" : "hidden"};
background: rgba(0, 0, 0, 0.15);
box-sizing: border-box;
backdrop-filter: blur(10px);
button { background: #333; border: none;border-radius: 3px; outline: none; color: #fff; width:80px; height: 30px;};
input {height: 20px; width: 60%;}


`
const Styled_botones = styled.div`
    display:flex;
    align-items:center;
    justify-content: center;
    button { background: #333; border: none; padding: 0 1rem; margin: 0.75rem; border-radius: 3px; outline: none; color: #fff; width:100px; height: 50px }
    
`


export default Form
