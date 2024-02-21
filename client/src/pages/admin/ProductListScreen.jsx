import { useState } from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Table, Button, Row, Col, Modal} from 'react-bootstrap';
import {FaEdit, FaTrash} from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import { 
    useGetProductsQuery, 
    useCreateProductMutation,
    useDeleteProductMutation,
 } from '../../slices/productsApiSlices';
import { toast} from "react-toastify";

export default function ProductsListScreen() {
    const { pageNumber } = useParams();

    const [showModal, setShowModal] = useState(false);
    const [productId, setProductId] = useState(null);

    const {data, isLoading, error, refetch} = useGetProductsQuery({pageNumber});

    const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation();

    const [deleteProduct, {isLoading: loadingDelete}] = useDeleteProductMutation();

    const deleteHandler = async (id) => {
        setShowModal(false);
        try {
            await deleteProduct(id);
            toast.success('Product deleted');
            refetch();               
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }

        setProductId(null);
    };

    const createProductHandler = async () => {
        try {
            await createProduct();
            refetch()
            toast.success('New product created successfully');
        } catch (error) {
          toast.error(error?.data?.message || error.message);
        }
    };

  return <>
    <Row className='align-items-center'>
        <Col>
            <h1>Products</h1>
        </Col>
        <Col className='text-end'>
            <Button
                className='btn-sm m-3'
                onClick={createProductHandler}
            >
                <FaEdit/> Create Product
            </Button>
        </Col>
    </Row>

    {loadingCreate && <Loader/>}

    {loadingDelete && <Loader/>}

    {isLoading ? 
        <Loader/> 
    :error ? 
        <Message variant='danger'>{error}</Message>
        :(
            <>
                <Table
                    striped
                    hover
                    responsive
                    className='table-sm'
                >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>BRAND</th>
                            <th>CATEGORY</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.products.map((product,index)=>(
                            <tr key={index}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.brand}</td>
                                <td>{product.category}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button 
                                            variant='light' 
                                            className='btn-sm'
                                        >
                                            <FaEdit/>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={()=>{
                                            setShowModal(true);
                                            setProductId(`${product._id}`)
                                            }
                                        }
                                    >
                                        <FaTrash style={{color:'white'}}/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate
                    style={{background:'green'}}
                    pages={data.pages}
                    page={data.page}
                    isAdmin={true}
                />
            </>
        )}

    <Modal
        show={showModal}
        onHide={()=>setShowModal(false)}
        backdrop='static'
        keyboard={false}
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Are you sure you want to delete this product?</p>
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
                onClick={()=>deleteHandler(productId)}
            >
                Delete
            </Button>
        </Modal.Footer>
    </Modal>         
  </>
}
