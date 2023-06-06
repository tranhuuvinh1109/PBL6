import React, { useRef, useState, useEffect } from "react";
import useDebounce from "../../hook/useDebounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { searchAPI } from "../../api/searchApi";
import CourseResult from "./components/CourseResult";
import Wrapper from "../Wrapper/Wrapper";
import Tippy from '@tippyjs/react/headless';
import UserResult from "./components/UserResult";
import BlogResult from "./components/BlogResult";
import { Divider } from "antd";

const Search = () => {
	const [searchValue, setSearchValue] = useState('');
	const [searchResult, setSearchResult] = useState({});
	const [showResult, setShowResult] = useState(true);
	const [loading, setLoading] = useState(false);

	const inputRef = useRef();
	const debounced = useDebounce(searchValue, 500);

	const handleChange = (e) => {
		setSearchValue(e.target.value);
	};

	const handleClear = () => {
		setSearchValue('');
		setSearchResult({});
		inputRef.current.focus();
	};

	useEffect(() => {
		if (!debounced.trim()) {
			setSearchResult({})
			return;
		}
		setLoading(true);

		searchAPI.search(encodeURIComponent(debounced)).then(
			(res) => {
				if (res.status === 200) {
					if (res.data) {
						console.log('search', res)
						setSearchResult(res.data);
					} else {
						setSearchResult({})
					}
				} else {
					console.log(8)
					setSearchResult({})
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

		<Tippy
			interactive
			visible={ showResult && Object.keys(searchResult).length > 0 }
			onClickOutside={ () => setShowResult(false) }
			placement="bottom"
			render={ attrs => (
				<Wrapper tabIndex={ -1 } { ...attrs }>

					{
						searchResult?.courses?.length > 0 &&
						<>
							<Divider orientation="left">Course</Divider>
							{
								searchResult?.courses.map((course) => {
									return (
										<CourseResult course={ course } key={ course.id } />
									)
								})
							}
						</>
					}
					{
						searchResult?.users?.length > 0 &&
						<>
							<Divider orientation="left">User</Divider>
							{
								searchResult?.users.map((user) => {
									return (
										<UserResult user={ user } key={ user.user_id } />
									)
								})
							}
						</>
					}
					{
						searchResult?.blogs?.length > 0 &&
						<>
							<Divider orientation="left">Blog</Divider>
							{
								searchResult?.blogs.map((blog) => {
									return (
										<BlogResult blog={ blog } key={ blog.blog_id } />
									)
								})
							}
						</>
					}
				</Wrapper>
			) }
		>
			<div className='search-wrapper'>
				<div className='search-icon'>
				</div>
				<input type='text' placeholder='search course, video, blog,...' className='search-input-nav' value={ searchValue } onChange={ handleChange } ref={ inputRef } onFocus={ () => setShowResult(true) } />
				{
					!!searchValue && !loading && <button className='px-1.5 text-slate-400 hover:text-slate-600 btn-time' onClick={ handleClear }>
						<FontAwesomeIcon icon={ faXmark } />
					</button>
				}

				{
					loading && <span className='px-1 text-slate-400 search-loading'>
						<FontAwesomeIcon icon={ faSpinner } />
					</span>
				}

			</div>

		</Tippy>
	)
}

export default Search;