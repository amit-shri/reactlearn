import React from 'react'

export default function NewsItem(props) {


  return (
    <div className="card" >
        <img src={props.urlToImage} className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.desc}</p>
            <a href={props.url} target="_blank" className="btn btn-sm btn-primary">View More</a>
        </div>
    </div>
  )
}
