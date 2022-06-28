import axios from 'axios';
import { createWriteStream } from 'fs';
const FormData = require('form-data');
const fs = require('fs');
export const getFile = async(req:any, res:any) => {
    const file=req.body.file
    const writer = createWriteStream(file);
   await  axios.get(`http://localhost:8000/Files/${file}`).then(resp => {
     return res.status(200).send(resp.data);
});
} 

export const postFile = async(req:any, res:any) => {
    const file=req.body.file
    const text = req.body.text;
    console.log(text)
    const form_data = new FormData();
    form_data.append("text",text);
   await  axios.post(`http://localhost:8000/Files/${file}`,form_data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
}).catch(err => {
    console.log(err)
})
} 