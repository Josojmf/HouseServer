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
            axios.post(`http://192.168.1.120:4000/signin?name=${this.state.name}&password=${this.state.password}`).then((res) => {
                alert("Dado de alta correctamente")
            }).catch((error) => {
                    alert("Nombre de usuario no disponible");
                
                
                console.log(error);
            }) }

    }
    render() {    
    return (
        <div className="input-group">
            <input type="text" name="name" placeholder="Enter Username" id="" onChange={(e) => this.setState({name: e.target.value})}></input>
            <input type="password" name="password" placeholder="Enter password" id="" onChange={(e) => this.setState({password: e.target.value})}></input>
            <button onClick= {this.signin}>Register</button>
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

export default Form