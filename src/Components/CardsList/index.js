import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardItems from '../CardItems';
import './index.css';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return {
              id: details.data.id,
              name: details.data.name,
              image: details.data.sprites.front_default,
              types: details.data.types.map(t => t.type.name),
              naturalGiftType: details.data.natural_gift_type?.name || null
            };
          })
        );

        setPokemons(pokemonData);

        const allTypes = new Set();
        pokemonData.forEach(p => {
          p.types.forEach(t => allTypes.add(t));
          if (p.naturalGiftType) allTypes.add(p.naturalGiftType);
        });

        setTypes([...allTypes]);
      } catch (err) {
        setError('Failed to load Pokémon. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterType === '' ||
      pokemon.types.includes(filterType) ||
      pokemon.naturalGiftType === filterType)
  );

  return (
    <div className="pokemon-list-item-container">
      {loading && <p className="loader">Loading Pokémons...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <input
            type="text"
            placeholder="Search Pokémon"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />

          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="type-select"
          >
            <option value="">All Powers</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>

          <div className="pokemon-list">
            {filteredPokemons.length > 0 ? (
              filteredPokemons.map(pokemon => (
                <CardItems key={pokemon.id} pokemon={pokemon} />
              ))
            ) : (
              <p className="no-results">No Pokémon match your search.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonList;
