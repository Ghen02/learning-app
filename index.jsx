import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LanguageLearningApp = () => {
  const [englishText, setEnglishText] = useState('');
  const [frenchText, setFrenchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('fr');

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
            source: sourceLanguage,
            target: targetLanguage,
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

  const handleClear = () => {
    setEnglishText('');
    setFrenchText('');
    setError('');
  };

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setEnglishText(frenchText);
    setFrenchText('');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Language Learning App</h1>
      <div className="mb-3">
        <textarea
          className="form-control"
          rows="4"
          placeholder={`Enter ${sourceLanguage === 'en' ? 'English' : 'French'} text`}
          value={englishText}
          onChange={(e) => setEnglishText(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="mr-2">Translate from:</label>
        <select value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="fr">French</option>
        </select>
        <button className="btn btn-outline-secondary ml-2" onClick={handleSwapLanguages}>
          Swap
        </button>
      </div>
      <button className="btn btn-primary mr-2" onClick={handleTranslate} disabled={loading}>
        {loading ? 'Translating...' : 'Translate'}
      </button>
      <button className="btn btn-secondary" onClick={handleClear}>
        Clear
      </button>
      {error && <p className="text-danger mt-2">{error}</p>}
      {frenchText && (
        <div className="mt-4">
          <h2>{targetLanguage === 'fr' ? 'French' : 'English'} Translation</h2>
          <p>{frenchText}</p>
        </div>
      )}
    </div>
  );
};

export default LanguageLearningApp;