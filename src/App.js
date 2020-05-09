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
  // const [
  //   shouldReduceMotion,
  //   setShouldReduceMotion
  // ] = React.useState(false);
  // React.useEffect(() => {
  //   const mediaQuery = window.matchMedia(
  //     '(prefers-reduced-motion: reduce)'
  //   );
  //   const handleMedia = e =>
  //     setShouldReduceMotion(e.matches);
  //   mediaQuery.addEventListener('change', handleMedia);
  //   return () =>
  //     mediaQuery.removeEventListener(
  //       'change',
  //       handleMedia
  //     );
  // }, []);
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
              <motion.span
                animate={
                  shouldReduceMotion ? undefined : true
                }
              >
                {vote.percentage}%
              </motion.span>
            </motion.li>
          ))}
        </motion.ul>
      </AnimateSharedLayout>
    </div>
  );
}

export default App;
