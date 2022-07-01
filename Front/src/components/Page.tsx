import React, { FC, useEffect, useState } from "react";
import styled from '@emotion/styled'
import Form from "./Form"
import FormLogin from "./FormLogin"
import axios from "axios";
import LogOut from "./LogOut";
import { isMobile } from "react-device-detect";

type User = {
    name: string,
    password: string
}
const Page: FC = () => {
    const [SignInVis, setSignInVisible] = useState<boolean>(false);
    const [LogInVis, setlogInVisible] = useState<boolean>(true);
    const [LogOutVis, setLogoutVisible] = useState<boolean>(false);
    return <Styled_page>
        
        <Styled_botones>
          <button type="button" onClick={() => { setSignInVisible(false); setlogInVisible(true);setLogoutVisible(false); }}>LogIn</button>
          <button type="button" onClick={async () => { setSignInVisible(true); setlogInVisible(false);setLogoutVisible(false); }}>Register</button>
        </Styled_botones>
        <Styled_Container>
            {LogInVis ? <FormLogin></FormLogin> : null}
            {SignInVis ? <Form></Form> : null}
        </Styled_Container>

    </Styled_page>
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

const Styled_Container = styled.div`
    display:flex;
    justify-content:center;
    flex-flow: row wrap;
    margin-top:100px;
`




export default Page;