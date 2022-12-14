// ** React Imports
import { useEffect, useState } from 'react'
import { NavLink, useLocation, matchPath, useParams } from 'react-router-dom'

// ** Third Party Components
import { Badge } from 'reactstrap'
import classnames from 'classnames'
import { FormattedMessage } from 'react-intl'

// ** Vertical Menu Array Of Items
import navigation from '@src/navigation/vertical'

// ** Utils
import { isNavLinkActive, search, getAllParents } from '@layouts/utils'
import { isUserAdminFromUser } from '../../../../../utils'
import _ from 'underscore'
import { useDispatch, useSelector } from 'react-redux'
import { CONSTANTS } from '../../../../../utils/CONSTANTS'
import { clearBellNotifications } from '../../../../../redux/actions/reminders'

const VerticalNavMenuLink = ({
  item,
  groupActive,
  setGroupActive,
  activeItem,
  setActiveItem,
  groupOpen,
  setGroupOpen,
  toggleActiveGroup,
  parentItem,
  routerProps,
  currentActiveItem, 
  user
}) => {
  // ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
  const LinkTag = item.externalLink ? 'a' : NavLink
  const dispatch = useDispatch()

  // ** URL Vars
  const location = useLocation()
  const currentURL = location.pathname

  const {bellNotifications} = useSelector(state => state.dashboard)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    if (bellNotifications?.length) {
      setNotifications(bellNotifications.filter(noti => [CONSTANTS.REMINDER_TYPES.CHALLENGE, CONSTANTS.REMINDER_TYPES.DISPUTE].includes(noti.type)))
    }
    return () => {
    }
  }, [bellNotifications])


  let sideBarMenus = [...navigation.normalRoutes]
  if (!_.isEmpty(user) && isUserAdminFromUser(user)) {
      sideBarMenus = [...sideBarMenus, navigation.adminRoleRoutes]
  }

  // ** To match path
  const match = matchPath(currentURL, {
    path: `${item.navLink}/:param`,
    exact: true,
    strict: false
  })

  // ** Search for current item parents
  const searchParents = (sideBarMenus, currentURL) => {
    const parents = search(sideBarMenus, currentURL, routerProps) // Search for parent object
    const allParents = getAllParents(parents, 'id') // Parents Object to Parents Array
    return allParents
  }

  // ** URL Vars
  const resetActiveGroup = navLink => {
    const parents = search(sideBarMenus, navLink, match)
    toggleActiveGroup(item.id, parents)
  }

  // ** Reset Active & Open Group Arrays
  const resetActiveAndOpenGroups = () => {
    setGroupActive([])
    setGroupOpen([])
  }

  // ** Checks url & updates active item
  useEffect(() => {
    if (currentActiveItem !== null) {
      setActiveItem(currentActiveItem)
      const arr = searchParents(sideBarMenus, currentURL)
      setGroupActive([...arr])
    }
  }, [location])

  return (
    <li
      className={classnames({
        'nav-item': !item.children,
        disabled: item.disabled,
        active: item.navLink === activeItem
      })}
    >
      <LinkTag
        className='d-flex align-items-center'
        target={item.newTab ? '_blank' : undefined}
        /*eslint-disable */
        {...(item.externalLink === true
          ? {
              href: item.navLink || '/'
            }
          : {
              to: item.navLink || '/',
              isActive: (match, location) => {
                if (!match) {
                  return false
                }

                if (match.url && match.url !== '' && match.url === item.navLink) {
                  currentActiveItem = item.navLink
                }
              }
            })}
        /*eslint-enable */
        onClick={e => {
          if (notifications?.length && item.title === "My Matches") {
            const userId = localStorage.getItem("userId")
            dispatch(clearBellNotifications(userId, [CONSTANTS.REMINDER_TYPES.CHALLENGE]))
          }
          if (!item.navLink.length) {
            e.preventDefault()
          }
          parentItem ? resetActiveGroup(item.navLink) : resetActiveAndOpenGroups()
        }}
      >
        {item.icon}
        <span className='menu-item text-truncate'>
          <FormattedMessage id={item.title} />
        </span>

        {(notifications?.length && item.title === "My Matches") ? (
        <Badge className='ml-auto mr-1' color="danger" pill>
          {notifications?.length}
        </Badge>) : null}
        

        {item.badge && item.badgeText ? (
          <Badge className='ml-auto mr-1' color={item.badge} pill>
            {item.badgeText}
          </Badge>
        ) : null}
      </LinkTag>
    </li>
  )
}

export default VerticalNavMenuLink
