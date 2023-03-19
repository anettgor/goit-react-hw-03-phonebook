import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Section extends Component {
  static propTypes = {
    text: PropTypes.string,
    children: PropTypes.node,
  };
  render() {
    const { text, children } = this.props;
    return (
      <>
        <h2>{text}</h2>
        {children}
      </>
    );
  }
}
