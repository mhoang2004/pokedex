import '../styles/Navbar.css'

const Navbar = () => {
    return (
        <nav className="custom-nav navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img
                        src="./pokedex-icon.jpg"
                        alt=""
                        width="25"
                        height="25"
                        className="d-inline-block align-text-top rounded"
                    />{' '}
                    Pokedex
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item ">
                            <a className="nav-link fw-bolder active" aria-current="page" href="/">
                                Home
                            </a>
                        </li>
                        <li className="nav-item fw-bolder">
                            <a className="nav-link" href="#">
                                Features
                            </a>
                        </li>
                        <li className="nav-item fw-bolder">
                            <a className="nav-link" href="#">
                                Link
                            </a>
                        </li>
                    </ul>
                    <div>
                        <button className="btn btn-danger m-2 fw-bold px-3">Register</button>
                        <button className="btn btn-primary m-2 fw-bold px-3">Login</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
