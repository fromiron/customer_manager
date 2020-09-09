import React, {useState, useEffect} from "react";
import axios from 'axios';
import Customer from "./Customer";
import useAsync from './useAsync';
import {useForm} from "react-hook-form";
import Axios from "axios";
import {Dashboard, Table, TableCategory, TableCell} from "./styles/tableStyle"
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
    Option,
    SearchBarWrapper,
    SearchBarInput,
    SearchBarButton
} from "./styles/Form";
import {UpdateBtn, PageBtn} from './styles/objectStyle'
import {API_SERVER} from './dotEnv'


function CustomerList() {

    const [page, setPage] = useState(1);
    const [name, setName] = useState(null);
    const [maxPage, setMaxPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        refetch()
    }, [page, name, maxPage])

    const [state, refetch] = useAsync(getAllCustomer, []);
    const {loading, data: customers, error} = state;
    if (loading) return <div>Loading</div>;
    if (error) return <div>Error</div>;
    if (!customers) return null;

    async function getAllCustomer() {
        const viewCount = 10;

        if (page === 1 && name === null) {
            try {
                const response = await axios.get(
                    API_SERVER + '/customers/count'
                )
                let totalCustomer = response.data[0]['COUNT(id)']
                let pages = Math.ceil(totalCustomer / viewCount);
                setMaxPage(pages)

            } catch (e) {
                console.log(e)
            }
            const response = await axios.get(
                API_SERVER + '/page/' + page
            );

            return response.data;
        }


        if (name !== null) {
            const response = await axios.get(
                API_SERVER + '/search/' + name)
            let len = response.data.length;
            let pages = Math.ceil(len / viewCount);
            setMaxPage(pages)
            return response.data;
        }

        if (page) {
            setCurrentPage(page)
            const response = await axios.get(
                API_SERVER + '/page/' + page
            );
            return response.data;
        }

    }


    function Pagination() {
        let pages = [], i = 0;//データーがない場合の為三項演算;
        while (++i <= maxPage) pages.push(i);

        return (
            <div align={'center'}>
                {pages.map(pageNum => (
                    <PageBtn onClick={
                        () => {
                            setPage(pageNum)
                            getAllCustomer()
                        }
                    } key={pageNum} value={pageNum} clicked={page === pageNum}>{pageNum}</PageBtn>
                ))}
            </div>
        )
    };


    const handleVisible = () => {
        const form = document.querySelector(".customerForm");
        form.classList.toggle("visible")
    }

    function SearchBar() {
        return (
            <SearchBarWrapper>
                <div>
                    <SearchBarInput type="text" className='searchName'/>
                    <SearchBarButton type='button' onClick={() => {
                        const nameValue = document.querySelector(".searchName").value;
                        if (nameValue === '') {
                            return
                        } else {
                            setName(nameValue)
                            getAllCustomer();
                        }
                    }}>検索</SearchBarButton>
                </div>
            </SearchBarWrapper>
        )
    };

    function CustomerAdd() {
        const {register, watch, handleSubmit, errors} = useForm();
        const onSubmit = data => {

            Axios.post(API_SERVER + '/customers/add', {
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
                            <InputText name="name" ref={register({required: true, maxLength: 20})}
                                       placeholder="名前"/>
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
                            {errors.gender && errors.gender.type === "required" &&
                            <AlertMsg>性別を選択してください。</AlertMsg>}

                        </FormRow>
                        <FormRow>
                            <FormLabel htmlFor="address">ADDRESS</FormLabel>
                            <InputText name="address" ref={register({required: true, maxLength: 50})}
                                       placeholder="住所"/>
                            {errors.address && errors.address.type === "required" &&
                            <AlertMsg>住所を入力してください。</AlertMsg>}

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
                                        value: /^\d{2,5}-\d{2,4}-\d{3,4}$/,
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


            <SearchBar/>
            <ButtonAnimation text={"顧客登録"} handleClick={handleVisible}/>

            <CustomerAdd/>
            <Table>
                <tbody>
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
                </tbody>
            </Table>
            {customers.length === 0 ? <div>お客さまの情報がありません。</div> : null}
            <Pagination/>
        </Dashboard>

    );
}

export default CustomerList;


