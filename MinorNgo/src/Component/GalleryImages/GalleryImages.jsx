import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const GalleryImages = () => {
  const [images, setImages] = useState([
    'https://picsum.photos/id/237/200/300?random=1',
    'https://picsum.photos/200/300?random=2',
    'https://picsum.photos/200/300?random=3',
    'https://picsum.photos/200/300?random=4',
    'https://picsum.photos/200/300?random=5',
    'https://picsum.photos/200/300?random=6',
    'https://picsum.photos/200/300?random=7',
    'https://picsum.photos/200/300?random=8',
    'https://picsum.photos/id/237/200/300?random=9',
    'https://picsum.photos/200/300?random=10',
    'https://picsum.photos/200/300?random=11',
    'https://picsum.photos/200/300?random=12',
    'https://picsum.photos/200/300?random=13',
    'https://picsum.photos/200/300?random=14',
    'https://picsum.photos/200/300?random=15',
    'https://picsum.photos/200/300?random=16'
  ]);
  const totalImages = useRef(images.length);
  const loaderRef = useRef();

  // Function to load more images
  const loadMoreImages = () => {
    const newImages = [];
    for (let i = 0; i < 12; i++) {
      newImages.push(`https://picsum.photos/200/300?random=${totalImages.current + i + 1}`);
    }
    totalImages.current += 12;
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  // Function to handle scroll events and load images when scrolled to the bottom
  const handleScroll = () => {
    const scrollPercent = getVerticalScrollPercentage(document.body);
    if (scrollPercent > 90) {
      loadMoreImages();
    }
  };

  // Get the vertical scroll percentage
  const getVerticalScrollPercentage = (elm) => {
    let p = elm.parentNode || document.body;
    return ((elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight)) * 100;
  };

  // Adding the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="container">
      <h1 className="text-center my-4">OUR WORK </h1>
      <nav className="navbar navbar-dark bg-dark justify-content-center mb-4">
        <a className="navbar-brand" href="https://alreylz.me">
       
        
        </a>
      </nav>
      <div className="row g-3">
        {images.map((imageSrc, index) => (
          <div className="col-md-3 col-sm-6" key={index}>
            <img
              className="img-fluid"
              src={imageSrc}
              alt={`Random ${index + 1}`}
              style={{ animationDelay: `${0.5 * index}s`, opacity: 0 }}
              onLoad={(e) => (e.target.style.opacity = 1)}
            />
          </div>
        ))}
        <div ref={loaderRef} className="col-12 text-center">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryImages;
