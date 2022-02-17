import React from 'react'; //import React library

const EXAMPLE_SENATORS = [
  { id: 'C000127',  name: 'Maria Cantwell', state: 'WA',  party: 'Democrat', phone: '202-224-3441', twitter: 'SenatorCantwell' },
  { id: 'M001111', name: 'Patty Murray', state: 'WA', party: 'Democrat', phone: '202-224-2621', twitter: 'PattyMurray' }
];

const headerArray = ['Name', 'State', 'Phone', 'Twitter'];

/* Your code goes here */
export function App(props) {
  return (
    <div className='container'>
      <h1>US Senators (Jan 2022)</h1>
      <SenatorTable senators={props.senators}/>
    </div>
  )
}

export function SenatorTable(props) {
  let senatorArr = props.senators.map((element) => {
    return <SenatorRow senator={element} key={element.id}/>
  })
  console.log(senatorArr.name);
  return (
    <table className='table table-bordered'>
      <TableHeader columnNames={headerArray} />
      <tbody>
        {senatorArr}
      </tbody>
    </table>
  )
}

export function TableHeader(props) {
  let thElem = props.columnNames.map((nameString) => {
    return <th key={nameString}>{nameString}</th>;
  })
  return (
    <thead>
      <tr>
        {thElem}
      </tr>
    </thead>
  );
}

export function SenatorRow(props) {
  const {name, state, party, phone, twitter} = props.senator;
  return (
    <tr>
      <td>{name}</td>
      <td>{party.charAt(0) + " - " + state}</td>
      <td><a href={"tel:" + phone}>{phone}</a></td>
      <td><a href={"https://twitter.com/" + twitter}>{"@" + twitter}</a></td>
    </tr>
  )
}