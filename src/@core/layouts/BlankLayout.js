// ** React Imports
import { useEffect, useState } from 'react'
import themeConfig from '@configs/themeConfig'
import { Link, NavLink } from 'react-router-dom'
import { Navbar, NavItem, Button } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import ScrollToTop from 'react-scroll-up'
import { ArrowUp } from 'react-feather'

// ** Custom Hooks
import { useFooterType } from '@hooks/useFooterType'
import { useNavbarType } from '@hooks/useNavbarType'
import { useSkin } from '@hooks/useSkin'
import Nav from 'reactstrap/lib/Nav'

const BlankLayout = ({ children, ...rest }) => {
  // ** Hooks
  const [skin, setSkin] = useSkin()
  const [navbarType, setNavbarType] = useNavbarType()
  const [navbarScrolled, setNavbarScrolled] = useState(false)
  const [footerType, setFooterType] = useFooterType()
  const layoutStore = useSelector(state => state.layout)


  // ** States
  const [isMounted, setIsMounted] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const cleanup = () => {
    setIsMounted(false)
    setNavbarScrolled(false)
  }

  const [menuVisibility, setMenuVisibility] = useState(false)
  const contentWidth = layoutStore.contentWidth
  const menuCollapsed = layoutStore.menuCollapsed
  const isHidden = layoutStore.menuHidden

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true)
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 65 && navbarScrolled === false) {
        setNavbarScrolled(true)
      }
      if (window.pageYOffset < 65) {
        setNavbarScrolled(false)
      }
    })
    return () => cleanup()
  }, [])

  // ** Update Window Width
  const handleWindowWidth = () => {
    setWindowWidth(window.innerWidth)
  }

  //** This function will detect the Route Change and will hide the menu on menu item click
  useEffect(() => {
    if (menuVisibility && windowWidth < 1200) {
      setMenuVisibility(false)
    }
  }, [location])

  //** Sets Window Size & Layout Props
  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener('resize', handleWindowWidth)
    }
  }, [windowWidth])

  if (!isMounted) {
    return null
  }

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
  // import { Nav, NavItem, NavLink } from 'reactstrap'

const NavCenter = () => {
  return (
    <Nav className='justify-content-center'>
      <NavItem>
        {/* <NavLink href='#' active>
          Active
        </NavLink> */}
      </NavItem>
      {/* <NavItem>
        <NavLink href='#'>Link</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href='#'>Link</NavLink>
      </NavItem>
      <NavItem>
        <NavLink disabled href='#'>
          Disabled
        </NavLink>
      </NavItem> */}
    </Nav>
  )
}
  return (
    <div className='blank-page'>
        <div className={classnames(
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
          )}  {...(isHidden ? { 'data-col': '1-column' } : {})}>
          
          <Navbar
            expand='lg'
            className={classnames('header-navbar navbar-fixed align-items-center navbar-shadow navbar-brand-center', {
              'navbar-scrolled': navbarScrolled
            }, 'blank-header-nav')}>
            <div className='navbar-header d-xl-block d-none'>
              <ul className='nav navbar-nav'>
                <NavItem>
                  <div className="blank-page-header">
                    <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                      <img src={themeConfig.app.smallLogoImage} alt='logo' />
                      <h2 className='brand-text text-primary ml-1'>E-FOOT.NL</h2>
                    </Link>
                  </div>
                </NavItem>
              </ul>
            </div>
          </Navbar>
          {/* <NavCenter /> */}
          
          {children}
          
          {/* Scroll to top for the pages */}
          {themeConfig.layout.scrollTop === true ? (
            <div className='scroll-to-top'>
              <ScrollToTop showUnder={300} style={{ bottom: '5%' }}>
                <Button className='btn-icon' color='primary'>
                  <ArrowUp size={14} />
                </Button>
              </ScrollToTop>
            </div>
          ) : null}
        </div>  
      
    </div>
  )
}

export default BlankLayout
