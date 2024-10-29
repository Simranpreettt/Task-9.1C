// src/components/QuestionForm.js
import React, { useState } from 'react';
import { Form, TextArea, Button } from 'semantic-ui-react';
import { db } from './firebase'; // Ensure this path is correct
import { collection, addDoc } from 'firebase/firestore'; // Import necessary Firestore functions
import './QuestionForm.css';

function QuestionForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the new Firestore syntax to add a document
      const docRef = await addDoc(collection(db, 'questions'), {  // Correctly use collection
        title: title,
        description: description,
        tags: tags,
        createdAt: new Date(),
      });

      console.log("Document written with ID: ", docRef.id);
      // Clear the form fields after submission
      setTitle("");
      setDescription("");
      setTags("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <Form className="question-form" onSubmit={handleSubmit}>
      <Form.Field>
        <label>Title</label>
        <input
          placeholder="Start your question with how, what, why, etc."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Describe your problem</label>
        <TextArea
          placeholder="Describe your problem"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Tags</label>
        <input
          placeholder="Add up to 3 tags, e.g., Java, React"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </Form.Field>
      <Button type="submit">Post</Button>
    </Form>
  );
}

export default QuestionForm;
