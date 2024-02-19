import {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form, Button} from'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import {toast} from "react-toastify";
import { 
    useUpdateUserMutation, 
    useGetUsersDetailsQuery
} from '../../slices/usersApiSlice';

export default function UserEditScreen() {
    const {id:userId} = useParams();
    console.log(userId);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    console.log(name);

    const { 
        data: user, 
        isLoading, 
        refetch, 
        error
    } = useGetUsersDetailsQuery(userId);

    const [
        updateUser, 
        {isLoading: loadingUpdate}
    ] = useUpdateUserMutation(userId);

    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

    const submitHandler = async(e) => {
        e.preventDefault();
        console.log(userId);
        try {
            await updateUser( {
                userId,
                name,
                email,
                isAdmin
            });
            toast.success('User updated');
            refetch();
            navigate('/admin/user-list');
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };
    
  return <>
    <Link 
        to='/admin/user-list'
        className='btn btn-light my-3'
    >
        Go Back
    </Link>
    <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader/>}

        {isLoading? <Loader/>: error ? <Message variant='danger'>{error}</Message>:(
            <Form onSubmit={submitHandler}>
                <Form.Group
                    controlId="name"
                    className='my-2'
                >
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group
                    controlId="email"
                    className='my-2'
                >
                    <Form.Label>email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group
                    controlId="isAdmin"
                    className='my-2'
                >
                    <Form.Check
                        type='checkBox'
                        label='Is Admin'
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                    >
                    </Form.Check>
                </Form.Group>

               
                <Button
                    type='submit'
                    variant='primary'
                    className='my-2'
                >
                    Update
                </Button>
            </Form>
        )}
    </FormContainer>
  </>
}
