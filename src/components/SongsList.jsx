const SongsList = ({ songs, setPlayingSong, playingSong, isSongPlaying, setIsSongPlaying, setPlayingSongIndex }) => {
    const handleClick = (song) => {
        setPlayingSong(song);
        setIsSongPlaying(true);
    }

    return (
        <aside className='col-3 height-custom overflow-y-scroll'>
            <ul className="song-list ps-0">
                {songs.map((song, idx) => {
                    return <li key={song.id} className={`d-flex align-items-center justify-content-between  my-3 rounded-2 bg-light-dark ${song.id == (playingSong && playingSong.id) ? 'active-song-list-item' : 'song-list-item'}`} style={{ padding: "12px" }} onClick={() => handleClick(song)}>
                        <div className="d-flex align-items-center">
                            <div className="song-image-wrapper">
                                <img src={song.image} alt={song.songName} width={60} height={60} />
                            </div>
                            <div className="song-details px-3">
                                <p className="fs-5 mb-0">{song.songName}</p>
                                <span className="fs-6 text-light-dark">{song.singerName}</span>
                                <span className="fs-6 ms-3" style={{ fontWeight: "bold" }}>
                                    {song.songDuration}
                                </span>
                            </div>
                        </div>
                        <div style={{ padding: "14px" }} className="play-icon">
                            <span className="fs-5">
                                {
                                    song.id == (playingSong && playingSong.id) && isSongPlaying
                                    ? <i className="ri-pause-large-fill color-primary"></i> 
                                    : <i className="ri-play-large-fill color-primary"></i>
                                }
                            </span>
                        </div>
                    </li>
                })}
            </ul>
        </aside>
    )
}

export default SongsList