import React, {useState} from "react";
import {
    DeleteBtn,
    DeleteLockBtn,
    UpdateBtn,
    BackBtn
} from './styles/objectStyle'
import Axios from "axios";


function PetDelete(props) {
    const petId = props.petId;
    const [Del, setDel] = useState(false);
    const [Msg, setMsg] = useState(null);


    const handleDelCheck = () => {
        setDel(!Del);
        console.log(Del)
    }
    const deleteSubmit = data => {
        if (Del === false) {
            setMsg('削除できません。')
            return
        }
        Axios.post('http://localhost:5000/api/pets/' + petId + '/delete', {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                formData: data
            }
        }).then(response => {
            setMsg("削除成功");
            window.location.reload(false);

        }).catch(error => {
            console.log('failed', error);
            setMsg(error);
        })
    };
    return (
        <div>
            <div>{Msg}</div>
            <DeleteLockBtn bgcolor={Del} type='button'
                           onClick={handleDelCheck}>{Del === false ? '削除不可' : '削除可能'}</DeleteLockBtn>
            <DeleteBtn type="button" onClick={deleteSubmit}>削除</DeleteBtn>
        </div>

    )
}


export default PetDelete;
