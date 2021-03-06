import React, { FC, useEffect, useState } from "react";
import styled from '@emotion/styled'
import Form from "./Form"
import FormLogin from "./FormLogin"
import axios from "axios";
import Page from "./Page";
import MainMenu from "./MainMenu";
import background from "./../img/background.png";
class LogOut extends React.Component<any,any> {
        
    constructor(props: any){
        super(props);
        this.state={ 
            change:false,
            back:false,
            token:""
        }
        this.logout = this.logout.bind(this);
    }
    
    async logout() {
            const token= localStorage.getItem("token");
            axios.post(`${process.env.REACT_APP_API_URL}/logout?token=${token}`).then((res) => {
                alert("Sesión Cerrada")
                this.setState({ change: true });
                localStorage.removeItem("token");
            }).catch((error) => {
                alert("Error al cerrar sesion")
                this.setState({ change: true });
                localStorage.removeItem("token");
            })
    }
    render(){
        if(this.state.change){
            return <Styled_page> <Page></Page> </Styled_page>
        }else if(this.state.back){
            return <MainMenu></MainMenu>
        }
        return  (
            <Styled_page>
            <h1>¿Seguro que quieres cerrar Sesión?</h1>
            <Styled_botones>
            <button type="button" onClick={this.logout}>Sí</button> 
            <button type="button" onClick={() => {this.setState({back:true});}}>No</button>
            </Styled_botones>
            </Styled_page>
          
        )

    }
   

}
const Styled_page = styled.div`
width:100%;
height:100%;
background-image:url(${background});
background-position: center;
background-repeat: no-repeat;
background-size: cover;
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