import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const loadedContacts = this.load('contacts');

    if (loadedContacts) {
      this.setState({
        contacts: loadedContacts,
      });
    }
    console.log('%c Component did mount', 'background-color: lavender ');
  }

  componentDidUpdate(prevState) {
    if (
      this.state.contacts !== prevState.contacts &&
      this.state.contacts !== []
    ) {
      this.save('contacts', this.state.contacts);
      console.log('%c component did update', 'background-color: lightpink');
    }
    return;
  }

  save = (key, value) => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  };

  load = key => {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
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
      Notify.info(`Contact ${name} is already in your contact list`);
    } else if (contacts.find(contact => contact.number === number)) {
      Notify.info(
        `Contact ${number} is already in your contact list under a different name`
      );
    } else {
      Notify.success(`Contact ${name} successfully added`);
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
    Notify.info('Contact Successfully Deleted');
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
      <div className={css.container}>
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
