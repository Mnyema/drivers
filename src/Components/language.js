import React, { useEffect, useState } from 'react';

const Language = () => {
  const [isEnglish, setIsEnglish] = useState(localStorage.getItem('isEnglish') || 'true');

  useEffect(() => {
    localStorage.setItem('isEnglish', isEnglish);
  }, [isEnglish]);

  const handleLanguageClick = (language) => {
    setIsEnglish(language === 'English' ? 'true' : 'false');
  };

  return (
    <div>
      <button className="language" onClick={() => handleLanguageClick('English')}>English</button>
      <button className="language" onClick={() => handleLanguageClick('Swahili')}>Swahili</button>
      {isEnglish === 'true' ? (
        <div className="english">English content</div>
      ) : (
        <div className="swahili">Swahili content</div>
      )}
    </div>
  );
};

export default Language;