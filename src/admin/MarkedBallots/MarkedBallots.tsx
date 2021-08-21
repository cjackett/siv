import { useDecryptedVotes } from 'src/status/use-decrypted-votes'

import { PDF } from './PDF'

export const MarkedBallots = () => {
  const votes = useDecryptedVotes()

  return (
    <>
      <h2>Marked Ballots</h2>
      {!votes?.length ? (
        <>
          <p>There are no Unlocked votes yet.</p>
          <p>
            You can unlock votes from the <b>Voters</b> tab.
          </p>
        </>
      ) : (
        <>
          <PDF />
          {votes.map((vote) => (
            <p key={vote.verification}>{JSON.stringify(vote)}</p>
          ))}
        </>
      )}
    </>
  )
}
