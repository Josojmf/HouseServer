import React, { FC, useEffect, useState } from "react";
import styled from '@emotion/styled'
import axios from "axios";
import LogOut from "./LogOut";
import ListaCompra from "./ListaCompra";
import { isMobile } from "react-device-detect";
import background from "./../img/background.png";

class MainMenu extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            name: "",
            logout: false,
            butviss: true,
            greetVis:false,
            listComp:false,
           
        }
        this.findUser = this.findUser.bind(this);
        this.findUser()
    }

    render() {
        return (
        <Styled_page>
            
            <div style={{display: 'grid', justifyContent:'center', alignItems:'top', position :'relative'}}>
                { this.state.greetVis ? <h1>Hola {this.state.name}</h1> :null }
            </div>
            {this.state.logout ? <LogOut></LogOut> : null}
            {this.state.listComp ? <ListaCompra></ListaCompra> : null}
            <Styled_botones>
            {this.state.butviss ? <button type="button" onClick={() => { this.setState({ logout: true }); this.setState({ butviss: false }) }}>LogOut</button> : null}
            {this.state.butviss ? <button type="button" onClick={() => {this.setState({ listComp: true });this.setState({ butviss: false })}}>Lista Compra</button> : null}
            </Styled_botones>
        </Styled_page>
        )

    }
    findUser() {
        let token 
        token= localStorage.getItem("token");
        axios.get(`${process.env.REACT_APP_API_URL}/findUser?token=${token}`).then((response) => { this.setState({ name: response.data });this.setState({greetVis:true}) }).catch(error => { alert("Error") })
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
    display:grid;
    position:relative;
    top:-70px;
    flex-wrap: wrap;
    align-items:start;
    justify-content: start;
    button { background: #333; border: none; padding: 0 1rem; margin: 0.75rem; border-radius: 3px; outline: none; color: #fff; width:100px; height: 50px }
    
`


export default MainMenu;