import React, { useState } from 'react';
import './CardComponent.css';

import imgPublicTransport from './photo/public_transport.jpg';
import imgPlantTrees from './photo/plant_trees.jpg';
import imgCleanEnergy from './photo/clean_energy.jpg';
import imgRecycle from './photo/recycle.jpg';

const CardComponent = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div id="My Role">
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-inner" onClick={handleFlip}>
          <div className="card-front">
            <div className="image-box">
              <img src={card.imageUrl} alt={card.title} />
            </div>
            <div className="content">
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              <button onClick={handleFlip} className="learn-more">Learn more</button>
            </div>
          </div>
          <div className="card-back">
            <div className="content">
              <h2>{card.title} - Solution</h2>
              <p>{card.moreInfo}</p>
              <button onClick={handleFlip} className="learn-more">Go back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AirTips = () => {
  const cards = [
    {
      id: 1,
      title: 'Use Public Transport',
      description: 'Reduce emissions by using public transportation.',
      moreInfo: 'Using public transport reduces the number of individual vehicles on the road, which in turn lowers the emission of pollutants. It is a cost-effective and efficient way to reduce air pollution and conserve energy resources.',
      imageUrl: imgPublicTransport
    },
    {
      id: 2,
      title: 'Plant Trees',
      description: 'Trees absorb CO2 and improve air quality.',
      moreInfo: 'Planting trees and maintaining green spaces in urban areas can significantly reduce air pollution. Trees absorb carbon dioxide and other pollutants, providing cleaner air and a healthier environment.',
      imageUrl: imgPlantTrees
    },
    {
      id: 3,
      title: 'Use Clean Energy',
      description: 'Switch to renewable energy sources.',
      moreInfo: 'Adopting clean energy sources such as solar, wind, and hydroelectric power can drastically reduce air pollution. These renewable energy sources produce little to no emissions, ensuring a sustainable and clean energy future.',
      imageUrl: imgCleanEnergy
    },
    {
      id: 4,
      title: 'Reduce, Reuse, Recycle',
      description: 'Minimize waste to reduce pollution.',
      moreInfo: 'Practicing the three R’s – Reduce, Reuse, and Recycle – helps minimize waste and reduces the pollution caused by waste disposal. This practice conserves natural resources and energy, contributing to a cleaner environment.',
      imageUrl: imgRecycle
    }
  ];

  return (
    <section className="air-tips-section" id="#My Role">
      <h2 className="section-title">Air Pollution Reduction Tips</h2>
      <div className="section-content">
        <ul className="air-tips-list">
          {cards.map((card) => (
            <li key={card.id} className="air-tips-item">
              <CardComponent card={card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AirTips;
