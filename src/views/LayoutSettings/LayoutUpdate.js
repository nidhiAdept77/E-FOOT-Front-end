import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Card, Row, Col, Label, Input, CardBody, Form, FormGroup, Button } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import LoaderComponent from '../components/Loader'
import Breadcrumbs from '@components/breadcrumbs'
import {getLayoutSettingById, removeLayourSetting, updateLayourSetting} from '@src/redux/actions/layoutSettings'
import {useParams, useHistory, Link} from 'react-router-dom'
import _ from 'underscore'
import '@styles/react/libs/editor/editor.scss'
import Editor from '../components/Editor'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import classnames from 'classnames'
import FormFeedback from 'reactstrap/lib/FormFeedback'
import { showToastMessage } from '../../redux/actions/toastNotification'


const LayoutSettingsUpdate = ({ loading, layoutSetting, getLayoutSettingById, removeLayourSetting, updateLayourSetting, showToastMessage }) => {
    const {id} = useParams()
    const [page, setPage] = useState('')
    const [position, setPosition] = useState('')
    const [html, setHtml] = useState('')
    const history = useHistory()
    const LayoutSettingsSchema = yup.object().shape({
        page: yup.string().required(),
        position: yup.string().required()
    })

    const { register, errors, handleSubmit } = useForm({ mode: 'onBlur', resolver: yupResolver(LayoutSettingsSchema) })

    const onSubmit = async data => {
        data = {...data, html, id, isProdVisible: true}
        if (_.isEmpty(errors)) {
            try {
                const result = await updateLayourSetting(data)
                if (result.success) {
                    showToastMessage(result.message, 'success')
                    history.push("/layout-settings")
                } else {
                    showToastMessage(result.message, 'error')
                }
            } catch (error) {
                console.error('error: ', error)
                showToastMessage(error.message, 'error')
            }
        }
    }

    useEffect(() => {
        getLayoutSettingById(id)
        return () => {
            removeLayourSetting()
        }
    }, [])

    useEffect(() => {
        if (!_.isEmpty(layoutSetting)) {
            setPage(layoutSetting.page)
            setPosition(layoutSetting.position)
            setHtml(layoutSetting.html)
        }

    }, [layoutSetting])

    return (
        <>
            <Breadcrumbs breadCrumbParent={<Link to='/layout-settings'><FormattedMessage id="Layout Settings" /></Link>} breadCrumbTitle={<FormattedMessage id="Layout Settings Update" />} breadCrumbActive={<FormattedMessage id="Layout Settings Update" />} />
            <Card>
                <LoaderComponent loading={loading} />
                <CardBody>
                    {layoutSetting ? 
                        (<Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col md='6' sm='12'>
                                    <FormGroup>
                                        <Label for='Page'>Page</Label>
                                        <Input type='text' name='page' id='Page' value={page} placeholder="Page"
                                        className={classnames({ 'is-invalid': errors['page'] })}
                                        onChange={e => setPage(e.currentTarget.value)}
                                        innerRef={register({ required: true, validate: value => value !== '' })}
                                        invalid={errors.page && true} readOnly
                                        />
                                        {errors && errors.page && <FormFeedback>{errors.page.message}</FormFeedback>}
                                    </FormGroup>
                                </Col>
                                <Col md='6' sm='12'>
                                    <FormGroup>
                                        <Label for='position'>Position</Label>
                                        <Input type='text' name='position' id='position' placeholder='Position' value={position} className={classnames({ 'is-invalid': errors['position'] })}
                                        onChange={e => setPosition(e.currentTarget.value)}
                                        innerRef={register({ required: true, validate: value => value !== '' })}
                                        invalid={errors.position && true} readOnly
                                        />
                                        {errors && errors.position && <FormFeedback>{errors.position.message}</FormFeedback>}
                                    </FormGroup>
                                </Col>
                                <Col md='12'>
                                    <FormGroup>
                                        <Label for='html'>HTML</Label>
                                        <Editor value={html} changeHandler={html => {
                                            setHtml(html)
                                        }}/>
                                    </FormGroup>
                                </Col>
                                <Col sm='6'>
                                    {/* <FormGroup className='d-flex mb-0'> */}
                                    <Button.Ripple type='submit' color='primary'>
                                        Update Layout Settings
                                    </Button.Ripple>
                                    {/* </FormGroup> */}
                                </Col>
                            </Row>
                        </Form>)
                    : null}
                
                </CardBody>
                </Card>
        </>
    )
}

LayoutSettingsUpdate.propTypes = {
    loading: PropTypes.bool.isRequired,
    layoutSetting: PropTypes.array.isRequired,
    getLayoutSettingById: PropTypes.func.isRequired,
    removeLayourSetting: PropTypes.func.isRequired,
    updateLayourSetting: PropTypes.func.isRequired,
    showToastMessage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    loading: state.layoutSettings.loading,
    layoutSetting: state.layoutSettings.layoutSetting
})

export default connect(mapStateToProps, {getLayoutSettingById, removeLayourSetting, updateLayourSetting, showToastMessage})(LayoutSettingsUpdate)