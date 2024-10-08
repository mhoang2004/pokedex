/* eslint-disable react/prop-types */
import PokemonCard from '../components/PokemonCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const renderEvol = (evol) => {
    const evolArray = [evol.evolves_to, ...evol.evolves_to.map((e) => e.evolves_to)]

    return (
        <div className="px-3 py-5 d-flex justify-content-center align-items-center bg-light rounded">
            <PokemonCard key={`evol-${evol.species.name}`} pokemon={evol.species} />
            {evolArray.map((arr, index) => {
                return (
                    <div key={`evol-${index}`}>
                        {arr.map((poke) => {
                            return (
                                <div
                                    key={poke.species.name}
                                    className="d-flex justify-content-center align-items-center my-4"
                                >
                                    <FontAwesomeIcon
                                        className="chevron-right px-5"
                                        icon={faChevronRight}
                                    />
                                    <PokemonCard
                                        key={`evol-${poke.species.name}`}
                                        pokemon={poke.species}
                                    />
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

const PokemonEvolution = ({ pokemon }) => {
    return (
        <>
            <h4 className="my-3">Evolutions</h4>
            {renderEvol(pokemon.evolution_chain)}
        </>
    )
}

export default PokemonEvolution
