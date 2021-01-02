import { GlobalCSS } from '../GlobalCSS'
import { Ballot } from './Ballot'
import { EncryptionReceipt } from './EncryptionReceipt'
import { Instructions } from './Instructions'
import { SubmitButton } from './SubmitButton'
import { useElectionInfo } from './useElectionInfo'
import { useVoteState } from './useVoteState'
import { YourAuthToken } from './YourAuthToken'

export const AuthenticatedContent = ({ auth, election_id }: { auth: string; election_id: string }): JSX.Element => {
  // Initialize local vote state on client
  const [state, dispatch] = useVoteState(`store-${election_id}-${auth}`)

  useElectionInfo(dispatch, election_id)

  return (
    <>
      {state.submitted_at ? (
        <>
          <h1>Vote Submitted.</h1>
          <EncryptionReceipt {...{ state }} />
        </>
      ) : (
        <>
          <h1>Cast Your Vote</h1>
          <YourAuthToken {...{ auth, election_id }} />
          <div className="fade-in">
            <Instructions />
            <Ballot {...{ dispatch, election_id, state }} />
            <SubmitButton {...{ auth, dispatch, election_id, state }} />
          </div>
        </>
      )}

      <style jsx>{`
        .fade-in {
          animation: fadeIn ease 2s;
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
      <GlobalCSS />
    </>
  )
}
