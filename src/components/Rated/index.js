import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'

const apiUrl2 =
  'https://api.themoviedb.org/3/movie/top_rated?api_key=a397ffe4fb056264d42c73b9b7e86920&language=en-US'

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

class Rated extends Component {
  state = {topPic: []}

  componentDidMount() {
    this.getTrending()
  }

  getTrending = async () => {
    const response2 = await fetch(apiUrl2)
    const data2 = await response2.json()
    const imageData2 = data2.results.map(eachItem => ({
      adult: eachItem.adult,
      imageBack: eachItem.backdrop_path,
      genreIds: eachItem.genre_ids,
      id: eachItem.id,
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
      topPic: imageData2,
    })
  }

  render() {
    const {topPic} = this.state
    const topPics = topPic.filter(eachItem => eachItem.image !== null)

    return (
      <div className="trending-now-bg">
        <h1 className="trending-now-heading">Top Rated</h1>
        <div style={{width: '95%'}}>
          <Slider {...settings}>
            {topPics.map(eachItem => (
              <Link to={`/movie/${eachItem.id}`} key={eachItem.id}>
                <img
                  key={eachItem.id}
                  src={`https://image.tmdb.org/t/p/original${eachItem.image}`}
                  alt="topRated-movie"
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

export default Rated
