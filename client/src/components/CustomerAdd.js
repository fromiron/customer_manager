import React from 'react'
import {useForm} from "react-hook-form";


export default function CustomerAdd() {
    const {register, watch, handleSubmit, errors} = useForm();
    const onSubmit = data => console.log(data);
    const moreDetail = watch("moreDetail");


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">名前</label>
                <input name="name" ref={register({required: true, maxLength: 20})}/>
                {errors.name && errors.name.type === "required" && <div>名前を入力してください。</div>}
            </div>
            <div>
                <label htmlFor="age">年齢</label>
                <input name="age" type="number" ref={register({required: true, min: 10, max: 150})}/>
                {errors.age && errors.age.type === "required" && <div>年齢を入力してください。</div>}
            </div>
            <div>
                <label htmlFor="gender">性別</label>
                <select name="gender" ref={register({required: true})}>
                    <option value="0">男性</option>
                    <option value="1">女性</option>
                    <option value="2">Attack Helicopter</option>
                    <option value="3">その他</option>
                </select>
                {errors.gender && errors.gender.type === "required" && <div>性別を選択してください。</div>}

            </div>
            <div>
                <label htmlFor="address">住所</label>
                <input name="address" ref={register({required: true, maxLength: 50})}/>
                {errors.address && errors.address.type === "required" && <div>住所を入力してください。</div>}

            </div>
            <div>
                <label htmlFor="email">email</label>
                <input
                    id="email"
                    name="email"
                    ref={register({
                        required: "メールを入力してください。",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "正しいメールを入力してください。"
                        }
                    })}
                    type="email"
                />
                {errors.email && <div role="alert">{errors.email.message}</div>}
            </div>
            <div>
                <label htmlFor="tel">電話</label>
                <input
                    id="tel"
                    name="tel"
                    ref={register({
                        required: "電話番号を入力してください。",
                        pattern: {
                            value: /^\d{2,3}-\d{3,4}-\d{4}$/,
                            message: "正しい電話番号を入力してください。"
                        }
                    })}
                    type="tel"
                />
                {errors.tel && <div role="alert">{errors.tel.message}</div>}</div>
            <div>
                <label htmlFor="moreDetail">More</label>
                <input name="moreDetail" type="checkbox" ref={register}/>
            </div>


            {moreDetail && (
                <div>
                    <label>NOTE</label>
                    <textarea name="note" ref={register}/>
                </div>
            )}

            <input type="submit" value="登録"/>
        </form>
    );
}