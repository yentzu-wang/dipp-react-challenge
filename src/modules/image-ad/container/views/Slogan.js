import React from "react"

const Slogan = ({ data }) => {
  return (
    <div className="ad__slogan">
      <div>{data.ad.copys[0].splits[0].content}</div>
      <div>{data.ad.copys[0].splits[1].content}</div>
    </div>
  )
}

export default Slogan
