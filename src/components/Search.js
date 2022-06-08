
export function Search({ onSubmit }) {
    return (
        <form onSubmit={onSubmit} className="search-menu">
            <input type="text" placeholder="Enter city" className="city-search" />
            <button className="search-btn"></button>
        </form>
    );
}