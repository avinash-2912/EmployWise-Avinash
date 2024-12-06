import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../lib/apiRequest";
import "./userlist.scss";
import Notification from "../notification/notification";

function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 
  const navigate = useNavigate();

  const fetchUsers = async (page) => {
    try {
      const res = await apiRequest.get(`/api/users?page=${page}`);
      setUsers(res.data.data);
      setTotalPages(res.data.total_pages);
    } catch (err) {
      setError("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleEdit = (user) => {
    navigate(`/edit/${user.id}`);
  };

  const handleDelete = async (id) => {
    try {
      await apiRequest.delete(`/api/users/${id}`);
      fetchUsers(currentPage);
      setSuccessMessage("User deleted successfully!"); 
    } catch (err) {
      setError("Failed to delete user.");
    }
  };

  const handleCloseNotification = () => {
    setSuccessMessage("");
  };

  return (
    <div className="userList">
      <h1>User List</h1>
      {error && <span className="error">{error}</span>}
      <Notification message={successMessage} onClose={handleCloseNotification} /> 
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
              </td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>
                <button onClick={() => handleEdit(user)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(user.id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default UserList;