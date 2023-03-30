import React, { useState } from "react";
import '../../Assets/css/Search.css';

const Search = () => {
	const [search, setSearch] = useState('');
	const handleChange = (e) => {
		e.preventDefault();
		setSearch(e.target.value);
	}
	return (
		<>
			<div className="search-container">
				<input type="text" className="search-input" placeholder="Search..." value={search} onChange={handleChange} />
				<div className="search-body"></div>
				<div>
					<p>ssss</p>
				</div>
			</div>

		</>
	)


}

export default Search;