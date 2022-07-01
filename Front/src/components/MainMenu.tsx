import React, { FC, useEffect, useState } from "react";
import styled from '@emotion/styled'
import Form from "./Form"
import FormLogin from "./FormLogin"
import axios from "axios";
type User = {
    name: string,
    password: string
}
class MainMenu extends React.Component {
    render(){
        const token = localStorage.getItem("token");
        return  (
            <div>
                <h1>HOLA {token}</h1>
            </div>
        )

    }
   

}
const Styled_page = styled.div`
width:100%;
height:100vh;
background-color:pink;
position:absolute;
left: 0%;
top:0%;
`

const Styled_botones = styled.div`
    display:flex;
    align-items:center;
    justify-content: center;
    button { background: #333; border: none; padding: 0 1rem; margin: 0.75rem; border-radius: 3px; outline: none; color: #fff; width:100px; height: 50px }
    
`
export default MainMenu;