import { Button } from 'semantic-ui-react'
import React, { Component } from 'react';
import { isAuthenticated } from '../common';
import axios from "axios"


class LikeButton extends Component {

    constructor(props){
        super(props)
        this.state={
          liked:false,
          likes:0,
          content:'',
          icon:""
        }

        this.toggleLikeHandler=this.toggleLikeHandler.bind(this)
    }
 

       componentDidMount(){
         const likes=this.props.post.likes.length
         let  found =undefined

      if(isAuthenticated()!==false){
        const userId=isAuthenticated().user._id;

        
         found=this.props.post.likes.find(function(el){
          return (el===userId)
        })

         
      }
      if(found === undefined ) 
      this.setState({likes,liked:false,content:"Like",icon:"heart"})
    else
     this.setState({likes,liked:true,content:"Liked",icon:"check"})

          }
  
  
      
     toggleLikeHandler(){
          let call = this.state.liked ? "unlike" :"like" 
          const userId =isAuthenticated().user._id
          const token =isAuthenticated().token

          const postId=this.props.post._id
   
    axios.put(`${process.env.REACT_APP_API_URL}/posts/${call}`,{userId,postId},{
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then( res=>{
    
    let  found=res.data.likes.find(function(el){
      return (el.toString()===userId.toString())
    })
    if(found === undefined) found =false; else found =true 

          this.setState({likes:res.data.likes.length,liked:found})

       if(!this.state.liked ) 
         this.setState({content:"Like",icon:"heart"})
       else
         this.setState({content:"Liked",icon:"check"})

  
     
  })
 

}



  render() {
    const {likes,content,icon}=this.state
    
    return (
      <div>
         <Button onClick={this.toggleLikeHandler}
      color='red'
      content={content}
      icon={icon}
      size='mini'     
       label={{ basic: true, color: 'red', pointing: 'left', content:likes   }}
      >
   </Button>
      </div>
    );
  }
}

export default LikeButton;