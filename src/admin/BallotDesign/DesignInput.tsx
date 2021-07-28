import router from 'next/router'
import { useState } from 'react'

import { api } from '../../api-helper'
import { SaveButton } from '../SaveButton'
import { revalidate, useStored } from '../useStored'
import { validate_ballot_design } from './validate-ballot-design'

const default_ballot_design = `[
  {
    "title": "Who should become President?",
    "options": [
      { "name": "George H. W. Bush" },
      { "name": "Bill Clinton" },
      { "name": "Ross Perot" }
    ],
    "write_in_allowed": true
  }
]`

export const DesignInput = () => {
  const [error, setError] = useState<string | null>()
  const { ballot_design: stored_ballot_design, election_id } = useStored()
  const [ballot_design, set_ballot_design] = useState(stored_ballot_design || default_ballot_design)

  return (
    <div className="container">
      {error && <span className="error">⚠️ &nbsp;{error}</span>}
      <textarea
        disabled={!!stored_ballot_design}
        id="ballot-design"
        value={ballot_design}
        onChange={(event) => {
          set_ballot_design(event.target.value)
          try {
            validate_ballot_design(event.target.value)

            // Passed validation
            setError(null)
          } catch (err) {
            console.warn(err)
            setError(err.message || err)
          }
        }}
      />

      {!stored_ballot_design && (
        <SaveButton
          disabled={!!error}
          onPress={async () => {
            const response = await api(`election/${election_id}/admin/save-ballot-design`, { ballot_design })

            if (response.status === 201) {
              revalidate(election_id)
              router.push(`${window.location.origin}/admin/${election_id}/voters`)
            } else {
              throw await response.json()
            }
          }}
        />
      )}

      <style jsx>{`
        textarea {
          border: 1px solid #ccc;
          border-radius: 4px;
          border-top-right-radius: 0;
          font-family: monospace;
          font-size: 12px;
          height: 200px;
          padding: 8px;
          resize: vertical;
          width: 100%;
          line-height: 17px;
        }

        textarea:disabled:hover {
          background: #f8f8f8;
          cursor: not-allowed;
        }

        .error {
          border: 1px solid rgba(255, 0, 0, 0.44);
          background-color: rgba(255, 183, 183, 0.283);
          padding: 2px 6px;
          border-radius: 4px;
          bottom: 5px;
          position: relative;
          font-size: 12px;
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}
