import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap'
import UserDropdown from '../navbar/UserDropdown'

function Menus(props) {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div className="menu">
            <Navbar light expand="md">
            <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto align-center" navbar>
                    <NavItem>
                        <NavLink className="nav-link" href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" href="/">Tips 'N Trick</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" href="/">FIFA SPELEN ALS STAGE </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" href="/">ONZE DIENSTEN</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" href="/">Contact</NavLink>
                    </NavItem>
                    <UserDropdown />
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

Menus.propTypes = {

}

export default Menus
