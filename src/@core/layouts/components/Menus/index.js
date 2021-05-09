import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink } from 'reactstrap'
import UserDropdown from '../navbar/UserDropdown'
import IntlDropdown from '../navbar/IntlDropdown'
import { FormattedMessage } from 'react-intl'

function Menus(props) {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const {showUserComp} = props
    return (
        <div className="menu">
            <Navbar light expand="md">
                <div className="nav-bar-toggle-div">
                    <NavbarToggler onClick={toggle} />
                </div>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto align-center" navbar>
                    <NavItem>
                        <NavLink className="nav-link" href="/"><FormattedMessage id={"Home"} /></NavLink>
                    </NavItem>
                    {showUserComp && 
                        <>
                            <IntlDropdown />
                            <UserDropdown />
                        </>
                    }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

Menus.propTypes = {

}

export default Menus

