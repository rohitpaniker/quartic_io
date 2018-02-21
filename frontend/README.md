# Quartic IO Frontend UI

**This repo contains the Frontend UI of the web application built using ReactJS**

## How to

Steps to install and run this application

1. clone the repo: git clone https://github.com/rohitpaniker/quartic_io.git

2. cd to frontend

3. npm install -g yarn

4. yarn install

5. yarn start

## Resuable Notification Component Usage

1. Resuable component of Notification is within /components

2. Copy NotificationModule.js and style.css in your own ReactJS project

3. import the module : import { NotificationModule } from './components/NotificationModule';

4. Use NotificationModule like this:


```
<NotificationModule
  notificationObj={this.state.notificationObj}
  visible={notifDropdownVisible}
/>

```

5. notificationObj is where you pass object fetched from RESTful API from backend. Check backend module in server.js to know the format

6. visible props takes true/false. If true, notification dropdown is visible else hidden
