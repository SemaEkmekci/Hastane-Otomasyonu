import React from 'react';
import '../css/promotionalVideo.css'

function PromotionalVideo() {
  return (
    <div id="heroVideo">
      <a href="javascript:void(0)">
        <video loop muted autoPlay preload="auto">
          <source src="https://hastane.erbakan.edu.tr//theme/video/meram.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </a>
     
    </div>
  );
}

export default PromotionalVideo;
