import React from '../../node_modules/react';
import ReactDOM from '../../node_modules/react-dom';
import allPosts from '../posts.json';
//console.log(allPosts);

//TO DO:
//On archive page, paginate 5 posts per page.

class HomeNews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {posts: [],more: false};
  }

  componentDidMount(){
    this.setState({
            posts: allPosts.Posts
    });
    if(allPosts.Posts.length > 2){
    	this.setState({
            more: true
    	});
    }
  }

 componentWillUnmount(){
    this.setState({
            posts: [],
            more: false
    });
  }

  render(){
    return (
      <div>
      	<h1>NEWS & ANNOUNCEMENTS</h1>
        {this.state.posts.map((post,index) => {
	        if(index < 2){
	          return (
	            <div key={post.ID} className="post">
	              <h2>{post.Title}</h2>
	              <span>Date Posted: {post.DatePosted} by {post.Author}</span>
	              <br/>
	              <p>
	              	{
	              		post.Content.split('\n').map((item, key) => {
						  return <span key={key}>{item}<br/></span>
						})
	              	}
	             </p>
	            </div>
	          );
	      	}
        })}
        {this.state.more == true &&
        	<div>
        		<a href="archive.html">Read more...</a>
        	</div>
        }
      </div>
    );
  }

}

ReactDOM.render(
	<HomeNews />, document.getElementById('posts')
);
