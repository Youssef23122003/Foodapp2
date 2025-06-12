import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/components/Header/Header'
import axios from 'axios'
import NoData from '../../../Shared/components/NoData/NoData'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import header from '../../../../assets/images/header.png'
import { axiousInstance, CATEGORY_URLS } from '../../../../services/Urls';
import Loader from '../../../Shared/components/Loader/Loader';

export default function CategoriesList() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  const [Load, setLoad] = useState(false);
  const [totalNumOfPages,setTotalNumOfPages] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [statusAdd, setStatusAdd] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState(false);
  const [catId, setCatId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [nameValue,setNameValue] = useState('');
  const [ShowDetails, setShowDetails] = useState(false);

  const [Category, setCatDetails] = useState(null);
  const [Categories, setCategories] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setCatId(id);
    setShow(true);
  };

  const handleCloseAdd = () => setShowAdd(false);

  const handleShowAdd = () => {
    setShowAdd(true);
  };

  const changeStatusForUpdate = (catId) => {
    setStatusUpdate(true);
    setStatusAdd(false);
    setCatId(catId);

    const selectedCategory = Categories.find((cat) => cat.id === catId);
    if (selectedCategory) {
      setValue('name', selectedCategory.name); 
    }
    handleShowAdd();
  };

  const changeStatusForAdd = () => {
    setStatusAdd(true);
    setStatusUpdate(false);
    setValue('name', ''); 
    handleShowAdd();
  };

  const handleCloseDetails = () => setShowDetails(false);

  const handleShowDetails = (id) => {
    setShowDetails(true);
    getSpecificCategory(id);
  };

  const addCategory = async (data) => {
    try {
      setIsLoading(true)
      let response = await axios.post(
       `https://upskilling-egypt.com:3006/api/v1/Category/`,data ,{ headers: { Authorization: localStorage.getItem('token') } });
      toast.success('The category is added');
      getCatgories();
      setIsLoading(false)
      handleCloseAdd();

    } catch (error) {
      console.log(error);
       setIsLoading(false)
    }
  };

  const updateCategory = async (data) => {
    try {
      setIsLoading(true)
      let response = await axiousInstance.put(
        CATEGORY_URLS.UPDATE_CATEGORY(catId),
        data,
        
      );
      toast.success('The category is updated');
      getCatgories();
      setIsLoading(false)
      handleCloseAdd();
    } catch (error) {
      console.log(error);
      toast.error('Failed to update category');
    }
  };

  const getSpecificCategory = async (id) => {
    try {
      setIsLoading(true);
      let response = await axiousInstance.get(
        CATEGORY_URLS.GET_SPECIFIC_GATEGORY(id)
      );
      setCatDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getCatgories = async (pageSize,pageNumber,name) => {
    try {
      setLoad(true)
      let response = await axiousInstance.get(
        CATEGORY_URLS.GET_ALL_GATEGORIES,{params:{pageSize,pageNumber,name}}
      );
      setCurrentPage(pageNumber)
      console.log(response);
      setTotalNumOfPages(Array(response?.data?.totalNumberOfPages).fill().map((_,i)=>i+1))
      setCategories(response?.data?.data);
      setLoad(false)
    } catch (error) {
      console.log(error);
      setLoad(false)
    }
  };

  const deletCategory = async () => {
    try {
      setIsLoading(true)
      let response = await axiousInstance.delete(
        CATEGORY_URLS.DELETE_CATEGORY(catId)
      );
      toast.success('The category is deleted');
      setIsLoading(false)
      handleClose();
      getCatgories();
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  };

  const changeValue = (input)=>{
    setNameValue(input.target.value)
    getCatgories(3,1,input.target.value)
  }

  useEffect(() => {
    getCatgories(3,1,"");
  }, []);

  return (
    <>
      <Header title={'Categories Item'} description={'You can now add your items that any user can order it from the Application and you can edit'} img={header}/>

      <div className='title p-3 d-flex justify-content-between'>
        <h3>Categories Table Details</h3>
        <button onClick={changeStatusForAdd} className='btn btn-success'>Add New Category</button>
      </div>

      <div className='p-4'>
        <input type="text" placeholder='Search By Name' onChange={changeValue} className='form-control' />
     
<div className="table-responsive mt-4 d-none d-md-block">
  {Load ? (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "300px" }}
    >
      <Loader />
    </div>
  ) : (
    <table className="table table-striped table-bordered align-middle text-center">
      <thead className="table-dark">
        <tr>
          <th>Name</th>
          <th>Creation Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {Categories.length > 0 ? (
          Categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.creationDate && new Date(category.creationDate).toLocaleString()}</td>
              <td>
                <div className="dropdown">
                  <button
                    className="btn btn-sm btn-light"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-ellipsis-h"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleShowDetails(category.id)}
                      >
                        <i className="fa fa-eye me-2 text-primary"></i> View
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => changeStatusForUpdate(category.id)}
                      >
                        <i className="fa fa-edit me-2 text-warning"></i> Edit
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleShow(category.id)}
                      >
                        <i className="fa fa-trash me-2 text-danger"></i> Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="py-4 text-center"><NoData /></td>
          </tr>
        )}
      </tbody>
    </table>
  )}
</div>



<div className="d-block d-md-none">
  {Load ? (
    <Loader />
  ) : Categories.length > 0 ? (
    Categories.map((category) => (
      <div key={category.id} className="border rounded p-2 mb-3 shadow-sm">
        <h5 className="mb-1">{category.name}</h5>
        <p className="small text-muted mb-2">
          {category.creationDate && new Date(category.creationDate).toLocaleString()}
        </p>
        <div className="d-flex gap-2">
          <button onClick={() => handleShowDetails(category.id)} className="btn btn-sm btn-outline-primary w-100">View</button>
          <button onClick={() => changeStatusForUpdate(category.id)} className="btn btn-sm btn-outline-warning w-100">Edit</button>
          <button onClick={() => handleShow(category.id)} className="btn btn-sm btn-outline-danger w-100">Delete</button>
        </div>
      </div>
    ))
  ) : (
    <NoData />
  )}
</div>

{Categories.length>0?(<nav aria-label="Page navigation example" className="mt-4">
  <ul className="pagination justify-content-center">
    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
      <button
        className="page-link"
        aria-label="Previous"
        onClick={() => currentPage > 1 && getCatgories(3, currentPage - 1)}
      >
        <span aria-hidden="true">&laquo;</span>
      </button>
    </li>

    {totalNumOfPages.map((page) => (
      <li
        key={page}
        className={`page-item ${currentPage === page ? 'active' : ''}`}
      >
        <button
          onClick={() => getCatgories(3, page)}
          className="page-link"
        >
          {page}
        </button>
      </li>
    ))}

    <li className={`page-item ${currentPage === totalNumOfPages.length ? 'disabled' : ''}`}>
      <button
        className="page-link"
        aria-label="Next"
        onClick={() =>
          currentPage < totalNumOfPages.length && getCatgories(3, currentPage + 1)
        }
      >
        <span aria-hidden="true">&raquo;</span>
      </button>
    </li>
  </ul>
</nav>):''}



      </div>

      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteConfirmation  title={'Delete this Category'}  description={'are you sure you want to delete this Category ? if you are sure just click on delete it'}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="outline-danger"  onClick={deletCategory}>{isLoading?(<><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span></>):'Delete'}</Button>
        </Modal.Footer>
      </Modal>

     
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>{statusAdd ? 'Add Category' : 'Update Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(statusAdd ? addCategory : updateCategory)}>
            <div className="input-group mb-3" id="basic-addon1">
              
              <input
                {...register('name', { required: 'Category is required' })}
                type="text"
                className="form-control"
                placeholder="Category Name"
                aria-label="Category Name"
                aria-describedby="basic-addon1"
              />
            </div>
            {errors.name && <span className='text-danger d-block mb-2'>{errors.name.message}</span>}

              <button className='btn btn-success' disabled={isLoading}>{isLoading ? (<>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {statusAdd ? 'Adding...' : 'Updating...'}
                  </>
                ) : (
                  statusAdd ? 'Add' : 'Update'
                )}
              </button>

          </form>
        </Modal.Body>
      </Modal>

     
      <Modal show={ShowDetails} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Category Details</Modal.Title>
        </Modal.Header>
        {isLoading ? (
          <div className='d-flex justify-content-center align-items-center gap-2 p-4'>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
          </div>
        ) : (
          <Modal.Body>
            <h5><strong>Category ID:</strong> {Category?.id}</h5>
            <h5><strong>Name:</strong> {Category?.name}</h5>
            <h5><strong>Created At:</strong> {Category?.creationDate && new Date(Category?.creationDate).toLocaleString()}</h5>
            <h5><strong>Modified At:</strong> {Category?.modificationDate && new Date(Category?.modificationDate).toLocaleString()}</h5>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


























































































