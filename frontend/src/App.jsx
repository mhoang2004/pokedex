import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import Home from './pages/Home'
import PokemonDetail from './pages/PokemonDetail'
import NotFound from './pages/NotFound'

import Layout from './components/Layout'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />

                    <Route path="pokemons/">
                        <Route index element={<Home />} />
                        <Route path=":name" element={<PokemonDetail />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
