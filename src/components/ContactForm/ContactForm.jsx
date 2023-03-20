import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export default class AddContact extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className={css.formContainer} onSubmit={handleSubmit}>
        <label className={css.form}>
          Name
          <input
            type="text"
            name="name"
            placeholder="Please enter a name"
            pattern="^[a-zA-Z]+(([' -][a-zA-Z])?[a-zA-Z]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.form}>
          Phone Number
          <input
            type="tel"
            name="number"
            placeholder="Please enter a pnone number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit">Add Contact</button>
      </form>
    );
  }
}
