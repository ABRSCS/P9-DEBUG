import { useEffect, useState, useCallback } from "react";
import { useData } from "../../contexts/DataContext/DataContext";
import { getMonth } from "../../helpers/Date/Date";

import "./Slider.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const byDateDesc = data?.events?.sort((evtA, evtB) => {
    const dateA = new Date(evtA.date);
    const dateB = new Date(evtB.date);
    return dateB - dateA;
  }) || [];

  const nextCard = useCallback(() => {
    if (byDateDesc.length > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setIndex((currentIndex) => (currentIndex + 1) % byDateDesc.length);
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  }, [byDateDesc.length, isTransitioning]);

  useEffect(() => {
    const timer = setTimeout(nextCard, 5000);
    return () => clearTimeout(timer);
  }, [index, nextCard]);

  const handleRadioChange = (eventId) => {
    if (isTransitioning) return;
    const newIndex = byDateDesc.findIndex(event => event.id === eventId);
    if (newIndex !== -1) {
      setIsTransitioning(true);
      setIndex(newIndex);
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  };

  if (!byDateDesc.length) {
    return null;
  }

  return (
    <div className="SlideCardList" role="region" aria-label="Carrousel d'événements">
      {byDateDesc.map((event) => (
        <div key={`slide-${event.id}`}>
          <div
            className={`SlideCard SlideCard--${
              index === byDateDesc.findIndex(e => e.id === event.id) ? "display" : "hide"
            }`}
            role="group"
            aria-label={`Diapositive ${byDateDesc.findIndex(e => e.id === event.id) + 1} sur ${byDateDesc.length}`}
          >
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination" role="tablist">
              {byDateDesc.map((radioEvent) => (
                <input
                  key={`radio-${radioEvent.id}`}
                  type="radio"
                  name="radio-button"
                  checked={index === byDateDesc.findIndex(e => e.id === radioEvent.id)}
                  onChange={() => handleRadioChange(radioEvent.id)}
                  aria-label={`Aller à la diapositive ${byDateDesc.findIndex(e => e.id === radioEvent.id) + 1}`}
                  disabled={isTransitioning}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
