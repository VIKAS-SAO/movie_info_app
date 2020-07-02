$(document).ready(function(){
    $('#searchform').on('submit',function(e){
        let moviname = $('#moviename').val()
         getmovies(moviname)
        e.preventDefault()
    })
})

 
function getmovies(moviname){
    axios.get('https://www.omdbapi.com/?apikey=efa0276f&s='+moviname)
    .then(function(response){ 
        let movie_list=response.data.Search;
        let display=''
        $.each(movie_list,function(index,movie){
         display+=`
        <div class="col-md-3 col-sm-3">
            <div class="well text-center">
                <img src="${movie.Poster}">
                <h5>${movie.Title}</h5>
                <a onclick="movieselected('${movie.imdbID}')" href="#" class="btn btn-primary">Movie Details</a>

            </div>
         </div> `;  
        }) 
        $('#movies').html(display) 
    })
    .catch(function(error){
        console.log(error)
    })
}



function movieselected(id){ 
    sessionStorage.setItem('movieid',id);
    window.location='movie.html';
    return false;

}

function getmovie(){
    let movieid=sessionStorage.getItem('movieid')
    axios.get('https://www.omdbapi.com/?apikey=efa0276f&i='+movieid)
    .then(function(response){ 
          let movie=response.data;
        console.log(movie)

         let display=`
         <div class="row">
                <div class="col-sm-4">
                <img src="${movie.Poster}" class="thumbnail"> 
                </div>
                <div class="col-sm-8">
                     <h2   >${movie.Title}<h2>
                     <ul class="list-group" >
                     <li class="list-group-item"> <b>Genre : </b>${movie.Genre} </li>
                     <li class="list-group-item"> <b>Released : </b>${movie.Released} </li>
                     <li class="list-group-item"> <b>Rated : </b>${movie.Rated} </li>
                     <li class="list-group-item"> <b>IMDB Rating : </b>${movie.imdbRating} </li>
                     <li class="list-group-item"> <b>Director : </b>${movie.Directors} </li>
                     <li class="list-group-item"> <b>Writers : </b>${movie.Writer} </li>
                     <li class="list-group-item"> <b>Actors : </b>${movie.Actors} </li>
                     </ul>

                </div>
       </div>

       <div class="row">
            <div class="well col-md-12" style="font-size:200%"> 
                <h2>Plot</h2>
                ${movie.Plot}
                <hr>
                <a href="http://imdb.com/title/${movie.imdbID}" class="btn btn-primary" target="_blank">Go to IMDB</a>
                <a href="index.html" class="btn btn-primary" style="background-color:rgb(31, 91, 148);" >Back to the Home Page</a>
            </div> 
       </div>
         
         `

         $('#movie').html(display)

    })
    .catch(function(error){
        console.log(error)
    })

}