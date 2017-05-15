import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import transitions from 'material-ui/styles/transitions';

const styles = {
  element: {
    position: 'fixed',
    top: 0,
    width: '100%',
    boxSizing: 'border-box',
    zIndex: 10,
    transition: transitions.easeOut(null, 'background-color', null),
    backgroundColor: '#00bcd4',
  },
  appBar: {
    boxShadow: 'none',
  },
  headLines: {
    transition: transitions.easeOut(null, 'padding-left', null),
    paddingRight: 20,
  },
  headLine: {
    overflow: 'hidden',
    testOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 'normal',
    margin: 0,
  },
  h1: {
    fontSize: '1.7em',
  },
};

export default class MediaBar extends React.Component {
  static propTypes = {
    station: PropTypes.object.isRequired,
    iconStyleLeft: PropTypes.object,
    onLeftIconButtonTouchTap: PropTypes.func.isRequired,
    style: PropTypes.object,
    height: PropTypes.number,
  };
  render() {
    return (
      <div style={{ height: this.props.height, ...styles.element }}>
        <AppBar style={styles.appBar}
                iconStyleLeft={this.props.iconStyleLeft}
                onLeftIconButtonTouchTap={this.props.onLeftIconButtonTouchTap}/>
        <div style={{ ...styles.headLine, ...this.props.style }}>
          <h1 style={{ ...styles.headLine, ...styles.h1 }}>{this.props.station.name}</h1>
          <h2 style={styles.headLine}>{this.props.station.broadcast}</h2>
          <audio src={this.props.station.url} autoPlay/>
        </div>

    </div>);
  }
}
