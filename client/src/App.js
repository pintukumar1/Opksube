import React, { useEffect } from "react";
import { useDispatch } from "react-redux"
import { bookActions } from "./store/book";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(bookActions.getBooks())
  }, [])
  return (
    <div>
      My App
    </div>
  );
}

export default App;
