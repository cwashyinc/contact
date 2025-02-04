import * as React from "react";
import Background from "./Background";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { deleteContact, getContactById } from "../services/api";
import { useState } from "react";
import { useEffect } from "react";
import { Contact } from "../types/types";
import { GiPencil } from "react-icons/gi";
import { IoTrashBin } from "react-icons/io5";
function ViewContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact | null>(null);
  useEffect(() => {
    if (id) {
      try {
        getContactById(parseInt(id)).then((contact) => setContact(contact));
      } catch (error: any) {
        console.log({ error: error.response.data.detail });
        alert(error.response.data.detail);
      }
    }
  }, [id]);
  if (!contact) {
    return (
      <Background>
        <Link to="/" style={{ textDecoration: "none" }}>
          <MdKeyboardBackspace size={30} /> Back to Contacts
        </Link>
        <div className="text-center mt-5 text-danger fs-3">
          Contact not found
        </div>
      </Background>
    );
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      await deleteContact(id);
      navigate("/");
    }
  };
  return (
    <Background>
      <Link to="/" style={{ textDecoration: "none" }}>
        <MdKeyboardBackspace size={30} /> Back to Contacts
      </Link>
      <div className="card mt-4">
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
    </Background>
  );
}

export default ViewContact;
