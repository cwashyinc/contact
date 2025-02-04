import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";
import { createContact, updateContact, fetchContacts } from '../services/api';
import { Contact } from '../types/types';
import styles from "./styles/background.module.css";

const ContactForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contact, setContact] = useState<Contact>({
    id: 0,
    name: '',
    address: '',
    phone: ''
  });

  useEffect(() => {
    if (id) {
      const loadContact = async () => {
        const data = await fetchContacts();
        const foundContact = data.find((c: Contact) => c.id === parseInt(id));
        if (foundContact) setContact(foundContact);
      };
      loadContact();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (id) {
        await updateContact(parseInt(id), contact);
      } else {
        await createContact(contact);
      }
      navigate('/');
    } catch (error) {
      console.error('Failed to save contact:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  return (
    <div className={`p-4 ${styles.background}`}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <MdKeyboardBackspace size={30} /> Back to Contacts
      </Link>
      <h2 className="text-white">{id ? 'Edit Contact' : 'Add New Contact'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label text-white">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={contact.name}
            placeholder="Enter Name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-white">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={contact.address}
            placeholder="Enter Address"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-white">Phone</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={contact.phone}
            placeholder="Enter Phone"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Update' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;