import { useState, useEffect, useCallback } from "react";
import apiService from "../Services/apiService";
import { useAuth } from "../Context/AuthContext";
import debounce from 'lodash.debounce';

export default function useProviderActions(providerId) {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const [isFavourite, setIsFavourite] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize state from user context or localStorage
  useEffect(() => {
    if (!providerId) return;
    setError(null);
    if (isLoggedIn) {
      setIsLiked(user?.likes_ids?.includes(providerId));
      setIsDisliked(user?.dislikes_ids?.includes(providerId));
      setIsFavourite(user?.favourite_ids?.includes(providerId));
    } else {
      const likes = JSON.parse(localStorage.getItem("likes") || "[]");
      const dislikes = JSON.parse(localStorage.getItem("dislikes") || "[]");
      const favourites = JSON.parse(localStorage.getItem("guest_favourites") || "[]");
      setIsLiked(likes.includes(providerId));
      setIsDisliked(dislikes.includes(providerId));
      setIsFavourite(favourites.includes(providerId));
    }
  }, [providerId, isLoggedIn, user]);

  // Debounced API calls
  const debouncedLike = useCallback(debounce(async () => {
    try {
      if (isLoggedIn) {
        await apiService.likeProvider(providerId);
        setIsLiked(true);
        setIsDisliked(false);
      } else {
        let likes = JSON.parse(localStorage.getItem("likes") || "[]");
        let dislikes = JSON.parse(localStorage.getItem("dislikes") || "[]");
        if (!likes.includes(providerId)) likes.push(providerId);
        dislikes = dislikes.filter(id => id !== providerId);
        localStorage.setItem("likes", JSON.stringify(likes));
        localStorage.setItem("dislikes", JSON.stringify(dislikes));
        setIsLiked(true);
        setIsDisliked(false);
      }
    } catch (err) {
      setError("Failed to like provider.");
    } finally {
      setLoading(false);
    }
  }, 300), [isLoggedIn, providerId]);

  const debouncedDislike = useCallback(debounce(async () => {
    try {
      if (isLoggedIn) {
        await apiService.dislikeProvider(providerId);
        setIsDisliked(true);
        setIsLiked(false);
      } else {
        let dislikes = JSON.parse(localStorage.getItem("dislikes") || "[]");
        let likes = JSON.parse(localStorage.getItem("likes") || "[]");
        if (!dislikes.includes(providerId)) dislikes.push(providerId);
        likes = likes.filter(id => id !== providerId);
        localStorage.setItem("dislikes", JSON.stringify(dislikes));
        localStorage.setItem("likes", JSON.stringify(likes));
        setIsDisliked(true);
        setIsLiked(false);
      }
    } catch (err) {
      setError("Failed to dislike provider.");
    } finally {
      setLoading(false);
    }
  }, 300), [isLoggedIn, providerId]);

  const debouncedFavourite = useCallback(debounce(async () => {
    try {
      if (isLoggedIn) {
        await apiService.toggleFavourite(providerId);
        setIsFavourite(prev => !prev);
      } else {
        let favourites = JSON.parse(localStorage.getItem("guest_favourites") || "[]");
        if (favourites.includes(providerId)) {
          favourites = favourites.filter(id => id !== providerId);
        } else {
          favourites.push(providerId);
        }
        localStorage.setItem("guest_favourites", JSON.stringify(favourites));
        setIsFavourite(favourites.includes(providerId));
      }
    } catch (err) {
      setError("Failed to update favourite.");
    } finally {
      setLoading(false);
    }
  }, 300), [isLoggedIn, providerId]);

  // Toggle Like
  const toggleLike = useCallback(() => {
    setLoading(true);
    setError(null);
    debouncedLike();
  }, [debouncedLike]);

  // Toggle Dislike
  const toggleDislike = useCallback(() => {
    setLoading(true);
    setError(null);
    debouncedDislike();
  }, [debouncedDislike]);

  // Toggle Favourite
  const toggleFavourite = useCallback(() => {
    setLoading(true);
    setError(null);
    debouncedFavourite();
  }, [debouncedFavourite]);

  return {
    isFavourite,
    isLiked,
    isDisliked,
    toggleFavourite,
    toggleLike,
    toggleDislike,
    loading,
    error,
  };
}
