import React, {useState} from "react";
import Axios from 'axios';
import {useForm} from "react-hook-form";
import {UpdateBtn, Divider} from "./styles/objectStyle"
import {InformMsg} from '../components/styles/Form'
import styled from "styled-components";
import ButtonAnimation from "./styles/ButtonAnimation";
import {
    CreateFormWrapper,
    FormInnerWrapper,
    FormRow,
    InputText,
    InputSelect,
    FormLabel,
    TextArea,
    AlertMsg
} from "./styles/Form";
import {API_SERVER} from './dotEnv'


const PetCreateWrapper = styled.div`
padding: 0 10%;
`

function refreshPage() {
    window.location.reload(false);
}

function PetCreate(props) {
    const [Msg, setMsg] = useState(null);


    const handleVisible = () => {
        const form = document.querySelector(".customerForm");
        form.classList.toggle("visible")
    }


    function PetAdd() {
        const {register, handleSubmit, errors} = useForm();
        const onSubmit = data => {

            Axios.post(API_SERVER + '/pets/add', {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    formData: data
                }
            }).then(response => {
                setMsg('登録成功')
                refreshPage()
            }).catch(error => {
                console.log('failed', error)
                setMsg('登録失敗')
            })
        };


        return (
            <CreateFormWrapper className='customerForm'>
                <FormInnerWrapper>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Divider>
                            <div>
                                <FormRow>
                                    <FormLabel className={'pet'} htmlFor="petName">NAME</FormLabel>
                                    <InputText name="petName" ref={register({required: true, maxLength: 20})}/>


                                    {errors.petName && errors.petName.type === "required" &&
                                    <AlertMsg>名前を入力してください。</AlertMsg>}
                                </FormRow>
                                <FormRow>
                                    <FormLabel className={'pet'} htmlFor="petType">TYPE</FormLabel>
                                    <InputText name="petType" ref={register({required: true, maxLength: 20})}/>
                                    {errors.petType && errors.petType.type === "required" &&
                                    <AlertMsg>種類を入力してください。</AlertMsg>}
                                </FormRow>
                            </div>
                            <div>
                                <FormRow>
                                    <FormLabel className={'pet'} htmlFor="petSex">SEX</FormLabel>
                                    <InputSelect name="petSex" ref={register({required: true})}>
                                        <option value="0">オス</option>
                                        <option value="1">メス</option>
                                        <option value="2">不明</option>
                                    </InputSelect>
                                    {errors.petSex && errors.petSex.type === "required" &&
                                    <AlertMsg>性別を選択してください。</AlertMsg>}
                                </FormRow>
                                <FormRow>
                                    <FormLabel className={'pet'} htmlFor="petBirth">BIRTH</FormLabel>
                                    <InputText name="petBirth" type='date' ref={register({required: true})}/>
                                    {errors.petBirth && errors.petBirth.type === "required" &&
                                    <AlertMsg>誕生日を選択してください。</AlertMsg>}

                                </FormRow>
                            </div>
                        </Divider>
                        <FormRow>
                            <FormLabel className={'pet'} htmlFor="petNote">NOTE</FormLabel>
                            <TextArea className={'pet'} name="petNote" ref={register}/>
                            <input type='hidden' name={'customerId'} value={props.customerId} ref={register}/>
                            <UpdateBtn type="submit">ペット登録</UpdateBtn>
                        </FormRow>
                    </form>
                </FormInnerWrapper>
            </CreateFormWrapper>
        );
    }


    return (
        <PetCreateWrapper>


            <PetAdd/>
            <InformMsg>{Msg}</InformMsg>

            <ButtonAnimation text={"ペット登録"} handleClick={handleVisible}/>

        </PetCreateWrapper>

    );
}

export default PetCreate;

