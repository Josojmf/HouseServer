import React, { FC, useEffect, useState } from "react";
import styled from '@emotion/styled'
import Form from "./Form"
import FormLogin from "./FormLogin"
import axios from "axios";
class LogOut extends React.Component<any,any> {
        
    constructor(props: any){
        super(props);
        this.state={ 
            token:""
        }
        this.logout = this.logout.bind(this);
    }
    
    async logout() {
            const token= localStorage.getItem("token");
            axios.post(`http://192.168.1.120:4000/logout?token=${token}`).then((res) => {
                alert("Sesión Cerrada")
                localStorage.removeItem("token");
            }).catch((error) => {
                alert("Error al cerrar sesion")
                localStorage.removeItem("token");
            })
    }
    render(){
        const token = localStorage.getItem("token");
        return  (
            <button onClick={this.logout}>LogOut</button>
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
export default LogOut;