import Link from 'next/link'
import { api } from 'src/api-helper'
import { useDecryptedVotes } from 'src/status/use-decrypted-votes'

import { revalidate, useStored } from '../useStored'
import { useIsUnlockBlocked } from './use-is-unlock-blocked'

export const UnlockedStatus = () => {
  const { election_id, notified_unlocked, valid_voters } = useStored()
  const num_voted = valid_voters?.filter((v) => v.has_voted).length || 0
  const unlocked_votes = useDecryptedVotes()
  const isUnlockBlocked = useIsUnlockBlocked()

  if (!num_voted || !unlocked_votes || (!isUnlockBlocked && !unlocked_votes.length)) return null

  const more_to_unlock = num_voted > unlocked_votes.length

  return (
    <div className={more_to_unlock || isUnlockBlocked ? 'warning' : ''}>
      {isUnlockBlocked ? (
        <p>
          ⚠️ Unlocking: Waiting on Observer <i> {isUnlockBlocked}</i>
        </p>
      ) : !more_to_unlock ? (
        <p>
          ✅ Successfully{' '}
          <Link href={`/election/${election_id}`}>
            <a className="status" target="_blank">
              unlocked {unlocked_votes.length}
            </a>
          </Link>{' '}
          votes.{' '}
          {notified_unlocked !== unlocked_votes.length ? (
            <a
              onClick={async () => {
                await api(`election/${election_id}/admin/notify-unlocked`)
                revalidate(election_id)
              }}
            >
              Notify voters?
            </a>
          ) : (
            <b>Voters notified.</b>
          )}
        </p>
      ) : (
        <p>
          ⚠️ You unlocked {unlocked_votes.length} of {num_voted} votes.
        </p>
      )}
      <style jsx>{`
        div {
          border: 1px solid rgba(26, 89, 0, 0.66);
          background: rgba(0, 128, 0, 0.07);
          border-radius: 5px;

          padding: 10px;
          margin-bottom: 15px;
        }

        div.warning {
          border-color: rgba(175, 157, 0, 0.66);
          background: rgba(237, 177, 27, 0.07);
        }

        p {
          margin: 0;
        }

        i {
          font-weight: 500;
        }

        a {
          font-weight: 600;
          cursor: pointer;
        }

        a.status {
          color: black;
          font-weight: 500;
        }

        b {
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}
