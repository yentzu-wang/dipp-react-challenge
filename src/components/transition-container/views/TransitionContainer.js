import React from "react"
import { useTransition, animated } from "react-spring"
import useWindowDimensions from "../../../utils/useWindowDimensions"

const TransitionContainer = ({
  children,
  show,
  setShow,
  childrenHeight = 0
}) => {
  const { height: windowHeight } = useWindowDimensions()

  const transitions = useTransition(show, null, {
    from: {
      position: "absolute",
      top: windowHeight,
      width: "100%",
      zIndex: 1050
    },
    enter: { top: windowHeight - childrenHeight },
    leave: { top: windowHeight },
    config: { friction: 30 }
  })

  const backgroundTransitions = useTransition(show, null, {
    from: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 1030,
      backgroundColor: "black",
      opacity: 0
    },
    enter: { opacity: 0.5 },
    leave: { opacity: 0 },
    config: { friction: 30 }
  })

  return (
    <>
      {backgroundTransitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              onClick={() => setShow(false)}
            />
          )
      )}
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props}>
              {children}
            </animated.div>
          )
      )}
    </>
  )
}

export default TransitionContainer
