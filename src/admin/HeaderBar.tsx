import { UserOutlined } from '@ant-design/icons'
import Head from 'next/head'
import Link from 'next/link'

import { logout, useUser } from './auth'
import { useStored } from './useStored'

export const HeaderBar = (): JSX.Element => {
  const { user } = useUser()
  const { election_id, election_title } = useStored()
  return (
    <div className="container">
      <section className="left">
        <Link href="/">
          <a className="big">SIV</a>
        </Link>
      </section>

      <section className="right">
        <div className="title">
          {election_id && (
            <>
              <Head>
                <title key="title">SIV: Manage {election_title}</title>
              </Head>
              <Link href="/admin">
                <a className="back-btn">←</a>
              </Link>
              <div className="current-election">
                Managing: <i>{election_title}</i> <span>ID: {election_id}</span>
              </div>
            </>
          )}
        </div>

        <div
          className="login-status"
          onClick={() => {
            const pressed_ok = confirm('Do you wish to logout?')
            if (pressed_ok) logout()
          }}
        >
          <UserOutlined />
          &nbsp; {user.name}
        </div>
      </section>
      <style jsx>{`
        .container {
          background: rgb(1, 5, 11);
          background: linear-gradient(90deg, #010b26 0%, #072054 100%);

          color: #fff;

          display: flex;
          align-content: center;

          width: 100%;
        }

        .left {
          width: 250px;
          padding: 1rem;
        }

        .title {
          display: flex;
        }

        .back-btn {
          margin-right: 18px;
          color: #fff;
          opacity: 0.4;
          border-radius: 100px;
          width: 30px;
          height: 30px;
          line-height: 30px;
          font-weight: 700;
          text-align: center;
        }

        .back-btn:hover {
          opacity: 0.9;
          background: #fff2;
          cursor: pointer;
          text-decoration: none;
        }

        .current-election span {
          display: block;
          text-transform: uppercase;
          font-size: 10px;
          opacity: 0.8;
        }

        .current-election {
          font-size: 14px;
        }

        .right {
          width: 100%;
          margin: 0 auto;
          padding: 1rem 0rem;

          display: flex;

          justify-content: space-between;
        }

        .big {
          font-size: 24px;
          font-weight: 700;
          color: #ddd;
        }

        .big:hover {
          color: #fff;
        }

        a:not(:first-child) {
          margin-left: 3rem;
          color: white;
          font-size: 16px;
          text-decoration: none;
          font-weight: 400;
        }

        a:hover {
          text-decoration: underline;
        }

        a.big:hover {
          text-decoration: none;
        }

        .login-status {
          font-size: 16px;
          padding: 3px 10px;
          border-radius: 4px;

          display: flex;
          align-items: center;

          margin-right: 1rem;
        }

        .login-status:hover {
          background: #fff2;
          cursor: pointer;
        }

        @media (max-width: 600px) {
          a:not(:first-child) {
            margin-left: 0;
            margin-top: 0.5rem;
          }

          .left {
            display: flex;
            flex-direction: column;
          }

          .container > div {
            flex-direction: column;
            padding: 1rem;
          }

          .login-status {
            margin-top: 0.5rem;
            margin-left: -10px;
          }
        }
      `}</style>
    </div>
  )
}
