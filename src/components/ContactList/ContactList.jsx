import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

class ContactList extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    deleteContact: PropTypes.func,
    filter: PropTypes.string,
  };

  render() {
    const { contacts, deleteContact, filter } = this.props;
    const filteredContacts = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter);
    });

    return (
      <ul className={css.items}>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            <p>
              {' '}
              <b>Name: </b> {contact.name}{' '}
            </p>
            <p>
              <b>Number: </b>
              {contact.number}
            </p>
            <button id={contact.id} onClick={deleteContact}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
  componentWillUnmount() {
    console.log('%c component Unmounted', 'background-color:tomato');
  }
}

export default ContactList;
