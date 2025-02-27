import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Loader from "./Loader";
import DefaultImage from './256px-DefaultImage.jpg'
import { useNavigate } from "react-router-dom";

export default function NewsList(props) {

  const [page, setPage] = useState(1);
  const [totalArticles, settotalArticles] = useState(0);
  const [Loading, setLoading] = useState(false)
  const [Articles, setArticles] = useState({});
  const navigate = useNavigate();

  const fetchData = async () => {
    // console.log("Fetch data called");
    try {
      let url =
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=5bb98992a41d4aa78795974b9ba6eaa8&pageSize=${props.pageSize}&page=${page}`;

      setLoading(true);
      let data = await fetch(url);
      let parsedata = await data.json();
 
      setArticles(parsedata.articles);
      settotalArticles(parsedata.totalResults);
      setLoading(false);
      return parsedata;
    } catch (error) {
      console.log("error", error);
    }
  };

  const handlePreviousClick = () => {
    setPage(page - 1);
  }
  
  const handleNextClick = () => {
    setPage(page + 1);
  }

  useEffect(() => {

    // const verifyAccess = async () => {
    //   try {
    //     let access = await props.checkUserAccess();
    //     console.log('Access:', access);
    //     if (access) {
    //       fetchData(); // Fetch your data if access is granted
    //     } else {
    //       navigate("/"); // Redirect to the home page if access is denied
    //     }
    //   } catch (error) {
    //     console.error('Error checking access:', error);
    //     navigate("/"); // Redirect to the home page in case of an error
    //   }
    // };

    // verifyAccess(); // Call the async function inside useEffect
    
    fetchData();

  }, [page]);

  return (
    <div className="container my-3">
         <div className="row">
          <h2>News Monkey</h2>
        </div>
         {Loading && <Loader/>}
         <div>
            <div className="d-flex my-3 justify-content-between">
              <button disabled={page <= 1} className="btn btn-sm btn-primary" onClick={handlePreviousClick} >
                Previous
              </button>
              <button disabled={Math.ceil(totalArticles/props.pageSize) <= page } className="btn btn-sm btn-primary" onClick={handleNextClick} >
                Next
              </button>
            </div>
          </div>
      <div className="row">
        {(Articles != undefined && Articles.length > 0 && Loading == false)  && 
          Articles.map((element) => {

            var urlToImage = element.urlToImage ? element.urlToImage : DefaultImage;
            return (
              <div className="col-md-3 my-2" key={element.url}>
                <NewsItem
                  title={element.title}
                  desc={element.description}
                  urlToImage={urlToImage}
                  url={element.url}
                  page = {page}
                ></NewsItem>
              </div>
            );
          })}

        {(!(Articles != undefined && Articles.length > 0 && Loading == false))  && 'No records found.' }
      </div>
   
    </div>
  );
}
