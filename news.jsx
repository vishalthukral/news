 import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsHeadlines = () => {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us',
            apiKey: process.env.487ac15701f44bedb044fcc17d1cb535 , // Use environment variable
          },
        });

        if (response.status === 200) {
          setHeadlines(response.data.articles);
          setLoading(false);
        } else {
          throw new Error('Failed to fetch headlines');
        }
      } catch (error) {
        setError(error.message || 'An unexpected error occurred');
        setLoading(false);
      }
    };

    fetchHeadlines();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Latest Headlines</h2>
      <ul>
        {headlines.map((headline, index) => (
          <li key={index}>
            <a href={headline.url} target="_blank" rel="noopener noreferrer">{headline.title}</a> - {headline.source.name} ({new Date(headline.publishedAt).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsHeadlines;
