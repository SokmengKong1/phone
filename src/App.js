// App.js
import React from 'react';
import PageFlipBook from './PageFlipBook';
import { MyFlipbooks } from './Flipbooks';

function App() {
  return (
    <div className="App">
      <h1>PDF Flip Book</h1>
      {/* <PageFlipBook pdf="/path/to/your/pdf/file.pdf" /> */}
      <MyFlipbooks/>
    </div>
  );
}

export default App;
