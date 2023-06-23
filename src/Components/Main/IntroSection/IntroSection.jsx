import React from 'react';
import './IntroSection.css';
import MainImage from '../../../assets/MainImage.png';

const IntroSection = () => {
  return (
    <div className='intro-section'>
      <img src={MainImage} alt='introSection' />
      <div className='intro-section-text'>
        <p className='intro-section-text-1'>Add your products and give <br /> your valuable feedback </p>
        <p className='intro-section-text-2'>
          Easily give your feedback in a matter of minutes. Access your <br />audience on all platforms. Observe result manually in real time
        </p>
      </div>
    </div>
  )
}

export default IntroSection;