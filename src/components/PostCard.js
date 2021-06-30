const PostCard = ({username, note, image}) => {
    return (
        <div id="post-card">
        <p>{username}</p>
        <p>{note}</p>
        {image ? <img src={`https://drg-s3-4.s3.amazonaws.com/${image}`} alt={`Post by ${username}`} id="post-img" /> : null}
        </div>
    )
}

export default PostCard