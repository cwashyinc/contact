import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import ViewContact from "./components/ViewContact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/add" element={<ContactForm />} />
        <Route path="/edit/:id" element={<ContactForm />} />
        <Route path="/view/:id" element={<ViewContact />} />
      </Routes>
    </Router>
  );
}

export default App;
