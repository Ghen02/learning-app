import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LanguageLearningApp = () => {
  const [englishText, setEnglishText] = useState('');
  const [frenchText, setFrenchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=YOUR_GOOGLE_TRANSLATE_API_KEY`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: englishText,
            source: 'en',
            target: 'fr',
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      setFrenchText(data.data.translations[0].translatedText);
    } catch (error) {
      setError('Translation error. Please try again.');
      console.error('Translation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">English to French Language Learning</h1>
      <div className="mb-3">
        <textarea
          className="form-control"
          rows="4"
          placeholder="Enter English text"
          value={englishText}
          onChange={(e) => setEnglishText(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleTranslate} disabled={loading}>
        {loading ? 'Translating...' : 'Translate'}
      </button>
      {error && <p className="text-danger mt-2">{error}</p>}
      {frenchText && (
        <div className="mt-4">
          <h2>French Translation</h2>
          <p>{frenchText}</p>
        </div>
      )}
    </div>
  );
};

export default LanguageLearningApp;