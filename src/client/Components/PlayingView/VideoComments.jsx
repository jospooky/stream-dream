import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import styled from "styled-components";
import commonCSS from "../../styled/common/commonCSS";
import CommentsMainDiv from "../../styled/Playing/VideoCommentsMain";

const CommentInput = styled.div`
	> ::-webkit-scrollbar {
		display: none;
	}

	> * {
		padding: 0.5rem;
		font-size: 0.6rem;
	}
`;

const Comments = styled.div`
	> ::-webkit-scrollbar {
		display: none;
	}

	${commonCSS.flex("")} align-items: center;
	margin: 2em;
	> * {
		padding: 0.5rem;
		font-size: 0.7rem;
	}
`;

const Comment = styled.div`
	> ::-webkit-scrollbar {
		display: none;
	}

	${commonCSS.flex("column")} align-items: flex-start;
	margin: 2em;
	> * {
		padding: 0.5rem;
		font-size: 0.7rem;
	}
`;

export default class VideoComments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			commentsList: [],
			userDisplayName: "",
			userAvatar: "",
			userInput: ""
		};
		this.commentsMapped = this.commentsMapped.bind(this);
	}

	componentDidMount() {
		axios.get(`/api/get-comments/${this.props.video_id}`).then(res => {
			// making a call to the backend for the comments and setting state with res

			this.setState({
				commentsList: res.data
			});
		});
		axios.get("/api/get-user-info").then(res => {
			console.log("hahahah", res.data);
			this.setState({
				userDisplayName: res.data.display_name,
				userAvatar: res.data.avatar
			});
		});
	}

	commentsMapped() {
		if (this.state.commentsList === []) {
			return (
				<p>There are no comments for this video yet! Be the First!</p>
			);
		} else if (this.state.commentsList === undefined) {
			return (
				<p>
					There seems to be an issue retrieving the comments! Sorry!
				</p>
			);
		}

		return this.state.commentsList.map((comment, i) => {
			const desI = i;
			return (
				<Comments key={`Comment${desI}`}>
					<img
						src={comment.avatar}
						width="45"
						heigth="45"
						alt="commentator avatar"
					/>
					<Comment>
						<p>{comment.display_name} said:</p>
						<p>{comment.comment}</p>
					</Comment>
				</Comments>
			);
		});
	}

	clickPost() {
		console.log("click post", this.props.video_id);
		axios
			.post("/api/comment-new", {
				video_id: this.props.video_id,
				comment: this.state.userInput
			})
			.then(() => {
				axios
					.get(`/api/get-comments/${this.props.video_id}`)
					.then(res => {
						this.setState({
							commentsList: res.data
						});
					});
			});
		this.setState({
			userInput: ""
		});
	}

	render() {
		return (
			<CommentsMainDiv>
				<CommentInput>
					<p>Write a Comment</p>
					<img
						src={this.state.userAvatar}
						width="45"
						heigth="45"
						alt="commentator avatar"
					/>
					<p>{this.state.userDisplayName} Says:</p>{" "}
					<input
						value={this.state.userInput}
						onChange={e =>
							this.setState({
								userInput: e.target.value
							})
						}
					/>
					<button onClick={() => this.clickPost()}>
						Post Comment
					</button>
				</CommentInput>
				{this.commentsMapped()}
			</CommentsMainDiv>
		);
	}
}

VideoComments.propTypes = {
	video_id: PropTypes.string.isRequired
};
