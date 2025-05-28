import React, { useActionState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { axiousInstance, baseImgURL, CATEGORY_URLS, RECIPES_URL, TAGS_URL } from '../../../../services/Urls'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { use } from 'react'


export default function RecipeData() {
  const [statusUpdate, setStatusUpdate] = useState(false);
  const [recipeId,setRecipeId] = useState(false)
  let location = useLocation()
  console.log(location.state); 
  const recipe = location.state
   
  let {register,formState:{errors},handleSubmit,reset,setValue} = useForm()
  let [tags,setTags] = useState([])
  let [Categories,setCategories] = useState([])
  let[isLoading,setIsLoading] = useState(false)
  let navigate = useNavigate()

  const appendToFormData = (recipe)=> {
    const formData = new FormData
    formData.append('name',recipe.name)
    formData.append('price',recipe.price)
    formData.append('description',recipe.description)
    formData.append('tagId',recipe.tagId)
    formData.append('categoriesIds',recipe.categoriesIds)
    formData.append('recipeImage',recipe.recipeImage[0])
    return formData
  }

  const addRecipe = async (recipe)=>{
    const formDataRecipe = appendToFormData(recipe)
    try{
      setIsLoading(true)
      console.log(formDataRecipe);
      let response = await axiousInstance.post(RECIPES_URL.ADD_RECIPE,formDataRecipe)
      console.log(response);
      toast.success(response.data.message)
      navigate('/dashboard/recipes')
      setIsLoading(false)
    }
    catch(error){
      setIsLoading(false)
        console.log(error);
        
    }
  }

  const updateRecipe = async (recipe)=>{
    const formDataRecipe = appendToFormData(recipe)
    try{
      setIsLoading(true)
      console.log(formDataRecipe);
      let response = await axiousInstance.put(RECIPES_URL.UPDATE_Recipe(recipeId),formDataRecipe)
      console.log(response);
      toast.success('recipe is updated')
      setStatusUpdate(false)
      navigate('/dashboard/recipes')
      setIsLoading(false)
    }
    catch(error){
      setIsLoading(false)
        console.log(error);
        
    }
  }
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


  const getCatgories = async () => {
    try {
      let response = await axiousInstance.get(
        CATEGORY_URLS.GET_ALL_GATEGORIES
      );
      console.log(response.data.data);
      setCategories(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{getAllTags()},[])
  useEffect(()=>{getCatgories()},[])
 useEffect(() => {
  if (
    recipe &&
    tags.length > 0 &&
    Categories.length > 0
  ) {
    setValue('name', recipe.name);
    setValue('description', recipe.description);
    setValue('price', recipe.price);
    setValue('tagId', recipe.tag.id);
    setValue('categoriesIds', recipe.category[0].id);
    setValue('recipeImage',recipe.imagePath);
    setRecipeId(recipe.id);
    setStatusUpdate(true);
  }
}, [recipe, tags, Categories, setValue]);
  return (
    <>
     <div className="container recipe-header p-4">
      <div className="row">
        <div className="col-md-8 d-flex align-items-center">
          <div>
            <h5>Fill the Recipes !</h5>
            <p>you can now fill the meals easily using the table and form , <br /> click here and sill it with the table !</p>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-end align-items-center">
          <button className="btn btn-success">
            All Recipes <i className="fa fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>

<div className="container pt-4 recipes-data">
  <div className="row justify-content-center align-items-center">
    <div className="col-md-8">
     <form onSubmit={statusUpdate ? handleSubmit(updateRecipe) : handleSubmit(addRecipe)}>
        <div className="input-group mb-3">
          <input
            {...register('name',{required:'the recipe name is reqired'})}
            type="text"
            className="form-control"
            placeholder="Recipe Name"
            aria-label="Recipe Name"
            aria-describedby="basic-addon1"
          />
        </div>
        {errors.name && <p className='text-danger'>{errors.name.message}</p>}

        <select   {...register('tagId',{required:'Tag Is Required'})} className="form-select mb-3" aria-label="Default select example">
          {tags.map((tag)=>(<option value={tag.id}>{tag.name}</option>))}
        </select>
        {errors.tagId && <p className='text-danger'>{errors.tagId.message}</p>}

        <div className="input-group mb-3">
          <input
           {...register('price',{required:'Price is reqired'})}
            type="number"
            className="form-control border-end-0"
            placeholder="Recipe Price"
            aria-label="Recipe Price"
            aria-describedby="basic-addon1"
          />
          <div className="input-group-append">
            <label className="input-group-text" htmlFor="inputGroupSelect02">EGP</label>
          </div>
        </div>
        {errors.price && <p className='text-danger'>{errors.price.message}</p>}

        <select {...register('categoriesIds',{required:'Categoey is required'})} className="form-select mb-3" aria-label="Default select example">
          {Categories.map((category)=>(<option value={category.id}>{category.name}</option>))}

        </select>
        {errors.categoriesIds && <p className='text-danger'>{errors.categoriesIds.message}</p>}

        <div className="mb-3">
          <textarea
           {...register('description',{required:'Describtion is required'})}
            className="form-control"
            rows="5"
            placeholder="Description"
          ></textarea>
        </div>
        {errors.describtion && <p className='text-danger'>{errors.describtion.message}</p>}

   <div className="input-group mb-3 img-iput">
  <div
    className="w-100 flex-column d-flex p-4 text-center"
    style={{
      borderRadius:"4px",
      border: "4px dotted green",
    }}
  >
    <i className="fa fa-upload" aria-hidden="true"></i>

    <input
      type="file"
      hidden
      id="imageUpload"
      {...register("recipeImage")}
    />
    <label
      htmlFor="imageUpload"
      className="form-label flex flex-column"
      style={{ cursor: "pointer" }}
    >
      Drag & Drop or <strong className="text-success">Choose an Item Image</strong> to Upload
    </label>
  </div>
</div>

        <div className="btns-recipes d-flex justify-content-end py-5 mt-3">
          <a className="btn me-4 btn-outline-success text-black px-3 py-2" href="/dashboard/recipes">Cancel</a>
          {statusUpdate?(<button className="btn bg-success text-white px-3 py-2" type="submit">{isLoading?( <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
           ):('update')}</button>):(<button className="btn bg-success text-white px-3 py-2" type="submit">{isLoading?( <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
           ):('save')}</button>)}
          
        </div>
      </form>
    </div>
  </div>
</div>

      
    </>
  )
}




















































































 {/* {preview && (
          <div className="mt-3">
            <img src={preview} alt="Preview" className="img-thumbnail" style={{ maxWidth: '50px' }} />
          </div>
        )} */}