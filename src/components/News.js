import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {
  constructor(){
    super();
    this.state = {
      articles : [],
      loading : false,
      page: 1
    }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=b4c3875a1d8843b280bda42697e4d7a6&page=1&pageSize=15";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
  }

  handleprevious=async ()=>{
    console.log("pri")
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=b4c3875a1d8843b280bda42697e4d7a6&page=${this.state.page - 1}&pageSize=15`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    })
  }

  handleNext=async ()=>{
    console.log("next")
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

    }
    else{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=b4c3875a1d8843b280bda42697e4d7a6&page=${this.state.page + 1}&pageSize=15`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles
    })
    }
  }

  render() {
    return (
      <div className='container my-3 mx-12'>
        <h1>NewsPadho - Top headlines</h1>
        <div className="row my-3">
        {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprevious}>&larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
