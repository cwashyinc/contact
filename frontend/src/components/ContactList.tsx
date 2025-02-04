import React, { useState, useEffect } from "react";
import Background from "./Background";
import { Link } from "react-router-dom";
import { fetchContacts } from "../services/api";
import FlatList from "flatlist-react";
import EmptyAnimation from "../assets/empty.json";
import Lottie, { Options } from "react-lottie";
import { Contact } from "../types/types";
import { FaPlus } from "react-icons/fa6";
import RenderPerson from "./Renderperson";
import { RiContactsBookFill } from "react-icons/ri";

const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debounced search term
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try { 
      setIsLoading(true);
      setError(null);
      const data = await fetchContacts();
      setContacts(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error("Failed to load contacts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Memoize filtered contacts to prevent unnecessary recalculations
  const filteredContacts = React.useMemo(() => 
    contacts?.filter((contact: Contact) =>
      contact.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    ),
    [contacts, debouncedSearch]
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

  if (isLoading) {
    return <Background>
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </Background>;
  }

  if (error) {
    return (
      <Background>
        <div className="alert alert-danger" role="alert">
          {error}
          <button 
            className="btn btn-link" 
            onClick={loadContacts}
          >
            Try again
          </button>
        </div>
      </Background>
    );
  }

  return (
    <Background>
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
    </Background>
  );
};

export default ContactList;
