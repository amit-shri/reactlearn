import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Loader from "./Loader";
import DefaultImage from './256px-DefaultImage.jpg'

export default function NewsList(props) {

  const [page, setPage] = useState(1);
  const [totalArticles, settotalArticles] = useState(0);
  const [Loading, setLoading] = useState(false)
  const [Articles, setArticles] = useState({});

  const fetchData = async () => {
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
    //  alert("previous clicked");
    setPage(page - 1);
  }

  
  const handleNextClick = () => {
    //    alert("next clicked");
    setPage(page + 1);
    
  }


  
  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className="container my-3">
         
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
