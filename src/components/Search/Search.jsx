import React, { useRef, useState, useEffect } from "react";
import useDebounce from "../../hook/useDebounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import { Divider, Popover } from "antd";
import { searchAPI } from "../../api/searchApi";
import CourseResult from "./components/CourseResult";
import Wrapper from "../Wrapper/Wrapper";

const Search = () => {
	const [searchValue, setSearchValue] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [showResult, setShowResult] = useState(true);
	const [loading, setLoading] = useState(false);
	const popoverRef = useRef();

	const inputRef = useRef();
	const debounced = useDebounce(searchValue, 500);

	const handleChange = (e) => {
		setSearchValue(e.target.value);
	};
	const handleHideResult = () => {
		console.log(11)
		setShowResult(false);
	};

	const handleClear = () => {
		setSearchValue('');
		setSearchResult([]);
		inputRef.current.focus();
	};


	const handleHidePopover = () => {
		console.log(11)
		setSearchResult([]);
	};


	useEffect(() => {
		if (!debounced.trim()) {
			setSearchResult([])
			return;
		}
		setLoading(true);

		searchAPI.search(encodeURIComponent(debounced)).then(
			(res) => {
				console.log('search result', res);
				if (res.status === 200) {
					if (res.data.data.length > 0) {
						console.log(3)
						setSearchResult(res.data.data);
					} else {
						setSearchResult([])
					}
				} else {
					console.log(8)
					setSearchResult([])
				}
				setLoading(false);
			}
		).catch(
			(error) => {
				setLoading(false);
				console.log(error);
			}
		).finally(
			() => {
				setLoading(false);
			}
		)
	}, [debounced])
	return (
		<Popover
			// onVisibleChange={setVisible}
			onClickOutside={handleHidePopover}
			visible={showResult && searchResult?.length > 0}
			content={
				<Wrapper>
					<div className="bg-red-300 search-result" tabIndex="-1">
						{
							searchResult &&
							<>
								<Divider>
									Accounts
								</Divider>
								{
									searchResult.map(
										(e) => {
											return (
												<CourseResult data={e} />
											)
										}
									)
								}
								<h1 onClick={() => console.log(showResult && searchResult?.length > 0, !!searchValue)}>
									dsddd
								</h1>
							</>
						}
					</div>
				</Wrapper>
			}
		>
			<div className='search-wrapper'>
				<div className='search-icon'>
				</div>
				<input type='text' placeholder='search course, video, blog,...' className='search-input-nav' value={searchValue} onChange={handleChange} ref={inputRef} />
				{
					!!searchValue && !loading && <button className='px-1.5 text-slate-400 hover:text-slate-600 btn-time' onClick={handleClear}>
						<FontAwesomeIcon icon={faXmark} />
					</button>
				}

				{
					loading && <span className='px-1 text-slate-400 search-loading'>
						<FontAwesomeIcon icon={faSpinner} />
					</span>
				}

			</div>
		</Popover>
	)
}

export default Search;