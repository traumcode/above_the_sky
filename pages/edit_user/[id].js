import Head from 'next/head';
import {useContext, useEffect, useState} from "react";
import {DataContext} from "../../store/GlobalState";
import {useRouter} from "next/router";
import {patchData} from "../../utils/fetchData";
import {updateItem} from "../../store/Actions";

const EditUser = () => {
    const router = useRouter();
    const {id} = router.query

    const{ state, dispatch } = useContext(DataContext);
    const { auth, users } = state;

    const [editUser, setEditUser] = useState([])
    const [checkAdmin, setCheckAdmin] = useState(false);
    const [num, setNum] = useState(0);

    useEffect(() => {
        users.forEach(user => {
            if(user._id === id) {
                setEditUser(user)
                setCheckAdmin(user.role === 'ADMIN')
            }
        })
    }, [users])

    const handleCheck = () => {
        setCheckAdmin(!checkAdmin)
        setNum(num + 1)
    }

    const handleSubmit = () => {
        let role = checkAdmin ? 'ADMIN' : 'USER'
        if(num % 2 !== 0) {
            dispatch({type: "NOTIFY", payload: {loading: true}})
            patchData(`user/${editUser._id}`, {role}, auth.token)
                .then(res => {
                    if(res.error) return dispatch({type: 'NOTIFY', payload: {error: res.error}})

                    dispatch(updateItem(users, editUser.id, {
                        ...editUser, role
                    }, 'ADD_USERS'))

                    return dispatch({type: 'NOTIFY', payload: {success: res.message}})
                })
        }
    }

    return (
        <div className='profile_page edit_user my-3 container'>
            <Head>
                <title>Edit User</title>
            </Head>

            <div>
                <button className='btn btn-dark back' onClick={() => router.back()}>
                    <i className='fas fa-long-arrow-alt-left'/> Go Back
                </button>
            </div>
            <div className="col-md-4 max-auto my-4">
                <h2 className='text-uppercase text-secondary'>EDIT USER</h2>

                <div className="form-group">
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' defaultValue={editUser.name} disabled/>
                </div>
                <div className="form-group">
                    <label htmlFor='email'>Email</label>
                    <input type='text' id='email' defaultValue={editUser.email} disabled/>
                </div>
                <div className="form-group">
                    <input type='checkbox' id='isAdmin' checked={checkAdmin}
                           style={{width: '20px', height: '20px'}} onChange={handleCheck}/>
                    <label htmlFor='isAdmin' style={{transform: 'translate(4px, -3px)'}}>isAdmin</label>
                </div>
                <button className='btn btn-dark' style={{marginLeft: '10px'}} onClick={handleSubmit}>Update</button>
            </div>
        </div>
    )
}

export default EditUser