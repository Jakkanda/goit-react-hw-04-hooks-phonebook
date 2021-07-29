import React, { Component } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { Form } from './components/Form/Form';
import { ContactList } from './components/ContactList/ContactList';
import { Filter } from './components/Filter/Filter';
class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitData = ({ name, number }) => {
    const user = { id: uuidv4(), name, number };
    const isExists = this.state.contacts.find(contact => contact.name === name);
    if (isExists) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState(prevState => {
      const contacts = [...prevState.contacts, user];

      return { ...prevState, contacts };
    });
  };

  filterChange = e => {
    this.setState({ filter: e.target.value });
  };

  getVisibleContactList = () => {
    const { contacts, filter } = this.state;
    const nornalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(nornalizedFilter),
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContactList();
    return (
      <div className="App">
        <h2>Phonebook</h2>
        <Form onSubmit={this.formSubmitData} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.filterChange} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
