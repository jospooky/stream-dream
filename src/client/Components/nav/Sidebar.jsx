import axios from 'axios';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import StyledSidebar from '../../styled/nav/Sidebar';
import PrimaryText from '../../styled/common/PrimaryText';
import commonCSS from '../../styled/common/commonCSS';
import { forceFollowedUsersRefresh } from '../../middlwares/redux/reducers/sessionReducer';

const StyledLinkGroup = styled.div`
	width: 90%;

	border-top: ${commonCSS.infoTextColor} 1px solid;

	margin-top: 5px;
	padding-top: 0;

	align-items: center;
	${commonCSS.flex('column')};
`;

const StlyedInfo = styled(Link)`
	text-decoration: none;
	height: 100%;

	color: ${commonCSS.primaryTextColor};

	text-align: center;
	${commonCSS.flex()};

	padding-top: 10px;
`;

class Sidebar extends Component {
	constructor() {
		super();

		this.state = {
			follows: []
		};
	}

	componentDidMount() {
		this.getFollowedUsers();
	}

	componentDidUpdate(prevProps) {
		if (
			this.props.userId !== prevProps.userId ||
			(this.props.refreshFollowed &&
				this.props.refreshFollowed !== prevProps.refreshFollowed)
		) {
			this.getFollowedUsers();
			this.props.forceFollowedUsersRefresh(false);
		}
	}

	getFollowedUsers() {
		axios
			.get(
				`${process.env.REACT_APP_API_LOCATION}user/${
					this.props.userId
				}/follows`
			)
			.then(res => {
				this.setState({
					follows: res.data
				});
			});
	}

	render() {
		return (
			<StyledSidebar>
				<PrimaryText>
					<h1>Followed Channels</h1>
				</PrimaryText>

				<StyledLinkGroup>
					{this.state.follows.map(user => (
						<StlyedInfo
							key={`user-${user.id}`}
							to={`${
								process.env.REACT_APP_NGINX_LOCATION
							}/users/${user.id}`}
						>
							{user.display_name}
						</StlyedInfo>
					))}
					{this.props.userId !== -1 && (
						<StlyedInfo
							to={`${
								process.env.REACT_APP_NGINX_LOCATION
							}/upload-video`}
						>
							<PrimaryText>Upload a Video</PrimaryText>
						</StlyedInfo>
					)}
				</StyledLinkGroup>
			</StyledSidebar>
		);
	}
}

Sidebar.propTypes = {
	userId: propTypes.number.isRequired,
	refreshFollowed: propTypes.bool.isRequired,
	forceFollowedUsersRefresh: propTypes.func.isRequired
};

function mapStateToProps(duckState) {
	const { id } = duckState.user;
	return {
		userId: id,
		refreshFollowed: duckState.refreshFollowed
	};
}

export default connect(
	mapStateToProps,
	{ forceFollowedUsersRefresh }
)(Sidebar);
