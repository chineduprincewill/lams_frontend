import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../../common/PageTitle';
import { FiUsers } from 'react-icons/fi';
import { HiPlus, HiTrash } from 'react-icons/hi';
import { AuthContext } from '../../../context/AuthContext';
import { tokenExpired } from '../../../apis/functions';
import { deleteUser, fetchUsers } from '../../../apis/userActions';
import { AiOutlineEdit } from 'react-icons/ai';
import NotificationLoader from '../../../common/NotificationLoader';
import RecordsTable from '../../../common/RecordsTable';
import NewUsers from '../components/forms/NewUsers';
import EditUser from '../components/forms/EditUser';
import { ToastContainer, toast } from 'react-toastify';

const Users = () => {

    const { token, user, logout, record, refreshRecord } = useContext(AuthContext);

    const [users, setUsers] = useState(null);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);
    const [showmodal, setShowmodal] = useState(false);
    const [editmodal, setEditmodal] = useState(false);
    const [usertoedit, setUsertoedit] = useState();
    const [success, setSuccess] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const columns = [
        {
            name: "",
            selector: (row) => row?.fullname,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className="flex space-x-4 items-center py-2">
                    <div className='grid'>
                        <div className='text-[16px] text-gray-600 capitalize font-extralight'>{row?.fullname}</div>
                        <div className='text-xs text-gray-500'>{row?.email}</div>
                    </div>
                </div>
            )
        },
        {
            name: "",
            selector: (row) => row?.role,
            filterable: true,
            sortable: true,
            cell: (row) => (
                <div className='text-[16px] text-gray-600 font-extralight'>{row?.role}</div>
            )
        },
        {
          name: "",
          button: true,
          cell: (row) => (
            <div className='flex space-x-2 items-center mt-1'>
                <AiOutlineEdit 
                    size={15} 
                    className='cursor-pointer mt-1 text-blue-600' 
                    title='Edit users'
                    onClick={() => userEdit(row)}
                />
                <HiTrash 
                    size={15} 
                    className='cursor-pointer mt-1 text-red-600' 
                    title='Delete users'
                    onClick={() => userDelete(row)}
                />
            </div>
          ),
        },
    ];

    const icon = <FiUsers size={20} className="text-[#005072]" />;

    if(tokenExpired(users)){
        logout();
    }

    const userEdit = (obj) => {
        setUsertoedit(obj);
        setEditmodal(true);
    }

    const userDelete = (obj) => {
        if(window.confirm(`Are you sure you want to delete ${obj?.fullname} account?`)){
            const data = { id: obj?.id }
            deleteUser(token, data, setSuccess, setError, setDeleting);
        }
    }

    if(error !== null){
        toast.error(JSON.stringify(error));
        setError(null);
    }

    if(success !== null){
        toast.success(success?.success);
        setSuccess(null)
        refreshRecord(Date.now());
    }

    useEffect(() => {
        fetchUsers(token, setUsers, setError, setFetching);
    }, [record])

    return (
        <div className='w-full'>
            <div className='w-full flex justify-between items-center'>
                <PageTitle icon={icon} />
            {
                (user && user?.role === 'admin') &&
                    <button 
                        className='w-[100px] flex justify-center py-2 bg-[#a6ce39] hover:bg-[#96bb2f] text-[#005072] shadow-xl'
                        onClick={() => setShowmodal(true)}
                    >
                        <HiPlus size={20} />
                    </button>
            }
            </div>
            <ToastContainer />
            <div className='w-full bg-white my-4 shadow-xl'>
            {
                fetching ? <NotificationLoader /> : 
                    (users !== null && users?.users.length > 0) && <RecordsTable columns={columns} data={users?.users} />
            }
            </div>
            { showmodal && <NewUsers setShowmodal={setShowmodal} /> }
            { editmodal && <EditUser usr={usertoedit} setEditmodal={setEditmodal} /> }
            { deleting && <NotificationLoader /> }
        </div>
    )
}

export default Users