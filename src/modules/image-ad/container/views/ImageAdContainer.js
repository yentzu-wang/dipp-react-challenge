import React, { useRef } from "react"
import domtoimage from "dom-to-image"
import { saveAs } from "file-saver"
import Logo from "./Logo"
import Slogan from "./Slogan"
import data from "../../../../metadata.json"

const ImageAdContainer = () => {
  const adRef = useRef()

  return (
    <div className="ad" ref={adRef}>
      <div
        style={{
          backgroundImage: `url(${data.images["6622323f427dfaac"].resource})`,
          width: 1080,
          height: 1080,
          position: "relative"
        }}
      >
        <Logo data={data} />
        <Slogan data={data} />
      </div>
      <br />
      <button
        onClick={() => {
          const node = adRef?.current

          domtoimage.toBlob(node).then(blob => {
            saveAs(blob, "my-node.png")
          })
        }}
      >
        Download!
      </button>
    </div>
  )
}

export default ImageAdContainer
