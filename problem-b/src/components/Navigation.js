import React from 'react';

export function AboutNav(props) {
  return (
    <nav id="aboutLinks">
      <h2>About</h2>
      <ul className="list-unstyled">
        <li><a href="#/">How to Adopt</a></li>
        <li><a href="#/">Volunteering</a></li>
        <li><a href="#/">Events</a></li>
        <li><a href="#/">Donate</a></li>
        <li><a href="#/">About Us</a></li>
      </ul>
    </nav>
  )
}

export function BreedNav(props) {
  const breedsAvailable = props.breeds;
  // console.log(breedsAvailable);
  const mappedBreeds = breedsAvailable.map((element) => {
    return (
          <li key={element}><a href="#">{element}</a></li>
    )
  });
  return (
    <nav id="breedLinks">
      <h2>Pick a Breed</h2>
      <ul className="list-unstyled">
        {mappedBreeds}
        {/* <li><a href="#/"></a></li>
        <li><a href="#/"></a></li>
        <li><a href="#/"></a></li>
        <li><a href="#/"></a></li> */}
      </ul>
    </nav>
  )

}