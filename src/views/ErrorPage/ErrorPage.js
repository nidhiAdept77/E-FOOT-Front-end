import React from 'react'
import errorImage from "../../assets/images/errorImage.png"
const ErrorPage = () => {
    return (
        <div className='card_error card'>
            <img src={errorImage} className="error_img m-auto img-responsive" />


        </div>
    )
}

export default ErrorPage