import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchContacts } from "../services/api";
import FlatList from "flatlist-react";
import EmptyAnimation from "../assets/empty.json";
import Lottie, { Options } from "react-lottie";
import { Contact } from "../types/types";
import { FaPlus } from "react-icons/fa6";
import styles from "./styles/contactlist.module.css";
import RenderPerson from "./Renderperson";
import { RiContactsBookFill } from "react-icons/ri";

const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const data = await fetchContacts();
      setContacts(data);
    } catch (error: any) {
      console.error("Failed to load contacts:", error);
      alert(error.message);
    }
  };


  const filteredContacts: Contact[] = contacts?.filter((contact: Contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const emptyList = () => {
    const defaultOptions: Options = {
      loop: true,
      autoplay: true,
      animationData: EmptyAnimation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <Lottie options={defaultOptions} style={{ width: 500, height: 500 }} />
        <h2 className="text-white">No contacts found</h2>
      </div>
    );
  };

  return (
    <div className={`p-4 ${styles.background}`}>
      <div className="d-flex justify-content-between mb-4">
        <h2 className="d-flex align-items-center gap-2 text-white">
          <RiContactsBookFill /> Contacts
        </h2>
        <Link
          to="/add"
          style={{
            backgroundColor: "#CAFFFB",
            color: "#000",
            borderColor: "#000",
          }}
          className="btn btn-primary"
        >
          <FaPlus /> Add Contact
        </Link>
      </div>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="row">
        <FlatList
          list={filteredContacts}
          renderItem={RenderPerson}
          renderWhenEmpty={emptyList}
        />
      </div>
    </div>
  );
};

export default ContactList;
