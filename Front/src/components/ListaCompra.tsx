import React, { FC, useEffect, useState } from "react";
import styled from '@emotion/styled'
import Form from "./Form"
import FormLogin from "./FormLogin"
import axios from "axios";
import Page from "./Page";
import MainMenu from "./MainMenu";
import background from "./../img/background.png";
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
            lista: [],
            productoAnn:""
        }
        this.getProductos()
    }
    getProductos(){
        axios.get(`${process.env.REACT_APP_API_URL}/getProductos`).then((response) =>{this.setState({lista: response.data})}).catch((error) =>{alert(error)})
    }
     addProducto(){
         axios.post(`${process.env.REACT_APP_API_URL}/addProducto?producto=${this.state.producto}`).then((res) => { alert("Producto Añadido")})

    }
    eliminarProducto(){
        alert("Producto Eliminado")
        this.setState({menu:true})   
    }

    render() {
        if (this.state.menu) {
            return <MainMenu></MainMenu>
        }
        return (<Styled_page>
            <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'start', position: 'relative',top: '0px', left: '190px' }}>
                <h1>Lista de la compra</h1>
                <Styled_List state={true}>{this.state.lista.map((p:any)=>{return( <Styled_product>
                <div style={{ position:'relative',display: 'flex', justifyContent:'start',alignItems: 'baseline'}}>
                    {p}
                    </div>
                    <div>
                    <button onClick={async () => {this.eliminarProducto();await axios.post(`${process.env.REACT_APP_API_URL}/deleteProducto?producto=${p}`).then((res) => alert("Deleted"));}}>Eliminar</button>
                    </div>
                    </Styled_product>
                    )})}</Styled_List>

            </div>
            <Styled_botones>
                <button type="button" onClick={() => { this.setState({ menu: true }); }}>Menu Principal</button>
                <button type="button" onClick={async () => {this.addProducto();alert("Producto Añadido");this.setState({menu:true});}}>Añade Producto</button>
                <input type="text" name="producto" placeholder="Enter Product" onChange={(e) => this.setState({producto: e.target.value})}></input>
            </Styled_botones>
            
            
           
          
        </Styled_page>)
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
flex-wrap: nowrap;
visibility:${(props) => props.state ? "visible" : "hidden"};
background: rgba(0, 0, 0, 0.15);
box-sizing: border-box;
backdrop-filter: blur(10px);
overflow: scroll;
overflow-x:hidden;
`
const Styled_product = styled.div`
display:grid;
background: rgba(0, 0, 0, 0.15);
box-sizing: border-box;
justify-content:space-between;
width: 80%;
height:50px;
margin:20px;
/* #username {margin-left:10px} */
button {margin-top:40%;margin-left:5px}
`
export default ListaCompra