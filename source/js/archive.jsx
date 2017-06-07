import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Pagination from "react-js-pagination";

class Archive extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	posts: [],
    	page: [],
      activePage: 1
    };

    this.handlePageChange = this.handlePageChange.bind(this);
   }
 
  handlePageChange(pageNumber) {
    let items = this.state.posts;
    let totalItems = this.state.posts.length;
    let pageSize = 3;
    let totalPages = Math.ceil(totalItems / pageSize);
    let startIndex = (pageNumber - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1)
    let page = items.slice(startIndex, endIndex + 1);

    this.setState({
      activePage: pageNumber,
      page: page
    }); 
  }

  componentDidMount(){
  var self = this;
  this.serverRequest = 
      axios
        .get("./php/api/posts/list/")
        .then(function(result) {
          result.data.Posts.reverse(); //Newest order

          let totalItems = result.data.Posts.length;
          let pageSize = 3;
          let totalPages = Math.ceil(totalItems / pageSize);
          let pageNumber = 1;
          let startIndex = (pageNumber - 1) * pageSize;
          let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1)
          let page = result.data.Posts.slice(startIndex, endIndex + 1);

          self.setState({
                  posts: result.data.Posts,
                  page:page,
                  activatePage: 1
          });
        });
  }

 componentWillUnmount(){
    this.setState({
        posts: [],
	    	page: [],
        activePage: 1
    });
  }

  render(){
    return (
      <div>
      	<h1>Archives</h1>
      	<div className="postContainer">
      		<div className="posts">

                {this.state.page.map((post,index) => {
                    return (
                      <div key={post.ID} className="post">
                        <h2>{post.Title}</h2>
                        <span>Date Posted: {post.DatePosted} by {post.Author}</span>
                        <br/>
                        <p>
                          {post.Content.split('\\\n').map((item, key) => {return <span key={key}>{item}<br/></span>})}
                       </p>
                      </div>
                    );
                })}

                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={3}
                  totalItemsCount={this.state.posts.length}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange}
                />
      		</div>
      	</div>
      </div>
    );
  }

}

ReactDOM.render(
	<Archive />, document.getElementById('archive')
);
