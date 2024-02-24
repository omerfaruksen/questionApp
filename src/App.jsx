import React, { useState, useEffect } from 'react';
import './App.css';
import { questions } from './questions';

function App() {
  const [index, setIndex] = useState(0);
  const [start, setStart] = useState(false); 
  const [question, setQuestion] = useState(""); 
  const [questionImg, setQuestionImg] = useState(""); 
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0); 
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [showOptions, setShowOptions] = useState(false); 
  const [timer, setTimer] = useState(null); 
  const [showResult, setShowResult] = useState(false); 
  const [finalResult, setFinalResult] = useState(null); 

  // Teste başlama 
  const handleIsClick = () => {
    setStart(true);
    setShowOptions(false);
  };

  // Cevabı gönderme 
  const handleAnswerSubmit = () => {
    // Zamanlayıcıyı sıfırla
    clearTimeout(timer);
    // Seçilen cevap doğru ise doğru cevap sayısını arttır, değilse yanlış cevap sayısını arttır
    if (selectedAnswers[index] === questions[index].answer) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }
    setIndex(index + 1);
    setShowOptions(false);
  };

  useEffect(() => {
    if (start) {
      setTimer(
        setTimeout(() => {
          setIndex(index + 1);
          setShowOptions(false);
        }, 30000) 
      );
    }
    // Yeni soruyu ekrana yansıt
    if (index < questions.length) {
      const currentQuestion = questions[index];
      setQuestion(currentQuestion.question);
      setQuestionImg(currentQuestion.media);
      // Cevap seçeneklerini 10 saniye sonra göster
      setTimeout(() => setShowOptions(true), 10000); // 10 saniye
    }
  },[index],[index, start]);

  const handleOptionSelect = (option) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[index] = option;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleFinishTest = () => {
    // Testi bitir, sonuçları göster
    setShowResult(true);
    setFinalResult({
      correct: correctAnswers,
      incorrect: incorrectAnswers,
      answers: selectedAnswers,
    });
  };

  return (
    <div className='App'>
      <div className='Nav'>
        <h1>Question App</h1>
        
      </div>
      {/* Test başlama butonu ve bilgilendirme */}
      {!start && (
        <div className='info'>
          <ul>
            <li>Test 10 sorudan oluşuyor.</li>
            <li>Her soru için verilen süre 30 sn.</li>
            <li>Geçilen sorulara tekrar dönüş olmayacaktır.</li>
          </ul>
          <button className='start' id='start' onClick={handleIsClick}>Teste Başla</button>
        </div>
      )}
      {/* Soru ve cevap seçenekleri */}
      {start && index < questions.length && (
        <div className='screen-questions'>
          <img  src={questionImg} alt="Soru görseli" />
          <br />
          <span className='question'>{question}</span>
          <br />
          <div className='question-answers'>
          {showOptions && (
            
            <ul>
              {questions[index].options.map((option, optionIndex) => (
                <li key={optionIndex} className='list-settings'>
                  <button className='answer-buttons' onClick={() => handleOptionSelect(option)}>{option}</button>
                </li>
              ))}
            </ul>
          )}
          </div>
          <button className='send-button' onClick={handleAnswerSubmit}>Cevabı Gönder</button>
        </div>
      )}
      {/* Test bittiğinde sonuçları göster */}
      {showResult && (
        <div className='finalResult'>
          <h2>Test bitti!</h2>
          <p>Doğru Cevap Sayısı: {finalResult.correct}</p>
          <p>Yanlış Cevap Sayısı: {finalResult.incorrect}</p>
          <h3>Yanıtlar:</h3>
          <ul>
            {questions.map((question, questionIndex) => (
              <li key={questionIndex}>
                <span>{questionIndex + 1}. Soru: {question.question}</span>
                <br /><br />
                <span>Senin Yanıtın :  {finalResult.answers[questionIndex]}</span>
                <br /><br />
                <span>Doğru Cevap :  {question.answer}</span>
                <br /><br />
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Test bitirme butonu */}
      {start && index === questions.length && !showResult && (
        <div>
          <button className='finishTest' onClick={handleFinishTest}>Testi Bitir</button>
        </div>
      )}
    </div>
  );
}

export default App;