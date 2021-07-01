const PostCard = ({username, note, image, realuser}) => {

    console.log(realuser)

    const currentUser = localStorage.getItem("user")

    return (
        <div id="post-card">
        <p>{username}</p>
        <p>{note}</p>
        {image ? <img src={`https://drg-s3-4.s3.amazonaws.com/${image}`} alt={`Post by ${username}`} id="post-img" /> : null}
        {currentUser === realuser ? <div>delete</div> : null}
        </div>
    )
}

export default PostCard