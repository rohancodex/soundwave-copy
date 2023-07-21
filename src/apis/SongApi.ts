// export async function fetchSongs(offset: number) {
//   const response = await fetch(
//     `https://itunes.apple.com/search/?term=top100&offset=${offset}&limit=12`
//   );
//   const data = await response.json();
//   return data;
// }

// export async function searchSongTerm(searchTerm: string) {
//   const response = await fetch(
//     `${BASE_URL}/search/?term=${searchTerm}&offset=0&limit=12`
//   );
//   const data = await response.json();
//   return data;
// }


const BASE_URL = "https://itunes.apple.com"

export async function getSongList({ offset = 1, searchTerm = "top100" }) {
  let query = "";

  if (offset) {
    query += `offset=${offset}&`;
  }

  query += `term=${searchTerm.length ? searchTerm : "top100"}&`;

  const res = await fetch(`${BASE_URL}/search/?${query}limit=12`);
  const data = await res.json();
  return data;
}
