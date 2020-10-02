import { research } from './research'

export const Content = () => (
  <main>
    {/* Crypto Research */}
    <div className="columns">
      <h2 className="left">Powering SIV</h2>
      <div>
        {research.map(({ history, tech }, index) => (
          <div key={index}>
            <h4>{tech}</h4>
            <p>{history}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Core Tech */}
    <div className="columns">
      <h2 className="left">Technologies Used</h2>
      <p>
        <b>1:</b> WebCrypto RNG
        <br />
        <b>2:</b> V8-fast Javascript <br />
        <br />
        Other helpful technologies: <br />
        <b>3:</b> JSBI, from Stanford <br />
        <b>4:</b> React, from Facebook <br />
        <b>5:</b> Typescript, from Microsoft
      </p>
    </div>

    {/* Team */}
    <div className="columns">
      <div className="left">
        <img src="about/david.jpg" style={{ height: 'auto', width: '80%' }} />
      </div>
      <div>
        <h4>Project led by David Ernst</h4>
        <p>
          David believes people should be able to vote without being afraid they will get sick in a pandemic. This
          drives him to give governments the opportunity to let citizens safely vote online.
        </p>
        <p>
          Originally from Dallas, Texas, David left high school early to pursue a degree in Mathematics and Philosophy
          at Bard College at Simon’s Rock. As CTO of Numerai, he helped build an AI-run, crowd-sourced hedge fund that
          uses competition to predict the stock market.
        </p>
        <p>
          Over the years he’s built software for education, personal health, commercial construction, and more, used by
          thousands of people worldwide.
        </p>
        <p>He’s passionate about political reform, and even ran for office in California in the 2018 election.</p>
      </div>
    </div>

    <style jsx>{`
      main {
        max-width: 1020px;
        width: 100%;
        margin: 2rem auto;
        padding: 2rem;
      }

      p {
        white-space: pre-wrap;
      }
      .columns {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8rem;
      }
      .columns > * {
        width: 49%;
      }
      .left {
        margin-top: 22px;
      }

      @media (max-width: 600px) {
        .columns {
          flex-direction: column;
        }

        .columns > * {
          width: 100%;
        }
      }
    `}</style>
  </main>
)
