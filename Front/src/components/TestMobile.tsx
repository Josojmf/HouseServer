import React, { FC, useEffect, useState } from "react";
import styled from '@emotion/styled'
import axios, { AxiosError, AxiosResponse } from "axios"
import {isMobile} from 'react-device-detect';

const MyComponent = () => {
        return (
            <div> This app is nor available for mobile devices, please set your browser on computer view</div>
        )
};

export default MyComponent;