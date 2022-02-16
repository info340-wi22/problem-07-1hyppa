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
      <h1>US Senators (Jan 2021)</h1>
      <SenatorTable />
    </div>
  )
}

export function SenatorTable(props) {
  // let senatorArr = props.senators.map((element) => {
  //   return (<SenatorRow key={element.id}/>)

  // })
  let senatorArr = EXAMPLE_SENATORS.map((element) => {
    return <SenatorRow key={element.id}/>
  })
  console.log(senatorArr);
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
  const {id, name, state, party, phone, twitter} = props;
  return (
    <tr key={id}>
      <td>{name}</td>
      <td>{state}</td>
      <td>{phone}</td>
      <td>{twitter}</td>
    </tr>
  )
}