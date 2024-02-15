import { type ClassValue, clsx } from 'clsx'
import qs from 'query-string'
import { twMerge } from 'tailwind-merge'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date()
  const timeDifference = now.getTime() - createdAt.getTime()

  // Define time units in milliseconds
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const month = 30 * day
  const year = 365 * day

  if (timeDifference < minute) {
    const seconds = Math.floor(timeDifference / 1000)
    return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`
  } else if (timeDifference < hour) {
    const minutes = Math.floor(timeDifference / minute)
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
  } else if (timeDifference < day) {
    const hours = Math.floor(timeDifference / hour)
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
  } else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day)
    return `${days} ${days === 1 ? 'day' : 'days'} ago`
  } else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week)
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`
  } else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month)
    return `${months} ${months === 1 ? 'month' : 'months'} ago`
  } else {
    const years = Math.floor(timeDifference / year)
    return `${years} ${years === 1 ? 'year' : 'years'} ago`
  }
}

// Example usage:
// const createdAt = new Date('2023-11-25T12:00:00')
// console.log(result)

// hello there

// const newdate = new Date('2023-11-25T12:00:00')

// const result = getTimestamp(newdate)

// console.log(result)

export const formatNumber = (num: number): string => {
  if (num < 1000) {
    return num.toString()
  } else if (num < 1000000) {
    return (num / 1000).toFixed(1) + 'k'
  } else {
    return (num / 1000000).toFixed(1) + 'm'
  }
}

export const getJoinedDate = (date: Date): string => {
  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getFullYear()

  // creating joinging date (e.g : September 2025)
  const joinedDate = `${month} ${year}`

  return joinedDate
}

interface UrlformUrlQuery {
  params : string
  key : string
  value: string | null
}

export const formUrlQuery = ({ params, key, value }: UrlformUrlQuery) => {
  const currentUrl = qs.parse(params)

  currentUrl[key] = value

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl
  },
  { skipNull: true }
  )
}

interface removeUrlQueryParams {
  params : string
  keysToRemove : string[]
}

export const removeKeysFromQuery = ({ params, keysToRemove }: removeUrlQueryParams) => {
  const currentUrl = qs.parse(params)

  keysToRemove.forEach((key) => {
    delete currentUrl[key]
  })

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl
  },
  { skipNull: true }
  )
}
