import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";
import { errorState } from "../atoms/errorAtom";
import { first } from "lodash";

function Song({ order, track }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [errorMessage, setErrorMessage] = useRecoilState(errorState);
  const playSong = () => {
    setCurrentTrackId(track.track.id);
    spotifyApi
      .play({ uris: [track.track.uri] })
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        setIsPlaying(false);
        setErrorMessage("You need to be premium.");
        console.log(errorMessage);
      });
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  }, [errorMessage]);

  return (
    <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg">
      <div
        className="flex items-center space-x-4 cursor-pointer"
        onClick={playSong}
      >
        <p>{order + 1}</p>
        <img
          className="h-10 w-1O"
          src={track.track.album.images[0].url}
          alt=""
        />
        <div>
          <p className="w-36 lg:w-64 text-white truncate">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
