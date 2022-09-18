import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingSkeleton({ count = 1 }) {
  return (
	<Skeleton count={count} />
  )
}
