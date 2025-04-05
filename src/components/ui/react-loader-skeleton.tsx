import React from 'react'
import Skeleton, { SkeletonProps } from "react-loading-skeleton"

const ReactSkeleton: React.FC<{ children: React.ReactNode }> | any = ({ children }) => {
      return (
            <div>{children}</div>
      )
}


ReactSkeleton.Circle = (props?: { size: string | number }) => {
      const { } = props.size
      return <Skeleton borderRadius={"50%"}  {...props} />
}

ReactSkeleton.Square = (props: SkeletonProps) => {
      return <Skeleton {...props} />
}

ReactSkeleton.Reactangle = (props: SkeletonProps) => {
      return <Skeleton {...props} />
}




export default ReactSkeleton