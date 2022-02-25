import React, { useState } from 'react'; //import React Component

import _ from 'lodash'; //import external library!

export default function GameDataTable(props) {

  //Your work goes here
  const [sortByCriteria, setSortByCriteria] = useState(null);
  const [isAscending, setIsAscending] = useState(null);

  const handleClick = function (event) {
    if (event.currentTarget.name !== sortByCriteria) {
      setSortByCriteria(event.currentTarget.name);
      setIsAscending(true);
    } else {
      if (isAscending) {
        setIsAscending(false);
      } else {
        setIsAscending(null);
        setSortByCriteria(null);
      }
    }
  }

  let sortedArr = _.sortBy(props.data, sortByCriteria);
  // sort criteria is not null & isn't ascending
  if (sortByCriteria != null && !isAscending) {
    _.reverse(sortedArr);
  }


  //convert data into rows
  const rows = sortedArr.map((match) => {
    return <GameDataRow key={match.year} game={match} />
  });

  function determinePropBoolean(sortButtonName) {
    if(sortButtonName === sortByCriteria && isAscending) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>
              Year
              <SortButton name="year" onClick={handleClick} active={"year" === sortByCriteria} ascending={determinePropBoolean("year")}/>
            </th>
            <th className="text-end">
              Winner
              <SortButton name="winner" onClick={handleClick} active={"winner" === sortByCriteria} ascending={determinePropBoolean("winner")}/>
            </th>
            <th className="text-center">
              Score
              <SortButton name="score" onClick={handleClick} active={"score" === sortByCriteria} ascending={determinePropBoolean("score")}/>
            </th>
            <th>
              Runner-Up
              <SortButton name="runner_up" onClick={handleClick} active={"runner_up" === sortByCriteria} ascending={determinePropBoolean("runner_up")}/>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}

//Component for managing display logic of sort button
//Props:
//  `active` [boolean] if icon should be highlighted,
//  `ascending` [boolean] if icon should be in ascending order (flipped)
//  `onClick` [function] click handler (passthrough)
function SortButton(props) {
  // console.log(props.ascending);
  // console.log(props.onClick);
  let iconClasses = ""
  if (props.active) { iconClasses += ` active` }
  if (props.ascending) { iconClasses += ` flip` };

  return (
    <button className="btn btn-sm btn-sort" name={props.name} onClick={props.onClick}>
      <span className={"material-icons" + iconClasses} aria-label={`sort by ${props.name}`}>sort</span>
    </button>
  );
}

function GameDataRow({ game }) { //game = props.game
  return (
    <tr>
      <td>{game.year}</td>
      <td className="text-end">{game.winner} {game.winner_flag}</td>
      <td className="text-center">{game.score}</td>
      <td>{game.runner_up_flag}&nbsp;&nbsp;{game.runner_up}</td>
    </tr>
  );
}
