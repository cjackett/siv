import Pusher, { Channel } from 'pusher-js'
import { useEffect } from 'react'
import useSWR, { mutate } from 'swr'

const pusher = new Pusher('9718ba0612df1a49e52b', { cluster: 'us3' })

export const api = (route: string, body?: Record<string, unknown>) =>
  fetch(`/api/${route}`, {
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

// Pusher.logToConsole = true

const channelCache: Record<string, Channel> = {}

export const useData = (key: string, [channelName, eventName]: [string | undefined, string]) => {
  // If given pusher channel & event names, revalidate on activity
  useEffect(() => {
    if (channelName && eventName) {
      // Subscribe to channel
      channelCache[channelName] = pusher.subscribe(channelName)
      // console.log('Subscribed to', channelName)
      channelCache[channelName].bind(eventName, () => {
        console.log(`🆕 ${channelName} - ${eventName}`)
        mutate(cacheKey)
      })

      return () => {
        // console.log('Unsubscribing from', channelName)
        channelCache[channelName].unbind()
      }
    }
  }, [channelName, eventName])

  const cacheKey = key.includes('undefined') ? null : `${window.location.origin}/api/${key}`

  return useSWR(cacheKey, (url: string) =>
    fetch(url).then(async (r) => {
      if (!r.ok) throw await r.json()
      return await r.json()
    }),
  ).data
}
