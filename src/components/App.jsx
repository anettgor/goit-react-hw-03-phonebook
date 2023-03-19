import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    const id = nanoid();

    const newContact = {
      id: id,
      name: name,
      number: number,
    };

    const { contacts } = this.state;

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`Contact ${name} is already in your contact list`);
    } else if (contacts.find(contact => contact.number === number)) {
      alert(
        `Contact ${number} is already in your contact list under a different name`
      );
    } else {
      this.setState(prev => ({
        contacts: [...prev.contacts, newContact],
      }));
      form.reset();
    }
  };

  deleteContact = e => {
    e.preventDefault();

    const contactsNew = [...this.state.contacts];
    const index = contactsNew.findIndex(contact => contact.id === e.target.id);

    contactsNew.splice(index, 1);

    this.setState({ contacts: contactsNew });
  };

  findContact = e => {
    const { contacts, filter } = this.state;
    this.setState({ filter: e.target.value.toLowerCase() });
    contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  render() {
    const { filter, contacts } = this.state;
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          fontSize: 15,
          color: '#010101',
          backgroundColor: '#dcdcdc',
        }}
      >
        <h1> Phonebook</h1>
        <ContactForm handleSubmit={this.handleSubmit} />

        <h2> Contacts </h2>
        {contacts.length > 1 && <Filter findContact={this.findContact} />}
        {contacts.length > 0 && (
          <ContactList
            contacts={contacts}
            deleteContact={this.deleteContact}
            filter={filter}
          />
        )}
        {contacts.length === 0 && <p>Your contact list is empty</p>}
      </div>
    );
  }
}
