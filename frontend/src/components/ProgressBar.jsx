// eslint-disable-next-line react/prop-types
const ProgressBar = ({ color, progress }) => {
    return (
        <div className="progress my-2 d-flex">
            <div
                className={`progress-bar ${color}`}
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
            ></div>
        </div>
    )
}

export default ProgressBar
