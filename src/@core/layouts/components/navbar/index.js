// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'
import {
  NavItem,
  NavLink
} from 'reactstrap'
import * as Icon from 'react-feather'
import { CONSTANTS } from '../../../../utils/CONSTANTS'


const ThemeNavbar = props => {
  // ** Props
  const { skin, setSkin, setMenuVisibility, showOnlineUserPopup, handleOnlineUserHidden, location } = props
  let rank = ""
  if (Object.keys(JSON.parse(localStorage.getItem('userData')) || {}).length) {
    rank = JSON.parse(localStorage.getItem('userData')).rank
  }
  return (
    <Fragment>
      {/* <div className='bookmark-wrapper d-flex align-items-center'>
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
      </div> */}
      <ul className='navbar-nav d-xl-none'>
        <NavItem className='mobile-menu mr-auto'>
          <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
            <Icon.Menu className='ficon' />
          </NavLink>
        </NavItem>
      </ul>
      {/* <Menus showUserComp={false} /> */}
      <NavbarUser skin={skin} setSkin={setSkin} rank={rank} showOnlineUserPopup={showOnlineUserPopup} handleOnlineUserHidden={handleOnlineUserHidden} location={location} />
    </Fragment>
  )
}

export default ThemeNavbar
