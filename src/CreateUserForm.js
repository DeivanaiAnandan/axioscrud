// src/CreateUserForm.js
import React, { useState,  useEffect } from 'react';

const CreateUserForm = ({ onCreateUser, editedUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Set initial form values when editing
    if (editedUser) {
      setName(editedUser.name || '');
      setEmail(editedUser.email || '');
    }
  }, [editedUser]);

  const handleCreateUser = () => {
    // Validate the form data (you can add more validation logic)
    if (name.trim() === '' || email.trim() === '') {
      alert('Name and email are required!');
      return;
    }

   
    onCreateUser({ name, email });

    
    setName('');
    setEmail('');
  };

  return (
    <div className="create-user-form">
      <h2>{editedUser ? 'Edit User' : 'Create User'}</h2>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      <label htmlFor="email">Email:</label>
      <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleCreateUser}>{editedUser ? 'Update' : 'Create'}</button>
    </div>
  );
};

export default CreateUserForm;
