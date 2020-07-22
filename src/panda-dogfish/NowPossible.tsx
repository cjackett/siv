import { Section } from './Section'
import { SideBySide } from './SideBySide'

export const NowPossible = (): JSX.Element => (
  <Section>
    <SideBySide
      noDarkFilter
      graphic="hello-phone.png"
      headline={
        <>
          <i>Fast</i>, <i>private</i>, and <i>verifiable</i> internet voting is now possible.
        </>
      }
      text="For public voting systems, a risk-averse attitude is important. It's up to us all to defend the legitimacy of our citizen-led system of government."
    />
    <SideBySide
      flipped
      graphic="david-at-wef.jpg"
      graphicCaption="David Ernst, SIV Founder, speaking @ World Economic Forum on Democracy"
      headline="Now Practical"
      text="For the last four years, we have been piloting digital democracy demos with thousands of citizens, from all different backgrounds, geographies, and world views."
    />
  </Section>
)
