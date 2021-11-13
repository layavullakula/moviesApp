import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'

const apiUrl3 =
  'https://api.themoviedb.org/3/discover/tv?api_key=a397ffe4fb056264d42c73b9b7e86920'

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

class Original extends Component {
  state = {originalsPic: []}

  componentDidMount() {
    this.getTrending()
  }

  getTrending = async () => {
    const response3 = await fetch(apiUrl3)
    const data3 = await response3.json()
    const imageData3 = data3.results.map(eachItem => ({
      country: eachItem.origin_country,
      imageBack: eachItem.backdrop_path,
      genreIds: eachItem.genre_ids,
      id: eachItem.id,
      language: eachItem.original_language,
      title: eachItem.name,
      overview: eachItem.overview,
      popularity: eachItem.popularity,
      image: eachItem.poster_path,
      date: eachItem.first_air_date,
      voteAvg: eachItem.vote_average,
      voteCount: eachItem.vote_count,
    }))
    this.setState({
      originalsPic: imageData3,
    })
  }

  render() {
    const {originalsPic} = this.state
    const originalsPics = originalsPic.filter(
      eachItem => eachItem.image !== null,
    )

    return (
      <div className="trending-now-bg">
        <h1 className="trending-now-heading">Originals</h1>
        <div className="original-bottom" style={{width: '95%'}}>
          <Slider {...settings}>
            {originalsPics.map(eachItem => (
              <Link to={`/movie/${eachItem.id}`} key={eachItem.id}>
                <img
                  key={eachItem.id}
                  src={`https://image.tmdb.org/t/p/original${eachItem.image}`}
                  alt="originals-movie"
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

export default Original
