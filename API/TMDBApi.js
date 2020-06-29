// API/TMDBApi.js

export function getFilmsFromApiWithSearchedText (text){
  const url = "https://itunes.apple.com/search?term="+text+"&entity=album"
  
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => console.error(error))
}

export async function getAlbumDetailFromApi(id){
  try{
    const  response = await fetch('https://itunes.apple.com/lookup?id='+id) ;
    return response.json();
  }
  catch(error) {
    console.log(error);
  }
}