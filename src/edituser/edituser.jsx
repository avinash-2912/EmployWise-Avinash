import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiRequest from "../lib/apiRequest";
import "./edituser.scss";
import Notification from "../notification/notification";


function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiRequest.get(`/api/users/${id}`);
        setUser(res.data.data);
      } catch (err) {
        setError("Failed to fetch user data.");
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await apiRequest.put(`/api/users/${id}`, {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });

      console.log(res);

      if (res.status === 200) {
        setSuccessMessage("User updated successfully!");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      setError("Failed to update user.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseNotification = () => {
    setSuccessMessage(""); 
  };

  return (
    <div className="editUser">
      <h1>Edit User</h1>
      {error && <span className="error">{error}</span>}
      <Notification message={successMessage} onClose={handleCloseNotification} /> {/* Notification component */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          value={user.first_name || ""}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="last_name"
          value={user.last_name || ""}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={user.email || ""}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update User"}
        </button>
      </form>
    </div>
  );
}

export default EditUser;