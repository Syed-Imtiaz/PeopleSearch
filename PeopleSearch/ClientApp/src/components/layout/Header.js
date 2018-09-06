import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { clearCurrentPerson } from '../../actions/personActions';
import { Sticky, Button, Dropdown, Menu, Image } from 'semantic-ui-react';
import logo from '../../logo.svg';

class Header extends Component {
  state = { activeItem: 'home', sidebarvisible: true };

  //handleToggleVisibility = () => this.setState({ sidebarvisible: !this.prop.sidebarvisible })

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  
  onLogoutClick(e) {
    e.preventDefault();
    //this.props.clearCurrentPerson();
    this.props.logoutUser();
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu fixed='top' color='orange'>
        <Menu.Item>
          People Search <img src={logo} alt="logo" className="NavBar-logo" />
        </Menu.Item>
        <Menu.Item 
          color='blue'
          name='home' 
          active={activeItem === 'home'} 
          onClick={this.handleItemClick} 
          as={Link}
          to='/'
        />
        <Menu.Item
          position='right'
          color='blue'
          name='about'
          active={activeItem === 'about'}
          onClick={this.handleItemClick}
          as={Link}
          to='/about'
        />
      </Menu>
    );
  }
}

Header.propTypes = {
  //logoutUser: PropTypes.func.isRequired,
  //auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  //auth: state.auth
});

export default connect(mapStateToProps, { })(
  Header
);
