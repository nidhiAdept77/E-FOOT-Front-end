// ** React Imports
import { useState, useEffect } from 'react'
import { useLocation, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'

// ** Store & Actions
import { useSelector, useDispatch, connect } from 'react-redux'
import { handleMenuCollapsed, handleContentWidth, handleMenuHidden } from '@store/actions/layout'

// ** Third Party Components
import classnames from 'classnames'
import { ArrowUp } from 'react-feather'
import ScrollToTop from 'react-scroll-up'
import { Navbar, Button } from 'reactstrap'

// ** Configs
import themeConfig from '@configs/themeConfig'

// ** Custom Components
import Customizer from '@components/customizer'
import FooterComponent from './components/footer'
import NavbarComponent from './components/navbar'
import SidebarComponent from './components/menu/vertical-menu'

// ** Custom Hooks
import { useRTL } from '@hooks/useRTL'
import { useSkin } from '@hooks/useSkin'
import { useNavbarType } from '@hooks/useNavbarType'
import { useFooterType } from '@hooks/useFooterType'
import { useNavbarColor } from '@hooks/useNavbarColor'
import {getInitOnlineUsers, removeOnlineUsers, addUserFireBaseToken, getAllOnlineUserSubs, updateOnlineUsers} from '@src/redux/actions/auth'
import {handleOnlineUserHidden} from '@src/redux/actions/layout'


// ** Styles
import '@styles/base/core/menu/menu-types/vertical-menu.scss'
import '@styles/base/core/menu/menu-types/vertical-overlay-menu.scss'

// ** Custom Imports
import firebase from '@src/firebase'
import _ from 'underscore'
import {CONSTANTS} from '@src/utils/CONSTANTS'
import OnlineUserPopUp from './components/OnlineUserPopUp'

const VerticalLayout = props => {
  // ** Props
  const { children, navbar, footer, menu, routerProps, currentActiveItem, getInitOnlineUsers, removeOnlineUsers, getAllOnlineUserSubs, updateOnlineUsers, user, addUserFireBaseToken, onlineUsers, handleOnlineUserHidden, showOnlineUserPopup } = props

  // ** Hooks
  const [skin, setSkin] = useSkin()
  const [isRtl, setIsRtl] = useRTL()
  const [navbarType, setNavbarType] = useNavbarType()
  const [footerType, setFooterType] = useFooterType()
  const [navbarColor, setNavbarColor] = useNavbarColor()

  // ** States
  const [isMounted, setIsMounted] = useState(false)
  const [menuVisibility, setMenuVisibility] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // ** Store Vars
  const dispatch = useDispatch()
  const layoutStore = useSelector(state => state.layout)

  // ** Update Window Width
  const handleWindowWidth = () => {
    setWindowWidth(window.innerWidth)
  }

  // ** Vars
  const location = useLocation()
  const contentWidth = layoutStore.contentWidth
  const menuCollapsed = layoutStore.menuCollapsed
  const isHidden = layoutStore.menuHidden

  // ** Toggles Menu Collapsed
  const setMenuCollapsed = val => dispatch(handleMenuCollapsed(val))

  // ** Handles Content Width
  const setContentWidth = val => dispatch(handleContentWidth(val))

  // ** Handles Content Width
  const setIsHidden = val => dispatch(handleMenuHidden(val))

  let userSubcription

  //** This function will detect the Route Change and will hide the menu on menu item click
  useEffect(() => {
    if (menuVisibility && windowWidth < 1200) {
      setMenuVisibility(false)
    }
    if (!_.isEmpty(location)) {
      let payload =  CONSTANTS.ROUTES_HIDE_ONLINE_POPUP.findIndex(li => {
        return li === location.pathname
      })
      payload = !(payload > -1)
      handleOnlineUserHidden(payload)
    }
  }, [location])

  //** Sets Window Size & Layout Props
  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener('resize', handleWindowWidth)
    }
  }, [windowWidth])

  //** ComponentDidMount
  useEffect(async () => {
    setIsMounted(true)
    await getInitOnlineUsers()
    userSubcription = getAllOnlineUserSubs(user => {
      setTimeout(() => {
        const currentUserId = localStorage.getItem('userId')
        if (currentUserId !== user._id && onlineUsers) {
          const isUserPresent = onlineUsers.find(ou => ou._id === user._id && ou.isOnline === user.isOnline)
          if (_.isEmpty(isUserPresent)) {
            updateOnlineUsers(user)
          }
        }
      }, 1000)
    })
    return () => {
      removeOnlineUsers()
      userSubcription.subscription.unsubscribe()
      setIsMounted(false)
    }
  }, [])

  useEffect(async () => {
    if (!_.isEmpty(user)) {
      try {
        const messaging = firebase.messaging()
        const token = await messaging.getToken()
        if (token) {
          const {firebase} = user
          if (firebase && firebase.web && firebase.web.length) {
            const isRegitered = firebase.web.includes(token)
            if (!isRegitered) {
              const result = await addUserFireBaseToken(token)
            }
          } else {
            const result = await addUserFireBaseToken(token)
          }
        }
      } catch (error) {
        console.error('error: ', error)
      }
    }
  }, [user])

  // ** Vars
  const footerClasses = {
    static: 'footer-static',
    sticky: 'footer-fixed',
    hidden: 'footer-hidden'
  }

  const navbarWrapperClasses = {
    floating: 'navbar-floating',
    sticky: 'navbar-sticky',
    static: 'navbar-static',
    hidden: 'navbar-hidden'
  }

  const navbarClasses = {
    floating: 'floating-nav',
    sticky: 'fixed-top',
    static: 'navbar-static-top',
    hidden: 'd-none'
  }

  const bgColorCondition = navbarColor !== '' && navbarColor !== 'light' && navbarColor !== 'white'

  if (!isMounted) {
    return null
  }
  return (
    <div
      className={classnames(
        `wrapper vertical-layout ${navbarWrapperClasses[navbarType] || 'navbar-floating'} ${
          footerClasses[footerType] || 'footer-static'
        }`,
        {
          // Modern Menu
          'vertical-menu-modern': windowWidth >= 1200,
          'menu-collapsed': menuCollapsed && windowWidth >= 1200,
          'menu-expanded': !menuCollapsed && windowWidth > 1200,

          // Overlay Menu
          'vertical-overlay-menu': windowWidth < 1200,
          'menu-hide': !menuVisibility && windowWidth < 1200,
          'menu-open': menuVisibility && windowWidth < 1200
        }
      )}
      {...(isHidden ? { 'data-col': '1-column' } : {})}
    >
      {!isHidden ? (
        <SidebarComponent
          skin={skin}
          menu={menu}
          menuCollapsed={menuCollapsed}
          menuVisibility={menuVisibility}
          setMenuCollapsed={setMenuCollapsed}
          setMenuVisibility={setMenuVisibility}
          routerProps={routerProps}
          currentActiveItem={currentActiveItem}
        />
      ) : null}

      <Navbar
        expand='lg'
        light={skin !== 'dark'}
        dark={skin === 'dark' || bgColorCondition}
        color={bgColorCondition ? navbarColor : undefined}
        className={classnames(
          `header-navbar navbar align-items-center ${navbarClasses[navbarType] || 'floating-nav'} navbar-shadow`
        )}
      >
        <div className='navbar-container d-flex content'>
          {navbar ? navbar : <NavbarComponent setMenuVisibility={setMenuVisibility} skin={skin} setSkin={setSkin} showOnlineUserPopup={showOnlineUserPopup} handleOnlineUserHidden={handleOnlineUserHidden} location={location} />}
        </div>
      </Navbar>
      {children}

      {/* Vertical Nav Menu Overlay */}
      <div
        className={classnames('sidenav-overlay', {
          show: menuVisibility
        })}
        onClick={() => setMenuVisibility(false)}
      ></div>
      {/* Vertical Nav Menu Overlay */}

      {themeConfig.layout.customizer === true ? (
        <Customizer
          skin={skin}
          setSkin={setSkin}
          footerType={footerType}
          setFooterType={setFooterType}
          navbarType={navbarType}
          setNavbarType={setNavbarType}
          navbarColor={navbarColor}
          setNavbarColor={setNavbarColor}
          isRtl={isRtl}
          setIsRtl={setIsRtl}
          layout={props.layout}
          setLayout={props.setLayout}
          isHidden={isHidden}
          setIsHidden={setIsHidden}
          contentWidth={contentWidth}
          setContentWidth={setContentWidth}
          menuCollapsed={menuCollapsed}
          setMenuCollapsed={setMenuCollapsed}
          transition={props.transition}
          setTransition={props.setTransition}
          themeConfig={themeConfig}
        />
      ) : null}
      {showOnlineUserPopup && <OnlineUserPopUp />}
      <footer
        className={classnames(`footer footer-light ${footerClasses[footerType] || 'footer-static'}`, {
          'd-none': footerType === 'hidden'
        })}
      >
        {footer ? footer : <FooterComponent footerType={footerType} footerClasses={footerClasses} />}
      </footer>

      {themeConfig.layout.scrollTop === true ? (
        <div className='scroll-to-top'>
          <ScrollToTop showUnder={300} style={{ bottom: '5%', zIndex: 10000 }}>
            <Button className='btn-icon' color='primary'>
              <ArrowUp size={14} />
            </Button>
          </ScrollToTop>
        </div>
      ) : null}
    </div>
  )
}
VerticalLayout.propTypes = {
  addUserFireBaseToken: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  onlineUsers: PropTypes.array.isRequired,
  getInitOnlineUsers: PropTypes.func.isRequired,
  handleOnlineUserHidden: PropTypes.func.isRequired,
  removeOnlineUsers: PropTypes.func.isRequired,
  getAllOnlineUserSubs: PropTypes.func.isRequired,
  updateOnlineUsers: PropTypes.func.isRequired,
  showOnlineUserPopup: PropTypes.bool.isRequired
}
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    onlineUsers: state.auth.onlineUsers,
    showOnlineUserPopup: state.layout.showOnlineUserPopup
  }
}
export default connect(mapStateToProps, {addUserFireBaseToken, getInitOnlineUsers, removeOnlineUsers, getAllOnlineUserSubs, updateOnlineUsers, handleOnlineUserHidden})(VerticalLayout)
