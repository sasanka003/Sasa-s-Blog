import { useEffect, useState } from "react"
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

export default function Comment({comment, onLike, onEdit, onDelete}) {
  const [user, setUser] = useState(null);
  const { currentUser } = useSelector(state => state.user);
  const [editing, setEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);
  useEffect(() => {
    try {
      const getUser = async () => {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      };
      getUser();
    } catch (error) {
      console.log(error);
    }
  },[comment]);
  const handleEdit = () => {
    setEditing(true);
    setEditedComment(comment.comment);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/edit/${comment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: editedComment }),
      });
      const data = await res.json();
      if (res.ok) {
        onEdit(comment, editedComment);
        setEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img className="w-10 h-10 rounded-full bg-gray-200" src={user?.profilePicture} alt={user?.username} />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-sm truncate">
            {user ? `@${user.username}` : 'anonymous user'}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {editing ? (
          <>
            <Textarea
              className="w-full mb-2"
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
            />
            <div className="flex gap-2 justify-end text-xs">
              <Button
                type="button"
                size='sm'
                onClick={handleSave}
                gradientDuoTone="purpleToBlue"
              >
                Save
              </Button>
              <Button
                type="button"
                size='sm'
                onClick={() => setEditing(false)}
                gradientDuoTone="purpleToBlue"
                outline
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 mb-2">{comment.comment}</p>
            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
              <button type='button' onClick={() => onLike(comment._id)} className={`text-gray-400 hover:text-blue-500 ${ currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500' }`}>
                <FaThumbsUp className="text-sm" />
              </button>
              <span className="text-xs text-gray-400">{comment.numberOfLikes > 0 && comment.numberOfLikes +" "+(comment.numberOfLikes == 1 ? "like" : "likes")}</span>
              {
                currentUser && currentUser._id === comment.userId && (
                  <button type='button' onClick={handleEdit} className="text-gray-400 hover:text-blue-500">Edit</button>
                )
              }
              {
                currentUser && (currentUser._id === comment.userId || currentUser.type === "admin") && (
                  <button type='button' onClick={()=>onDelete(comment._id)} className="text-gray-400 hover:text-red-500">Delete</button>
                )
              }
            </div>
          </>
          )}
        
      </div>
    </div>
  )
}
