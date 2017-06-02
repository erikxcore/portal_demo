import React from '../../node_modules/react';
import ReactDOM from '../../node_modules/react-dom';
import allPosts from '../posts.json';


class Archive extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	posts: [],
    	page: 1,
    	maxPostsPerPage: 3
    };
  }

  componentDidMount(){
    this.setState({
            posts: allPosts.Posts
    });
    /*
    if(allPosts.Posts.length > 2){
    	this.setState({
            more: true
    	});
    }
    */
  }

 componentWillUnmount(){
    this.setState({
            posts: [],
	    	page: 1,
	    	maxPostsPerPage: 3
    });
  }

  render(){
    return (
      <div>

      </div>
    );
  }

}

ReactDOM.render(
	<Archive />, document.getElementById('archive')
);
