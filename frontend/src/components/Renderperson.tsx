import { Contact } from "../types/types";
import { Link } from "react-router-dom";
import { GiPencil } from "react-icons/gi";
import { IoTrashBin } from "react-icons/io5";
import React from "react";
import { deleteContact } from "../services/api";

const RenderPerson = (contact: Contact) => {
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      await deleteContact(id);
      window.location.reload();
    //   loadContacts();
    }
  };
  return (
    <div className="col-md-4 mb-4" key={contact.id}>
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
            <Link to={`/edit/${contact.id}`} className="btn btn-sm btn-warning">
              <GiPencil /> Edit
            </Link>
            <button
              onClick={() => handleDelete(contact.id)}
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
