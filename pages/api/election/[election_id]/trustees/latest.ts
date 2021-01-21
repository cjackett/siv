import { NextApiRequest, NextApiResponse } from 'next'

import { firebase } from '../../../_services'
import { transform_email_keys } from './commafy'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { auth, election_id } = req.query

  const election = firebase
    .firestore()
    .collection('elections')
    .doc(election_id as string)

  // Begin loading trustees immediately, instead of after awaiting election.get()
  const loadTrustees = election.collection('trustees').orderBy('index', 'asc').get()

  // Is election_id in DB?
  const doc = await election.get()
  if (!doc.exists) return res.status(400).send('Unknown Election ID.')

  // Grab safe prime parameters
  const data = { ...doc.data() }
  const parameters = { g: data.g, p: data.p, q: data.q, t: data.t }

  // Grab trustees
  const trustees = (await loadTrustees).docs.map((doc) => {
    const data = { ...doc.data() }
    // Add you: true if requester's own document
    if (data.auth_token === auth) {
      data.you = true
    }

    // Keep these fields private
    delete data.auth_token
    delete data.decryption_key
    delete data.private_coefficients
    delete data.pairwise_shares_for
    delete data.pairwise_randomizers_for
    delete data.decrypted_shares_from
    delete data.private_keyshare

    // Convert commas back into dots
    const decommafied = transform_email_keys(data, 'decommafy')

    return sortObject(decommafied)
  })

  res.status(200).json({ parameters, trustees })
}

const sortObject = (obj: Record<string, unknown>) =>
  Object.keys(obj)
    .sort()
    .reduce((memo, key) => ({ ...memo, [key]: obj[key] }), {})
