import React, { useContext, useEffect, useState } from 'react';
import Header from '../../../Shared/components/Header/Header';
import header from '../../../../assets/images/header.png';
import { axiousInstance, baseImgURL, CATEGORY_URLS, FAVS_URL, RECIPES_URL, TAGS_URL } from '../../../../services/Urls';
import NoData from '../../../Shared/components/NoData/NoData';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation';
import Modal from 'react-bootstrap/Modal'; 
import Button from 'react-bootstrap/Button'; 
import { toast } from 'react-toastify';
import Loader from '../../../Shared/components/Loader/Loader';
import dish from '../../../../assets/images/blank-white-dish-on-wood-260nw-428131927.webp'
import { AuthContext } from '../../../../context/AuthContext';

export default function RecipesList() {
  let {loginData} = useContext(AuthContext)
  let [Recipes, setRecipes] = useState([]);
  const [recipeId, setRecipeId] = useState(0);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let [tags,setTags] = useState([])
  let [Categories,setCategories] = useState([])
  const [totalNumOfPages,setTotalNumOfPages] = useState([])
  const [Load, setLoad] = useState(false);
  const [Recipe, setRecipeDetails] = useState(null);
  const [nameValue,setNameValue] = useState("");
  const [favid,setFavId] = useState({})
  const [catValue,setCatValue] = useState("");
  const [tagValue,setTagValue] = useState("");
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

  const getAllTags = async ()=>{
      try{
        let response = await axiousInstance.get(TAGS_URL.GET_ALL_TAGS)
        console.log(response.data);
        setTags(response.data)
      }
      catch(error){
          console.log(error);
          
      }
    }

     const getCatgories = async (pageSize,pageNumber) => {
        try {
          let response = await axiousInstance.get(
            CATEGORY_URLS.GET_ALL_GATEGORIES,{params:{pageSize,pageNumber}}
          );
          console.log(response.data.data);
          setCategories(response?.data?.data);
        } catch (error) {
          console.log(error);
        }
      };

  const goToUpdate = (recipe)=>{
    console.log(recipe);
    navigate('/dashboard/recipe-data',{state:recipe})
  }

  let navigate = useNavigate();

  const getRecipes = async (pageSize, pageNumber,name,tagId,categoryId) => {
    try {
      setLoad(true)
      let response = await axiousInstance.get(
        RECIPES_URL.GET_ALL_RECIPES, { params: { pageSize, pageNumber ,name ,tagId,categoryId} }
      );
      console.log(response.data.data);
      setTotalNumOfPages(Array(response?.data?.totalNumberOfPages).fill().map((_,i)=>i+1))
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
    } 
    catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const addToFavs = async (fav) => {
    try {
      console.log(fav);
      let response = await axiousInstance.post(FAVS_URL.ADD_TO_FAVS,{"recipeId":fav});
      console.log(response);
      navigate('/dashboard/favs')
      toast.success('Recipe Added to Favourites');
    } 
    catch (error) {
      console.log(error);

    }
  };

  const getNameValue = (input)=> {
    console.log(input.target.value);
    setNameValue(input.target.value)
    getRecipes(5,1,input.target.value,tagValue,catValue)
  }

  const getTagValue = (input)=> {
    console.log(input.target.value);
    setTagValue(input.target.value)
    getRecipes(5,1,nameValue,input.target.value,catValue)
  }

  const getCatValue = (input)=> {
    console.log(input.target.value);
    setCatValue(input.target.value)
    getRecipes(5,1,nameValue,tagValue,input.target.value)
  }


  useEffect(() => { getRecipes(5, 1);  }, []);
  useEffect(()=>{getAllTags()},[])
  useEffect(()=>{getCatgories(10,1)},[])

  return (
    <>
      <Header
        title={'Recipes'}
        description={'You can now add your items that any user can order it from the Application and you can edit'}
        img={header}
      />
      <div className='title p-3 d-flex justify-content-between'>
        <h3>Recipes Table Details</h3>
        {loginData?.userGroup !== 'SystemUser'?<button onClick={() => navigate('/dashboard/recipe-data')} className='btn btn-success'>Add New Recipe</button>:''}
        
      </div>

     <div className='p-4'>
      <div className="row">
        <div className="col-md-6">
             <input type="text" placeholder='Search By Name' onChange={getNameValue} className='form-control' />
        </div>
        <div className="col-md-3">
            <select onChange={getTagValue} className="form-select mb-3" aria-label="Default select example">
              {tags.map((tag)=>(<option value={tag.id}>{tag.name}</option>))}
            </select>
        </div>
        <div className="col-md-3">
            <select onChange={getCatValue} className="form-select mb-3" aria-label="Default select example">
              {Categories.map((category)=>(<option value={category.id}>{category.name}</option>))}
             </select>
        </div>
      </div>
<div className="table-responsive d-none d-md-block">
  {Load ? (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "300px" }}
    >
      <Loader />
    </div>
  ) : (
    <table className="table table-bordered align-middle text-center shadow-sm">
      <thead className="table-dark">
        <tr>
          <th>Name</th>
          <th>Image</th>
          <th>Description</th>
          <th>Price</th>
          <th>Tag</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {Recipes.length > 0 ? (
          Recipes.map((recipe) => (
            <tr key={recipe.id}>
              <td className="fw-semibold">{recipe?.name}</td>
              <td>
                <img
                  src={recipe?.imagePath ? `${baseImgURL}${recipe?.imagePath}` : dish}
                  alt={recipe?.name}
                  className="rounded shadow-sm"
                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                />
              </td>
              <td
                className="text-truncate"
                style={{ maxWidth: '150px' }}
                title={recipe?.description}
              >
                {recipe?.description}
              </td>
              <td className="fw-bold text-success">{recipe?.price} $</td>
              <td><span className="badge bg-info text-dark">{recipe?.tag?.name || '-'}</span></td>
              <td><span className="badge bg-secondary">{recipe?.category?.[0]?.name || '-'}</span></td>
              <td>
                <div className="dropdown">
                  <button className="btn btn-sm btn-outline-dark" data-bs-toggle="dropdown">
                    <i className="fa fa-ellipsis-v"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    {loginData?.userGroup !== 'SystemUser' && (
                      <li>
                        <button onClick={() => goToUpdate(recipe)} className="dropdown-item">
                          <i className="fa fa-edit me-2 text-warning"></i>Edit
                        </button>
                      </li>
                    )}
                    {loginData?.userGroup === 'SystemUser' && (
                      <li>
                        <button onClick={() => addToFavs(recipe.id)} className="dropdown-item text-danger">
                          <i className="fa fa-heart me-2"></i> Add to Favorites
                        </button>
                      </li>
                    )}
                    <li>
                      <button onClick={() => handleShowDetails(recipe.id)} className="dropdown-item">
                        <i className="fa fa-eye me-2 text-primary"></i>View
                      </button>
                    </li>
                    {loginData?.userGroup !== 'SystemUser' && (
                      <li>
                        <button onClick={() => handleShow(recipe?.id)} className="dropdown-item">
                          <i className="fa fa-trash me-2 text-danger"></i>Delete
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="py-4 text-center"><NoData /></td>
          </tr>
        )}
      </tbody>
    </table>
  )}
</div>


<div className="d-block d-md-none">
  {Load ? (
    <Loader />
  ) : Recipes.length > 0 ? (
    Recipes.map((recipe) => (
      <div key={recipe.id} className="border rounded p-2 mb-3 shadow-sm">
        <div className="d-flex align-items-center mb-2">
          <img
            src={recipe?.imagePath ? `${baseImgURL}${recipe?.imagePath}` : dish}
            alt={recipe?.name}
            className="rounded"
            style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '10px' }}
          />
          <h5 className="mb-0">{recipe?.name}</h5>
        </div>
        <p className="small text-muted">{recipe?.description}</p>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge bg-success">{recipe?.price} $</span>
          <span className="badge bg-info">{recipe?.tag?.name || '-'}</span>
          <span className="badge bg-secondary">{recipe?.category?.[0]?.name || '-'}</span>
        </div>
        <div className="d-flex gap-2">
          <button onClick={() => handleShowDetails(recipe.id)} className="btn btn-sm btn-outline-primary w-100">View</button>
          {loginData?.userGroup === 'SystemUser' && (
            <button onClick={() => addToFavs(recipe.id)} className="btn btn-sm btn-outline-danger w-100">Fav</button>
          )}
        </div>
      </div>
    ))
  ) : (
    <NoData />
  )}
</div>

{Recipes.length > 0 ? (
  <nav aria-label="Page navigation" className="mt-4">
    <ul className="pagination justify-content-center">
      <li className="page-item">
        <button className="page-link" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
      {totalNumOfPages.map((page) => (
        <li key={page} className="page-item">
          <button onClick={() => getRecipes(5, page)} className="page-link">{page}</button>
        </li>
      ))}
      <li className="page-item">
        <button className="page-link" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  </nav>
):''}


</div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteConfirmation  title={'Delete this Recipe'}  description={'are you sure you want to delete this Recipe ? if you are sure just click on delete it'}/>
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

<Modal show={ShowDetails} onHide={handleCloseDetails} size="lg" centered>
  <Modal.Header closeButton className="border-0">
    <Modal.Title className="fw-bold fs-4 text-dark">
      <i className="fa-solid fa-utensils me-2 text-warning"></i> Recipe Details
    </Modal.Title>
  </Modal.Header>

  {isLoading ? (
    <div className="d-flex justify-content-center align-items-center gap-2 p-5">
      <span className="spinner-border text-warning" role="status" aria-hidden="true"></span>
      <span className="fw-semibold text-muted">Loading Recipe...</span>
    </div>
  ) : (
    <Modal.Body className="px-4 pb-4 pt-2">
      {/* Image */}
      <div className="text-center mb-4">
        <img
          className="rounded shadow border"
          src={Recipe?.imagePath ? `${baseImgURL}${Recipe?.imagePath}` : dish}
          alt={Recipe?.name}
          style={{
            width: "100%",
            maxWidth: "350px",
            height: "auto",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
      </div>

      {/* Recipe Info */}
      <div className="d-flex flex-column gap-3">
        <p className="mb-0">
          <i className="fa-solid fa-id-badge me-2 text-info"></i>
          <strong>ID:</strong> <span className="text-muted">{Recipe?.id}</span>
        </p>
        <p className="mb-0">
          <i className="fa-solid fa-signature me-2 text-warning"></i>
          <strong>Name:</strong> <span className="text-muted">{Recipe?.name}</span>
        </p>
        <p className="mb-0">
          <i className="fa-solid fa-align-left me-2 text-secondary"></i>
          <strong>Description:</strong> <span className="text-muted">{Recipe?.description}</span>
        </p>
        <p className="mb-0">
          <i className="fa-solid fa-dollar-sign me-2 text-success"></i>
          <strong>Price:</strong> <span className="text-muted">{Recipe?.price} $</span>
        </p>
        <p className="mb-0">
          <i className="fa-solid fa-tags me-2 text-danger"></i>
          <strong>Tag:</strong> <span className="text-muted">{Recipe?.tag?.name}</span>
        </p>
        <p className="mb-0">
          <i className="fa-solid fa-list me-2 text-purple" style={{ color: "#6f42c1" }}></i>
          <strong>Category:</strong> <span className="text-muted">{Recipe?.category[0]?.name}</span>
        </p>
        <p className="mb-0">
          <i className="fa-solid fa-calendar-plus me-2 text-primary"></i>
          <strong>Creation:</strong> <span className="text-muted">{Recipe?.creationDate && new Date(Recipe.creationDate).toLocaleString()}</span>
        </p>
        <p className="mb-0">
          <i className="fa-solid fa-calendar-pen me-2 text-primary"></i>
          <strong>Modified:</strong> <span className="text-muted">{Recipe?.modificationDate && new Date(Recipe.modificationDate).toLocaleString()}</span>
        </p>
      </div>
    </Modal.Body>
  )}

  <Modal.Footer className="border-0  px-4 pb-4">
    <Button variant="outline-secondary" onClick={handleCloseDetails}>
      <i className="fa-solid fa-xmark me-2"></i> Close
    </Button>
    
  </Modal.Footer>
</Modal>

    


    </>
  );
}





































// <div className="table-responsive">
//     <table className='table table-striped table-hover align-middle text-center'>
//       <thead>
//         <tr className='bg-danger text-white'>
//           <th>Name</th>
//           <th>Image</th>
//           <th>Description</th>
//           <th>Price</th>
//           <th>Tag</th>
//           <th>Category</th>
//           <th>Actions</th>
//         </tr>
//       </thead>

//       {Load ? (
//   <Loader />
// ) : (
//   Recipes.length > 0 ? (
//     <tbody>
//       {Recipes.map((recipe,index) => (
//        <tr
//           key={recipe.id}
//         >
//           <td>{recipe?.name}</td>
//           <td>
//             <img
//               src={recipe?.imagePath?`${baseImgURL}${recipe?.imagePath}`:dish}
//               alt="recipe"
//               style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }}
//             />
//           </td>
//           <td style={{
//             maxWidth: '200px',
//             whiteSpace: 'nowrap',
//             overflow: 'hidden',
//             textOverflow: 'ellipsis'
//           }}>
//             {recipe.description}
//           </td>
//           <td>{recipe.price}</td>
//           <td>{recipe?.tag?.name}</td>
//           <td>{recipe?.category[0]?.name}</td>
//           <td>
//             <div className="dropdown">
//               <button
//                 className="btn btn-sm btn-light border"
//                 type="button"
//                 data-bs-toggle="dropdown"
//                 aria-expanded="false"
//               >
//                 <i className="fa fa-ellipsis-h"></i>
//               </button>
//               <ul className="dropdown-menu">
//                 {loginData?.userGroup !== 'SystemUser'? <li>
//                   <button onClick={() => goToUpdate(recipe)} className="dropdown-item">
//                     <i className="fa fa-edit me-2 text-warning"></i>Edit
//                   </button>
//                 </li>:''}
//                 {loginData?.userGroup == 'SystemUser'? <li >
//                   <button onClick={()=>{addToFavs(recipe.id)}}  className="dropdown-item text-danger">
//                    <i class="fa fa-heart" aria-hidden="true"></i> Add To Favourites
//                   </button>
//                 </li>:''}
//                 <li>
//                   <button onClick={() => handleShowDetails(recipe.id)} className="dropdown-item">
//                     <i className="fa fa-eye me-2 text-primary"></i>View
//                   </button>
//                 </li>
//                 {loginData?.userGroup !== 'SystemUser'?<li>
//                   <button className="dropdown-item" onClick={() => handleShow(recipe?.id)}>
//                     <i className="fa fa-trash me-2 text-danger"></i>Delete
//                   </button>
//                 </li>:''}
//               </ul>
//             </div>
//           </td>
//         </tr>
//       ))}
//        <nav aria-label="Page navigation example">
//               <ul className="pagination">
//                 <li className="page-item">
//                   <a className="page-link" aria-label="Previous">
//                     <span aria-hidden="true">&laquo;</span>
//                   </a>
//                 </li> 
//                  {totalNumOfPages.map((page)=>(<li onClick={()=>{getRecipes(5,page)}} className="page-item act"><a className="page-link">{page}</a></li>))}
//                 <li className="page-item">
//                   <a className="page-link" aria-label="Next">
//                     <span aria-hidden="true">&raquo;</span>
//                   </a>
//                 </li>
//               </ul>
//                 </nav>
//     </tbody>
//   ) : (
//     <tbody>
//       <tr>
//         <td colSpan="7">
//           <NoData />
//         </td>
//       </tr>
//     </tbody>
//   )
// )}

//     </table>
//   </div> 