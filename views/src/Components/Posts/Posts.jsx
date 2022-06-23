import React from 'react'
import './Posts.css'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getTimelinePosts } from '../../actions/postAction'

const Posts = () => {

  const dispatch = useDispatch()
  const { user } = useSelector((state)=> state.authReducer.authData)
  const { posts, loading } = useSelector((state) => state.postReducer)

  React.useEffect(()=> {
    dispatch(getTimelinePosts(user._id))
  },[])

  return (
    <div className="Posts">
        {loading ? "Retreiving Posts..."
         : posts.map((post, id) => {
          return <Post data={post} id={id} />
        })}
    </div>
  )
}

export default Posts