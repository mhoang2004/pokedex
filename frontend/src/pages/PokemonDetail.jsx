/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Popup from 'reactjs-popup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVenus, faMars, faCircleInfo } from '@fortawesome/free-solid-svg-icons'

import PokemonEvolution from '../components/PokemonEvolution'

import Navbar from '../components/Navbar'
import ProgressBar from '../components/ProgressBar'

import '../styles/PokemonDetail.css'

const PokemonDetail = () => {
    const navigate = useNavigate()

    const { name } = useParams()
    const [pokemon, setPokemon] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const backToPrev = () => {
        navigate(-1)
    }

    const nextPokemon = () => {
        setLoading(true)
        navigate(`/pokemons/${pokemon.id + 1}`)
    }

    const formatNumber = (num) => {
        return num.toString().padStart(4, '0')
    }

    const formatName = (name) => {
        return name.split('-').join(' ')
    }

    const changeVari = (event) => {
        const variName = event.target.value

        pokemon.varieties.forEach((pokeInfo) => {
            if (pokeInfo.name === variName) {
                const variPokemon = {
                    ...pokemon,
                    name: variName,
                    sprites: pokeInfo.image,
                }
                setPokemon(variPokemon)
                console.log(variPokemon)
                return
            }
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://127.0.0.1:8000/api/get_pokemon/${name}`
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                setPokemon(data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        setLoading(true)
        fetchData()
    }, [name])

    if (loading)
        return (
            <div className="m-6 text-center text-primary p-2">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )

    if (error) return <p className="m-6">Error: {error.message}</p>

    return (
        <div className="container">
            <Navbar />

            <div className="m-6">
                <h2 className="py-3 text-center text-capitalize fw-bold">
                    {formatName(pokemon.name)} #{formatNumber(pokemon.id)}
                </h2>
                <div className="d-flex">
                    <img
                        src={pokemon.sprites.other['official-artwork'].front_default}
                        alt={pokemon.name}
                    />

                    <div className="m-2 bg-light flex-grow-1 p-3 rounded">
                        <p>
                            <strong>Name: </strong> {pokemon.japanese_name}
                        </p>

                        <p>
                            <span className="pe-3">
                                <strong>Height: </strong> {(pokemon.height * 0.1).toFixed(2)} m
                            </span>

                            <span className="ps-3">
                                <strong>Weight: </strong> {(pokemon.weight * 0.1).toFixed(2)} kg
                            </span>
                        </p>

                        <p>
                            <strong>Category: </strong> {pokemon.category}
                        </p>

                        <p>
                            <strong>Gender: </strong>

                            {pokemon.genders.length !== 0 ? (
                                pokemon.genders.map((gender) => (
                                    <span key={`gender-${gender}`}>
                                        {gender === 1 && (
                                            <FontAwesomeIcon
                                                className="mx-2 text-danger"
                                                icon={faMars}
                                            />
                                        )}
                                        {gender === 2 && (
                                            <FontAwesomeIcon
                                                className="mx-2 text-primary"
                                                icon={faVenus}
                                            />
                                        )}
                                    </span>
                                ))
                            ) : (
                                <span>Unknown</span>
                            )}
                        </p>

                        <p>
                            <strong>Type: </strong>
                            {pokemon.types.map((pokemonType) => (
                                <span
                                    key={pokemonType.type.name}
                                    className={`${pokemonType.type.name} cursor text-capitalize badge rounded-pill text-dark mx-1 px-3 py-1`}
                                >
                                    {pokemonType.type.name}
                                </span>
                            ))}
                        </p>

                        <p className="d-flex align-items-center">
                            <strong>Abilities: </strong>
                            {pokemon.abilities.map((ability) => (
                                <>
                                    <Popup
                                        trigger={
                                            <span className="cursor text-capitalize font-monospace border border-secondary rounded mx-1 py-1 px-2">
                                                {ability.name}
                                            </span>
                                        }
                                        // position="bottom left"
                                    >
                                        <div className="bg-dark text-white p-2 rounded">
                                            <h6>
                                                <span className="text-uppercase fw-bold">
                                                    {ability.name}
                                                </span>
                                                <span>{ability.is_hidden && ' (hidden)'}</span>
                                            </h6>
                                            <p className="font-monospace">{ability.text}</p>
                                        </div>
                                    </Popup>
                                </>
                            ))}
                        </p>
                        <p>
                            <strong>Overview: </strong>
                            {pokemon.overview}
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-8">
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <th className="col-3" scope="row">
                                        HP
                                    </th>
                                    <td className="col-9">
                                        <ProgressBar
                                            color="bg-success"
                                            progress={pokemon.stat['hp']}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Attack</th>
                                    <td>
                                        <ProgressBar
                                            color="bg-danger"
                                            progress={pokemon.stat['attack']}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Defense</th>
                                    <td>
                                        <ProgressBar progress={pokemon.stat['defense']} />
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row">Special Attack</th>
                                    <td>
                                        <ProgressBar
                                            color="bg-warning"
                                            progress={pokemon.stat['special-attack']}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Special Defense</th>
                                    <td>
                                        <ProgressBar
                                            color="bg-secondary"
                                            progress={pokemon.stat['special-defense']}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Speed</th>
                                    <td>
                                        <ProgressBar
                                            color="bg-info"
                                            progress={pokemon.stat['speed']}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="col-4 p-2">
                        <div>
                            <h5>Varieties</h5>
                            <select
                                className="form-select text-capitalize"
                                aria-label="Default select example"
                                onChange={changeVari}
                            >
                                {pokemon.varieties.map((pokeInfo) => {
                                    return (
                                        <option value={pokeInfo.name} key={`vari-${pokeInfo.name}`}>
                                            {formatName(pokeInfo.name)}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className="mt-4">
                            <h5>Weaknesses</h5>
                            <div>
                                {pokemon.weakness.map((type) => (
                                    <span
                                        key={type.name}
                                        className={`${type.name} cursor text-capitalize badge rounded-pill text-dark mx-1 px-3 py-1`}
                                    >
                                        {type.name}
                                        {type.detail !== 2 && (
                                            <>
                                                <Popup
                                                    className="bg-dark"
                                                    trigger={
                                                        <FontAwesomeIcon
                                                            className="ms-1"
                                                            icon={faCircleInfo}
                                                        />
                                                    }
                                                >
                                                    <div className="bg-dark text-white p-2 rounded">
                                                        <span className="font-monospace">{`Deals ${type.detail}x damage`}</span>
                                                    </div>
                                                </Popup>
                                            </>
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-2">
                    <PokemonEvolution pokemon={pokemon} />
                </div>

                {pokemon.sprites.other.dream_world.front_default && (
                    <div className="my-2 text-center bg-secondary py-3 rounded">
                        <h3 className="text-white">Dream World Image</h3>
                        <img
                            src={pokemon.sprites.other.dream_world.front_default}
                            alt={pokemon.name}
                        />
                    </div>
                )}

                <div className="d-flex justify-content-between align-items-center my-3">
                    <button className="btn btn-outline-danger">Prev Pokémon</button>

                    <button className="btn btn-outline-danger" onClick={backToPrev}>
                        Explore more Pokémon
                    </button>

                    <button className="btn btn-outline-danger" onClick={nextPokemon}>
                        Next Pokémon
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PokemonDetail
