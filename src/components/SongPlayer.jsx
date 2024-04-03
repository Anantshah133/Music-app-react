import { useEffect, useState } from "react";
import "../song.css";

const SongPlayer = ({ songs, setPlayingSong, playingSong, isSongPlaying, setIsSongPlaying, playingSongIndex }) => {
    const [audio] = useState(new Audio());
    const [currentTime, setCurrentTime] = useState("00:00");
    const [progress, setProgress] = useState(0)

    useEffect(()=>{
        if(playingSong && playingSong.id){
            audio.src = playingSong.songPath;
            audio.play();
            setIsSongPlaying(true);
        } else {
            audio.pause();
            setIsSongPlaying(false);
        }

        return () => audio.pause();
    }, [playingSong]);

    useEffect(()=>{
        const updateTime = ()=>{
            const current = Math.floor(audio.currentTime);
            const duration = Math.floor(audio.duration);
            setCurrentTime(formatTime(current));
            setProgress((current / duration) * 100);
        }
        audio.addEventListener("timeupdate", updateTime);
        return ()=>audio.removeEventListener("timeupdate", updateTime);
    }, [audio])

    function formatTime(seconds){
        const minutes = parseInt(seconds / 60);
        const remain = seconds % 60;
        return `${minutes.toString().padStart(2,'0')}:${remain.toString().padStart(2,'0')}`;
    }

    const handlePreviousClick = (idx)=>{
        const index = songs.findIndex((data, id)=>{
            return data.id == idx;
        })
        if(index != -1 && index > 0){
            setPlayingSong(songs[index - 1]);
        } else {
            setPlayingSong(songs[songs.length - 1]);
        }
    }

    const handleNextClick = (idx)=>{
        const index = songs.findIndex((data, id)=>{
            return data.id == idx;
        })
        console.log(index, songs.length-1);
        if(index != -1 && index < songs.length - 1){
            setPlayingSong(songs[index + 1]);
        } else {
            setPlayingSong(songs[0]);
        }
    }

    const handleClick = ()=>{
        if(isSongPlaying){
            setIsSongPlaying(false);
            audio.pause();
        } else {
            setIsSongPlaying(true);
            audio.play();
        }
    }

    const handleProgressChange = (event) => {
        const selectedProgress = parseInt(event.target.value);
        const duration = audio.duration;
        const newCurrentTime = (selectedProgress / 100) * duration;
        audio.currentTime = newCurrentTime;
        setProgress(selectedProgress);
    };

    return (
        <div className="col-9 d-flex flex-column align-items-center justify-content-center">
            {playingSong ? <>
                <div className="fs-2 poppins">Now Playing</div>
                <div className="wrapper text-white text-center pt-5">
                    <div className="d-flex align-items-center justify-content-center flex-column">
                        <img src={playingSong.image} alt={playingSong.songName} width={300} height={300} className="song-thumbnail" />
                        <p className="mt-4 fs-3 mb-0">{playingSong.songName}</p>
                        <p className="mt-1 fs-6 text-light-dark">{playingSong.singerName}</p>
                    </div>
                    <div className="song-controls text-center mt-2 d-flex justify-content-center gap-3 align-items-center">
                        <div id="currentTime" className="song-timings">{currentTime}</div>
                        <input type="range" className="text-light-dark" id="myProgressBar" min={0} max={100} value={progress || 0} onChange={handleProgressChange} />
                        <div id="songDuration" className="song-timings">{playingSong.songDuration}</div>
                    </div>
                    <div className="d-flex align-items-center justify-content-around mt-4 mb-2">
                        <div className="fs-4 song-control sequence-control" onClick={()=>handlePreviousClick(playingSong.id)}>
                            <i className="ri-skip-back-line"></i>
                        </div>
                        <div className="fs-4 play-btn song-control" onClick={handleClick}>
                            {
                                isSongPlaying 
                                ? <i className="ri-pause-large-fill text-dark"></i> 
                                : <i className="ri-play-large-fill text-dark"></i>
                            }
                        </div>
                        <div className="fs-4 song-control sequence-control" onClick={()=>handleNextClick(playingSong.id)}>
                            <i className="ri-skip-forward-line"></i>
                        </div>
                    </div>
                </div>
            </> : <>
                <div className="display-5 poppins">Please select song to play</div>
            </>}
        </div>
    )
}

export default SongPlayer