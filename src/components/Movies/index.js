import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../header'
import Footer from '../Footer'
import MoreLike from '../moreLike'

class Movie extends Component {
  state = {movieInf: [], isLoading: true, id: '', error: false, errorMsg: ''}

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    const {match} = this.props
    const movieUniqueId = match.params.movieId
    this.setState({id: movieUniqueId})
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieUniqueId}?api_key=a397ffe4fb056264d42c73b9b7e86920&language=en-US`
    const response = await fetch(apiUrl)
    const dataR = await response.json()
    if (response.ok === true) {
      const data = [dataR]
      const movieDetails = data.map(item => ({
        adult: item.adult,
        imageBack: item.backdrop_path,
        budget: item.budget,
        genres: item.genres,
        homepage: item.homepage,
        id: item.id,
        imdbId: item.imdb_id,
        language: item.original_language,
        overview: item.overview,
        popularity: item.popularity,
        image: item.poster_path,
        productionCompany: item.production_companies,
        productionCountry: item.production_countries,
        date: item.release_date,
        revenue: item.revenue,
        runtime: item.runtime,
        spokenLanguages: item.spoken_languages,
        status: item.status,
        tagline: item.tagline,
        title: item.title,
        video: item.video,
        voteAvg: item.vote_average,
        voteCount: item.vote_count,
      }))

      this.setState({movieInf: movieDetails, isLoading: false})
    } else {
      this.setState({
        error: true,
        isLoading: false,
        errorMsg: dataR.status_message,
      })
    }
  }

  movieInformation = () => {
    const {movieInf, id, error, errorMsg} = this.state
    return error ? (
      <>
        <Header />
        <div className="movie-error-bg">
          <p className="searchErrorP">{errorMsg}</p>
        </div>
      </>
    ) : (
      <div className="movie-bg">
        {movieInf.map(eachItem => (
          <>
            <div
              key={eachItem.id}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${eachItem.imageBack})`,
              }}
              className="bg-movies-banner"
            >
              <div>
                <Header />
              </div>
              <div className="movie-descr" key={eachItem.id}>
                <h1 className="movie-banner-name">{eachItem.title}</h1>
                <div className="movie-des">
                  <span>{`${parseInt(eachItem.runtime / 60, 10)}h ${
                    eachItem.runtime % 60
                  }m`}</span>
                  <span className="la">{eachItem.language}</span>
                  <span>{new Date(eachItem.date).getFullYear()}</span>
                </div>

                <p className="movie-banner-overview">{eachItem.overview}</p>
                <button className="movie-banner-button" type="submit">
                  Play
                </button>
              </div>
            </div>
            <div className="movie-inf">
              <ul>
                <h5>Genres</h5>
                {eachItem.genres.map(item => (
                  <li>{item.name}</li>
                ))}
              </ul>
              <ul>
                <h5>Audio Available</h5>
                {eachItem.spokenLanguages.map(item => (
                  <li>{item.name}</li>
                ))}
              </ul>
              <ul>
                <h5>Rating Count</h5>
                <li>{eachItem.voteCount}</li>
              </ul>
              <ul>
                <h5>Rating Average</h5>
                <li>{eachItem.voteAvg}</li>
              </ul>
              <ul>
                <h5>Budget</h5>
                <li>{eachItem.budget}</li>
              </ul>
              <ul>
                <h5>Release Date</h5>
                <li>{eachItem.date}</li>
              </ul>
            </div>
          </>
        ))}
        <div className="moreLikeThis">
          <MoreLike movieId={id} />
        </div>
      </div>
    )
  }

  loader = () => {
    console.log('testid=loader')
    return (
      <div className="loader-center" style={{minHeight: '90vh'}}>
        <Loader type="Oval" color="red" height={50} width={50} />
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="home-bg">
        {isLoading ? this.loader() : this.movieInformation()}
        <Footer />
      </div>
    )
  }
}

export default Movie
