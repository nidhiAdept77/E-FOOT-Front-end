
import { HelpCircle } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, UncontrolledTooltip, FormGroup  } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import OnlineUserRow from './OnlineUserRow'
import { useEffect, useState, useRef } from 'react'
import {CONSTANTS} from '@src/utils/CONSTANTS'
import InfiniteScroll from "react-infinite-scroll-component"
import PerfectScrollbar from 'react-perfect-scrollbar'
import Select from 'react-select'
import { selectThemeColors } from '@utils'

const OnlineUsers = ({ onlineUsers, scrollContainer, showheader }) => {
  const [items, setItems] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedRank, setSelectedRank] = useState()
  
  useEffect(() => {
    const LIMIT = 10
    if (onlineUsers) {
      if (onlineUsers.length < LIMIT) {
        setItems(onlineUsers)
      } else if (items.length) {
        setItems(onlineUsers.slice(0, items.length))
      } else {
        setItems(onlineUsers.slice(0, LIMIT))
        if (onlineUsers.length > LIMIT) setHasMore(true)
      }
    }
    return () => {
      setItems([])
    }
  }, [onlineUsers])

  const loadItems = (prevArray = [], startCursor = 0) => {
    let newArray = prevArray

    if (onlineUsers.length >= (items.length + CONSTANTS.ARRAY_SIZE)) {
      for (let i = startCursor; i < startCursor + CONSTANTS.ARRAY_SIZE; i++) {
        const newItem = onlineUsers[i]
        newArray = [...newArray, newItem]
      }
      setHasMore(true)
    } else {
      setHasMore(false)
    }
    return newArray
  }
  
  const handleLoadMore = () => {
    setLoading(true)
    setTimeout(() => {
      const newUserList = loadItems(items, items.length)
      setLoading(false)
      setItems(newUserList)
    }, 1500)
  }

  const renderTasks = onlineUsers => {
    if (selectedRank) {
      onlineUsers = onlineUsers.filter(user => user.rank === selectedRank.value)
    }
  return onlineUsers.length > 0 ? onlineUsers.map((user, index) => {
  return (user && <OnlineUserRow user = {user}
    index = {index}
    key = {
      `${user.userName}-${index}`
    } />
  )
  }) : null
  }

  return onlineUsers ? (
    <Card className='card-employee-task'>
      { showheader && <CardHeader>
        <CardTitle tag='h4'> {hasMore} Online Users ({onlineUsers.length})</CardTitle>
        <HelpCircle size={18} id="onlineUsersHelp" className='text-muted cursor-pointer' />
        <UncontrolledTooltip placement='auto' target='onlineUsersHelp'>
          All online users 
        </UncontrolledTooltip>
      </CardHeader> }
      <CardBody className="pr-0">
        <FormGroup className="pr-2">
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`rank–type`}
              className='react-select'
              classNamePrefix='select'
              isClearable={true}
              options={CONSTANTS.GAME_RANK}
              onChange={(value) => { setSelectedRank(value) } }
            />
          </FormGroup>
      { onlineUsers && 
            <>
                <PerfectScrollbar
                  id="online-card-body"
                  className='online-card-body'
                  options={{ wheelPropagation: false }}
                >
                  <InfiniteScroll
                    dataLength={items.length}
                    next={handleLoadMore}
                    hasMore={hasMore}
                    
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="online-card-body" >
                    {renderTasks(items)}
                  </InfiniteScroll>
                </PerfectScrollbar>
            </>

      }
      </CardBody>
    </Card>
  ) : null
}

OnlineUsers.propTypes = {
  onlineUsers: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
  onlineUsers: state.auth.onlineUsers
})
export default connect(mapStateToProps, {})(OnlineUsers)
