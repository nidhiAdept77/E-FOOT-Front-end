import { Fragment, useEffect, useState } from 'react'
import Select from 'react-select'
import { useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { selectThemeColors, isObjEmpty } from '@utils'
import { Label, FormGroup, Row, Col, Button, Form } from 'reactstrap'
import { setAddEditPopupData } from '@src/redux/actions/layout'

import '@styles/react/libs/react-select/_react-select.scss'
import { getConsoles, removePaginatedConsoles } from '../../../redux/actions/consoles'
import { useDispatch, useSelector } from 'react-redux'
import { getGamesByConsoleId, removePaginatedGames } from '../../../redux/actions/games'
import { showToastMessage } from '../../../redux/actions/toastNotification'

const ChooseGameConsole = ({ stepper, type }) => {

  const dispatch = useDispatch()
  const { consoles } = useSelector((state) => state.consoles)
  const { games } = useSelector((state) => state.games)
  const [selectedConsole, setSelectedConsole] = useState("")
  const [selectedGame, setSelectedGame] = useState("")

  const { register, errors, handleSubmit, trigger } = useForm()

  const onSubmit = () => {

    if (selectedGame && selectedConsole) {
      dispatch(setAddEditPopupData({
        gameId: selectedGame.value,
        game: selectedGame.label,
        consoleId: selectedConsole.value,
        console: selectedConsole.label
      }))
      trigger()
      if (isObjEmpty(errors)) {
        stepper.next()
      }
    } else {
      dispatch(showToastMessage("Please select game and console properly!", 'error'))
      return false
    }

  }

  useEffect(() => {
    dispatch(getConsoles())
    return () => {
      dispatch(removePaginatedConsoles([]))
    }
  }, [])

  useEffect(() => {
    dispatch(getGamesByConsoleId(selectedConsole?.value))
    setSelectedGame("")
    return () => {
        dispatch(removePaginatedGames())
    }
  }, [selectedConsole])

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Select Console and Game</h5>
        {/* <small>some text.</small> */}
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`console-${type}`}>
              Console
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`console-${type}`}
              className='react-select'
              classNamePrefix='select'
              options={consoles.map(console => ({
                value: console._id,
                label: console.name
              }))}
              onChange={(value) => setSelectedConsole(value)}
              defaultValue={consoles[0]}
              innerRef={register({ required: true })}
            />
          </FormGroup>
        </Row>
        <Row>
          <FormGroup tag={Col} md='6'>
            <Label className='form-label' for={`game-${type}`}>
              Game
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`game-${type}`}
              className='react-select'
              classNamePrefix='select'
              options={games.map(game => ({
                value: game._id,
                label: game.name
              }))}
              value={selectedGame}
              onChange={(value) => setSelectedGame(value)}
              defaultValue={games[0]}
              innerRef={register({ required: true })}
            />
          </FormGroup>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button.Ripple color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button.Ripple>
          <Button.Ripple type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
          </Button.Ripple>
        </div>
      </Form>
    </Fragment>
  )
}

export default ChooseGameConsole
