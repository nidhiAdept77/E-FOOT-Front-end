import React from "react"
import RingLoader from "react-spinners/RingLoader"

const LoaderComponent = ({loading}) => {
  
  return loading && <div className="sweet-loading">
    <RingLoader color="#7367f0" loading={loading} style={{ 
          display: "block",
          margin: "0 auto"
    }} size={100} />
  </div>
}
export default LoaderComponent