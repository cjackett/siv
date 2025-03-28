import { NextApiRequest, NextApiResponse } from 'next'

import { firebase, pushover } from './_services'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { question } = req.body

  // Store submission in Firestore
  await firebase
    .firestore()
    .collection('faq-submissions')
    .doc(new Date().toISOString() + ' ' + String(Math.random()).slice(2, 7))
    .set({
      created_at: new Date().toString(),
      question,
    })

  // Notify admin via Pushover
  pushover(`SIV FAQ submission`, question)

  // Send back success
  return res.status(201).json({ success: true })
}
