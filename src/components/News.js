import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country:'in',
    pageSize:8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  //to capitalize the title
  capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    this.state = {
      articles : [],
      loading : false,
      totalResults: 0,
      page: 1
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsPadho`;
  }

  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=b4c3875a1d8843b280bda42697e4d7a6&page=${this.props.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      totalResults: parsedData.totalResults,
      loading:false
    })
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=b4c3875a1d8843b280bda42697e4d7a6&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading:false
    })
  }

  fetchMoreData =async() => {
    this.setState({page:this.state.page+1});
    let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=b4c3875a1d8843b280bda42697e4d7a6&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading:false
    })
  };

  handleprevious=async ()=>{
    // let url = `https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=b4c3875a1d8843b280bda42697e4d7a6&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    //this above commented part is replaced by below two lines now no need to to uncomment above part
    this.setState({page:this.state.page - 1});
    this.updateNews();
  }

  handleNext=async ()=>{
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b4c3875a1d8843b280bda42697e4d7a6&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading: true})
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false
    // })
    // }
    //this above commented part is replaced by below two lines now no need to to uncomment above part
    this.setState({page:this.state.page + 1});
    this.updateNews();
  }

  render() {
    return (
      <div className='container my-3 mx-12'>
        <h1 className='text-center'>NewsPadho - Top {this.capitalizeFirstLetter(this.props.category)} headlines</h1>
        {/* {this.state.loading && <Spinner/>} */}
        {/* <div className="row my-3">
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}
        </div> */}
        {/* this above commented part is replaced by below two lines now no need to to uncomment above part */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row my-3">
        {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>

        {/* These next and previous buttons are removed for infinite scrolling in react */}
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprevious}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div> */}
      </div>
    );
  }
}

export default News;
