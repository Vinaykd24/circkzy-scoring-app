import React, { useState } from 'react';
import { Button, Modal, Label, Radio, Form, Icon } from 'semantic-ui-react';
import TableGridPage from '../../pages/table-grid';
import batsManList from '../../data';
import matchData from '../../tempData';
import SelectionModalPage from '../../pages/modal/selection-modal';
import { firestore } from '../../firebase/config';

const exampleReducer = (state, action) => {
  switch (action.type) {
    case 'close':
      return { open: false };
    case 'open':
      return { open: true, size: action.size, dimmer: action.dimmer };
    default:
      throw new Error('Unsupported action...');
  }
};

const ScorePage = ({ homeTeam, awayTeam }) => {
  const [playerDoc, setPlayerDoc] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [totalWickets, setTotalWickets] = useState(0);
  const [totalExtras, setTotalExtras] = useState(0);
  const [totalBalls, setTotalBalls] = useState(0);
  const [totalOvers, setTotalOvers] = useState(0);
  const [isWicketFallen, setIsWicketFallen] = useState(false);
  const [prgressiveOver, setPrgressiveOver] = useState([]);
  const [striker, setStriker] = useState('bat1');
  const [nonStriker, setNonStriker] = useState('bat2');
  const [tempBatsmanList, setTempBatsmanList] = useState(batsManList);
  const [currentBowler, setCurrentBowler] = useState({
    id: 'bowl1',
    name: 'Nathan Lyon',
    balls: 0,
    overs: 0,
    wickets: 0,
    maidens: 0,
    runsGiven: 0,
    wides: 0,
    nbs: 0,
  });
  const [bowlerDetails, setBowlerDetails] = useState({
    bowl1: {
      id: 'bowl1',
      name: 'Nathan Lyon',
      balls: 0,
      overs: 0,
      wickets: 0,
      maidens: 0,
      runsGiven: 0,
      wides: 0,
      nbs: 0,
    },
    bowl2: {
      id: 'bowl2',
      name: 'Michel Starc',
      balls: 0,
      overs: 0,
      wickets: 0,
      maidens: 0,
      runsGiven: 0,
      wides: 0,
      nbs: 0,
    },
  });
  const [batsmenDetails, setBatsmenDetails] = useState({
    bat1: {
      id: 'bat1',
      name: 'Rohil Sharma',
      runs: 0,
      ballsPlayed: 0,
      fours: 0,
      sixes: 0,
    },
    bat2: {
      id: 'bat2',
      name: 'Shubham Gill',
      runs: 0,
      ballsPlayed: 0,
      fours: 0,
      sixes: 0,
    },
  });

  const updateWickets = () => {
    if (totalWickets <= 10) {
      setIsWicketFallen(true);
      setTotalWickets(totalWickets + 1);
      setPrgressiveOver(prgressiveOver.concat('W'));
      setCurrentBowler({
        ...currentBowler,
        wickets: currentBowler['wickets']++,
      });
    }
    updateOver();
    setPrgressiveOver(prgressiveOver.concat('W'));
  };

  const updateExtras = (extras, score) => {
    switch (extras) {
      case 'WB':
        setTotalScore(totalScore + 1);
        setTotalExtras(totalExtras + 1);
        setCurrentBowler({
          ...currentBowler,
          wides: currentBowler['wides'] + 1,
        });
        break;
      case 'NB':
        setTotalScore(totalScore + 1);
        setTotalExtras(totalExtras + 1);
        setCurrentBowler({
          ...currentBowler,
          wides: currentBowler['nbs'] + 1,
        });
        break;
      case 'B':
        setTotalScore(totalScore + 1);
        setTotalExtras(totalExtras + 1);
        break;
      case 'LB':
        setTotalScore(totalScore + 1);
        setTotalExtras(totalExtras + 1);
        break;
      default:
        break;
    }
  };

  const changeStriker = () => {
    const temp = striker;
    setStriker(nonStriker);
    setNonStriker(temp);
  };

  const updateBatsMan = () => {};

  const updateBatsManScore = (score) => {
    switch (score) {
      case 1:
      case 3:
        batsmenDetails[striker]['runs'] += score;
        changeStriker();
        break;
      case 2:
        batsmenDetails[striker]['runs'] += score;
        break;
      case 4:
        batsmenDetails[striker]['runs'] += score;
        batsmenDetails[striker]['fours']++;
        break;
      case 6:
        batsmenDetails[striker]['runs'] += score;
        batsmenDetails[striker]['sixes']++;
        break;
      default:
        break;
    }
    batsmenDetails[striker]['ballsPlayed']++;
  };

  const currentPartnerShip = () => {
    const runTotal =
      batsmenDetails['bat1']['runs'] + batsmenDetails['bat2']['runs'];
    const ballTotal =
      batsmenDetails['bat1']['ballsPlayed'] +
      batsmenDetails['bat2']['ballsPlayed'];
    return `${runTotal}(${ballTotal})`;
  };

  const updateScore = (score) => {
    setTotalScore(totalScore + score);
    updateBatsManScore(score);
    const bowlId = currentBowler['id'];
    // setCurrentBowler({
    //   ...currentBowler,
    //   runsGiven: currentBowler['runsGiven'] + score,
    // });
    currentBowler['runsGiven'] = currentBowler['runsGiven'] + score;
    setBowlerDetails((preStateValue) => ({
      ...preStateValue,
      [bowlId]: currentBowler,
    }));
    setPrgressiveOver(prgressiveOver.concat(score));
    updateOver();
  };

  const updateOver = () => {
    const _totalBalls = totalBalls + 1;
    const _totalOvers = calcOver(_totalBalls);
    setTotalBalls(_totalBalls);
    setTotalOvers(_totalOvers);
    const _currentBowlerTotalBalls = currentBowler['balls'] + 1;
    setCurrentBowler({
      ...currentBowler,
      balls: _currentBowlerTotalBalls,
      overs: calcOver(_currentBowlerTotalBalls),
    });
    if (_totalOvers % 1 === 0) {
      changeStriker();
      openModal();
    }
  };

  const calcOver = (balls) => {
    return Math.floor(balls / 6) + (balls % 6) / 10;
  };

  const updateBowler = (bowler) => {
    if (currentBowler['id'] !== bowler['id']) {
      setCurrentBowler(bowler);
      setBowlerDetails((prevStateValue) => ({
        ...prevStateValue,
        [currentBowler['id']]: currentBowler,
      }));
      dispatch({ type: 'close' });
    } else {
      alert('You can not select same bowler again!');
    }
  };

  const selectBatsman = (batsman) => {
    console.log('Select batsman logic goes here!');
    setIsWicketFallen(false);
    dispatch({ type: 'close' });
  };

  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size, dimmer } = state;

  const openModal = () => {
    console.log(isWicketFallen);
    dispatch({ type: 'open', size: 'mini', dimmer: 'blurring' });
  };

  const handleClick = () => {
    console.log('Clickeddd from child!');
  };

  React.useEffect(() => {
    console.log('Effect called');
    setIsWicketFallen(true);
    console.log(isWicketFallen);
    if (isWicketFallen) {
      openModal();
    }
  }, [totalWickets]);

  const tempSetDemoData = async () => {
    const batData = {
      name: 'Rohil Sharma',
      runs: 0,
      ballsPlayed: 0,
      fours: 0,
      sixes: 0,
      isOut: false,
      isStriker: false,
    };
    const bowlData = {
      name: 'Nathan Lyon',
      balls: 0,
      overs: 0,
      wickets: 0,
      maidens: 0,
      runsGiven: 0,
      wides: 0,
      nbs: 0,
      isCurrentBowler: false,
    };

    // return res;
  };

  const readCollection = async () => {
    const citiesRef = firestore.collection('matches');
    const snapshot = await citiesRef.get();
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  };

  React.useEffect(() => {
    const docRef = firestore.collection('matches').doc('xRYLB0CguU2ZfGRmpkAa');
    // const docRef = firestore.collection(
    //   '/matches/xRYLB0CguU2ZfGRmpkAa/inn1/batStats'
    // );
    // firestore.collection('players').doc('0TFXRjMv7Jl6VPaQOSkK').get()
    //   .then(snapshot => {
    //     snapshot.forEach(doc => {
    //       const data = doc.data();
    //       console.log(doc.id, data);
    //     });
    //   })
    //   .catch(err => {
    //     console.log('Error getting documents', err);
    //   });
    // docRef.get().then((document) => {
    //   if (document.exists) {
    //     console.log(document.data());
    //   }
    // });
    readCollection();
    // tempSetDemoData();
  }, []);

  return (
    <div>
      <div className="tc">
        <h1 className="mb0">
          {homeTeam} <span> VS </span>
          {awayTeam}
        </h1>
        <h1 className="ma0">
          <p className="mb0">{homeTeam}</p>
          {totalScore} / {totalWickets}
          <p className="f6 ml2">(Extras: {totalExtras})</p>
          <p className="f6">Overs: {totalOvers}</p>
        </h1>
        <h4 className="mt0 pv2">Current Partnership: {currentPartnerShip()}</h4>
      </div>
      <TableGridPage
        isBatsMan="true"
        batsmenDetails={batsmenDetails}
        currentBowler={currentBowler}
        handleClick={handleClick}
      />
      <div className="mh3">
        <Button size="huge" onClick={() => updateScore(1)}>
          1
        </Button>
        <Button size="huge" onClick={() => updateScore(2)}>
          2
        </Button>
        <Button size="huge" onClick={() => updateScore(3)}>
          3
        </Button>
        <Button size="huge" onClick={() => updateScore(4)}>
          4
        </Button>
        <Button size="huge" onClick={() => updateScore(6)}>
          6
        </Button>
        <Button size="huge" onClick={updateWickets}>
          Wicket
        </Button>
        <Button size="huge" onClick={() => updateExtras('WB')}>
          WB
        </Button>
        <Button size="huge" onClick={() => updateExtras('NB')}>
          NB
        </Button>
        <Button size="huge" onClick={() => updateExtras('B')}>
          B
        </Button>
        <Button size="huge" onClick={() => updateExtras('LB')}>
          LB
        </Button>
        <Button
          icon
          size="huge"
          onClick={() =>
            dispatch({
              type: 'open',
              size: 'mini',
              dimmer: 'blurring',
            })
          }
        >
          <Icon name="refresh" />
        </Button>
      </div>
      {/* <SelectionModalPage
        bowlerDetails={bowlerDetails}
        currentBowler={currentBowler}
        updateBowler={updateBowler}
      /> */}
      <>
        {isWicketFallen ? (
          <Modal
            size={size}
            open={open}
            dimmer={dimmer}
            onClose={() => dispatch({ type: 'close' })}
          >
            <Modal.Header>Select Next Batsman</Modal.Header>
            <Modal.Content>
              <p>Select Next Batsman</p>
              <div>
                {Object.entries(tempBatsmanList).map(([key, value], i) => (
                  <Form.Field key={i}>
                    <Radio
                      className="b"
                      key={i}
                      label={value['name']}
                      disabled={striker === value['id']}
                      onChange={() => selectBatsman(value)}
                    />
                  </Form.Field>
                ))}
              </div>
            </Modal.Content>
          </Modal>
        ) : (
          <Modal
            size={size}
            open={open}
            dimmer={dimmer}
            onClose={() => dispatch({ type: 'close' })}
          >
            <Modal.Header>Chanage Bowler</Modal.Header>
            <Modal.Content>
              <p>Are you sure you want to delete your account</p>
              <div>
                {Object.entries(bowlerDetails).map(([key, value], i) => (
                  <Form.Field key={i}>
                    <Radio
                      className="b"
                      key={i}
                      label={value['name']}
                      disabled={currentBowler['id'] === value['id']}
                      onChange={() => updateBowler(value)}
                    />
                  </Form.Field>
                ))}
              </div>
            </Modal.Content>
          </Modal>
        )}
      </>
    </div>
  );
};

export default ScorePage;
