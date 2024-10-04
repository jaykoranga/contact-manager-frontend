import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; 
const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
  const [editContactId, setEditContactId] = useState(null);
  const [editContactData, setEditContactData] = useState({ name: '', email: '', phone: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(response.data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }
  };

  // Create a new contact
  const handleCreateContact = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/contacts`,
        newContact,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchContacts(); // Refresh contact list
      setNewContact({ name: '', email: '', phone: '' }); // Reset form
    } catch (err) {
      console.error('Error creating contact:', err);
    }
  };

  // Handle editing a contact
  const handleEditContact = (contact) => {
    setEditContactId(contact._id);
    setEditContactData(contact);
  };

  // Update a contact
  const handleUpdateContact = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/contacts/${editContactId}`,
        editContactData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchContacts();
      setEditContactId(null); // Exit edit mode
    } catch (err) {
      console.error('Error updating contact:', err);
    }
  };

  // Delete a contact
  const handleDeleteContact = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/contacts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchContacts(); // Refresh contact list
    } catch (err) {
      console.error('Error deleting contact:', err);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Contact Manager Dashboard</h2>

      <div className="contacts-section">
        <h3>All Contacts</h3>
        <ul className="contacts-list">
          {contacts.map(contact => (
            <li key={contact._id} className="contact-item">
              {contact.name} - {contact.email} - {contact.phone}
              <button onClick={() => handleEditContact(contact)} className="edit-button">Edit</button>
              <button onClick={() => handleDeleteContact(contact._id)} className="delete-button">Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="create-contact-section">
        <h3>Create New Contact</h3>
        <input
          type="text"
          placeholder="Name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={newContact.phone}
          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
        />
        <button onClick={handleCreateContact} className="add-contact-button">Add Contact</button>
      </div>

      {editContactId && (
        <div className="edit-contact-section">
          <h3>Edit Contact</h3>
          <input
            type="text"
            placeholder="Name"
            value={editContactData.name}
            onChange={(e) => setEditContactData({ ...editContactData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={editContactData.email}
            onChange={(e) => setEditContactData({ ...editContactData, email: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={editContactData.phone}
            onChange={(e) => setEditContactData({ ...editContactData, phone: e.target.value })}
          />
          <button onClick={handleUpdateContact} className="update-contact-button">Update Contact</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;