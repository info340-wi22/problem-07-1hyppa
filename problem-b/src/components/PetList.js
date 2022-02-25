import React from 'react';

function PetCard(props) {
  let petInfo = props.singlePetCard;
  let displayedName = petInfo.name;
  const handleClick = function () {
    props.adoptCallback(displayedName);
  }
  if (petInfo.adopted) {
    displayedName = displayedName + " (Adopted)";
  }
  return (
    <div className="card" onClick={handleClick}>
      <img className="card-img-top" src={petInfo.img} alt={petInfo.name} />
      <div className="card-body">
        <h3 className="card-title">{displayedName}</h3>
        <p className="card-text">{petInfo.sex + " " + petInfo.breed}</p>
      </div>
    </div>
  )
}

export default function PetList(props) {
  let petArr = props.pets;
  let renderSinglePet = petArr.map((e) => {
    return (
      <PetCard singlePetCard={e} key={e.name} adoptCallback={props.adoptCallback}/>
    )
  })
  return (
    <div>
      <h2>Dogs for Adoption</h2>
      <div className="card-deck">
        {renderSinglePet}
      </div>
    </div>
  )
}