import React, { useState } from 'react';
import { Form, TextArea, Button } from 'semantic-ui-react';
import { addCollectioDocuments, storage } from './firebase'; // Import storage properly
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './ArticleForm.css';

function ArticleForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true); // Set loading to true when submitting

    try {
      const imageUrl = image ? await uploadImage(image) : '';

      // Create the article object with image URL
      const articleData = [{
        title,
        description,
        tags,
        imageUrl,
        type: 'article',
        createdAt: new Date(),
      }];

      // Use addCollectioDocuments to add the article
      await addCollectioDocuments('articles', articleData); // Call the batch function
      
      // Clear the form fields after submission
      setTitle('');
      setDescription('');
      setTags('');
      setImage(null);
      setLoading(false); // Reset loading state after submission
    } catch (error) {
      console.error("Error adding document: ", error);
      setLoading(false); // Reset loading in case of error
    }
  };

  // Function to upload image to Firebase Storage
  const uploadImage = async (image) => {
    const imageRef = ref(storage, `articleImages/${image.name}`); // Specify folder for article images
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  };

  return (
    <Form className="article-form" onSubmit={handleSubmit}>
      <Form.Field>
        <label>Title</label>
        <input
          placeholder="Start your article with a catchy title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Describe your article</label>
        <TextArea
          placeholder="Write your article content here"
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
      <Form.Field>
        <label>Upload an Image</label>
        <input type="file" onChange={handleImageChange} />
      </Form.Field>
      <Button type="submit" loading={loading} disabled={loading}>Post</Button>
    </Form>
  );
}

export default ArticleForm;
