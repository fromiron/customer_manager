import React, {useState} from "react";
import {useForm} from "react-hook-form";
import Axios from "axios";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";
import {
    UpdateFormWrapper,
    FormInnerWrapper,
    FormRow,
    InputText,
    InputSelect,
    FormLabel,
    InputCheckBox,
    TextArea,
    AlertMsg,
    InformMsg,
    Option
} from "./styles/Form";

import {
    DeleteBtn,
    DeleteLockBtn,
    UpdateBtn,
    BackBtn
} from './styles/objectStyle'

function CustomerUpdateForm(props) {
    let history = useHistory();
    const {register, watch, handleSubmit, errors} = useForm();

    const [Msg, setMsg] = useState(null);
    const [Del, setDel] = useState(false);

    const onSubmit = data => {
        console.log(data)
        Axios.post('http://localhost:5000/api/customers/' + props.id + '/update', {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                formData: data
            }
        }).then(response => {
            console.log(response.data)
            setMsg("更新済");
        }).catch(error => {
            console.log('failed', error)
            setMsg(error);
        }).finally()
    };
    const moreDetail = watch("moreDetail");

    const handleDelCheck = () => {
        setDel(!Del);
        console.log(Del)
    }

    const deleteSubmit = data => {
        if (Del === false) {
            setMsg('削除できません。')
            return
        }
        Axios.post('http://localhost:5000/api/customers/' + props.id + '/delete', {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                formData: data
            }
        }).then(response => {
            history.push('/')
            console.log(response.data);
        }).catch(error => {
            console.log('failed', error);
            setMsg(error);
        })
    };


    return (
        <UpdateFormWrapper>
            <FormInnerWrapper>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <FormRow>
                        <FormLabel htmlFor="name">名前</FormLabel>
                        <InputText name="name" ref={register({required: true, maxLength: 20})}
                                   defaultValue={props.name}/>
                        {errors.name && errors.name.type === "required" && <AlertMsg>名前を入力してください。</AlertMsg>}
                    </FormRow>
                    <FormRow>
                        <FormLabel htmlFor="age">年齢</FormLabel>
                        <InputText name="age" type="number" ref={register({required: true, min: 10, max: 150})}
                                   defaultValue={props.age}/>
                        {errors.age && errors.age.type === "required" && <AlertMsg>年齢を入力してください。</AlertMsg>}
                    </FormRow>
                    <FormRow>
                        <FormLabel htmlFor="gender">性別</FormLabel>
                        <InputSelect name="gender" ref={register({required: true})}>
                            <option value="0" selected={props.gender === 0}>男性</option>
                            <option value="1" selected={props.gender === 1}>女性</option>
                            <option value="2" selected={props.gender === 2}>Attack Helicopter</option>
                            <option value="3" selected={props.gender === 3}>その他</option>
                        </InputSelect>
                        {errors.gender && errors.gender.type === "required" && <AlertMsg>性別を選択してください。</AlertMsg>}

                    </FormRow>
                    <FormRow>
                        <FormLabel htmlFor="address">住所</FormLabel>
                        <InputText name="address" ref={register({required: true, maxLength: 50})}
                                   defaultValue={props.address}/>
                        {errors.address && errors.address.type === "required" && <AlertMsg>住所を入力してください。</AlertMsg>}

                    </FormRow>
                    <FormRow>
                        <FormLabel htmlFor="email">email</FormLabel>
                        <InputText
                            id="email"
                            name="email"
                            ref={register({
                                required: "メールを入力してください。",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "正しいメールを入力してください。"
                                }
                            })}
                            type="email" defaultValue={props.mail}
                        />
                        {errors.email && <AlertMsg role="alert">{errors.email.message}</AlertMsg>}
                    </FormRow>
                    <FormRow>
                        <FormLabel htmlFor="tel">電話</FormLabel>
                        <InputText
                            id="tel"
                            name="tel"
                            ref={register({
                                required: "電話番号を入力してください。",
                                pattern: {
                                    value:  /^\d{2,5}-\d{2,4}-\d{3,4}$/,
                                    message: "正しい電話番号を入力してください。"
                                }
                            })}
                            type="tel" defaultValue={props.tel}
                        />
                        {errors.tel && <AlertMsg role="alert">{errors.tel.message}</AlertMsg>}</FormRow>


                    <FormRow>
                        <FormLabel htmlFor="moreDetail">More</FormLabel>
                        <InputCheckBox name="moreDetail" type="checkbox" ref={register}/>
                        <Option>追加オプション</Option>
                    </FormRow>


                    {moreDetail && (
                        <div>
                            <FormRow>
                                <FormLabel htmlFor="note">NOTE</FormLabel>
                                <TextArea name="note" ref={register} defaultValue={props.note}/>
                            </FormRow>

                            <input type="hidden" name='id' value={props.id}/>
                            <DeleteLockBtn bgcolor={Del} type='button'
                                           onClick={handleDelCheck}>{Del === false ? '削除不可' : '削除可能'}</DeleteLockBtn>
                            <DeleteBtn type="button" onClick={deleteSubmit}>削除</DeleteBtn>
                        </div>
                    )}
                    <InformMsg>{Msg}</InformMsg>
                    <div>{Msg !== null ? <Link to={"/"}>

                        <BackBtn type="button">リストに戻る</BackBtn>
                    </Link> : ''}</div>
                    <UpdateBtn type="submit">更新</UpdateBtn>

                </form>
            </FormInnerWrapper>
        </UpdateFormWrapper>
    )
}

export default CustomerUpdateForm;
