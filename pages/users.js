import Head from 'next/head'
import { useContext } from 'react';
import { DataContext } from '../store/GlobalState';
import Link from 'next/link';
import { useRouter } from "next/router";

const Users = () => {
    const {state, dispatch} = useContext(DataContext);
    const {users, auth, modal} = state;

    const router = useRouter();

    if(!auth.user) return null;
    return (
        <div className='table-responsive container' style={{marginBottom: '20vh'}}>
            <Head>
                <title>Users</title>
            </Head>
            <h3 className='text-secondary text-uppercase'>Users</h3>
            <table className='table w-100'>
                <thead>
                <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map((user, index) => (
                        <tr key={user._id}>
                            <th>{index + 1}</th>
                            <th>{user._id}</th>
                            <th>
                                <img src={user.avatar} alt={user.avatar} style={{width:'30px', height:'30px', overflow: 'hidden', objectFit: 'cover'}}/>
                            </th>
                            <th>{user.name}</th>
                            <th>{user.email}</th>
                            <th>
                                {
                                    user.role === 'ADMIN'
                                    ? user.root ? <i className='fas fa-check text-success'>Root</i>
                                                : <i className='fas fa-check text-success'/>
                                    : <i className='fas fa-times text-danger'/>
                                }
                            </th>
                            <th>
                                <Link href={
                                    auth.user.role === 'ADMIN' && auth.user.email !== user.email
                                    ? `/edit_user/${user._id}` : '#!'
                                }>
                                    <a><i className='fas fa-edit text-info mr-2' title='edit' style={{marginRight: '10px'}}/></a>
                                </Link>
                                {
                                    auth.user.role === 'ADMIN' && auth.user.email !== user.email
                                    ? <i className='fas fa-trash-alt text-danger ml-2' title='remove' data-bs-toggle="modal" data-bs-target="#exampleModal" style={{cursor: 'pointer'}} onClick={() => dispatch({
                                        type: "ADD_MODAL",
                                        payload: [{data: users, id: user._id, title: user.name, type: 'ADD_USERS'}]
                                        })}/>
                                    : <i className='fas fa-trash-alt text-danger ml-2' title='remove' style={{cursor: 'pointer'}}/>
                                }
                            </th>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default Users