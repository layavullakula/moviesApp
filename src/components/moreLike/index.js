import {Component} from 'react'
import Loader from 'react-loader-spinner'

class MoreLike extends Component {
  state = {similarMovies: [], isLoading: true}

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    const id = this.props

    const movieIds = id.movieId

    const apiUrl2 = `https://api.themoviedb.org/3/movie/${movieIds}/similar?api_key=a397ffe4fb056264d42c73b9b7e86920&language=en-US&page=${1}`
    const response2 = await fetch(apiUrl2)
    const dataR2 = await response2.json()
    const data2 = dataR2.results
    const similarMovies = data2.map(item => ({
      imageBack: item.backdrop_path,
      genres: item.genre_ids,
      id: item.id,
      language: item.original_language,
      overview: item.overview,
      popularity: item.popularity,
      image: item.poster_path,
      date: item.release_date,
      title: item.title,
      video: item.video,
      voteAvg: item.vote_average,
      voteCount: item.vote_count,
    }))

    this.setState({similarMovies, isLoading: false})
  }

  moreLikeThis = () => {
    const {similarMovies} = this.state
    return (
      <div className="movie-similar">
        <h1 className="movie-heading">More like this</h1>
        <div className="similar-card">
          {similarMovies.map(eachItem => (
            <img
              key={eachItem.id}
              src={`https://image.tmdb.org/t/p/original${eachItem.image}`}
              alt="similar-movie"
              className="similarMoviePics"
            />
          ))}
        </div>
      </div>
    )
  }

  loader = () => {
    console.log('testid=loader')
    return (
      <div className="loader-center">
        <Loader type="Oval" color="red" height={50} width={50} />
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return <div>{isLoading ? this.loader() : this.moreLikeThis()}</div>
  }
}

export default MoreLike
