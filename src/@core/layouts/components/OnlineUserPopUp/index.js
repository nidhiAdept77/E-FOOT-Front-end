import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// custom import
import { ThemeColors } from '@src/utility/context/ThemeColors'
import OnlineUsers from '@src/views/Dashboard/components/OnlineUsers'
import AppCollapse from '@components/app-collapse'
import { User } from 'react-feather'

function OnlineUserPopUp({onlineUsers}) {
    const { colors } = useContext(ThemeColors),
    trackBgColor = '#e9ecef'
    return (
        <div className="online-pop-wrapper">
            <AppCollapse 
                data={
                    [
                        {
                            title: (<>
                                <User /> Online User ( {onlineUsers.length} )
                            </>),
                            content: (
                                <OnlineUsers colors={colors} trackBgColor={trackBgColor} showheader={false} />
                            )
                        }
                    ]
                } /> 
        </div>
    )
}

OnlineUserPopUp.propTypes = {
  onlineUsers: PropTypes.array.isRequired
}

const mapStateToProps = state => {
    return {
        onlineUsers: state.auth.onlineUsers
    }
}

export default connect(mapStateToProps, {})(OnlineUserPopUp)

