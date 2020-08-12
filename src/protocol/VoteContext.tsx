import { map, mapValues, merge } from 'lodash'
import { createContext, useContext, useMemo, useReducer } from 'react'

import { encode } from './crypto/encode'
import encrypt from './crypto/encrypt'
import pickRandomInteger from './crypto/pick-random-integer'
import { Big, big } from './crypto/types'
import { candidates, public_key, voters } from './election-parameters'

const rand = () => pickRandomInteger(public_key.modulo).toString().padStart(public_key.modulo.toString().length, '0')
export const randEncrypted = () => `{ message: ${rand()}, unlock: ${rand()} }`

const initState = {
  encrypted: { token: voters[0].token },
  otherSubmittedVotes: voters.slice(1).map(({ token }) => ({
    mayor_vote: randEncrypted(),
    token,
    verification: randEncrypted(),
  })),
  plaintext: { mayor_vote: candidates[1], verification: '' },
  randomizer: {},
}

function reducer(prev: State, payload: Payload) {
  const newState = merge({ ...prev }, { plaintext: payload })

  // Encrypt values
  const randomizer: Partial<VoteMap> = {}
  const encrypted = mapValues(newState.plaintext, (value, key) => {
    const random = pickRandomInteger(public_key.modulo)
    randomizer[key] = random.toString()
    const cipher = encrypt(public_key, random, big(encode(value as string)))

    return `{ \n${map(cipher, (value: Big, key) => `\t${key}: ${value.toString()}`).join(',\n')} \n}`
  })

  return merge(newState, { encrypted, randomizer })
}

// Boilerplate to be easier to use

type VoteMap = { [index: string]: string; mayor_vote: string; verification: string }
export type VoteWithToken = VoteMap & { token: string }
type State = {
  encrypted: Partial<VoteWithToken>
  otherSubmittedVotes: VoteWithToken[]
  plaintext: Partial<VoteMap>
  randomizer: Partial<VoteMap>
}

type Payload = Partial<VoteMap>

const Context = createContext<{ dispatch: (payload: Payload) => void; state: State }>({
  dispatch: (payload: Payload) => void payload,
  state: initState,
})

export function VoteContextProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(reducer, initState)
  const memoized = useMemo(() => ({ dispatch, state }), [dispatch, state])

  return <Context.Provider value={memoized}>{children}</Context.Provider>
}

export const useVoteContext = () => useContext(Context)
