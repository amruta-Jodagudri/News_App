import React, {useEffect,useState} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=>{
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  //to capitalize the title
  const capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews= async () => {
    const url = `https://newsapi.org/v2/top-headlines?&country=${props.country}&category=${props.category}&apiKey=b4c3875a1d8843b280bda42697e4d7a6&page=1&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    // Check if parsedData.articles is defined before updating state
    if (parsedData.articles) {
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsPadho`;
    updateNews();
  }, []);
  
  const fetchMoreData =async() => {
    let url = `https://newsapi.org/v2/top-headlines?&country=${props.country}&category=${props.category}&apiKey=b4c3875a1d8843b280bda42697e4d7a6&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);

  };

  return (
      <div className='container my-3 mx-12'>
        <h1 className='text-center' style={{margin:'35px 0px', marginTop:'85px'}}>NewsPadho - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {/* {loading && <Spinner/>}
        <div className="row my-3">
        {!loading && articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}
        </div> */}
        {/* this above commented part is replaced by below two lines now no need to to uncomment above part */}

        <InfiniteScroll
          dataLength={articles ? articles.length : 0}
          next={fetchMoreData}
          hasMore={articles ? articles.length !== totalResults : false}
          loader={<Spinner />}
        >
        <div className="container">
        <div className="row my-3">
        {articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>

        {/* These next and previous buttons are removed for infinite scrolling in react */}
        {/* <div className="container d-flex justify-content-between">
        <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handleprevious}>&larr; Previous</button>
        <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNext}>
        Next &rarr;</button>
        </div> */}
      </div>
    );
}

News.defaultProps = {
  country:'in',
  pageSize:5,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News;
