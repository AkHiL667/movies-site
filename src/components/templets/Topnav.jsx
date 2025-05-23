import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Topnav() {
  const [search, setSearch] = useState("");
  const [searchshow, setSearchshow] = useState([]);
  const searchResult = async () => {
    if (search.length === 0) {
      setSearchshow([]);
      return;
    }
    try {
      const response = await axios.get(`/search/multi?query=${search}`);
      setSearchshow(response.data.results);
    } catch (error) {
      setSearchshow([]);
    }
  }
  
  useEffect(() => {
    searchResult();
  }, [search]);

  return (
    <div className="relative ml-5 w-full h-[10vh] flex justify-start items-center px-4 lg:px-8">
      <i className="ri-search-line hidden lg:block text-zinc-300 text-2xl"></i>
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        type="text"
        placeholder="search"
        className="outline-none bg-transparent px-2 border-none py-2 mx-5 text-white w-full lg:w-[50%]"
      />
      {search.length > 0 && <i onClick={() => setSearch('')} className="text-zinc-300 cursor-pointer text-2xl ri-close-line"></i>}
      
      <div className="w-full lg:w-[50%] max-h-[50vh] absolute overflow-auto left-0 top-[90%] z-50">
        {searchshow && searchshow.length > 0 && searchshow.map((item, index) => (
          <Link 
            to={`/${item.media_type}/${item.id}`}
            key={item.id || index}
            className="inline-block border-b-2 hover:bg-zinc-900 border-zinc-400 text-white bg-zinc-800 py-8 flex justify-start items-center px-2 w-full"
          >
            <img className="w-[10%] shadow-lg shadow-zinc-800 object-cover rounded-md mx-2 h-[10%]"
              src={item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path || item.backdrop_path || item.profile_path}` : "https://thumbs.dreamstime.com/b/no-image-vector-symbol-missing-available-icon-gallery-moment-placeholder-246411909.jpg"} 
              alt={item.title || 'movie poster'} 
            />
            <span>{item.title || item.name}</span>
            <p className="text-zinc-400 text-xs ml-5">{item.media_type.toUpperCase()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Topnav;
