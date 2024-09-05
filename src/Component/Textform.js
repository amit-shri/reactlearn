import React, { useState } from "react";

export default function (props) {
 
  const [title, setTitle] = useState('');

  const changeToUpper = (e) => {
    setTitle(title.toUpperCase());
    props.appendAlert('Changed to upper', 'success');
  };

  const changeToLower = (e) => {
    setTitle(title.toLowerCase());
  };

  const clearText = (e) => {
    setTitle('');
  };

  const myboxonChange = (e) => {
    setTitle(e.target.value);
  }

  return (
    <div>
      <div className="container">
      <div className="row">
        <h2>Text Editor</h2>
      </div>
        
        <div className="row">
          <div className="col-md-12">
            <textarea name="mybox" id="mybox" onChange={myboxonChange} rows="8" cols="100" value={title}></textarea>
          </div>
          <div className="col-md-12">
            <input
              className="btn btn-primary mx-1 my-1"
              onClick={changeToUpper}
              type="submit"
              name="btnchangeToUpper" 
              value="Upper"
            />
            <input
              className="btn btn-primary mx-1 my-1"
              onClick={changeToLower}
              type="submit"
              name="btnchangeToLower" 
              value="Lower"
            />
            <input
              className="btn btn-primary mx-1 my-1"
              onClick={clearText}
              type="submit"
              name="btnclearText" 
              value="Clear"
            />
          </div>
        </div>
      </div>

      <div className="container">
        <h2>Summery of text:</h2>
        <div>{title.split(' ').filter((element)=>{return element.length!==0}).length} words and {title.length} characters </div>
        <h2>Preview: </h2>
        <div className="mybox_output">{title.length > 0 ? title : 'Nothing to preview.'}</div>
      </div>
    </div>
  );
}
