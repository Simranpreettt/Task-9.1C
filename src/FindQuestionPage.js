import React, { useEffect, useState } from 'react';
import { db } from './firebase'; 
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './FindQuestionPage.css'; 

function FindQuestionPage() {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState({ title: '', tags: '', date: '' });
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsCollection = collection(db, 'questions');
        const questionSnapshot = await getDocs(questionsCollection);
        
        const questionsList = questionSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setQuestions(questionsList);
      } catch (error) {
        console.error("Error fetching questions: ", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'questions', id));
      setQuestions(questions.filter((q) => q.id !== id));
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  // Function to filter questions
  const handleFilter = (question) => {
    const { title, tags, date } = filter;
    const questionDate = new Date(question.createdAt.seconds * 1000);
    const dateFilter = date ? questionDate.toISOString().slice(0, 10) === date : true;
    const titleFilter = title ? question.title.toLowerCase().includes(title.toLowerCase()) : true;
    const tagFilter = tags ? question.tags.toLowerCase().includes(tags.toLowerCase()) : true;

    return titleFilter && tagFilter && dateFilter;
  };

  return (
    <div className="find-question">
      <h2>Questions</h2>

      {/* Filter Section */}
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by title"
          value={filter.title}
          onChange={(e) => setFilter({ ...filter, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Filter by tags"
          value={filter.tags}
          onChange={(e) => setFilter({ ...filter, tags: e.target.value })}
        />
        <input
          type="date"
          value={filter.date}
          onChange={(e) => setFilter({ ...filter, date: e.target.value })}
        />
      </div>

      <ul>
        {questions.filter(handleFilter).map((question) => (
          <li key={question.id} className="question-card">
            <h3>{question.title}</h3>
            <p>{question.description}</p>
            <p><strong>Tags:</strong> {question.tags}</p>
            <p><strong>Posted At:</strong> {new Date(question.createdAt.seconds * 1000).toLocaleString()}</p>

            {/* Toggle for expanded view */}
            <button onClick={() => setExpandedQuestion(question.id === expandedQuestion ? null : question.id)}>
              {expandedQuestion === question.id ? 'Show Less' : 'Show More'}
            </button>

            {/* Expanded content */}
            {expandedQuestion === question.id && (
              <div className="expanded-content">
                <p>Full description: {question.description}</p>
                {/* Add more fields here as needed */}
              </div>
            )}

            {/* Delete button */}
            <button onClick={() => handleDelete(question.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FindQuestionPage;
