
    class App extends React.Component { 

            constructor(props){
                super(props)
                this.state = {data: []};
                this.setData = this.setData.bind(this);
            }

            setData(responseData){
               
                const doc = responseData.response.docs.slice(0,5);
               
            
             this.setState({data: doc});
        }
            
      componentDidMount(){
       $.ajax({
            
            url: 'https://api.nytimes.com/svc/archive/v1/2016/1.json?api-key=02a32004d52545be9c4e7b6f0b3edc28',
          
            success: this.setData
        })

    }
  
       
         
              render(){
             return(
            
              
               <div>
                 <Articles a={this.state.data}/>
               </div>
            
             )
           }
     }

       const Articles = (props) => {
       const articles = props.a;
       console.log(articles)
       
             
         return(
         <div>  {
           articles.map(
           (dat) =>
           <h2 key={articles.id}>{dat.headline.main}</h2>
     )}
         </div>
         );
      
   
        if(this.state.data.length ==0){
                   
                  
        return  <img className="bb" src="./demo1.gif" ></img>;
                }
      
        return (
          <div>
          {
            this.state.data.map( (article) => <Article key={article.web_url} url={article.web_url} /> )
          }
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
            
            url: 'http://api.linkpreview.net/?key=123456&q=https://www.google.com',
          
            success: this.setData
        })

    }
    
    render(){
  
        

      return (
        <div className="flex-container">
          <p>{this.state.data.description}</p>
          <img className="aa" src={this.state.data.image} ></img>
          <p>MORE AT:
            <a href={this.state.data.url}>{this.state.data.url}</a>
          </p>
        </div>
      );
    }
        
}
  function find(){
ReactDOM.render(<App/>, document.getElementById('root'));
       }     