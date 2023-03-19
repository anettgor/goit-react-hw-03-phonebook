import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';
class Filter extends Component {
  static propTypes = {
    findContact: PropTypes.func,
  };

  render() {
    const { findContact } = this.props;

    return (
      <>
        <label className={css.form}>
          Find contacts by name
          <input
            type="text"
            name="find contact"
            placeholder="Please enter a name"
            onInput={findContact}
          ></input>
        </label>
      </>
    );
  }
}
export default Filter;
