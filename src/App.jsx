import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState();

  const filters = ["Entertainment", "Sports", "Global", "Technology", "Health"];

  const fetchData = () => {
    axios
      .get("https://linesnews.onrender.com/api/news-datas")
      .then((res) => {
        console.log("data", res.data.data);
        setData(res.data.data);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Searching the headlien and tags
  const handleSearch = () => {
    return data.filter((ele) => {
      return (
        ele.attributes.headline.toLowerCase().includes(search.toLowerCase()) ||
        ele.attributes.hashtags.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  // For filtering purpose
  // const handleFilterHandler = (filter) => {
  //   console.log(filter);
  //   axios
  //     .get(`https://linesnews.onrender.com/api/news-datas?category=${filter}`)
  //     .then((res) => {
  //       console.log("filter", res.data.data);
  //       setFilter(res.data.data);
  //     })
  //     .catch((e) => {
  //       console.log("Error", e);
  //     });
  // };

  return (
    <div className="h-screen">
      {/* Navbar */}
      <div className="navbar bg-slate-900 flex justify-center items-center p-3 space-x-5">
        <img
          src="/images/logo.jpg"
          width={50}
          height={50}
          alt="logo"
          className="hover:animate-spin duration-75"
        />
        <h1 className="text-slate-400 text-xl font-bold hover:text-red-600 hover:underline hover:underline-offset-8 transition-all duration-75 cursor-pointer hover:animate-pulse">
          inshorts
        </h1>
      </div>

      {/* Search bar */}
      <div className="searchBar m-2">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search items..."
          className="p-2 mt-2 w-full ring-2 ring-slate-400 rounded-sm"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* If search item has no matched value */}
      {handleSearch().length === 0 && (
        <div className="noItems text-center text-red-500 m-5 text-2xl font-semibold">
          <p>No items found with this name</p>
        </div>
      )}

      {/* Default Value */}
      <div className="cards flex flex-wrap justify-center ml-2 gap-2 mt-5">
        {handleSearch().map((ele) => {
          return (
            <main
              className="card p-5 rounded-lg border border-slate-600 border-opacity-20 w-auto m-2"
              key={ele.id}
            >
              <div className="imgContainer w-56 h-56 flex justify-center rounded-sm p-5 bg-white border border-black border-opacity-40">
                <img
                  src={ele.attributes.newsIcon}
                  alt="newsIcon"
                  className="w-60 hover:scale-110 duration-500 transition-all cursor-pointer"
                />
              </div>

              <div className="textContainer mt-2 w-56 max-w-full">
                <h2 className="font-bold text-base">
                  {ele.attributes.headline}
                </h2>

                <div className="text-slate-700 flex gap-3 mt-3 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#0039a6"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                  {ele.attributes.newsSource}
                </div>
              </div>
              <div className="tags mt-5 flex flex-wrap justify-center items-center">
                {ele.attributes.hashtags.split(",").map((tag, index) => (
                  <span
                    className="capitalize rounded-md px-2 py-0.5 text-white bg-[#FF5E0E] cursor-pointer m-1"
                    key={index}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </main>
          );
        })}
      </div>
    </div>
  );
};

export default App;
