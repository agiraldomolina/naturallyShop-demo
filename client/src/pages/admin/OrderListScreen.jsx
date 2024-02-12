import {LinkContainer} from 'react-router-bootstrap';
import {Table, Button} from 'react-bootstrap';
import {FaTimes} from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

export default function OrderListScreen() {
    const {data:orders, isLoading, error} = useGetOrdersQuery();
    


  return <>
    <h1>Orders</h1>
    {isLoading? <Loader/>:error?<Message variant='dander'>{error}</Message>:(
      <Table striped  hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order,index)=>(
            <tr key={index}>
              <td>{order._id}</td>
              <td>{order.user && order.user.name}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>{order.totalPrice}</td>
              <td>
                {order.isPaid? (
                  new Date(order.paidAt).toLocaleString()
                ):(
                  <FaTimes style={{color: 'red'}}/>
                )}
              </td>
              <td>
                {order.isDelivered? (
                  new Date(order.deliveredAt).toLocaleString()
                ):(
                  <FaTimes style={{color: 'red'}}/>
                )}
              </td>
              <td>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button variant='light' size='sm'>Details</Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </>
}
