import React from 'react';
import random from 'lodash.random';
import logo, {
  ReactComponent as ReactLogo
} from './logo.svg';
import {
  transform,
  motion,
  AnimateSharedLayout,
  useReducedMotion
} from 'framer-motion';
import './App.css';

const generateVotes = prevVotes => {
  prevVotes[0].percentage = random(20, 80);
  prevVotes[1].percentage =
    100 - prevVotes[0].percentage;
  return [...prevVotes];
};

function App() {
  const shouldReduceMotion = useReducedMotion();

  const logoRef = React.useRef();
  React.useLayoutEffect(() => {
    shouldReduceMotion
      ? logoRef.current.pauseAnimations()
      : logoRef.current.unpauseAnimations();
  }, [shouldReduceMotion]);

  const [votes, setVotes] = React.useState(
    generateVotes([
      {
        party: 'R',
        minColor: '#b8383d',
        maxColor: '#f55385',
        percentage: 50
      },
      {
        party: 'D',
        minColor: '#498ba7',
        maxColor: '#3794ff',
        percentage: 50
      }
    ])
  );

  React.useEffect(() => {
    window.setTimeout(() => {
      setVotes(generateVotes(votes));
    }, 5000);
  }, [votes]);

  return (
    <div className="App">
      <ReactLogo
        src={logo}
        ref={logoRef}
        className="App-logo"
        alt="logo"
      />
      <AnimateSharedLayout>
        <motion.ul className="Votes">
          {votes.map(vote => (
            <motion.li
              animate={
                shouldReduceMotion ? undefined : true
              }
              key={vote.party}
              style={{
                width: `${vote.percentage}%`,
                background: transform(
                  vote.percentage,
                  [0, 100],
                  [vote.minColor, vote.maxColor]
                )
              }}
            >
              <motion.div
                animate={
                  shouldReduceMotion ? undefined : true
                }
              >
                {vote.percentage}%
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>
      </AnimateSharedLayout>
    </div>
  );
}

export default App;
