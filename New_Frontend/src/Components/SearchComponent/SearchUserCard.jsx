import React from 'react'
import { useNavigate } from 'react-router-dom'

const SearchUserCard = ({username, image, setIsSearchVisible}) => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate(`/${username}`)
    setIsSearchVisible(false);
  }
  return (
    <div 
      onClick={handleNavigate} 
      className='py-3 px-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer rounded-lg'
    >
      <div className="flex items-center gap-4">
        <img
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 shadow-sm"
          src={image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
          alt={`${username}'s profile`}
        />
        <div className="flex-1">
          <p className="font-semibold text-gray-900">{username}</p>
          <p className="text-sm text-gray-500">@{username}</p>
        </div>
      </div>
    </div>
  )
}

export default SearchUserCard