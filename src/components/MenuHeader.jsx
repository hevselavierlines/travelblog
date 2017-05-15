import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  element: {
    width: '100%',
    padding: 10,
    boxSizing: 'border-box',
    textAlign: 'center',
  },
};

const MenuHeader = ({ station }) => (
  <div style={styles.element}>
    <img style={styles.image} src={`/logos/${station}-128-round.png`}/>
  </div>
);

MenuHeader.propTypes = {
  station: PropTypes.string.isRequired,
};

export default MenuHeader;
