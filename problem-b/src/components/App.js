import React from 'react';
import { useState } from 'react';
import { AboutNav } from './Navigation';
import { BreedNav } from "./Navigation";
import PetList from "./PetList";

function App(props) {
  const [pets, setPets] = useState(props.pets);
  let breedsArr = props.pets.map((element) => {
    return (
      element.breed
    )
  })
  let uniqueBreeds = [...new Set(breedsArr)];
  console.log(uniqueBreeds);


  const handleAdopt = function(nameOfPet) {
    let copyOfStateArr = pets.map((element) => {
      if (element.name === nameOfPet) {
        element.adopted = true;
      }
      return element
    })
    setPets(copyOfStateArr);
  }
  return (
    <div>
      <header className="jumbotron jumbotron-fluid py-4">
        <div className="container">
          <h1>Adopt a Pet</h1>
        </div>
      </header>

      <main className="container">
        <div className="row">
          <div id="navs" className="col-3">
            <BreedNav breeds={uniqueBreeds} />
            <AboutNav />
          </div> {/* <!-- end col --> */}

          <div id="petList" className="col-9">
            {/* <div className="card-deck"> */}
              <PetList pets={pets} adoptCallback={handleAdopt}/>
              {/* <PetCard singlePetCard={pets} /> */}
            {/* </div>  <!-- end cards --> */}
          </div> {/* <!-- end col --> */}

        </div> {/* <!-- end row --> */}
      </main >
      <footer className="container">
        <small>Images from <a href="http://www.seattlehumane.org/adoption/dogs">Seattle Humane Society</a></small>
      </footer>

    </div >
  );
}

export default App;
