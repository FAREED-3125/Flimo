import React, { useEffect, useState } from 'react'

const useDimension = () => {
    const [innerWidth,setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize",handleResize);

        return () => {
            window.removeEventListener("resize",handleResize);
        }
    })
    
  return innerWidth
}

export default useDimension