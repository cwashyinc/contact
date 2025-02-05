import { Contact } from "../types/types";
import { useNavigate } from "react-router-dom";
import { GiPencil } from "react-icons/gi";
import { IoTrashBin } from "react-icons/io5";
import React from "react";
import { deleteContact } from "../services/api";
import styles from "./styles/contactform.module.css";

const RenderPerson = (contact: Contact) => {
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      await deleteContact(id);
      window.location.reload();
    }
  };

  const handleView = (id: number) => {
    navigate(`/view/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div onClick={() => handleView(contact.id)} className={`col-md-4 mb-4 ${styles.pressable}`} key={contact.id}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{contact.name}</h5>
          <p className="card-text">
            <i className="bi bi-geo-alt"></i> {contact.address}
          </p>
          <p className="card-text">
            <i className="bi bi-telephone"></i> {contact.phone}
          </p>
          <div className="d-flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(contact.id);
              }}
              className="btn btn-sm btn-warning"
            >
              <GiPencil /> Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(contact.id);
              }}
              className="btn btn-sm btn-danger"
            >
              <IoTrashBin /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderPerson;
