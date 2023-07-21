import { getSongList } from '@/apis/SongApi';
import { PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'

interface SongsState {
    songs: Song[];
    loading: boolean;
    isPlaying: boolean;
    currentSong: Song | null;
    status: string;
    error: string;
}

const initialState: SongsState = {
    songs: [],
    loading: false,
    isPlaying: false,
    currentSong: null,
    status: "",
    error: ""
};

interface SongProps{
    trackId: string;
    artworkUrl100: string;
    trackName: string;
    previewUrl: string;
    artistName: string;
}


export const getSongs = createAsyncThunk("songs/getSongs", async (offset: number) => {
    const data = await getSongList({offset});
    return data.results.map((song: SongProps) => ({
        id: song.trackId,
        imageUrl: song.artworkUrl100.replace("100x100","900x900"),
        trackName: song.trackName,
        songUrl: song.previewUrl,
        artistName: song.artistName,
    }));
});

export const searchSongs = createAsyncThunk("songs/searchSongs", async (searchTerm: string) => {
    const data = await getSongList({searchTerm})
    return data.results.map((song: SongProps) => ({
        id: song.trackId,
        imageUrl: song.artworkUrl100.replace("100x100","900x900"),
        trackName: song.trackName,
        songUrl: song.previewUrl,
        artistName: song.artistName,
    }));
});

const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        setIsPlaying: (state, action:PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },
        setCurrentSong:(state,action:PayloadAction<Song>)=>{
            state.currentSong = action.payload;
        }
    },
    
    extraReducers: builder => {
        builder
            .addCase(getSongs.pending, (state) => {
                state.loading=true;
                state.status = 'loading';
            })
            .addCase(getSongs.fulfilled, (state, action) => {
                state.loading = false;
                state.songs.push(...action.payload);
            })
            .addCase(getSongs.rejected, (state, action)=>{
                state.loading=false;
                state.error = action.error.message as string
            })
            .addCase(searchSongs.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchSongs.fulfilled, (state, action) => {
                state.loading = false;
                state.songs = action.payload;
            })
            .addCase(searchSongs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string;
            });
    }
})

export const { setIsPlaying, setCurrentSong } = songSlice.actions;
export default songSlice.reducer