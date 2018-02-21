import React, { Component } from 'react';
import moment from 'moment';
import './style.css';
const styles = {
  appHeader: {

  },
  headerComponent: {
    backgroundColor: '#E7E7E7',
    padding: 20,
    cursor: 'pointer',
    color: '#8e8b8b',
  },
  contentDropDown: {
    height: '80%',
    width: '30%',
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    top: 58,
    border: '1px solid rgb(201, 201, 201)',
    borderTop: '5px solid rgb(177, 177, 177)',
    overflow: 'hidden',
  },
  hrules: {
    border: '1px solid #C9C9C9',
  },
  calendr: {
    display: 'flex',
    padding: '20px 20px 20px 10px',
    color: '#B1B1B1',
    fontSize: 17,
  },
  listView: {
    padding: 12
  },
  notificationArea: {
    overflowY: 'scroll',
    width: '100%',
    height: '60%',
    padding: '30px 17px 0px 0px',
  },
  msgStyle: {
    color: 'rgb(177, 177, 177)',
    fontSize: 12,
    textAlign: 'left',
  },
  notificationListView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContents: 'flex-start',
    padding: '20px 0px 0px 0px',
    margin: '0px 20px 0px 10px',
  },
  durationStyle: {
    color: '#000000',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 12,
    borderTop: '1px solid #E7E7E7',
    paddingTop: '5px',
  },
}

class NotificationModule extends Component {
  render() {
    const { notificationObj } = this.props
    if(!this.props.visible) {
      return null;
    }
    return (
      <div className="contentDropDown" style={styles.contentDropDown}>
        <div className="calendr" style={styles.calendr}> { moment().format('dddd MMM d, YYYY') } </div>
        <div className='hrule' style={styles.hrules}/>
        <div className="statContentArea">
          {notificationObj &&
            notificationObj.statsOverview.map((e, i) => {
              return(
                <div key={i} className="listView" style={styles.listView}>
                  <span style={{ color: '#81B8E0', fontSize: 20, marginRight: 10 }}>{e.data.count}</span> <span style={{ color: '#B1B1B1', fontSize: 17 }}>{e.data.name}</span>
                </div>
              );
            })}
        </div>
        <div className="notificationArea" style={styles.notificationArea}>
          <a href="#" style={{ fontSize: 12, color: 'rgb(129, 184, 224)', textDecoration: 'none' }}> My Workspace > </a>
        {notificationObj &&
          notificationObj.data.map((e2, i2) => {
            return(
              <div key={i2} className="notificationListView" style={styles.notificationListView}>
                <div className="duration" style={styles.durationStyle}>
                  <div className="durationDetail" style={{ paddingTop: 10, color: '#6d6a6a' }}>Just Now</div>
                  <div className="closeIco" style={{ color: 'rgb(177, 177, 177)', cursor: 'pointer' }}>X</div>
                </div>
                <div className="msg" style={styles.msgStyle}>
                  {e2.msg} <a href={`${e2.url}`} style={{ textDecoration: 'none', color: 'rgb(129, 184, 224)' }}> View Task > </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export { NotificationModule }
