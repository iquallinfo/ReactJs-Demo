import React, { Component } from 'react';
import {redirectPage,checkIsLogin,apiUrl,responseMessage} from '../Functions';
export default class Viewposts extends Component { 
  state = { 
  }
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      posts:[]
    };
    this.sharePost = this.sharePost.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.fetchPosts();
  }
  likePost(post_id,isliked){
    var user_id = localStorage.getItem("user_id");
    var formData = {};
    formData['post_id'] = post_id;
    formData['is_like'] = isliked;
    formData['user_id'] = user_id;
    
    fetch(apiUrl()+"liked-post",{
        method: 'POST',
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(
        (result) => {
            if(result.status == 'true'){
              responseMessage("success",result.message);
            }else{
              responseMessage("error",result.message);
            }
            this.fetchPosts();
        },
        (error) => {
        this.setState({
            isLoaded: true,
            error
        });
          alert("error");
        }
    )
  }
  submitComment(e){
    const formData = {};

    for (const field in this.refs) {
      formData[field] = this.refs[field].value;
     // alert(this.refs[field].value);
    }
    formData['user_id'] = localStorage.getItem('user_id');
    fetch(apiUrl()+"add-comment",{
      method: 'POST',
          body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(
        (result) => {
          if(result.status == 'true'){
            responseMessage("success",result.message);
          }else{
            responseMessage("error",result.message);
          }
          this.fetchPosts();
        },
        (error) => {
        this.setState({
            isLoaded: true,
            error
        });
        alert("error");
        }
    )

  }
  fetchPosts(){
    var user_id = localStorage.getItem("user_id");
    fetch(apiUrl()+"fetch-posts?user_id="+user_id)
    .then(res => res.json())
    .then(
        (result) => {
            this.setState({
                isLoaded: true,
                posts: result.posts,
                image_path: result.image_path,
                default_image: result.default_image,
            });
            //alert(JSON.stringify(result));
        },
        (error) => {
            this.setState({
            isLoaded: true,
            error
            });
            alert("error");
        }
    )
}

openComment(post_id){
 document.getElementById('post_id').value =post_id;
}
// componentDidMount() {
//     this.interval = setInterval(() => this.fetchPosts(), 5000);
// }
// componentWillUnmount() {
//     clearInterval(this.interval);
// }
  render () {     
      const { error, isLoaded,isLogin,posts } = this.state;

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
            return(<div class="view-posts">
            {posts.map(pst => (
            <div class="box text">
            <div class="box-header">
              <h3><a href=""><img src="https://goo.gl/oOD0V2" alt="" />{pst.user_info.username}</a>
                <span>{pst.posted_date} <i class="fa fa-globe"></i></span>
              </h3>
              <span><i class="ion-more"></i></span>
              <div class="window"><span></span></div>
            </div>
            <div class="box-content">
              <div class="content">
                <p>{pst.comment}</p>
              </div>
            </div>
            
            <div class="box-buttons">
              <div class="row">
                <button type="button" onClick={() => this.likePost(pst.id,pst.is_liked)}><span className={(pst.is_liked == null)?'ion-thumbsup':'liked ion-thumbsup'}></span> Like ({pst.post_liked_count})</button>
                <button data-toggle="modal" onClick={() => this.openComment(pst.id)} data-target="#commentbox"><span class="ion-chatbox-working"></span> Comment ({pst.post_comments_count})</button>
              </div>
            </div>
            <div class="box-click"><span data-toggle="collapse" data-target={'#comments-'+pst.id}><i class="ion-chatbox-working"></i> View  ({pst.post_comments_count}) more comments</span></div>
            <div class="box-comments comments-block collapse" id={'comments-'+pst.id}>
            {pst.post_comments.map(pst_comment => (
              <div class="comment">
                <div class="content">
                  <h3><a href="">{pst_comment.user_info.username}</a><span><time> {pst_comment.commented_date}</time></span></h3>
                  <p>{pst_comment.comment}</p>
                </div>
                <div class="clearfix"></div>
              </div>
            ))}    
            </div>
             
          </div>  
          ))}  

              <div id="commentbox" class="modal fade" role="dialog">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title">Comment</h4>
                    </div>
                    <div class="modal-body">
                    <div class="box-new-comment">
                    <form>
                    <input ref="post_id" name="post_id" type="hidden" value="" id="post_id" />
                      <div class="content">
                        <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <textarea ref="comment" name="comment" class="form-control" placeholder="Write a comment..."></textarea>
                          </div>
                        </div>
                        </div>
                        <div class="row">
                          <button type="button" class="close" data-dismiss="modal" onClick={this.submitComment} class="btn btn-primary">Submit</button>
                        </div>
                      </div>
                      </form>
                    </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div> 
        </div>

            )
        }
    }

  sharePost(e){
    const formData = {};

    for (const field in this.refs) {
      formData[field] = this.refs[field].value;
    }
    formData['user_id'] = localStorage.getItem('user_id');
    var token = localStorage.getItem('_token');
    fetch(apiUrl()+"add-post?_token="+token,{
          method: 'POST',
          body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then(
        (result) => {
            if(result.status !== 'true'){
                responseMessage("error",result.message);
            }else{
                responseMessage("success",result.message);
                document.getElementById("addPostForm").reset();
            }
        },
        (error) => {
        this.setState({
            isLoaded: true,
            error
        });
        alert("error");
        }
    )
  }
}