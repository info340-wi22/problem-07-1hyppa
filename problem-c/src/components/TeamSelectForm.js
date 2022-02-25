import React, { useState } from 'react'; //import React Component

export default function TeamSelectForm(props) {

  //Your work goes here
  const [selectValue, setSelectValue] = useState('');
  const [runnerUps, setRunnerUps] = useState(false);

  const optionElems = props.teamOptions.map((teamName) => {
    return <option key={teamName} value={teamName}>{teamName}</option>
  })
  //select callbackFunction
  const handleSelectChange = function(event) {
    if(event.target.value !== selectValue) {
      setSelectValue(event.target.value);
    }
  }

  //runner upCallBack
  const handleRunnerUpChange = function(event) {
    if (event.target.checked !== runnerUps);
    setRunnerUps(event.target.checked);
  }

  const handleClickButton = function() {
    props.applyFilterCallback(selectValue, runnerUps);
  }


  return (
    <div className="row align-items-center mb-3">
      <div className="col-auto">
        <select id="teamSelect" className="form-select" value={selectValue} onChange={handleSelectChange}>
          <option value="">Show all teams</option>
          {optionElems}
        </select>
      </div>
      <div className="col-auto">
        <div className="form-check">
          <input id="runnerupCheckbox" type="checkbox" className="form-check-input" checked={runnerUps} onChange={handleRunnerUpChange}/>
          <label htmlFor="runnerupCheckbox" className="form-check-label">Include runner-up</label>
        </div>
      </div>
      <div className="col-auto">
        <button id="submitButton" type="submit" className="btn btn-warning" onClick={handleClickButton}>Apply Filter</button>
      </div>
    </div>
  );
}