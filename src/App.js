import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class GitHubScore extends React.Component {
  constructor(props)
  {
      super(props);
      this.state = {
        userName: "",
        //gitHubUserData: null
        gitHubUserScore: 0,
        gitHubRetrievalStatus: ""
      };

      //bindings
      this.callGitHub = this.callGitHub.bind(this);
      this.updateGitHubUserState = this.updateGitHubUserState.bind(this);
      this.updateGitHubLookupError = this.updateGitHubLookupError.bind(this); 
      this.handleUserNameInput = this.handleUserNameInput.bind(this);
      this.handleLookupButtonEnablement = this.handleLookupButtonEnablement.bind(this);
      this.handleLookupButtonText = this.handleLookupButtonText.bind(this);
      this.displayGitHubScoreMessage = this.displayGitHubScoreMessage.bind(this);
      this.displayGitHubScore = this.displayGitHubScore.bind(this);
      this.displayGitHubError = this.displayGitHubError.bind(this);
      
    } //end constructor

    updateGitHubUserState(response) {
      console.log("Entering updateGitHubUserState");
      console.log(response);

      let localGitHubScore = this.calculateGitHubScore(response);

      this.setState({gitHubUserScore: localGitHubScore,
                     gitHubRetrievalStatus: "Success"});

      console.log("Leaving updateGitHubUserState");
    }

    updateGitHubLookupError(response) {
      console.log("Entering updateGitHubLookupError");
      console.log(response);

      this.setState({gitHubUserScore: 0,
                     gitHubRetrievalStatus: "Error"});

      console.log("Leaving updateGitHubLookupError");
    }

    callGitHub() {
      console.log("Entering callGitHub()");
  
      //var
      let gitHubPromoise;

      //Axios API - https://www.npmjs.com/package/axios
      //            http://codeheaven.io/how-to-use-axios-as-your-http-client/ 
      //alert("button clicked");

      //construct query string to send to GitHub based on user input
      let queryString = "https://api.github.com/users/" + this.state.userName;
      
      //public_repos and followers are properties under data
      //check status = OK, 

      //get user's GitHub information
      gitHubPromoise = axios.get(queryString);

      //If call was successful
      gitHubPromoise.then(this.updateGitHubUserState);

      //If call encountered an error... 
      gitHubPromoise.catch(this.updateGitHubLookupError);
  
      console.log("Leaving callGitHub()");
    }

    handleUserNameInput(event) {
      console.log("Entering handleUserNameInput"); //debug

      //var
      let localUserName = event.target.value;

      //update state
      this.setState({userName: localUserName})

      console.log("Leaving handleUserNameInput"); //debug
    }

    handleLookupButtonEnablement() {
      console.log("Entering handleLookupButtonEnablement"); //debug

      //if no user name has been entered disable the calc score/lookup button
      if (this.state.userName.trim() === "")
      {
        return true;
      }
      else
      {
        return false;
      }

      console.log("Leaving handleLookupButtonEnablement"); //debug
    }

    handleLookupButtonText() {
      console.log("Entering handleLookupButtonText"); //debug

      //if no user name has been entered instruct user to enter a user name
      if (this.state.userName.trim() === "")
      {
        return "Enter a User Name to lookup.";
      }
      else
      {
        return"Calc My GitHub Score!";
      }

      console.log("Leaving handleLookupButtonText"); //debug
    }

    calculateGitHubScore(responseObject) {
      console.log("Entering calculateGitHubScore"); //debug

      //vars - created mainly for console logging for debugging
      let localGitHubFollowers = responseObject.data.followers;
      let localGitHubPublicRepositories = responseObject.data.public_repos;

      console.log(localGitHubFollowers); //debug
      console.log(localGitHubPublicRepositories); //debug

      //calculate GitHub score based on the number of followers and public repositories
      let localGitHubScore = localGitHubFollowers + localGitHubPublicRepositories;
      console.log(localGitHubScore);

      //return calculated value
      return localGitHubScore;

      console.log("Entering calculateGitHubScore"); //debug
    }

    displayGitHubScoreMessage(localRetrievalStatus, localGitHubUserScore) {
      console.log("Entering displayGitHubScoreMessage"); //debug
      console.log(localGitHubUserScore);

      //check if data retrieval was successful
      if (localRetrievalStatus === "Success")
      {
        if (localGitHubUserScore < 20)
        {
          return <div className="scoreResultStyle scoreNeedsWorkStyle">Needs Work!</div>
        }
        else if (localGitHubUserScore < 50)
        {
          return <div className="scoreResultStyle scoreDecentStartStyle">A decent Start!</div>
        }
        else if (localGitHubUserScore < 100)
        {
          return <div className="scoreResultStyle scoreDoingGoodStyle">Doing good!</div>
        }
        else if (localGitHubUserScore < 200)
        {
          return <div className="scoreResultStyle scoreGreatJobStyle">Great job!</div>
        }
        else if (localGitHubUserScore >= 200)
        { 
          return <div className="scoreResultStyle scoreEliteStyle">GitHub Elite</div>
        }
        else
        {
          return "";
        }
      }
      return "";

      console.log("Leaving displayGitHubScoreMessage"); //debug
    }

    displayGitHubError(localRetrievalStatus) {
      console.log("Entering displayGitHubError"); //debug

      //check if data retrieval was successful
      if (localRetrievalStatus === "Error")
      {
        return <div className="gitHubErrorStyle">User does not exist, pick a different Github username</div>
      }
      return "";

      console.log("Leaving displayGitHubError"); //debug
    }

    displayGitHubScore(localRetrievalStatus, localGitHubUserScore) {
      console.log("Entering displayGitHubScore"); //debug
      console.log(localGitHubUserScore);

      //check if data retrieval was successful
      if (localRetrievalStatus === "Success")
      {
        return <div className="gitHubScoreStyle">Your Score: {localGitHubUserScore}</div>
      }
      return "";

      console.log("Leaving displayGitHubScore"); //debug
    }

    render() {

      return (
        <div id="containerDiv" className="containerDivStyle">
          <div id="leftColumn" className="leftColumnStyle">
            <div id="leftHeaderRow" className="leftHeaderRowStyle">
              GitHub Score
            </div>
            <div id="userNameRow" className="leftUserNameRowStyle">
              GitHub Username: <input id="userNameInput" className="userNameInputStyle" onChange={this.handleUserNameInput} placeholder="Enter User Name to Lookup" />
            </div>
            <div id="userNameRow" className="leftButtonRowStyle">
              <button onClick={this.callGitHub} disabled={this.handleLookupButtonEnablement()} className="lookupButtonStyle">{this.handleLookupButtonText()}</button>
            </div>
          </div>
          <div id="rightColumn" className="rightColumnStyle">
            {this.displayGitHubError(this.state.gitHubRetrievalStatus)}
            <div id="scoreRow" className="rightScoreRowStyle">
              {this.displayGitHubScore(this.state.gitHubRetrievalStatus, this.state.gitHubUserScore)}
            </div>
            <div id="messageRow" className="rightMessageRowStyle">
              {this.displayGitHubScoreMessage(this.state.gitHubRetrievalStatus, this.state.gitHubUserScore)}
            </div>
            <div>
              &nbsp;{/*This row intentially left blank for spacing purposes"*/}
            </div>
          </div>
        </div>
      );

    } //end render

  } //end callGitHub

class App extends Component {
  render() {
    return (
      <div className="App">
        <GitHubScore />
      </div>
    );
  }
}

export default App;
