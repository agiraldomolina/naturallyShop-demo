import { useState } from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Table, Button, Modal} from 'react-bootstrap';
import {FaTrash, FaTimes, FaEdit, FaCheck} from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {toast} from "react-toastify";
import { 
  useGetUsersQuery,
  useDeleteUserMutation,
 } from '../../slices/usersApiSlice';

export default function UserListScreen() {
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);

  const {data:users, refetch, isLoading, error} = useGetUsersQuery();

  const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation();
    
  const deleteHandler = async (id) => {
    setShowModal(false);
        try {
           const res= await deleteUser(id);
            if (res.error && res.error.status === 400) toast.error(res.error.data.message);
            refetch();               
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
        setUserId(null);
  }

  return <>
    <h1>users</h1>
    {loadingDelete && <Loader/>}
    {isLoading? <Loader/>:error?<Message variant='dander'>{error}</Message>:(
      <Table striped  hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user,index)=>(
            <tr key={index}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>
                <a href={`mailto:${user.email}`}>
                  {user.email}
                </a>
              </td>
              <td>
                {user.isAdmin ? (
                  <FaCheck style={{color: 'green'}}/>
                ):(
                  <FaTimes style={{color: 'red'}}/>
                )}
              </td>
              <td>
                <LinkContainer to={`admin/user/${user._id}/edit`}>
                  <Button variant='light' size='sm'>
                    <FaEdit/>
                  </Button>
                </LinkContainer>
                <Button
                  variant='danger'
                  className='btn-sm'
                  onClick={() => {
                    setShowModal(true);
                    setUserId(`${user._id}`)
                  }}
                >
                  <FaTrash style={{color: 'white'}}/>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}

    <Modal
        show={showModal}
        onHide={()=>setShowModal(false)}
        backdrop='static'
        keyboard={false}
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Are you sure you want to delete this user?</p>
        </Modal.Body>
        <Modal.Footer>
            <Button
                variant='secondary'
                onClick={()=>setShowModal(false)}
            >
                Cancel
            </Button>
            <Button
                variant='danger'
                onClick={()=>deleteHandler(userId)}
            >
                Delete
            </Button>
        </Modal.Footer>
    </Modal> 

  </>
}
