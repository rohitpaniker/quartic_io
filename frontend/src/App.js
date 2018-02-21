import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import { NotificationModule } from './components/NotificationModule';
import axios from 'axios';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:4000');

const styles = {
  headerComponent: {
    backgroundColor: '#E7E7E7',
    padding: 20,
    cursor: 'pointer',
    color: '#8e8b8b',
  },
  contentDropDown: {
    height: '80%',
    width: '20%',
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    top: 58,
    border: '1px solid rgb(201, 201, 201)',
    borderTop: '5px solid rgb(177, 177, 177)',
  },
  hrules: {
    border: '1px solid #C9C9C9',
  },
  calendr: {
    padding: '20px 20px 20px 0px',
    color: '#B1B1B1',
    fontSize: 20,
  },
}

class App extends Component {
  constructor() {
    super();
    console.log(moment().format('dddd MMM d, YYYY'))
    this.state = {
      statArr: [56, 4, 20],
      notifDropdownVisible: false,
      notificationObj: {}
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/getNotifJSon')
    .then((resp) => {
      //console.log(resp.data);
      this.setState({
        notificationObj: resp.data
      })
    })
    .catch((err) => {
      console.log(err);
    });

    // socket.emit(`notif`, "someData");

    socket.on('notif', notifData => {
      console.log(notifData);
        let tempStatsOverview = [...this.state.notificationObj.statsOverview];
        let tempData = [notifData, ...this.state.notificationObj.data]; // Adding new data to message queue at top using ES6 spread operator
        tempStatsOverview.map((e, i) => {
          console.log(e.type, notifData.type);
          if(e.type === notifData.type) {
            e.data['count'] = e.data['count']+1;
          }
          if(i === tempStatsOverview.length-1) {
            this.setState({
              notificationObj: {
                ...this.state.notificationObj,
                statsOverview: tempStatsOverview,
                data: tempData
              }
            })
          }
        })
      this.setState({
        notifDropdownVisible: !this.state.notifDropdownVisible
      })
    });
  }

  handleNotificationClick = () => {
    // if(this.state.notifDropdownVisible) {
    //   let dataReceovedThroughSocket = {'type': 'assignedTaske', msg: 'Rohit has assigned you a task', url: 'https://wwww.gmail.com'}
    //   let tempStatsOverview = [...this.state.notificationObj.statsOverview];
    //   let tempData = [dataReceovedThroughSocket, ...this.state.notificationObj.data]; // Adding new data to message queue at top using ES6 spread operator
    //   tempStatsOverview.map((e, i) => {
    //     if(e.type === dataReceovedThroughSocket.type) {
    //       e.data['count'] = e.data['count']+1;
    //     }
    //     if(i === tempStatsOverview.length-1) {
    //       this.setState({
    //         notificationObj: {
    //           ...this.state.notificationObj,
    //           statsOverview: tempStatsOverview,
    //           data: tempData
    //         }
    //       })
    //     }
    //   })
    // }
    this.setState({
      notifDropdownVisible: !this.state.notifDropdownVisible
    })
  }

  render() {
    const { notifDropdownVisible } = this.state
    return (
      <div className="App">
        <header className="App-header" style={styles.appHeader}>
          <div style={styles.headerComponent} onClick={this.handleNotificationClick.bind(null)}> Notifications </div>
          <NotificationModule
            notificationObj={this.state.notificationObj}
            visible={notifDropdownVisible}
          />
        </header>
      </div>
    );
  }
}

export default App;
