
const Loader = () => {

    return (
        <div className="loader-container" role="status">
            <svg className="spinner" viewBox="0 0 50 50">
                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4"></circle>
            </svg>
        </div>
    );
}

export default Loader;
