import { useEffect, useState, useRef } from 'react'
import PokemonCard from '../components/PokemonCard'
import Search from '../components/Search'
import '../styles/Home.css'

const Home = () => {
    const [pokemons, setPokemons] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingMain, setLoadingMain] = useState(true)

    const page = useRef(0)

    const getPokemons = async () => {
        const url = `http://127.0.0.1:8000/api/get_pokemons/${page.current}`

        const response = await fetch(url)
        const data = await response.json()

        const newPokemons = data.results

        page.current = page.current + 1

        setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons])
        setLoadingMain(false)
    }

    const isAtBottom = () => {
        return window.innerHeight + window.scrollY >= document.body.offsetHeight - 1
    }

    useEffect(() => {
        const handleScroll = () => {
            if (isAtBottom() && !loading && page.current !== 0) {
                setLoading(true)
                getPokemons()
            }
        }

        window.addEventListener('scroll', handleScroll)

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [loading])

    useEffect(() => {
        if (loading) {
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokemons])

    useEffect(() => {
        getPokemons()
    }, [])

    return (
        <div className="gradient-custom-3">
            <div className="container m-6">
                <Search />

                {loadingMain ? (
                    <div className="text-center">
                        <img src="./loading2.svg" />
                    </div>
                ) : pokemons.length !== 0 ? (
                    <div className="row gx-2 gy-2">
                        {pokemons.map((pokemon) => {
                            return (
                                <div className="col-6 col-md-3 col-lg-2" key={pokemon.name}>
                                    <PokemonCard key={pokemon.name} pokemon={pokemon} />
                                </div>
                            )
                        })}

                        {loading && (
                            <div className="text-center">
                                <img src="./loading2.svg" />
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-center display-2">No Pokémon found.</p>
                )}
            </div>
        </div>
    )
}

export default Home
