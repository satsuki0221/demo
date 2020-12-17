import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch ,RootState} from '../stores'
import { fetchAsync, reset } from "../stores/gif";

function VendingMachine() {
  const gif = useSelector( (state: RootState) => state.gif);
  const {url, loading, error} = gif
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h1 className="title">猫GIFガチャ</h1>
      <Gif {...{ url, loading, error }} />
      <hr/>
      <div className="buttons">
        <button
          className="button is-primary"
          onClick={() => dispatch(fetchAsync())}
        >Play</button>
        <button
          className="button"
          onClick={() => dispatch(reset())}
        >Clear</button>
      </div>
    </div>
  );
}

function Gif({ url, loading, error }: { url: string, loading: boolean, error: boolean }) {

  if (error) {
    return <p className="notification is-danger">Error!!</p>;
  }

  if (loading) {
    return <p className="notification is-info">Loading...</p>;
  }

  if (!url) {
    return <p className="notification">Welcome!</p>;
  }

  return (
    <figure>
      <img src={url} alt="" />
      <figcaption>
        GIFs by <a href="https://giphy.com/">GIPHY</a>
      </figcaption>
    </figure>
  );
}

export default VendingMachine;
