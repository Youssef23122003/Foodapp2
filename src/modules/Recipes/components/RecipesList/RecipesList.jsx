import React, { useEffect, useState } from 'react';
import Header from '../../../Shared/components/Header/Header';
import header from '../../../../assets/images/header.png';
import { axiousInstance, baseImgURL, RECIPES_URL } from '../../../../services/Urls';
import NoData from '../../../Shared/components/NoData/NoData';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation';
import Modal from 'react-bootstrap/Modal'; 
import Button from 'react-bootstrap/Button'; 
import { toast } from 'react-toastify';
import Loader from '../../../Shared/components/Loader/Loader';

export default function RecipesList() {

  let [Recipes, setRecipes] = useState([]);
  const [recipeId, setRecipeId] = useState(0);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [Load, setLoad] = useState(false);
   const [Recipe, setRecipeDetails] = useState(null);
  const [ShowDetails, setShowDetails] = useState(false);
  const handleClose = () => setShow(false);


  const handleShow = (id) => {
    console.log('tamam');
    setRecipeId(id);
    setShow(true);
  };

  const handleCloseDetails = () => setShowDetails(false);

  const handleShowDetails = (id) => {
    setShowDetails(true);
    getSpecificRecipe(id);
  };

  const goToUpdate = (recipe)=>{
    console.log(recipe);
    navigate('/dashboard/recipe-data',{state:recipe})
  }

  let navigate = useNavigate();

  const getRecipes = async (pageSize, pageNumber) => {
    try {
      setLoad(true)
      let response = await axiousInstance.get(
        RECIPES_URL.GET_ALL_RECIPES, { params: { pageSize, pageNumber } }
      );
      console.log(response.data.data);
      setRecipes(response?.data?.data);
      setLoad(false)
    } catch (error) {
      console.log(error);
      setLoad(false)
    }
  };

  const getSpecificRecipe = async (id) => {
      try {
        setIsLoading(true);
        let response = await axiousInstance.get(
          RECIPES_URL.GET_SPECIFIC_RECIPE(id)
        );
        console.log(response.data);
        setRecipeDetails(response.data);
        setIsLoading(false);

      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

  const deleteRecipe = async () => {
    try {
      setIsLoading(true);
      let response = await axiousInstance.delete(RECIPES_URL.DELETE_Recipe(recipeId));
      console.log(response);
      toast.success('Recipe is deleted');
      getRecipes();
      setIsLoading(false);
      handleClose();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => { getRecipes(5, 1);  }, []);

  return (
    <>
      <Header
        title={'Recipes'}
        description={'You can now add your items that any user can order it from the Application and you can edit'}
        img={header}
      />
      <div className='title p-3 d-flex justify-content-between'>
        <h3>Recipes Table Details</h3>
        <button onClick={() => navigate('/dashboard/recipe-data')} className='btn btn-success'>Add New Item</button>
      </div>

     <div className='p-4'>
  <div className="table-responsive">
    <table className='table table-striped table-hover align-middle text-center'>
      <thead>
        <tr className='bg-danger text-white'>
          <th>Name</th>
          <th>Image</th>
          <th>Description</th>
          <th>Price</th>
          <th>Tag</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>

      {Load ? (
  <Loader />
) : (
  Recipes.length > 0 ? (
    <tbody>
      {Recipes.map((recipe,index) => (
       <tr
          key={recipe.id}
        >
          <td>{recipe?.name}</td>
          <td>
            <img
              src={`${baseImgURL}${recipe?.imagePath}`}
              alt="recipe"
              style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }}
            />
          </td>
          <td style={{
            maxWidth: '200px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {recipe.description}
          </td>
          <td>{recipe.price}</td>
          <td>{recipe?.tag?.name}</td>
          <td>{recipe?.category[0]?.name}</td>
          <td>
            <div className="dropdown">
              <button
                className="btn btn-sm btn-light border"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-ellipsis-h"></i>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button onClick={() => handleShowDetails(recipe.id)} className="dropdown-item">
                    <i className="fa fa-eye me-2 text-primary"></i>View
                  </button>
                </li>
                <li>
                  <button onClick={() => goToUpdate(recipe)} className="dropdown-item">
                    <i className="fa fa-edit me-2 text-warning"></i>Edit
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleShow(recipe?.id)}>
                    <i className="fa fa-trash me-2 text-danger"></i>Delete
                  </button>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  ) : (
    <tbody>
      <tr>
        <td colSpan="7">
          <NoData />
        </td>
      </tr>
    </tbody>
  )
)}

    </table>
  </div>
</div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteConfirmation deletedItem={'Recipe'} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="outline-danger" onClick={deleteRecipe}>
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              </>
            ) : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>

      
      <Modal show={ShowDetails} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Recipe Details</Modal.Title>
        </Modal.Header>
        {isLoading ? (
          <div className='d-flex justify-content-center align-items-center gap-2 p-4'>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
          </div>
        ) : (
          <Modal.Body className='d-flex flex-column justify-content-center align-items-center'>
            <img className='w-100' src={`${baseImgURL}${Recipe?.imagePath}`} alt="" srcset="" />
            <div className='mt-2 text-start w-100'>
              <p><strong>Recipe ID:</strong> {Recipe?.id}</p>
              <p><strong>Name:</strong> {Recipe?.name}</p>
              <p><strong>Describtion:</strong> {Recipe?.description}</p>
              <p><strong>Price:</strong> {Recipe?.price}</p>
              <p><strong>Tag:</strong> {Recipe?.tag.name}</p>
              <p><strong>Category:</strong> {Recipe?.category[0].name}</p>
             <p><strong>Creation Date:</strong> {Recipe?.creationDate && new Date(Recipe.creationDate).toLocaleString()}</p>
             <p><strong>Modification Date:</strong> {Recipe?.modificationDate && new Date(Recipe.modificationDate).toLocaleString()}</p>
            </div>
            
            
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>Close</Button>
        </Modal.Footer>
      </Modal>
    


    </>
  );
}

