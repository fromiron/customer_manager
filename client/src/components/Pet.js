import React, {useState} from "react";
import {TableRow, TableCell, ChangePetRow, MoreBtn} from "./styles/tableStyle"
import {PetProfile, PetProfileBig, UpdateBtn, AlignCenter, Divider} from "./styles/objectStyle"
import {FontAwesomeIcon as FAIcon} from "@fortawesome/react-fontawesome";
import useAsync from './useAsync';
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
import PetDelete from './PetDelete'

const petSexFilter = (data) => {
    if (data === 0 || data === 'オス') return 'オス'
    if (data === 1 || data === 'メス') return 'メス'
    if (data === 2 || data === '不明') return '不明'
}
const petDefaultImg = 'http://localhost:5000/upload/hana.png'


function Pet(props) {
    const {register, handleSubmit, errors} = useForm();
    const [Msg, setMsg] = useState(null);
    const [pet, setPet] = useState(props);
    const [visible, setVisible] = useState('hidden');

    async function getPet() {
        const response = await Axios.get(
            'http://localhost:5000/api/pets/' + props.petId
        );
        setPet(response.data[0])
    }

    const handleVisible = () => {
        if (visible === 'hidden') setVisible('visible');
        else setVisible('hidden')

    }

    const onSubmit = data => {
        Axios.post('http://localhost:5000/api/pets/' + pet.petId + '/update', {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                formData: data
            }
        }).then(response => {
            setMsg("更新済");
            getPet()

        }).catch(error => {
            console.log('failed', error)
            setMsg(error);
        }).finally()
        {

        }
    };


    return (<>

            <TableRow>
                <TableCell className="roundLeft alignCenter">{pet.petId}</TableCell>
                <TableCell className='alignCenter'>
                    <PetProfile src={pet.petImg !== null ? `http://localhost:5000${pet.petImg}` : petDefaultImg}/>
                </TableCell>
                <TableCell className='alignCenter'>{pet.petName}</TableCell>
                <TableCell className='alignCenter'>{pet.petType}</TableCell>
                <TableCell className='alignCenter'>
                    {petSexFilter(pet.petSex)}
                </TableCell>
                <TableCell className='alignCenter'>{pet.petBirth}</TableCell>
                <TableCell className='alignCenter'>{pet.petNote}</TableCell>
                <TableCell className="alignCenter">{pet.created}</TableCell>
                <TableCell className="roundRight"><MoreBtn onClick={handleVisible}>
                    <FAIcon icon={faCog}/></MoreBtn></TableCell>

            </TableRow>

            <ChangePetRow className={visible === 'visible' ? 'visible' : 'hidden'}>


                <td colSpan='9'>
                    <PetUpdateFormWrapper>
                        <PetFormInnerWrapper>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <AlignCenter>
                                    <PetProfileBig src={`http://localhost:5000${pet.petImg}`}/>
                                </AlignCenter>
                                <Divider>
                                    <div>
                                        <FormRow>
                                            <FormLabel className={'pet'} htmlFor="petName">NAME</FormLabel>
                                            <InputText name="petName" ref={register({required: true, maxLength: 20})}
                                                       defaultValue={pet.petName}/>
                                            {errors.petName && errors.petName.type === "required" &&
                                            <AlertMsg>名前を入力してください。</AlertMsg>}
                                        </FormRow>
                                        <FormRow>
                                            <FormLabel className={'pet'} htmlFor="petType">TYPE</FormLabel>
                                            <InputText name="petType" ref={register({required: true, maxLength: 20})}
                                                       defaultValue={pet.petType}/>
                                            {errors.petType && errors.petType.type === "required" &&
                                            <AlertMsg>種類を入力してください。</AlertMsg>}
                                        </FormRow>
                                    </div>
                                    <div>
                                        <FormRow>
                                            <FormLabel className={'pet'} htmlFor="petSex">SEX</FormLabel>
                                            <InputSelect name="petSex" ref={register({required: true})}>
                                                <option value="0"
                                                        selected={pet.petSex === 'オス' || pet.petSex === 0}>オス
                                                </option>
                                                <option value="1"
                                                        selected={pet.petSex === 'メス' || pet.petSex === 1}>メス
                                                </option>
                                                <option value="2"
                                                        selected={pet.petSex === '不明' || pet.petSex === 2}>不明
                                                </option>
                                            </InputSelect>
                                            {errors.petSex && errors.petSex.type === "required" &&
                                            <AlertMsg>性別を選択してください。</AlertMsg>}
                                        </FormRow>
                                        <FormRow>
                                            <FormLabel className={'pet'} htmlFor="petBirth">BIRTH</FormLabel>
                                            <InputText name="petBirth" type='date' ref={register({required: true})}
                                                       defaultValue={pet.petBirth}/>

                                            {errors.petBirth && errors.petBirth.type === "required" &&
                                            <AlertMsg>誕生日を選択してください。</AlertMsg>}

                                        </FormRow>
                                    </div>
                                </Divider>
                                <FormRow>
                                    <FormLabel className={'pet'} htmlFor="petNote">NOTE</FormLabel>
                                    <TextArea className={'pet'} name="petNote" ref={register}
                                              defaultValue={pet.petNote}/>
                                    <InformMsg>{Msg}</InformMsg>

                                    <UpdateBtn type="submit">更新</UpdateBtn>

                                </FormRow>


                            </form>

                        </PetFormInnerWrapper>
                        <AlignCenter>
                            <ImageUploadBtn petId={pet.petId}/>
                            <PetDelete petId={pet.petId}/>
                        </AlignCenter>
                    </PetUpdateFormWrapper>

                </td>
            </ChangePetRow>


        </>
    )
}

export default Pet;
