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
  const {rank = ""} = JSON.parse(localStorage.getItem('userData'))
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
      {rank && (
        <div className="nav navbar-nav align-items-center ml-auto">
          <span className='user-name font-weight-bold capitalize w-100'>{CONSTANTS.GAME_RANK.find(item => item.value === rank)?.label}</span>
        </div>
      )}
      <NavbarUser skin={skin} setSkin={setSkin} showOnlineUserPopup={showOnlineUserPopup} handleOnlineUserHidden={handleOnlineUserHidden} location={location} />
    </Fragment>
  )
}

export default ThemeNavbar
