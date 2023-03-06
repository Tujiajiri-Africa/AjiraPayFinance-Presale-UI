import React, { useState } from 'react';
import './ImageCarousel.css';

export function ImageCarousel({ images }: { images: string[] }) {
  const [animation, setAnimation] = useState<{
    direction: 'left' | 'right' | 'stop';
    imageIndex: number;
  }>({
    direction: 'stop',
    imageIndex: 0,
  });

  const getSecondImageIndex = (
    currIndex: number,
    dir: 'left' | 'right' | 'stop'
  ) => {
    return dir === 'stop'
      ? currIndex
      : (currIndex + (dir === 'right' ? 1 : -1) + images.length) %
          images.length;
  };

  const onNext = () => {
    if (animation.direction === 'stop') {
      setAnimation({
        ...animation,
        direction: 'right',
      });
    }
  };

  const onPrevious = () => {
    if (animation.direction === 'stop') {
      setAnimation({
        ...animation,
        direction: 'left',
      });
    }
  };

  const onTransitionEnd = () => {
    setAnimation((prevAnimation) => ({
      ...prevAnimation,
      direction: 'stop',
      imageIndex: getSecondImageIndex(
        prevAnimation.imageIndex,
        prevAnimation.direction
      ),
    }));
  };

  return (
    <div className="carousel">
      <img
        className="image firstImage"
        src={images[animation.imageIndex]}
        data-animate={animation.direction}
        onTransitionEnd={onTransitionEnd}
      />
      <img
        className="image"
        src={
          images[getSecondImageIndex(animation.imageIndex, animation.direction)]
        }
      />

      {/* Buttons */}
      <button className="btn prevBtn" onClick={onPrevious}>
        Previous
      </button>
      <button className="btn nextBtn" onClick={onNext}>
        Next
      </button>
    </div>
  );
}