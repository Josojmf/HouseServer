import React, { FC, useEffect, useState } from "react";
import styled from '@emotion/styled'
import axios from "axios";
import LogOut from "./LogOut";
import ListaCompra from "./ListaCompra";
import { isMobile } from "react-device-detect";

class MainMenu extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            name: "",
            logout: false,
            butviss: true,
            listComp:false
        }
        this.findUser = this.findUser.bind(this);
        this.findUser()
    }

    render() {
        return (<Styled_page>
            <div> 
            <Styled_botones>
            {this.state.butviss ? <button type="button" onClick={() => { this.setState({ logout: true }); this.setState({ butviss: false }) }}>LogOut</button> : null}
            <Styled_boton_lista>
            {this.state.butviss ? <button type="button" onClick={() => {this.setState({ listComp: true })}}>Lista</button> : null}
            </Styled_boton_lista>
            </Styled_botones>
            </div>
            {this.state.logout ? <LogOut></LogOut> : null}
            {this.state.listComp ? <ListaCompra></ListaCompra> : null}

            <div style={{display: 'flex', justifyContent:'center', alignItems:'top'}}>
                <h1>Hola {this.state.name}</h1>
            </div>
        </Styled_page>
        )

    }
    findUser() {
        let token 
        if(isMobile) token=sessionStorage.getItem("token");else token= localStorage.getItem("token");
        axios.get(`http://192.168.1.120:4000/findUser?token=${token}`).then((response) => { this.setState({ name: response.data }) }).catch(error => { alert("Error") })
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
    display:inline;
    position:absolute;
    flex-wrap: wrap;
    align-items:left;
    justify-content: left;
    button { background: #333; border: none; padding: 0 1rem; margin: 0.75rem; border-radius: 3px; outline: none; color: #fff; width:100px; height: 50px }
    
`
const Styled_boton_lista = styled.div`
    display:grid;
    position:relative;
    align-items:left;
    justify-content: center;
    button { background: #333; border: none; padding: 0 0rem; margin: 0.75rem; border-radius: 3px; outline: none; color: #fff; width:100px; height: 50px }
    
`

export default MainMenu;