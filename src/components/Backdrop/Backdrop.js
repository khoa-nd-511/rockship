import React from 'react'

const backdrop = props => {
  const styles = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 99,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  };

  const { clodeSidedrawer, showSidedrawer } = props
  return showSidedrawer ? <div style={styles} onClick={clodeSidedrawer} /> : null;
}

export default backdrop;
