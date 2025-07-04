import { useState, useEffect } from "react";
import apiService from "../Services/apiService";
import { useAuth } from "../Context/AuthContext";

export default function useProviderActions(providerId) {
  const { user } = useAuth();

  const [isFavourite, setIsFavourite] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const isLoggedIn = !!user;

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favourites") || "[]");
    const likes = JSON.parse(localStorage.getItem("likes") || "[]");
    const dislikes = JSON.parse(localStorage.getItem("dislikes") || "[]");

    setIsFavourite(favs.includes(providerId));
    setIsLiked(likes.includes(providerId));
    setIsDisliked(dislikes.includes(providerId));
  }, [providerId]);

  const toggleFavourite = () => {
    if (isLoggedIn) {
      apiService.toggleFavourite(providerId)
        .then(() => setIsFavourite(prev => !prev))
        .catch(() => {});
    } else {
      const favs = JSON.parse(localStorage.getItem("favourites") || "[]");
      if (favs.includes(providerId)) {
        const updated = favs.filter(id => id !== providerId);
        localStorage.setItem("favourites", JSON.stringify(updated));
        setIsFavourite(false);
      } else {
        favs.push(providerId);
        localStorage.setItem("favourites", JSON.stringify(favs));
        setIsFavourite(true);
      }
    }
  };

  const like = () => {
    if (isLoggedIn) {
      apiService.likeProvider(providerId)
        .then(() => {
          setIsLiked(true);
          setIsDisliked(false);
        })
        .catch(() => {});
    } else {
      const likes = JSON.parse(localStorage.getItem("likes") || "[]");
      const dislikes = JSON.parse(localStorage.getItem("dislikes") || "[]");

      if (!likes.includes(providerId)) {
        likes.push(providerId);
      }
      localStorage.setItem("likes", JSON.stringify(likes));

      const updatedDislikes = dislikes.filter(id => id !== providerId);
      localStorage.setItem("dislikes", JSON.stringify(updatedDislikes));

      setIsLiked(true);
      setIsDisliked(false);
    }
  };

  const dislike = () => {
    if (isLoggedIn) {
      apiService.dislikeProvider(providerId)
        .then(() => {
          setIsDisliked(true);
          setIsLiked(false);
        })
        .catch(() => {});
    } else {
      const dislikes = JSON.parse(localStorage.getItem("dislikes") || "[]");
      const likes = JSON.parse(localStorage.getItem("likes") || "[]");

      if (!dislikes.includes(providerId)) {
        dislikes.push(providerId);
      }
      localStorage.setItem("dislikes", JSON.stringify(dislikes));

      const updatedLikes = likes.filter(id => id !== providerId);
      localStorage.setItem("likes", JSON.stringify(updatedLikes));

      setIsDisliked(true);
      setIsLiked(false);
    }
  };

  return {
    isFavourite,
    isLiked,
    isDisliked,
    toggleFavourite,
    like,
    dislike
  };
}
