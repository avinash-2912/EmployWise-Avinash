import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "../src/login/login"
import UserList from "../src/userlist/userlist";
import EditUser from "../src/edituser/edituser";
import ProtectedRoute from "./protectedRoute"

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditUser />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;