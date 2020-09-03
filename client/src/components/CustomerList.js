import React from "react";
import axios from 'axios';
import Customer from "./Customer";
import useAsync from './useAsync';
import {useForm} from "react-hook-form";
import Axios from "axios";
import {Dashboard, Table, TableCategory, TableCell} from "./styles/tableStyle"
import styled from "styled-components";
import ButtonAnimation from "./styles/ButtonAnimation";
import {
    CreateFormWrapper,
    FormInnerWrapper,
    FormRow,
    InputText,
    InputSelect,
    FormLabel,
    InputCheckBox,
    TextArea,
    AlertMsg,
    Option
} from "./styles/Form";
import {UpdateBtn} from './styles/objectStyle'





const HomeMsg = "いらっしゃい！"

async function getAllCustomer() {
    const response = await axios.get(
        'http://localhost:5000/api/customers'
    );
    return response.data;
}

function CustomerList() {
    const [state, refetch] = useAsync(getAllCustomer, []);
    const {loading, data: customers, error} = state;
    if (loading) return <div>Loading</div>;
    if (error) return <div>Error</div>;
    if (!customers) return null;


    const handleVisible = () => {
        const form = document.querySelector(".customerForm");
        form.classList.toggle("visible")
    }

    console.log(HomeMsg)

    function CustomerAdd() {
        const {register, watch, handleSubmit, errors} = useForm();
        const onSubmit = data => {

            Axios.post(`http://localhost:5000/api/customers/add`, {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                    formData: data
                }
            }).then(response => {
                refetch(); //データー追加成功の場合、refetchして再ローディング
            }).catch(error => {
                console.log('failed', error)
            })
        };
        const moreDetail = watch("moreDetail");


        return (
            <CreateFormWrapper className='customerForm'>
                <FormInnerWrapper>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormRow>
                            <FormLabel htmlFor="name">NAME</FormLabel>
                            <InputText name="name" ref={register({required: true, maxLength: 20})} placeholder="名前"/>
                            {errors.name && errors.name.type === "required" && <AlertMsg>名前を入力してください。</AlertMsg>}
                        </FormRow>
                        <FormRow>
                            <FormLabel htmlFor="age">AGE</FormLabel>
                            <InputText name="age" type="number" ref={register({required: true, min: 10, max: 150})}
                                       placeholder="年齢"/>
                            {errors.age && errors.age.type === "required" && <AlertMsg>年齢を入力してください。</AlertMsg>}
                        </FormRow>
                        <FormRow>
                            <FormLabel htmlFor="gender">GENDER</FormLabel>
                            <InputSelect name="gender" ref={register({required: true})}>
                                <option value="0">男性</option>
                                <option value="1">女性</option>
                                <option value="2">Attack Helicopter</option>
                                <option value="3">その他</option>
                            </InputSelect>
                            {errors.gender && errors.gender.type === "required" && <AlertMsg>性別を選択してください。</AlertMsg>}

                        </FormRow>
                        <FormRow>
                            <FormLabel htmlFor="address">ADDRESS</FormLabel>
                            <InputText name="address" ref={register({required: true, maxLength: 50})} placeholder="住所"/>
                            {errors.address && errors.address.type === "required" && <AlertMsg>住所を入力してください。</AlertMsg>}

                        </FormRow>
                        <FormRow>
                            <FormLabel htmlFor="email">EMAIL</FormLabel>
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
                                type="email" placeholder="メール"
                            />
                            {errors.email && <AlertMsg role="alert">{errors.email.message}</AlertMsg>}
                        </FormRow>
                        <FormRow>
                            <FormLabel htmlFor="tel">TEL</FormLabel>
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
                                type="tel" placeholder="電話番号"
                            />
                            {errors.tel && <AlertMsg role="alert">{errors.tel.message}</AlertMsg>}</FormRow>


                        {moreDetail && (
                            <FormRow>
                                <FormLabel>NOTE</FormLabel>
                                <TextArea name="note" ref={register} placeholder="ノート"/>
                            </FormRow>
                        )}

                        <FormRow>
                            <div>
                                <FormLabel htmlFor="moreDetail">MORE</FormLabel>
                                <InputCheckBox name="moreDetail" type="checkbox"
                                               ref={register}/><Option>追加オプション</Option></div>
                            <UpdateBtn type="submit">登録</UpdateBtn>
                        </FormRow>
                    </form>
                </FormInnerWrapper>
            </CreateFormWrapper>
        );
    }


    return (
        <Dashboard>

            <Table>
                <TableCategory>
                    <TableCell className='category alignCenter'>ID</TableCell>
                    <TableCell className='category alignCenter'>Name</TableCell>
                    <TableCell className='category alignCenter'>Age</TableCell>
                    <TableCell className='category alignCenter'>Address</TableCell>
                    <TableCell className='category alignCenter'>Tel</TableCell>
                    <TableCell className='category alignCenter'>More</TableCell>
                </TableCategory>

                {customers.map(c => (
                    <Customer key={c.id} id={c.id}
                              name={c.name}
                              age={c.age}
                              gender={c.gender === 0 ? "男性" : c.gender === 1 ? "女性" : "その他"}
                              address={c.address}
                              mail={c.mail}
                              tel={c.tel}
                              note={c.note}
                              created={c.created}
                    />
                ))}
            </Table>

            <CustomerAdd/>

            <ButtonAnimation text={"顧客登録"} handleClick={handleVisible}/>

        </Dashboard>

    );
}

export default CustomerList;

