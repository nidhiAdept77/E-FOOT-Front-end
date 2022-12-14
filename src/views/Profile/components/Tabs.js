import { Nav, NavItem, NavLink } from 'reactstrap'
import { User, Lock, Info, Link, Bell, Home, Settings } from 'react-feather'
import { FormattedMessage } from 'react-intl'
// import { GrUserSettings } from "react-icons/gr"

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav className='nav-left' pills vertical>
      <NavItem>
        <NavLink active={activeTab === '1'} onClick={() => toggleTab('1')}>
          <User size={18} className='mr-1' />
          <span className='font-weight-bold'>General</span>
        </NavLink>
      </NavItem>
      {/* <NavItem>
        <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
          <Info size={18} className='mr-1' />
          <span className='font-weight-bold'>Info</span>
        </NavLink>
      </NavItem> */}
      <NavItem>
        <NavLink active={activeTab === '2'} onClick={() => toggleTab('2')}>
          <Link size={18} className='mr-1' />
          <span className='font-weight-bold'>Game Id & Rank</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '3'} onClick={() => toggleTab('3')}>
          <Home size={18} className='mr-1' />
          <span className='font-weight-bold'>Bank Details</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '4'} onClick={() => toggleTab('4')}>
          <Lock size={18} className='mr-1' />
          <span className='font-weight-bold'><FormattedMessage id="Change Password" /></span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === '5'} onClick={() => toggleTab('5')}>
          <Bell size={18} className='mr-1' />
          <span className='font-weight-bold'>User Prefrences</span>
        </NavLink>
      </NavItem>
    </Nav>
  )
}

export default Tabs
