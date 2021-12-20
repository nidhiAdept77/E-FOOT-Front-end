// ** Dropdowns Imports
import IntlDropdown from './IntlDropdown'
import UserDropdown from './UserDropdown'

// ** Third Party Components
import { Sun, Moon, Star } from 'react-feather'
import { FaUserSlash, FaUser } from "react-icons/fa"
import { NavItem, NavLink, Badge } from 'reactstrap'
import { useEffect, useState } from 'react'
import { CONSTANTS } from '../../../../utils/CONSTANTS'
import _ from 'underscore'

const NavbarUser = props => {
  // ** Props
  const { skin, setSkin, showOnlineUserPopup, handleOnlineUserHidden, location, rank } = props
  const [showOnlinetoggler, setOnlineUserToggler] = useState(true)
  useEffect(() => {
    if (!_.isEmpty(location)) {
      let payload =  CONSTANTS.ROUTES_HIDE_ONLINE_POPUP.findIndex(li => {
        return li === location.pathname
      })
      payload = !(payload > -1)
      setOnlineUserToggler(payload)
    }
    return () => {
      setOnlineUserToggler(false)
    }
  }, [location])

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  const OnlineUsersToggler = () => {
    if (showOnlineUserPopup) {
      return <FaUserSlash className='ficon' onClick={() => handleOnlineUserHidden(false)} />
    } else {
      return <FaUser className='ficon' onClick={() => handleOnlineUserHidden(true)} />

    }
  }

  return (
    <ul className='nav navbar-nav align-items-center ml-auto'>
      <NavItem>
        <NavLink className='nav-link-style'>
          {rank && (
            <Badge  color='light-primary' className="p-1">
              <span className='text-uppercase'>{rank}</span>
            </Badge>
          )}
        </NavLink>
      </NavItem>
      <IntlDropdown />
      <NavItem className='d-none d-sm-block d-lg-block'>
        <NavLink className='nav-link-style'>
          <ThemeToggler />
        </NavLink>
      </NavItem>
      {showOnlinetoggler && <NavItem>
        <NavLink className='nav-link-style'>
          <OnlineUsersToggler />
        </NavLink>
      </NavItem>}
      <UserDropdown />
    </ul>
  )
}
export default NavbarUser
