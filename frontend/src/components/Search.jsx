import '../styles/Search.css'

const Search = () => {
    const filterPokemon = async (e) => {
        e.preventDefault()
        // page.current = 0

        const url = 'http://127.0.0.1:8000/api/filter_pokemon/'
        const pokemon = document.querySelector('input').value

        let pokemonName = pokemon.trim().toLowerCase().replace(/\s+/g, '-')
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: pokemonName }),
        })

        if (response.status === 200) {
            const data = await response.json()
            const pokemonsObj = []

            for (const result of data.filtered_pokemon) {
                const pokemonRes = await fetch(result.url)
                const pokemonObj = await pokemonRes.json()
                pokemonsObj.push(pokemonObj)
            }
            // setPokemons(pokemonsObj)
        }
    }

    return (
        <div className="py-5">
            <form className="custom-search-form d-flex">
                <input
                    required
                    autoFocus
                    type="text"
                    className="form-control py-3"
                    placeholder="Pokemon's name"
                />
                <button className="btn btn-success" type="submit" onClick={filterPokemon}>
                    Search
                </button>
            </form>
        </div>
    )
}

export default Search
