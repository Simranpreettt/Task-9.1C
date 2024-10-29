// src/components/NewPostPage.js
import React, { useState } from 'react';
import { Segment, Radio } from 'semantic-ui-react';
import QuestionForm from './QuestionForm';
import ArticleForm from './ArticleForm';
import './NewPostPage.css';

function NewPostPage() {
  const [postType, setPostType] = useState('question');

  const handlePostTypeChange = (e, { value }) => setPostType(value);

  return (
    <Segment className="new-post-page">
      <h1>Create a New Post</h1>
      <div className="post-type-selection">
        <Radio
          label="Question"
          name="postType"
          value="question"
          checked={postType === 'question'}
          onChange={handlePostTypeChange}
        />
        <Radio
          label="Article"
          name="postType"
          value="article"
          checked={postType === 'article'}
          onChange={handlePostTypeChange}
          style={{ marginLeft: '20px' }}
        />
      </div>
      {postType === 'question' ? <QuestionForm /> : <ArticleForm />}
    </Segment>
  );
}

export default NewPostPage;
