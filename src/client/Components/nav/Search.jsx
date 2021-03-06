import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import InputGroup, {
	InputGroupAppend,
	InputGroupInput
} from '../../styled/Input/InputGroup';
import Dropdown, {
	DropdownContent,
	DropdownHeader
} from '../../styled/common/Dropdown';

const SearchInputGroup = styled(InputGroup)`
	padding-top: 8px;
	height: 2rem;
	width: 20rem;
`;

const SearchInputInput = styled(InputGroupInput)`
	&:focus-within {
		> .dropDown {
			display: flex;
		}
	}

	> .dropDown {
		display: none;
	}
`;

const ContentContainer = styled.div`
	height: 50%;
	overflow-y: scroll;
	overflow-x: hidden;
`;

const SearchBar = props => (
	<div>
		<SearchInputGroup>
			<InputGroupAppend>
				<p>Search</p>
			</InputGroupAppend>

			<SearchInputInput>
				{!_.isEmpty(props.searchData.data) &&
					props.searchQuery !== '' && (
						<Dropdown className="dropDown">
							{Object.entries(props.searchData.data).map(
								entry => (
									<ContentContainer
										key={`search-header-${entry[0]}`}
									>
										<DropdownHeader>
											<p>{entry[0]}</p>
											<p>{entry[1].length}</p>
										</DropdownHeader>

										{entry[1].map(data => (
											<DropdownContent
												key={`search-data-${
													entry[0]
												}-${data.display_name ||
													data.title}`}
											>
												<Link
													to={`${
														process.env
															.REACT_APP_NGINX_LOCATION
													}/${entry[0]}/${data.id}`}
													className="dropdownLink"
												>
													{data.display_name ||
														data.title}
												</Link>
											</DropdownContent>
										))}
									</ContentContainer>
								)
							)}
						</Dropdown>
					)}
				<input onChange={props.getSearch} type="text" />
			</SearchInputInput>
		</SearchInputGroup>
	</div>
);

SearchBar.propTypes = {
	searchQuery: propTypes.string.isRequired,
	searchData: propTypes.oneOfType([propTypes.shape(), propTypes.array])
		.isRequired,
	getSearch: propTypes.func.isRequired
};

export default SearchBar;
