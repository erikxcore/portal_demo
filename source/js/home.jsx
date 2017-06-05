import React from '../../node_modules/react';
import ReactDOM from '../../node_modules/react-dom';
import axios from '../../node_modules/axios';

class HomeNews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {posts: [],more: false};
  }

  componentDidMount(){
  var self = this;
  this.serverRequest = 
      axios
        .get("./php/api/RestController.php?view=all")
        .then(function(result) {
          result.data.Posts.reverse(); //Newest order
          let more = false;
          if(result.data.Posts.length > 2){
            more = true;
          }
            self.setState({
                    posts: result.data.Posts,
                    more: more
            });
        });
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextState.posts !== this.state.posts;
  }

 componentWillUnmount(){
    this.serverRequest.abort();
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
	              		post.Content.split('\\\n').map((item, key) => {
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
