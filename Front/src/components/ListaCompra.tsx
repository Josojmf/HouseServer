import React, { FC, useEffect, useState } from "react";
import styled from '@emotion/styled'
import Form from "./Form"
import FormLogin from "./FormLogin"
import axios from "axios";
import Page from "./Page";
import MainMenu from "./MainMenu";
type Styled_List_Type = {
    width?: string;
    height?: string;
    state: boolean;
}

class ListaCompra extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            name: "",
            menu: false,
            butviss: true,
        }
    }

    render() {
        if (this.state.menu) {
            return <MainMenu></MainMenu>
        }

        return (<Styled_page>
             
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', position: 'relative',top: '0px', left: '190px' }}>
                <h1>Lista de la compra</h1>
                <Styled_List state={true}></Styled_List>
            </div>
            <Styled_botones>
                <button type="button" onClick={() => { this.setState({ menu: true }); }}>Menu Principal</button>
            </Styled_botones>
            
            
           
          
        </Styled_page>)
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
    position:relative;
    top:-590px;
    flex-wrap: wrap;
    align-items:start;
    justify-content: start;
    button { background: #333; border: none; padding: 0 1rem; margin: 0.75rem; border-radius: 3px; outline: none; color: #fff; width:100px; height: 50px }
    
`
const Styled_List = styled.div<Styled_List_Type>`
width:400px;
position :relative;
top:100px;
left:-320px;
align-items:start;
justify-content:start;
height:600px;
display:grid;
flex-wrap: wrap;
visibility:${(props) => props.state ? "visible" : "hidden"};
background: rgba(0, 0, 0, 0.15);
box-sizing: border-box;
backdrop-filter: blur(10px);
overflow: scroll;
overflow-x:hidden;
`


export default ListaCompra