import React, { useEffect, useState } from "react";
import header from "../../../../assets/images/header.png";
import Header from "../../../Shared/components/Header/Header";
import Loader from "../../../Shared/components/Loader/Loader";
import { axiousInstance, baseImgURL, USERS_URLS } from "../../../../services/Urls";
import NoData from "../../../Shared/components/NoData/NoData";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import DeleteConfirmation from "../../../Shared/components/DeleteConfirmation/DeleteConfirmation";
import defaultImage from "../../../../assets/images/user-profile-icon-vector-avatar-600nw-2247726673.webp";

export default function UsersList() {
  const [Users, setUsers] = useState([]);
  const [User, setUser] = useState([]);
  const [totalNumOfPages, setTotalNumOfPages] = useState([]);
  const [show, setShow] = useState(false);
  const [Load, setLoad] = useState(false);
  const [ShowDetails, setShowDetails] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [CountryValue, setCountryValue] = useState("");
  const [groupValue, setGroupValue] = useState([]);
  const [userId, setUserId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleCloseDetails = () => setShowDetails(false);

  const handleShowDetails = (id) => {
    setShowDetails(true);
    getSpecificUser(id);
  };

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setUserId(id);
    setShow(true);
  };

  const getAllUsers = async (pageSize, pageNumber, userName, email, country, groups) => {
    try {
      setLoad(true);
      let response = await axiousInstance.get(USERS_URLS.GET_ALL_USERS, {
        params: { pageSize, pageNumber, userName, email, country, groups },
      });
      setTotalNumOfPages(Array(response?.data?.totalNumberOfPages).fill().map((_, i) => i + 1));
      setUsers(response.data.data);
      setLoad(false);
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  const getSpecificUser = async (userId) => {
    try {
      setIsLoading(true);
      let response = await axiousInstance.get(USERS_URLS.GET_SPECIFIC_USER(userId));
      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const deleteUser = async () => {
    try {
      setIsLoading(true);
      let response = await axiousInstance.delete(USERS_URLS.DELETE_SPECIFIC_USER(userId));
      toast.success(response.data.message);
      handleClose();
      getAllUsers(5, currentPage, nameValue, emailValue, CountryValue, groupValue);
      setIsLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      handleClose();
      setIsLoading(false);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    getAllUsers(5, page, nameValue, emailValue, CountryValue, groupValue);
  };

  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getAllUsers(5, 1, input.target.value, emailValue, CountryValue, groupValue);
  };

  const getEmailValue = (input) => {
    setEmailValue(input.target.value);
    getAllUsers(5, 1, nameValue, input.target.value, CountryValue, groupValue);
  };

  const getCountryValue = (input) => {
    setCountryValue(input.target.value);
    getAllUsers(5, 1, nameValue, emailValue, input.target.value, groupValue);
  };

  const getGroupValue = (input) => {
    setGroupValue(input.target.value);
    getAllUsers(5, 1, nameValue, emailValue, CountryValue, input.target.value);
  };

  useEffect(() => {
    getAllUsers(5, 1, "", "", "", []);
  }, []);

  const getPaginationRange = () => {
    const totalPages = totalNumOfPages.length;
    const rangeSize = 5;
    let start = Math.max(currentPage - Math.floor(rangeSize / 2), 1);
    let end = Math.min(start + rangeSize - 1, totalPages);
    if (end - start + 1 < rangeSize) {
      start = Math.max(end - rangeSize + 1, 1);
    }
    return totalNumOfPages.slice(start - 1, end);
  };

  return (
    <>
      <Header
        title={"Users List"}
        description={"You can now add your items that any user can order it from the Application and you can edit"}
        img={header}
      />
      <div className="title p-3 d-flex justify-content-between">
        <h3>Users Table Details</h3>
      </div>
      <div className="p-4">
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <input
              onChange={getNameValue}
              type="text"
              placeholder="Search By Name"
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <input
              onChange={getEmailValue}
              type="text"
              placeholder="Search By Email"
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <input
              onChange={getCountryValue}
              type="text"
              placeholder="Search By Country"
              className="form-control"
            />
          </div>

          <div className="col-md-3">
            <select onChange={getGroupValue} className="form-select">
              <option value="">Filter by Role</option>
              <option value="1">Super Admin</option>
              <option value="2">System User</option>
            </select>
          </div>
        </div>

       <div className="table-responsive d-none d-md-block position-relative">
  {Load && (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
      <Loader />
    </div>
  )}

  {!Load && (
    <table className="table table-striped align-middle">
      <thead>
        <tr>
          <th>Id</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Image</th>
          <th>Country</th>
          <th>Phone Number</th>
          <th>Actions</th>
        </tr>
      </thead>

      {Users.length > 0 ? (
        <tbody>
          {Users.map((user) => (
            <tr key={user?.id}>
              <td>{user?.id}</td>
              <td>{user?.userName}</td>
              <td>{user?.email}</td>
              <td>
                <img
                  src={user?.imagePath ? `${baseImgURL}${user.imagePath}` : defaultImage}
                  alt="user"
                  style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }}
                />
              </td>
              <td>{user?.country}</td>
              <td>{user?.phoneNumber}</td>
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
                      <button onClick={() => handleShowDetails(user?.id)} className="dropdown-item">
                        <i className="fa fa-eye me-2 text-primary"></i> View
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item">
                        <i className="fa fa-edit me-2 text-warning"></i> Edit
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleShow(user?.id)} className="dropdown-item">
                        <i className="fa fa-trash me-2 text-danger"></i> Delete
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
            <td colSpan="7" className="text-center py-4">
              <NoData />
            </td>
          </tr>
        </tbody>
      )}
    </table>
  )}
</div>

        <div className="d-block d-md-none">
          {Load ? (       
                 <Loader />    
          ) : Users.length > 0 ? (
            Users.map((user) => (
              <div key={user?.id} className="card mb-3 shadow-sm">
                <div className="card-body d-flex flex-column flex-md-row align-items-center gap-3">
                  <img
                    src={user?.imagePath ? `${baseImgURL}${user.imagePath}` : defaultImage}
                    alt="user"
                    style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                  />
                  <div className="flex-grow-1 text-center text-md-start">
                    <h5 className="mb-1">{user?.userName}</h5>
                    <p className="text-muted mb-1">{user?.email}</p>
                    <small className="text-muted">
                      {user?.country} | {user?.phoneNumber}
                    </small>
                  </div>
                  <div className="d-flex gap-2 mt-2 mt-md-0">
                    <button onClick={() => handleShowDetails(user?.id)} className="btn btn-sm btn-outline-primary">
                      View
                    </button>
                    <button className="btn btn-sm btn-outline-warning">Edit</button>
                    <button onClick={() => handleShow(user?.id)} className="btn btn-sm btn-outline-danger">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <NoData />
          )}
        </div>
          {Users.length>0?(<nav aria-label="Page navigation example">
          <ul className="pagination d-flex flex-wrap">
            <li className={`page-item ${currentPage === 1 && "disabled"}`}> 
              <button
                className="page-link"
                onClick={() => handlePageClick(Math.max(currentPage - 1, 1))}
                aria-label="Previous"
              >
                &laquo;
              </button>
            </li>

            {getPaginationRange().map((page) => (
              <li
                key={page}
                className={`page-item ${page === currentPage && "active"}`}
                onClick={() => handlePageClick(page)}
              >
                <button className="page-link">{page}</button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalNumOfPages.length && "disabled"}`}>
              <button
                className="page-link"
                onClick={() => handlePageClick(Math.min(currentPage + 1, totalNumOfPages.length))}
                aria-label="Next"
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>):''}
        
      </div>

   
     <Modal show={ShowDetails} onHide={handleCloseDetails} centered>
  <Modal.Header closeButton>
    <Modal.Title className="d-flex align-items-center gap-2">
      <i className="fas fa-user text-primary"></i> User Details
    </Modal.Title>
  </Modal.Header>

  {isLoading ? (
    <div className="d-flex justify-content-center align-items-center gap-2 p-4">
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Loading...
    </div>
  ) : (
    <Modal.Body>
      <div className="text-center mb-3">
        <img
          className="img-fluid rounded-circle border"
          style={{ width: '120px', height: '120px', objectFit: 'cover' }}
          src={User?.imagePath ? `${baseImgURL}${User.imagePath}` : defaultImage}
          alt="User"
        />
      </div>

      <div className="list-group">
        <div className="list-group-item d-flex align-items-center gap-2">
          <i className="fas fa-id-badge text-secondary"></i> <strong>ID:</strong> {User?.id}
        </div>
        <div className="list-group-item d-flex align-items-center gap-2">
          <i className="fas fa-user text-primary"></i> <strong>Name:</strong> {User?.userName}
        </div>
        <div className="list-group-item d-flex align-items-center gap-2">
          <i className="fas fa-envelope text-danger"></i> <strong>Email:</strong> {User?.email}
        </div>
        <div className="list-group-item d-flex align-items-center gap-2">
          <i className="fas fa-globe text-success"></i> <strong>Country:</strong> {User?.country}
        </div>
        <div className="list-group-item d-flex align-items-center gap-2">
          <i className="fas fa-phone text-warning"></i> <strong>Phone:</strong> {User?.phoneNumber}
        </div>
        <div className="list-group-item d-flex align-items-center gap-2">
          <i className="fas fa-user-shield text-info"></i> <strong>Role:</strong> {User?.group?.name}
        </div>
        <div className="list-group-item d-flex align-items-center gap-2">
          <i className="fas fa-calendar-plus text-success"></i> <strong>Created:</strong> {User?.creationDate && new Date(User.creationDate).toLocaleString()}
        </div>
        <div className="list-group-item d-flex align-items-center gap-2">
          <i className="fas fa-calendar-check text-success"></i> <strong>Updated:</strong> {User?.modificationDate && new Date(User.modificationDate).toLocaleString()}
        </div>
      </div>
    </Modal.Body>
  )}

  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseDetails}>
      Close
    </Button>
  </Modal.Footer>
</Modal>


   
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <DeleteConfirmation  title={'Delete this User'}  description={'are you sure you want to delete this User ? if you are sure just click on delete it'}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="outline-danger" onClick={deleteUser}>
            {isLoading ? (
              <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Deleting...</>
            ) : (
              "Delete"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
