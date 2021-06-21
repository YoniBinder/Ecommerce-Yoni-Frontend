import React,{Component} from 'react'
import axios from 'axios'
export default class BlogPage extends Component {
    constructor(props){
        super(props)

        this.state={
            arrBlog:JSON.parse(localStorage.getItem('comments')) || [],
            blogs:[],
            posts:[],
            comments:[]
        }

        this.callRef = React.createRef();
        this.updateState=this.updateState.bind(this)
        this.choosen=this.props.match.params.id;
    }
    
    componentDidMount(){
        axios.get(`${process.env.REACT_APP_PROXY}/blogs`).then((response)=>{ 
            this.setState({blogs:response.data})
            })
        axios.get(`${process.env.REACT_APP_PROXY}/posts`).then((response)=>{    
            this.setState({posts:response.data})
            })
        axios.get(`${process.env.REACT_APP_PROXY}/comments`).then((response)=>{    
            this.setState({comments:response.data})
            })
    }

    updateState(e){
        let blog = this.state.blogs.filter((blog)=> {
            return blog.id === this.choosen;
            })[0];

        let arr=[...this.state.arrBlog]
        let time=new Date().toUTCString();
        arr.push({id:blog.id,message:this.callRef.current.value,date:time});
        localStorage.setItem('comments', JSON.stringify(arr));
        this.setState({ arrBlog: arr})
     }


   render(){
    let blog = this.state.blogs.filter((blog)=> {
        return blog.id === this.choosen;
        })[0];
    return (
        <div>
            <br/><br/>
           <h1 className="text-center">{this.state.blogs.length>0 && blog.title}</h1>
           <img src={(this.state.blogs.length>0 && blog.image) || "false"} alt="..." style={{width:"500px",height:"300px", margin:"0 auto"}} className="d-block" />
           <br/>
           <p className="container">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
           <p className="container">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

           <h5 className="container"><b>author: {this.state.blogs.length>0 && blog.author} 17/2/2021</b></h5>
           <br/>
            <label>Add a public comment: </label><br/>
           <input type="text" style={{width:"600px"}} ref={this.callRef}/><br/>
           <button type="submit" className="mb-3" onClick={this.updateState}>add a comment</button><br/>
           <br/>
           <h4>Comments:</h4>
           <div className="container border border-success rounded-end rounded-3 mb-4 ">
           {
               
               this.state.posts.length>0 && this.state.posts.filter((obj)=>{return obj.blogId===this.choosen}).map((obj)=>
                <div key={obj.id} className="mb-3">
                <div><b></b></div>
                <div><b>User {obj.userId} : {obj.title}</b></div>
                <div>{obj.body}</div>
                    <div className="container text-start">
                    
                    {this.state.comments.length>0 && this.state.comments.filter((comment)=>{return comment.postId===obj.id}).map((comment)=>
                        <div key={comment.id}>
                        <div><b>User {comment.userId} </b>: {comment.body}</div>
                        <div></div>
                        </div>
                    
                    )}
            
                    </div>
                </div>
               )}
            </div>
        </div>
    )
}
}