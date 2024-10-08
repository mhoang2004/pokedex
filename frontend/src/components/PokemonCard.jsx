/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const PokemonCard = ({ pokemon }) => {
    return (
        <div
            className="pokemon-card border border-dark rounded text-center p-3"
            title={pokemon.name}
        >
            <Link className="text-dark" to={`/pokemons/${pokemon.name}`}>
                <h6 className="pokemon-name text-capitalize" name={pokemon.name}>
                    {pokemon.name.split('-').join(' ')}
                </h6>
                <img src={pokemon.image.front_default} alt={pokemon.name} />
            </Link>
        </div>
    )
}

export default PokemonCard
