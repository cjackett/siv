import Link from 'next/link'

import { EmailSignup } from './EmailSignup'
import { consultation_link } from './ForGovernments'

const email = 'questions@secureinternetvoting.org'

export const Footer = (): JSX.Element => {
  return (
    <div className="columns">
      <div className="column">
        <EmailSignup />
      </div>
      <div className="column text-align-right">
        <h3>SIV</h3>
        <p>
          <Link href="/about">
            <a className="styled-link">About</a>
          </Link>
          <br />
          <Link href="/protocol">
            <a className="styled-link">Study Protocol</a>
          </Link>
          <br />
          <a className="styled-link" href={consultation_link}>
            For Governments
          </a>
          <br />
          <Link href="/faq">
            <a className="styled-link">Frequently Asked Questions</a>
          </Link>
        </p>
        <p>
          <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>
      <style jsx>{`
        .columns {
          padding: 3rem;
          display: flex;
          justify-content: space-between;
        }

        .column:first-child {
          margin-right: 15%;
        }

        .text-align-right {
          text-align: right;
        }

        a {
          color: #000;
        }

        a.styled-link {
          text-decoration: none;
          font-weight: bold;
        }

        a.styled-link:hover {
          text-decoration: underline;
        }

        /* Small screens: reduce horiz padding */
        @media (max-width: 750px) {
          .columns {
            padding: 17px 6vw;
            flex-direction: column;
          }

          .column:first-child {
            margin: 0;
            margin-bottom: 3rem;
          }

          .text-align-right {
            text-align: left;
          }
        }
      `}</style>
    </div>
  )
}
