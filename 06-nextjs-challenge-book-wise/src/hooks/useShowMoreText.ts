import { useState } from 'react'

export default function useShowMoreText(text: string, maxLength: number) {
  const [showMore, setShowMore] = useState(() => text.length <= maxLength)

  const buttonSeeMore = () => setShowMore((state) => !state)

  const textDescription = showMore ? text : text.slice(0, maxLength) + '...'

  return { textDescription, buttonSeeMore, isShowingMore: showMore }
}
