import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import './index.css'

const apiUrl =
  'https://api.themoviedb.org/3/trending/all/week?api_key=a397ffe4fb056264d42c73b9b7e86920'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
  ],
}

class Trend extends Component {
  state = {trendPic: []}

  componentDidMount() {
    this.getTrending()
  }

  getTrending = async () => {
    const response = await fetch(apiUrl)
    const data = await response.json()
    const imageData = data.results.map(eachItem => ({
      adult: eachItem.adult,
      imageBack: eachItem.backdrop_path,
      genreIds: eachItem.genre_ids,
      id: eachItem.id,
      mediaType: eachItem.media_type,
      language: eachItem.original_language,
      title: eachItem.title,
      overview: eachItem.overview,
      popularity: eachItem.popularity,
      image: eachItem.poster_path,
      date: eachItem.release_date,
      video: eachItem.video,
      voteAvg: eachItem.vote_average,
      voteCount: eachItem.vote_count,
    }))

    this.setState({
      trendPic: imageData,
    })
  }

  render() {
    const {trendPic} = this.state
    const trendPics = trendPic.filter(eachItem => eachItem.image !== null)

    return (
      <div className="trending-now-b">
        <h1 className="trending-now-heading">Trending Now</h1>
        <div style={{width: '95%'}}>
          <Slider {...settings}>
            {trendPics.map(eachItem => (
              <Link to={`/movie/${eachItem.id}`} key={eachItem.id}>
                <img
                  key={eachItem.id}
                  src={`https://image.tmdb.org/t/p/original${eachItem.image}`}
                  alt="trending-movie"
                  className="trendingMoviePics"
                />
              </Link>
            ))}
          </Slider>
        </div>
      </div>
    )
  }
}

export default Trend
