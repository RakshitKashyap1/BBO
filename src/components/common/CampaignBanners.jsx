import React, { useState, useEffect } from 'react';

const banners = [
  '/assets/billboard1.jpg',
  '/assets/billboard2.jpg',
  '/assets/billboard3.jpg',
  '/assets/billboard4.jpg',
  '/assets/billboard5.jpg',
];

export default function CampaignBanners() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="banner-container">
      {banners.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Campaign ${index + 1}`}
          className="animate-banner"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: index === currentIndex ? 'block' : 'none',
            border: 'none',
          }}
        />
      ))}
    </div>
  );
}
