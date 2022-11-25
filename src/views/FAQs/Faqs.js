import React from 'react'
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl'
import Breadcrumbs from '@components/breadcrumbs'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import "./faqs.css"
const Faqs = () => {

    return (
        <>
            <Breadcrumbs breadCrumbTitle={<FormattedMessage id="FAQs" />} breadCrumbActive={<FormattedMessage id="FAQs" />} />
            <Col md="12">
                <Card>
                    {/* <CardHeader>
                        <CardTitle tag='h3' className='w-100'>
                            <h1>FAQs</h1>
                            <hr />
                        </CardTitle>
                    </CardHeader> */}
                    <CardBody>
                        <Row>
                            <Col lg='12'>
                                {/* <div className="accordion">
                                    <ul className="list-group">
                                        <li className="list-group-item" data-toggle="collapse" data-target="#html">
                                            <h3>HTML</h3>
                                            <div id="html" className="collapse ">
                                                <p id='faq_desc'>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat.
                                                </p>
                                            </div>
                                        </li>
                                        <li className="list-group-item" data-toggle="collapse" data-target="#css">
                                            <h3>CSS</h3>
                                            <div id="css" className="collapse ">
                                                <p id='faq_desc'>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat.
                                                </p>
                                            </div>
                                        </li>
                                        <li
                                            className="list-group-item"
                                            data-toggle="collapse"
                                            data-target="#javascript"
                                        >
                                            <h3>JAVASCRIPT</h3>
                                            <div id="javascript" className="collapse ">
                                                <p id='faq_desc'>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat.
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div> */}

                                <div className="accordion acc_faq mt-1" id="accordionExample">
                                    <div className="card card_faq">
                                        <div className="card-header mb-2" id="headingOne">
                                            <h3 className="mb-0 faq_header w-100">
                                                <button
                                                    className="btn "
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target="#collapseOne"
                                                    aria-expanded="true"
                                                    aria-controls="collapseOne"

                                                >
                                                    <b> 1.</b>  What is e-foot ?
                                                </button>
                                            </h3>
                                        </div>
                                        <div
                                            id="collapseOne"
                                            className="collapse show"
                                            aria-labelledby="headingOne"
                                            data-parent="#accordionExample"
                                        >
                                            <div className="card-body pl-3 pr-3 pt-1 pb-1">
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                                terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
                                                skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                                                Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
                                                single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh
                                                helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                                                proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                                beer farm-to-table, raw denim aesthetic synth nesciunt you probably
                                                haven't heard of them accusamus labore sustainable VHS.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card card_faq">
                                        <div className="card-header mb-2" id="headingTwo">
                                            <h3 className="mb-0 faq_header w-100" >
                                                <button
                                                    className="btn collapsed"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target="#collapseTwo"
                                                    aria-expanded="false"
                                                    aria-controls="collapseTwo"
                                                >
                                                    <b> 2.</b> How to e-foot ?
                                                </button>
                                            </h3>
                                        </div>
                                        <div
                                            id="collapseTwo"
                                            className="collapse"
                                            aria-labelledby="headingTwo"
                                            data-parent="#accordionExample"
                                        >
                                            <div className="card-body pl-3 pr-3 pt-1 pb-1">
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                                terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
                                                skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                                                Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
                                                single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh
                                                helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                                                proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                                beer farm-to-table, raw denim aesthetic synth nesciunt you probably
                                                haven't heard of them accusamus labore sustainable VHS.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card card_faq">
                                        <div className="card-header mb-2" id="headingTwo">
                                            <h3 className="mb-0 faq_header w-100" >
                                                <button
                                                    className="btn collapsed"
                                                    type="button"
                                                    data-toggle="collapse"
                                                    data-target="#collapseThree"
                                                    aria-expanded="false"
                                                    aria-controls="collapseTwo"
                                                >
                                                    <b> 3.</b> Why e-foot ?
                                                </button>
                                            </h3>
                                        </div>
                                        <div
                                            id="collapseThree"
                                            className="collapse"
                                            aria-labelledby="headingTwo"
                                            data-parent="#accordionExample"
                                        >
                                            <div className="card-body pl-3 pr-3 pt-1 pb-1">
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                                terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
                                                skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
                                                Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
                                                single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh
                                                helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                                                proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                                                beer farm-to-table, raw denim aesthetic synth nesciunt you probably
                                                haven't heard of them accusamus labore sustainable VHS.
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </>
    )
}

export default Faqs