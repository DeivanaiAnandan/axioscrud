import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import CreateUserForm from "./CreateUserForm";

const App = () => {
  const [users, setUsers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  //     setUsers(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users", {
        params: {
          _limit: 5,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);

    setEditingUser(userToEdit);

    setShowCreateForm(true);

    console.log(`Edit user with ID ${id}`);
  };
  const handleDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    console.log(`Delete user with ID ${id}`);
  };
  const handleCreateUser = (newUser) => {
    if (editingUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUser.id ? { ...newUser, id: user.id } : user
        )
      );

      setEditingUser(null);
    } else {
      setUsers((prevUsers) => [
        ...prevUsers,
        { ...newUser, id: prevUsers.length + 1 },
      ]);
    }

    setShowCreateForm(false);
  };

  const handleCreateFormToggle = () => {
    setEditingUser(null);
    setShowCreateForm((prevState) => !prevState);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>User List</h1>
        <button className="create-button" onClick={handleCreateFormToggle}>
          {showCreateForm ? "Cancel" : "Create User"}
        </button>
      </div>
      {showCreateForm && (
        <CreateUserForm
          editedUser={editingUser}
          onCreateUser={handleCreateUser}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
