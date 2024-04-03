import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import SongPlayer from "./components/SongPlayer";
import SongsList from "./components/SongsList";
import 'remixicon/fonts/remixicon.css'
import "./index.css";

const App = () => {
    const [songs, setSongs] = useState([]);
    const [playingSong, setPlayingSong] = useState(null);
    const [isSongPlaying, setIsSongPlaying] = useState(false);
    const [playingSongIndex, setPlayingSongIndex] = useState(null);

    useEffect(()=>{
        const fetchSongs = async () => {
            try {
                const res = (await axios.get("http://localhost:4000/songs-list")).data;
                setSongs(res);
            } catch (error) {
                console.log(error);
            }
        }
        fetchSongs();
    }, []);

    return (
        <main>
            <Header />
            <div className="row mx-0">
                <SongsList songs={songs} setPlayingSong={setPlayingSong} playingSong={playingSong} isSongPlaying={isSongPlaying} setIsSongPlaying={setIsSongPlaying} setPlayingSongIndex={setPlayingSongIndex} />
                <SongPlayer songs={songs} setPlayingSong={setPlayingSong} playingSong={playingSong} setIsSongPlaying={setIsSongPlaying} isSongPlaying={isSongPlaying} /> 
            </div>
        </main>
    )
}

export default App