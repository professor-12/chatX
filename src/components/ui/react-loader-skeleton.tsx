import React from 'react'
import Skeleton from "react-loading-skeleton"

const ReactSkeleton: React.FC<{ children: React.ReactNode }> | any = ({ children }) => {
      return (
            <div>{children}</div>
      )
}


ReactSkeleton.Circle = (props) => {
      return <Skeleton />
}

export default ReactSkeleton