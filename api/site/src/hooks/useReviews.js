import React, { useState, useEffect } from 'react';

const useReview = () => {
  const [state, setState] = useState({
    data: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    handleFetchReviews();
  }, []);

  const handleFetchReviews = async () => {
    try {
      setState({ ...state, loading: true });

      const reviews = await fetch(`${process.env.REACT_APP_HOST}/reviews`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setState({ ...state, data: await reviews.json(), loading: false });
    } catch (error) {
      setState({ ...state, error: error, loading: false });
    }
  };

  const handleFetchReviewStats = async () => {
    try {
      setState({ ...state, loading: true });

      const reviews = await fetch(
        `${process.env.REACT_APP_HOST}/review-stats`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      setState({ ...state, loading: false });
      const result = await reviews.json();
      return {
        ...result,
      };
    } catch (error) {
      setState({ ...state, error: error, loading: false });
    }
  };

  const handleAddReviews = async (review) => {
    try {
      setState({ ...state, loading: true });
      const reviews = await fetch(`${process.env.REACT_APP_HOST}/add-review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });

      const newReview = [...state.data, await reviews.json()].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setState({ ...state, data: newReview, loading: false });
      return true;
    } catch (error) {
      setState({ ...state, error: error, loading: false });
    }
  };

  const handleReset = () => {
    setState({
      data: [],
      loading: false,
      error: null,
    });
  };

  return {
    ...state,
    handleFetchReviews,
    handleAddReviews,
    handleReset,
    handleFetchReviewStats,
  };
};

export { useReview };
