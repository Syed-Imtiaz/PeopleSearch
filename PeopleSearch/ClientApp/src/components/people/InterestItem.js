import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'semantic-ui-react'

class InterestItem extends Component {
  render() {
    const { level } = this.props;

    let color = 'yellow';
    if (level <= 25)
      color = 'yellow';
   else if (level > 25 && level <= 50)  
      color = 'orange';
   else if (level > 50 && level <= 75)  
      color = 'olive';
    else if (level > 75)  
      color = 'green';

    return (
      <Progress percent={level} size='tiny' color={color} active />
    );
  }
}

InterestItem.propTypes = {
  level: PropTypes.number.isRequired
};

export default InterestItem;
