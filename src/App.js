import { useState, useEffect } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { Form } from './components/Form/Form';
import { ContactList } from './components/ContactList/ContactList';
import { Filter } from './components/Filter/Filter';
function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitData = ({ name, number }) => {
    console.log(name, number);
    const user = { id: uuidv4(), name, number };
    const isExists = contacts.find(contact => contact.name === name);
    if (isExists) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts(prevState => [...prevState, user]);
  };

  const filterChange = e => {
    setFilter(e.target.value);
  };

  const getVisibleContactList = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
  const visibleContacts = getVisibleContactList();
  const deleteContact = id => {
    setContacts(state => [...state].filter(contact => contact.id !== id));
  };

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Form onSubmit={formSubmitData} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={filterChange} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
}

export default App;
