//Blogging App using Hooks
// eslint-disable-next-line 
import { useState, useRef , useEffect, useReducer} from "react";
import { db } from "../firebaseInit";
// eslint-disable-next-line 
import { collection, addDoc, doc, setDoc, getDocs, onSnapshot, deleteDoc } from "firebase/firestore"; 


// function blogsReducer(state, action){
//     switch(action.type){
//         case "ADD":
//             return [action.blog, ...state];
//         case "REMOVE":
//             return state.filter((blog,index)=> index!== action.index);
//         default:
//             return [];
//     }
// }

export default function Blog(){

    // const [title,setTitle] = useState("");
    // const [content,setContent] = useState("");
    const [formData, setFormData] = useState({title:"",content:""});
    const [blogs, setBlogs] =  useState([]);
    // const [blogs, dispatch] = useReducer(blogsReducer, []);
    const titleRef = useRef(null);

    useEffect(()=>{
        titleRef.current.focus();
    },[]);

    useEffect(()=>{
        if(blogs.length && blogs[0].title){
            document.title = blogs[0].title;
        }
        else{
            document.title = "No Blogs!!"
        }
    },[blogs]);

    useEffect(()=>{
        // async function fetchData(){
        //     const snapShot = await getDocs(collection(db, "blogs"));

        //     const blogs = snapShot.docs.map((doc)=>{
        //         return{
        //             id: doc.id,
        //             ...doc.data()
        //         }
        //     })
        //     setBlogs(blogs);
        // }

        // fetchData();

        const unsub = onSnapshot(collection(db, "blogs"), (snapShot)=>{
            const blogs = snapShot.docs.map((doc)=>{
                        return{
                            id: doc.id,
                            ...doc.data()
                        }
                    })
                    setBlogs(blogs);
        })
    },[])

    async function handleSubmit(e){
        e.preventDefault();

        // setBlogs([{title:formData.title,content:formData.content}, ...blogs]);
        // dispatch({type:"ADD", blog:{title:formData.title,content:formData.content}})
        setFormData({title:"", content:""});
        titleRef.current.focus();

        const docRef = doc(collection(db, "blogs"))

        await setDoc(docRef, {
            title: formData.title,
            content: formData.content,
            createdOn: new Date()
          });
        //   console.log("Document written with ID: ", docRef.id);
    }

    async function removeBlog(id){
        
        // setBlogs(blogs.filter((blog,index)=> i!==index));
        const docRef = doc(db, "blogs", id);
        deleteDoc(docRef);
        // dispatch({type:"REMOVE", index:i});
    }

    return(
        <>
        <h1>Write a Blog!</h1>
        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>
                <Row label="Title">
                        <input className="input" value={formData.title} ref={titleRef}
                                placeholder="Enter the Title of the Blog here.."
                                onChange = {(e) => setFormData({title: e.target.value, content:formData.content})}
                        />
                </Row >

                <Row label="Content">
                        <textarea className="input content" value={formData.content} required
                                placeholder="Content of the Blog goes here.."
                                onChange = {(e) => setFormData({title:formData.title,content: e.target.value})}
                        />
                </Row >
         
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted blogs will be displayed */}
        <h2> Blogs </h2>
        {blogs.map((blog,i) => (
            <div className="blog">
                <h3>{blog.title}</h3>
                <hr/>
                <p>{blog.content}</p>

                <div className="blog-btn">
                        <button onClick={() => {
                            removeBlog(blog.id)
                        }}
                        className="btn remove">

                            Delete

                        </button>
                </div>
            </div>
        ))}
        
        </>
        )
    }

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
