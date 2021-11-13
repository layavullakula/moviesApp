import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Counter from '../Counter'
import Group7394 from './Group7394.png'
import Header from '../header'
import Footer from '../Footer'
import './index.css'

let apiUrl =
  'https://api.themoviedb.org/3/movie/popular?api_key=a397ffe4fb056264d42c73b9b7e86920&language=en-US&page='

class Popular extends Component {
  state = {popular: [], searchError: false, searchQuery: '', isLoading: true}

  componentDidMount() {
    this.getPopularMovies()
  }

  getNum = (count = 0) => {
    this.getPopularMovies(count)
  }

  needToSearch = id => {
    this.setState({searchQuery: id}, this.getPopularMovies)
  }

  getPopularMovies = async count => {
    this.setState({isLoading: true})
    const {searchQuery} = this.state
    if (searchQuery !== '') {
      apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=a397ffe4fb056264d42c73b9b7e86920&language=en-US&query=${searchQuery}&page=`
    } else {
      apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=a397ffe4fb056264d42c73b9b7e86920&language=en-US&page=`
    }
    const response = await fetch(apiUrl + count)
    const data = await response.json()
    if (data.results.length === 0) {
      this.setState({searchError: true})
    } else {
      this.setState({searchError: false})
    }
    const PopulaMoviesData = data.results.map(eachItem => ({
      adult: eachItem.adult,
      genreIds: eachItem.genre_ids,
      video: eachItem.video,
      imageBack: eachItem.backdrop_path,
      id: eachItem.id,
      language: eachItem.original_language,
      title: eachItem.original_title,
      overview: eachItem.overview,
      popularity: eachItem.popularity,
      image: eachItem.poster_path,
      date: eachItem.release_date,
      voteAvg: eachItem.vote_average,
      voteCount: eachItem.vote_count,
    }))
    this.setState({popular: PopulaMoviesData, isLoading: false})
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
    const {isLoading, popular, searchError, searchQuery} = this.state
    return (
      <div style={{background: 'black'}}>
        <Header passSearch={this.needToSearch} />
        {isLoading ? (
          this.loader()
        ) : (
          <div className="popular-bg whole-bg">
            {searchError && (
              <div className="searchError">
                <img src={Group7394} alt="error-img" />
                <p className="searchErrorP">
                  Your search for {searchQuery} did not find any matches.
                </p>
              </div>
            )}
            {!searchError &&
              popular.map(eachItem => (
                <Link to={`/movie/${eachItem.id}`} key={eachItem.id}>
                  <img
                    key={eachItem.id}
                    src={`https://image.tmdb.org/t/p/original${eachItem.image}`}
                    alt={eachItem.id}
                    className="trendingMoviePics"
                  />
                </Link>
              ))}
          </div>
        )}
        <Counter getNum={this.getNum} />
        <Footer />
      </div>
    )
  }
}

export default Popular
