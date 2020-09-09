import React, {useState} from "react";
import Axios from "axios";
import styled from "styled-components";

import {UPLOAD,SERVER} from './dotEnv'


const UploadedImg = styled.img`
max-width: 200px;
max-height: 200px;
border-radius: 20px;
`
const InnerWrapper = styled.div`
width: 400px;
`
const ImageUploadBtnWrapper = styled.div`
display: flex;
justify-content: center;
margin-bottom: 30px;
`

const BASE_URL = SERVER;

function ImageUploadBtn(props) {
    const [uploadedImg, setUploadedImg] = useState({
        fileName: "",
        fillPath: ""
    });
    const [content, setContent] = useState("");

    const onChange = e => {
        setContent(e.target.files[0]);
    };
    const onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("img", content);
        formData.append("petId", props.petId);
        Axios.post(UPLOAD, formData)
            .then(res => {
                const {fileName} = res.data;
                console.log(fileName);
                setUploadedImg({fileName, filePath: `${BASE_URL}${fileName}`});
                alert("成功");
            })
            .catch(err => {
                console.error(err);
            });
    };


    return (
        <ImageUploadBtnWrapper>
            <form onSubmit={onSubmit}>
                <input type="file" onChange={onChange}/>
                <button type="submit">Upload</button>
            </form>
        </ImageUploadBtnWrapper>
    );
}

export default ImageUploadBtn;