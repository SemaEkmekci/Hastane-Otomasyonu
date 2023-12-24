import React from 'react';

const PageLoadGif = () => {

    
     


  return (
    <div id="PageLoadGif" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <div className="LoadingDiv" style={{ textAlign: 'center' }}>
        <img alt="yükleniyor ikonu" src="/src/images/loading.gif" style={{ width: '100px', height: 'auto', display:'block'}} />
      </div>
    </div>
  );
};

export default PageLoadGif;
