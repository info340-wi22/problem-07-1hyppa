const raf = require('raf') //fix raf warning, redux!

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

//import { render, screen } from '@testing-library/react';

// Console errors cause test failures
console['error'] = (errorMessage) => { expect(errorMessage.split('\n', 1)[0]).toBe("") }

//Enzyme config
Enzyme.configure({ adapter: new Adapter() });

//solution classes
import App from  './src/components/App';
import GameDataTable from './src/components/GameDataTable';
import TeamSelectForm from './src/components/TeamSelectForm';

//test data
const TEST_GAMES = [
  {
    "year": 2010,
    "winner": "Team B",
    "winner_flag":"🙂",
    "score": "3-0",
    "runner_up": "Team C",
    "runner_up_flag":"🙂"
  },
  {
    "year": 2014,
    "winner": "Team D",
    "winner_flag":"🙂",
    "score": "2-0",
    "runner_up": "Team A",
    "runner_up_flag":"🙂"
  },
  {
    "year": 2018,
    "winner": "Team A",
    "winner_flag":"🙂",
    "score": "1-0",
    "runner_up": "Team B",
    "runner_up_flag":"🙂"
  }
];

//D winner: 1, D runner-up: 0
//B winner: 1, B runner-up: 2
//A winner: 1, A runner-up: 2
//C winner: 0, C runner-up: 1

const INDEX_OF_YEAR = {} //for reverse lookup of order
INDEX_OF_YEAR[TEST_GAMES[0].year] = 0
INDEX_OF_YEAR[TEST_GAMES[1].year] = 1
INDEX_OF_YEAR[TEST_GAMES[2].year] = 2

const TEST_TEAMS = ['Team A', 'Team B', 'Team C', 'Team D'];


/* Begin the tests */

describe('The game browser app', () => {

  it('renders without crashing (all components)', () => {
    mount(<App gameData={TEST_GAMES}/>)
  });

  describe('The GameDataTable Component', () => {

    //determine current order of the rows, for simple comparison
    function getCurrentRowOrder(currWrapper) {
      const tableRows = currWrapper.find('tbody tr');
      const firstRowCells = tableRows.at(0).children('td');
      const secondRowCells = tableRows.at(1).children('td');
      const thirdRowCells = tableRows.at(2).children('td');

      return [
        INDEX_OF_YEAR[firstRowCells.at(0).text()],
        INDEX_OF_YEAR[secondRowCells.at(0).text()],
        INDEX_OF_YEAR[thirdRowCells.at(0).text()]
      ]
    }

    //test the content of each row to confirm they match the given order
    function testRowContentForOrder(orderArray, currWrapper) {
      const tableRows = currWrapper.find('tbody tr');
      expect(tableRows.length).toBe(3); //shows all 3 testing rows
      const firstRowCells = tableRows.at(0).children('td');
      const secondRowCells = tableRows.at(1).children('td');
      const thirdRowCells = tableRows.at(2).children('td');
      expect(firstRowCells.at(0).text()).toEqual(TEST_GAMES[orderArray[0]].year+"");
      expect(firstRowCells.at(1).text()).toMatch(TEST_GAMES[orderArray[0]].winner);
      expect(firstRowCells.at(3).text()).toMatch(TEST_GAMES[orderArray[0]].runner_up);
      expect(secondRowCells.at(0).text()).toEqual(TEST_GAMES[orderArray[1]].year+"");
      expect(secondRowCells.at(1).text()).toMatch(TEST_GAMES[orderArray[1]].winner);
      expect(secondRowCells.at(3).text()).toMatch(TEST_GAMES[orderArray[1]].runner_up);
      expect(thirdRowCells.at(0).text()).toEqual(TEST_GAMES[orderArray[2]].year+"");
      expect(thirdRowCells.at(1).text()).toMatch(TEST_GAMES[orderArray[2]].winner);
      expect(thirdRowCells.at(3).text()).toMatch(TEST_GAMES[orderArray[2]].runner_up);      
    }

    it('displayes initial games', () => {
      //check initial rows
      const wrapper = mount(<GameDataTable data={TEST_GAMES}/>)

      expect(getCurrentRowOrder(wrapper)).toEqual([0,1,2]); //expect in original order
      testRowContentForOrder([0,1,2], wrapper);
    })

    it('sorts columns on button click', () => {
      //re-render, then check each row's order for each button
      const wrapper = mount(<GameDataTable data={TEST_GAMES}/>)

      //click winner button
      const winnerButton = wrapper.find('button[name="winner"]')
      winnerButton.simulate('click');
      expect(getCurrentRowOrder(wrapper)).toEqual([2,0,1]); //should be sorted by winner
      testRowContentForOrder([2,0,1], wrapper);

      //click score button
      const scoreButton = wrapper.find('button[name="score"]')
      scoreButton.simulate('click');
      expect(getCurrentRowOrder(wrapper)).toEqual([2,1,0]); //should be sorted by score
      testRowContentForOrder([2,1,0], wrapper);

      //click runner-up button
      const runnerUpButton = wrapper.find('button[name="runner_up"]')
      runnerUpButton.simulate('click');
      expect(getCurrentRowOrder(wrapper)).toEqual([1,2,0]); //should be sorted by runner-up
      testRowContentForOrder([1,2,0], wrapper);

      //click year button
      const yearButton = wrapper.find('button[name="year"]')
      yearButton.simulate('click');
      expect(getCurrentRowOrder(wrapper)).toEqual([0,1,2]); //should be sorted by year
      testRowContentForOrder([0,1,2], wrapper);
    })

    it('sorts columns descending on subsequent clicks', () => {
      //re-render, check order, click, repeat
      const wrapper = mount(<GameDataTable data={TEST_GAMES}/>)

      //test winner button
      const winnerButton = wrapper.find('button[name="winner"]')
      winnerButton.simulate('click');
      expect(getCurrentRowOrder(wrapper)).toEqual([2,0,1]); //1st: should be sorted by winner (descending)
      winnerButton.simulate('click');
      expect(getCurrentRowOrder(wrapper)).toEqual([1,0,2]); //2nd: should be sorted by winner (ascending)
      winnerButton.simulate('click');
      expect(getCurrentRowOrder(wrapper)).toEqual([0,1,2]); //3rd: should be unsorted

      //test score button
      const scoreButton = wrapper.find('button[name="score"]')
      scoreButton.simulate('click');
      expect(getCurrentRowOrder(wrapper)).toEqual([2,1,0]); //1st: should be sorted by score (descending)
      scoreButton.simulate('click');
      expect(getCurrentRowOrder(wrapper)).toEqual([0,1,2]); //2nd: should be sorted by score (ascending)
      scoreButton.simulate('click');
      expect(getCurrentRowOrder(wrapper)).toEqual([0,1,2]); //3rd: should be unsorted

      //click runner-up button
      const runnerUpButton = wrapper.find('button[name="runner_up"]')
      runnerUpButton.simulate('click');
      expect(getCurrentRowOrder(wrapper)).toEqual([1,2,0]); //1st: should be sorted by runner-up (descending)
      runnerUpButton.simulate('click');
      expect(getCurrentRowOrder(wrapper)).toEqual([0,2,1]); //2nd: should be sorted by runner-up (ascending)
      runnerUpButton.simulate('click');
      expect(getCurrentRowOrder(wrapper)).toEqual([0,1,2]); //3rd: should be unsorted


      //click year button
      const yearButton = wrapper.find('button[name="year"]')
      yearButton.simulate('click');
      expect(getCurrentRowOrder(wrapper)).toEqual([0,1,2]); //1st: should be sorted by year (descending)
      yearButton.simulate('click');
      expect(getCurrentRowOrder(wrapper)).toEqual([2,1,0]); //2nd: should be sorted by year (ascending)
      yearButton.simulate('click');
      expect(getCurrentRowOrder(wrapper)).toEqual([0,1,2]); //3rd: should be unsorted
    })

    function testButtonAppearance(buttonName, wrapper) {
      const button = wrapper.find(`button[name="${buttonName}"]`)
      button.simulate('click'); //first click
      expect(wrapper.find('.active').length).toBe(1); //only one .active element
      expect(wrapper.find('.flip').length).toBe(1); //only one .flip element
      expect(wrapper.find('.active.flip').length).toBe(1); //only one .active.flip element
      expect(wrapper.find('.active.flip').parent().prop('name')).toBe(buttonName); //correct button

      button.simulate('click'); //second click
      expect(wrapper.find('.active').length).toBe(1); //only one .active element
      expect(wrapper.find('.flip').length).toBe(0); //nothing flipped
      expect(wrapper.find('.active').parent().prop('name')).toBe(buttonName); //correct button

      button.simulate('click'); //third click
      expect(wrapper.find('.active').length).toBe(0); //nothing active
      expect(wrapper.find('.flip').length).toBe(0); //nothing flipped
    }

    it('button appearance changes based on sorting', () => {
      //re-render, click, test button appearance (class)
      const wrapper = mount(<GameDataTable data={TEST_GAMES}/>)

      const sortButtons = wrapper.find('button');
      expect(wrapper.find('.active').length).toBe(0); //has no active elements initially
      expect(wrapper.find('.flip').length).toBe(0); //has no active elements initially

      //test year button
      testButtonAppearance("year", wrapper);

      //test winner button
      testButtonAppearance("winner", wrapper);

      //test score button
      testButtonAppearance("score", wrapper);

      //test runner_up button
      testButtonAppearance("runner_up", wrapper);
    })
  })

  describe('The TeamSelectForm Component', () => {

    it('changing inputs changes values', () => {
      const wrapper = mount(<TeamSelectForm teamOptions={TEST_TEAMS}/>)

      const selectElem =  wrapper.find('select');
      expect(selectElem.prop('value')).toBe(""); //initially nothing selected

      //try changing <select>
      selectElem.simulate('change', {target:{value: TEST_TEAMS[1]}}); //pick a team
      //extra find() call to make sure state propogates
      expect(wrapper.find('select').prop('value')).toBe(TEST_TEAMS[1]); //correct team selected

      //try changing checkbox
      const checkboxElem = wrapper.find('#runnerupCheckbox');
      expect(checkboxElem.prop('checked')).toBe(false); //initially not checked
      checkboxElem.simulate('change', {target: {checked: true}});
      //extra find() call to make sure state propogates
      expect(wrapper.find('#runnerupCheckbox').prop('checked')).toBe(true);
    })

    it('selecting a team filters for that team on submission', () => {
      const wrapper = mount(<App gameData={TEST_GAMES}/>)

      expect(wrapper.find('tbody tr').length).toBe(3); //shows all 3 rows to start

      const selectElem =  wrapper.find('#teamSelect');
      const checkboxElem = wrapper.find('#runnerupCheckbox');
      const submitButton = wrapper.find('#submitButton')

      //select filtering
      selectElem.simulate('change', {target:{value: TEST_TEAMS[0]}}); //Team A
      submitButton.simulate('click'); //submit
      expect(wrapper.find('tbody tr').length).toBe(1); //now shows 1 row (game #2)
      let cells = wrapper.find('tbody tr td');
      expect(cells.at(0).text()).toEqual(TEST_GAMES[2].year+"")
      expect(cells.at(1).text()).toMatch(TEST_GAMES[2].winner)
      
      selectElem.simulate('change', {target:{value: TEST_TEAMS[1]}}); //Team B
      submitButton.simulate('click'); //submit
      expect(wrapper.find('tbody tr').length).toBe(1); //still shows 1 row (game #0)
      cells = wrapper.find('tbody tr td');
      expect(cells.at(0).text()).toEqual(TEST_GAMES[0].year+"")
      expect(cells.at(1).text()).toMatch(TEST_GAMES[0].winner)


      //select no team (show all rows)
      selectElem.simulate('change', {target:{value: ""}});
      submitButton.simulate('click'); //submit
      expect(wrapper.find('tbody tr').length).toBe(3); //shows 3 rows
      checkboxElem.simulate('change', {target: {checked: true}}); //check box
      submitButton.simulate('click'); //submit
      expect(wrapper.find('tbody tr').length).toBe(3); //shows 3 rows
    })

    it('can include runners-up when filtering', () => {
      const wrapper = mount(<App gameData={TEST_GAMES}/>)

      const selectElem =  wrapper.find('#teamSelect');
      const checkboxElem = wrapper.find('#runnerupCheckbox');
      const submitButton = wrapper.find('#submitButton')

      //runner-up
      selectElem.simulate('change', {target:{value: TEST_TEAMS[1]}}); //Team B
      checkboxElem.simulate('change', {target: {checked: true}}); //check box
      submitButton.simulate('click'); //submit
      expect(wrapper.find('tbody tr').length).toBe(2); //shows 2 rows (games 0 % 2)
      let rows = wrapper.find('tbody tr');
      let firstRowCells = rows.at(0).children('td');
      expect(firstRowCells.at(0).text()).toEqual(TEST_GAMES[0].year+"")
      expect(firstRowCells.at(1).text()).toMatch(TEST_GAMES[0].winner)
      let secondRowCells = rows.at(1).children('td');
      expect(secondRowCells.at(0).text()).toEqual(TEST_GAMES[2].year+"")
      expect(secondRowCells.at(1).text()).toMatch(TEST_GAMES[2].winner)

      //change team with same runner up
      selectElem.simulate('change', {target:{value: TEST_TEAMS[2]}}); //Team C
      submitButton.simulate('click'); //submit
      expect(wrapper.find('tbody tr').length).toBe(1); //shows 1 row (game 0)
      let cells = wrapper.find('tbody tr td');
      expect(cells.at(0).text()).toEqual(TEST_GAMES[0].year+"")
      expect(cells.at(1).text()).toMatch(TEST_GAMES[0].winner)

      //change runner up with same team
      checkboxElem.simulate('change', {target: {checked: false}}); //uncheck box
      submitButton.simulate('click'); //submit
      expect(wrapper.find('tbody tr').length).toBe(0); //shows 0 rows

      //check runner up not exclusive
      selectElem.simulate('change', {target:{value: TEST_TEAMS[3]}}); //Team D
      checkboxElem.simulate('change', {target: {checked: true}}); //check box
      submitButton.simulate('click'); //submit
      expect(wrapper.find('tbody tr').length).toBe(1); //shows 1 row (game 1)
      cells = wrapper.find('tbody tr td');
      expect(cells.at(0).text()).toEqual(TEST_GAMES[1].year+"")
      expect(cells.at(1).text()).toMatch(TEST_GAMES[1].winner)

      //check when no team selected
      selectElem.simulate('change', {target:{value: ""}});
      checkboxElem.simulate('change', {target: {checked: true}}); //check box
      submitButton.simulate('click'); //submit
      expect(wrapper.find('tbody tr').length).toBe(3); //shows 3 rows
    })
  })
})
