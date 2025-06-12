import React, { useState } from 'react'
import header from '../../../../assets/images/header.png'
import Header from '../../../Shared/components/Header/Header'
import { axiousInstance, baseImgURL, FAVS_URL } from '../../../../services/Urls';
import { useEffect } from 'react';
import NoData from '../../../Shared/components/NoData/NoData';
import Loader from '../../../Shared/components/Loader/Loader';
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation';
import Modal from 'react-bootstrap/Modal'; 
import Button from 'react-bootstrap/Button'; 
import { toast } from 'react-toastify';

export default function FavList() {
const [isLoading, setIsLoading] = useState(false);
let [Favs,setFavs] = useState([])
  const [Load, setLoad] = useState(false);
let [favId,setFavId] = useState(null)
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);

  const handleShow = (id) => {
    console.log('tamam');
    setFavId(id);
    setShow(true);
  };


const deleteFromFavs = async()=>{
  try{
    setLoad(true)
    let response = await axiousInstance.delete(FAVS_URL.DELETE_FROM_FAVS(favId))
    console.log(response);
    toast.success('your favourite item is deleted')
    setLoad(false)
    handleClose()
    getAllFavs()
  }
  catch(error){
    console.log(error);  
    setLoad(false)
  }
}

const getAllFavs = async ()=>{
      try{
        setIsLoading(true)
        let response = await axiousInstance.get(FAVS_URL.GET_ALL_FAVS)
        console.log(response.data.data);
        setFavs(response.data.data)
        setIsLoading(false)
      }
      catch(error){
          console.log(error);
          setIsLoading(false)
      }
    }

    useEffect(()=>{getAllFavs()},[])

  return (
    <>
      <Header title={'Favourite List'} description={'You can now add your items that any user can order it from the Application and you can edit'} img={header}/>
      <div className="container mt-5">
        <div className="row">
          {isLoading ? (
  <Loader />
) : (
  <>
    {Favs.length > 0 ? (
      <div className="row">
        {Favs.map((fav) => (
          <div className="col-md-3 col-sm-6 mb-4" key={fav?.id || fav?.recipe?.id}>
  <div className="card h-100 shadow position-relative border-0">
    <button
      onClick={() => handleShow(fav?.id)}
      className="btn position-absolute top-0 end-0 m-2 p-0 text-danger"
      style={{ background: 'transparent', border: 'none' }}
    >
      <i className="fa fa-heart fs-3"></i>
    </button>
    
    <img
      src={`${baseImgURL}${fav?.recipe?.imagePath}`}
      alt={fav?.recipe?.name || "Recipe Image"}
      className="card-img-top"
      style={{ objectFit: 'cover', height: '200px' }}
    />

    <div className="card-body">
      <h5 className="card-title mb-2">{fav?.recipe?.name || "No Name"}</h5>
      <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
        {fav?.recipe?.description || "No Description"}
      </p>
    </div>
  </div>
</div>

        ))}
      </div>
    ) : (
      <NoData />
    )}
  </>
)}

        </div>
      </div>



       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <DeleteConfirmation  title={'Delete this Favourite item'}  description={'are you sure you want to delete this Favourite itrem ? if you are sure just click on delete it'}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button onClick={deleteFromFavs} variant="outline-danger" >
            {Load ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              </>
            ) : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
