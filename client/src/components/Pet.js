import React, {useState} from "react";
import {TableRow, TableCell, ChangePetRow, MoreBtn} from "./styles/tableStyle"
import {PetProfile, PetProfileBig, UpdateBtn} from "./styles/objectStyle"
import {FontAwesomeIcon as FAIcon} from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons"
import {useForm} from "react-hook-form";
import Axios from "axios";
import {useHistory} from "react-router";
import {
    AlertMsg,
    PetFormInnerWrapper,
    FormLabel,
    FormRow, InformMsg,
    InputSelect,
    InputText, TextArea,
    PetUpdateFormWrapper
} from "./styles/Form";
import styled from "styled-components";
import ImageUploadBtn from "./ImageUploadBtn";


function Pet(props) {
    const {register, handleSubmit, errors} = useForm();
    const [Msg, setMsg] = useState(null);
    const [visible, setVisible] = useState('hidden');

    const handleVisible = () => {
        if (visible === 'hidden') setVisible('visible');
        else setVisible('hidden')

    }
    console.log(props.petImg)

    const onSubmit = data => {
        Axios.post('http://localhost:5000/api/pets/' + props.petId + '/update', {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                formData: data
            }
        }).then(response => {
            setMsg("更新済");
        }).catch(error => {
            console.log('failed', error)
            setMsg(error);
        }).finally()
    };

    const AlignCenter = styled.div`
display: flex;
justify-content: center;
`;
    const Divider = styled.div`
display: flex;
`
    return (<>

            <TableRow>
                <TableCell className="roundLeft alignCenter">{props.petId}</TableCell>
                <TableCell className='alignCenter'>
                    <PetProfile src={props.petImg}/>
                </TableCell>
                <TableCell className='alignCenter'>{props.petName}</TableCell>
                <TableCell className='alignCenter'>{props.petType}</TableCell>
                <TableCell className='alignCenter'>{props.petSex}</TableCell>
                <TableCell className='alignCenter'>{props.petBirth}</TableCell>
                <TableCell className='alignCenter'>{props.petNote}</TableCell>
                <TableCell className="alignCenter">{props.created}</TableCell>
                <TableCell className="roundRight"><MoreBtn onClick={handleVisible}>
                    <FAIcon icon={faCog}/></MoreBtn></TableCell>

            </TableRow>
            <ChangePetRow className={visible === 'visible' ? 'visible' : 'hidden'}>


                <td colSpan='9'>
                    <PetUpdateFormWrapper>
                        <PetFormInnerWrapper>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <AlignCenter>
                                    <PetProfileBig src={props.petImg}/>
                                </AlignCenter>
                                <Divider>
                                    <div>
                                        <FormRow>
                                            <FormLabel className={'pet'} htmlFor="petName">NAME</FormLabel>
                                            <InputText name="petName" ref={register({required: true, maxLength: 20})}
                                                       defaultValue={props.petName}/>
                                            {errors.petName && errors.petName.type === "required" &&
                                            <AlertMsg>名前を入力してください。</AlertMsg>}
                                        </FormRow>
                                        <FormRow>
                                            <FormLabel className={'pet'} htmlFor="petType">TYPE</FormLabel>
                                            <InputText name="petType" ref={register({required: true, maxLength: 20})}
                                                       defaultValue={props.petType}/>
                                            {errors.petType && errors.petType.type === "required" &&
                                            <AlertMsg>種類を入力してください。</AlertMsg>}
                                        </FormRow>
                                    </div>
                                    <div>
                                        <FormRow>
                                            <FormLabel className={'pet'} htmlFor="petSex">SEX</FormLabel>
                                            <InputSelect name="petSex" ref={register({required: true})}>
                                                <option value="0" selected={props.petSex === 'オス'}>オス</option>
                                                <option value="1" selected={props.petSex === 'メス'}>メス</option>
                                                <option value="2" selected={props.petSex === '不明'}>不明</option>
                                            </InputSelect>
                                            {errors.petSex && errors.petSex.type === "required" &&
                                            <AlertMsg>性別を選択してください。</AlertMsg>}
                                        </FormRow>
                                        <FormRow>
                                            <FormLabel className={'pet'} htmlFor="petBirth">BIRTH</FormLabel>
                                            <InputText name="petBirth" type='date' ref={register({required: true})}
                                                       defaultValue={props.petBirth}/>

                                            {errors.petBirth && errors.petBirth.type === "required" &&
                                            <AlertMsg>誕生日を選択してください。</AlertMsg>}

                                        </FormRow>
                                    </div>
                                </Divider>
                                <FormRow>
                                    <FormLabel className={'pet'} htmlFor="petNote">NOTE</FormLabel>
                                    <TextArea className={'pet'} name="petNote" ref={register}
                                              defaultValue={props.petNote}/>
                                    <InformMsg>{Msg}</InformMsg>

                                    <UpdateBtn type="submit">更新</UpdateBtn>

                                </FormRow>


                            </form>

                        </PetFormInnerWrapper>
                        <ImageUploadBtn petId={props.petId}/>

                    </PetUpdateFormWrapper>

                </td>

            </ChangePetRow>


        </>
    )
}

export default Pet;
