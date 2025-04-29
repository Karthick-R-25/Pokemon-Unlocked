import React from 'react';
import './index.css';

const CardItems = ({ pokemon }) => {
  return (
    <div className="pok-card-item">
      <img src={pokemon.image} alt={pokemon.name} />
      <h2>{pokemon.id}</h2>
      <h2>{pokemon.name}</h2>
      {pokemon.types && (
        <div className='power'>
      
        <h4>{`Powers: ${pokemon.types.join(', ')}`}</h4>

         
        </div>
      )}

     
    </div>
  );
};

export default CardItems;
