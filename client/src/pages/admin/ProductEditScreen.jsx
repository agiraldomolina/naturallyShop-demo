import {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form, Button} from'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import {toast} from "react-toastify";
import { 
    useUpdateProductMutation, 
    useGetProductDetailsQuery,
    useUploadProductImageMutation
} from '../../slices/productsApiSlices';

export default function ProductEditScreen() {
    const {id: productId} = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState(0);

    console.log(image);

    const { 
        data: product, 
        isLoading, 
        refetch, 
        error
    } = useGetProductDetailsQuery(productId);

    const [updateProduct, {isLoading: loadingUpdate}] = useUpdateProductMutation();
    
    const [uploadProductImage, {isLoading: loadingImage}] = useUploadProductImageMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if(product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setDescription(product.description);
            setCountInStock(product.countInStock);
        }
    }, [product]);

    const submitHandler = async(e) => {
        e.preventDefault();
        const updatedProduct ={
            productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        };
        const res = await updateProduct(updatedProduct);
        refetch();
        if (res.error) {
            toast.error(res.error);
        }else{
            toast.success('Product updated');
            navigate('/admin/product-list');
        }
    };

    const uploadFileHandler = async(e) => {
        const formdata = new FormData();
        formdata.append('image', e.target.files[0]);
        try {
            const res = await uploadProductImage(formdata).unwrap();
            toast.success(res.message);
            const imagePath = res.image.replace(/\\/g, '/');
            setImage(imagePath);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }
    
  return <>
    {loadingImage && <Loader/>}
    <Link 
        to='/admin/product-list'
        className='btn btn-light my-3'
    >
        Go Back
    </Link>
    <FormContainer>
        <h1>Edit Product</h1>
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
                    controlId="price"
                    className='my-2'
                >
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder='Enter price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Form.Group>

               <Form.Group
                    controlId="image"
                    className='my-2'
                >
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='Enter image'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                    <Form.Control
                        type='file'
                        label='Choose file'
                        onChange={uploadFileHandler}
                    >

                    </Form.Control>
                </Form.Group>
                
                <Form.Group
                    controlId="brand"
                    className='my-2'
                >
                    <Form.Label>Brand</Form.Label>B                    <Form.Control
                        type="text"
                        placeholder='Enter Brand'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </Form.Group>
                <Form.Group
                    controlId="countInStock"
                    className='my-2'
                >
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder='Enter Count In Stock'
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                    />
                </Form.Group>
                <Form.Group
                    controlId="category"
                    className='my-2'
                >
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='Enter category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </Form.Group>
                <Form.Group
                    controlId="description"
                    className='my-2'
                >
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='Enter category'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
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
