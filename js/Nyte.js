 class App extends React.Component { 
  constructor(props){
    super(props)
    this.state = {
      data: [],
      selectedArticle: []
    };
    this.setData = this.setData.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(item){
    this.setState({selectedArticle: item})    
  }


  setData(responseData){
    const doc = responseData.response.docs.slice(0,20);
    this.setState({data: doc});
  }
            
  componentDidMount(){
    console.log('componentDidMount');
      $.ajax({
        url: 'https://api.nytimes.com/svc/archive/v1/' + this.props.y + '/' + this.props.m + '.json?api-key=02a32004d52545be9c4e7b6f0b3edc28',
        success: this.setData
  })
}
  
  render(){ 
    if(this.state.data.length ==0){       
      return  <p> Loading...</p>;
    }
      
    return (
    <div className="articleDetails">
      <div className="article">{
          this.state.data.map( (article) => 
          <Article  article={article}
                    key={article.web_url} 
                    url={article.web_url} 
                    clickhandler={this.handleItemClick} 
                    item={article}
                    selectedArticleID={this.state.selectedArticle._id}
                    /> )
        }
      </div>
      <div className="details">
        <UserDetails user={this.state.selectedArticle}/>
      </div>
    </div>
    );
  }
}  

const UserDetails=(props)=> {
  const user = props.user;
  let headline = user.headline;
  let byline = user.byline;
  let description = user.snippet;
  let link = user.web_url;
  let author = "";
  let title = "";

  for(let i in headline){
    title = headline.main
  }

  for(let i in byline){
    author = byline.original
  }


      return (
        <div>
           <h4>{title}</h4>
           <p>{description}</p>
           <a href={link} target="_blank">{link}</a>
           <p>{author}</p> 
        </div>
      );
  }


class Article extends React.Component {
  constructor(props){
    super(props)
    this.state = {data: {}};
    this.setData = this.setData.bind(this)
  }

  setData(responseData){
    this.setState({data: responseData}); 
  }   
  componentDidMount(){
    $.ajax({
        /* url: 'https://api.linkpreview.net/?key=5a8c5fffdf1fd0d14e3ef9e05269b449abdfcf5c8c60a&q=' + this.props.url,*/
      url: 'http://api.linkpreview.net/?key=123456&q=https://www.google.com',
      success: this.setData
    })
  }
    
  render(){
    const data = this.props.item;
    const clickhandler = this.props.clickhandler;  
    
    return (
      <div className={"container"+ " " + (this.props.selectedArticleID == this.props.article._id ? "active" : "")}>
        <img src={this.state.data.image}   onClick={() => clickhandler(data)} ></img>
        <h3>{this.state.data.title}</h3>
        <p>{this.state.data.description}</p>
      </div>   
    );
  }  
}
const btn = document.getElementById("find")

btn.addEventListener('click', () =>{
  const root = document.getElementById("root");
  let y = document.getElementById("year").value;
  let m = document.getElementById("month").value;
  const cond1 = (m >= 9 && y == 1851);
  const cond2 = (1852 <= y && y < 2018);
  const cond3 = (m < 4 && y == 2018);

  if(y  != "" && m != ""){
    month[0] == "0" ? month = month[1] : ""
    
    if(cond1 || cond2 || cond3) {
      ReactDOM.unmountComponentAtNode(root);
      ReactDOM.render(<App y={y} m={m} />, document.getElementById('root'))
    }
    else{
      root.innerHTML = "Please choose year starting from 1851!"
    }
  }
  else{
    root.innerHTML = "Please select month and year!"
  }
 })
