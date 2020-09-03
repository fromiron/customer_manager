import {useHistory} from "react-router";
import {useForm} from "react-hook-form";
import React, {useState} from "react";
import Axios from "axios";
import styled from "styled-components";
import {ChangePetRow, MoreBtn, TableCell, TableRow} from "./styles/tableStyle";
import {PetProfile, PetProfileBig, UpdateBtn} from "./styles/objectStyle";
import {FontAwesomeIcon as FAIcon} from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons";
import {
    AlertMsg,
    FormLabel,
    FormRow, InformMsg,
    InputSelect,
    InputText,
    PetFormInnerWrapper,
    PetUpdateFormWrapper, TextArea
} from "./styles/Form";


const UploadedImg = styled.img`
max-width: 200px;
max-height: 200px;
border-radius: 20px;
`
const InnerWrapper = styled.div`
width: 400px;
`
const ImageUploadBtnWrapper=styled.div`
display: flex;
justify-content: center;
margin-bottom: 30px;
`

const BASE_URL = "http://localhost:5000";

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
        Axios.post("http://localhost:5000/upload", formData)
            .then(res => {
                const {fileName} = res.data;
                console.log(fileName);
                setUploadedImg({fileName, filePath: `${BASE_URL}/upload/${fileName}`});
                alert("成功");
            })
            .catch(err => {
                console.error(err);
            });
    };


    return (
        <ImageUploadBtnWrapper>
            <form onSubmit={onSubmit}>
                {uploadedImg ? (
                    <InnerWrapper>
                        <UploadedImg src={uploadedImg.filePath} alt=""/>
                        <h3>{uploadedImg.fileName}</h3>
                        <h3>{uploadedImg.filePath}</h3>
                    </InnerWrapper>
                ) : (
                    ''
                )}
                <input type="file" onChange={onChange}/>
                <button type="submit">Upload</button>
            </form>
        </ImageUploadBtnWrapper>
    );
}

export default ImageUploadBtn;