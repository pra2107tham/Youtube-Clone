import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { useNavigate } from "react-router-dom";
import { getVideoDetails } from "../store/reducers/getVideoDetails";
import { getRecommendedVideos } from "../store/reducers/getRecommendedVideos";
import Navbar from "../Components/Navbar"

const Watch = () => {
  const id = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentPlaying = useAppSelector(
    (state) => state.youtubeApp.currentPlaying
  );
  console.log(currentPlaying);

  const recommendedVideos = useAppSelector(
    (state) => state.youtubeApp.recommended
  );

  useEffect(() => {
    if (!id.videoId) {
      navigate("/");
    } else {
      dispatch(getVideoDetails(id.videoId));
      dispatch(getRecommendedVideos(id.videoId));
    }
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (currentPlaying && id) dispatch(getRecommendedVideos(id.videoId));
    window.scrollTo(0, 0);
  }, [currentPlaying, id, dispatch]);

  return (
    <>
      {currentPlaying && currentPlaying?.videoId === id && (
        <div className="max-h-screen overflow-hidden">
          <div>
            <Navbar />
          </div>
          <div>
            <div>
              <div>
                <div>
                  <iframe
                    src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                    frameBorder="0"
                    width="800"
                    height="502"
                    allowFullScreen
                    title="Youtube Player"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Watch;
