<p align="center">
	<img src="https://res.cloudinary.com/emarat/image/upload/v1630505506/logo.svg" width="120" align="center">
</p>
<h1 align="center">Emarat Backend</h1>

<p align="center">The perfect solution to make living in a residential society a pleasant and convenient experience - for the residents and management. Pay monthly maintenance fees, complaints resolution, public announcements system, social feeds and more.</p>

<h3 align="center">
	<a href="https://e-marat.netlify.app/">Live URL</a>
</h3>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#artefacts">Artefacts</a></li>
        <li><a href="#schema-design">Schema Design</a></li>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#performance">Performance</a></li>
        <li><a href="#security">Security</a></li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#contributors">Contributors</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<p>
	<a href="https://res.cloudinary.com/emarat/image/upload/v1631802213/homepage-screenshot_n2dxwk.png">
		<img src="https://res.cloudinary.com/emarat/image/upload/v1631802213/homepage-screenshot_n2dxwk.png">
	</a>
</p>

## Artefacts

<p>
	<a href="https://drive.google.com/file/d/1GeWlJTQ7-VaQLpc-Se31_dH8Kf1n8kUa/view?usp=sharing">PRD</a>
	&nbsp;&nbsp;&nbsp;&nbsp;
	<a href="https://drive.google.com/file/d/1wfXcbGgDDSTDIMjHo2rQlWlYX2FSgtwj/view?usp=sharing">HLD</a>
	&nbsp;&nbsp;&nbsp;&nbsp;
	<a href="https://drive.google.com/file/d/1YabDlAU6MeRzFvw3qotHrL2CxlqkCiEA/view?usp=sharing">One Pager</a>
	&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="https://drive.google.com/file/d/1VhLwtQEiYDabaPfq7dHEWbr2DseD71Ce/view?usp=sharing">Wireframes</a>
</p>

## Frontend Repo

[Frontend Repo](https://github.com/pesto-students/n6-emarat-fe-eta-6/)

## Schema Design

<a href="https://res.cloudinary.com/emarat/image/upload/v1631804413/emarat-schema_gk9kuh.png">
	<img src="https://res.cloudinary.com/emarat/image/upload/v1631804413/emarat-schema_gk9kuh.png">
</a>

#### Primary DB : MongoDB

#### Social Feeds : Firebase Realtime Database

## Built With

<p align="center">
	<a href="http://nodejs.org/">
		<img src="https://res.cloudinary.com/emarat/image/upload/h_150/v1631803785/node-logo_jjvktb.png" title="Node JS" height="100">
	</a>
	<a href="https://expressjs.com/">
		<img src="https://res.cloudinary.com/emarat/image/upload/h_150/v1631803785/express-logo_rtu2k4.png" title="Express JS" height="100">
	</a>
	<a href="https://www.mongodb.com/">
		<img src="https://res.cloudinary.com/emarat/image/upload/h_150/v1631803785/mongoDB-logo_sv71ad.png" title="MongoDB" height="100">
	</a>
	&nbsp;&nbsp;&nbsp;&nbsp;
	<a href="https://redis.io/">
		<img src="https://res.cloudinary.com/emarat/image/upload/h_150/v1631803785/redis-logo_ovuew1.png" title="Redis" height="100">
	</a>
	<a href="https://firebase.google.com/">
		<img src="https://res.cloudinary.com/emarat/image/upload/h_150/v1631803785/firebase-logo_v8dzdj.png" title="Firebase" height="100">
	</a>
	<a href="https://razorpay.com/">
		<img src="https://res.cloudinary.com/emarat/image/upload/h_150/v1631811211/Razorpay-logo_bzojzt.png" title="Razorpay Payment Gateway" height="100">
	</a>
	<a href="https://www.heroku.com/">
		<img src="https://res.cloudinary.com/emarat/image/upload/h_150/v1631803784/heroku-logo_dvjrgt.png" title="Heroku" height="100">
	</a>
</p>

## Performance

-   Queries to the database are minimised and as few queries are made as possible.
-   Image storage and other operations are handled by external systems to avoid system load.

### Caching

-   Wherever there are complicated large MongoDB queries, caching is done through redis. This results in faster data retrieval. We were able to reduce admin dashboard api call response time from `1100ms` to `90ms` by using this method.
-   Whenever MongoDB data is changed (which could result in stale cache), an event is emitted and this event is listened to by the caching system, and recaching is done.

## Security

### Authentication

Firebase phone auth method is used to send OTP by which the user's phone number is verified, it is matched with the users record in MongoDB and if user exists then the user is authenticated.

### Validation of User Input

-   Every user input is treated as unsafe and is validated for length, type, etc by using the joi library.
-   Input of user's id is never taken from client, rather server determines it by looking at authenticated user's JWT token.

### XSS

The [X-XSS-Protection header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection) usually sent by the server, is set to 0, while on front-end ReactJS's [dangerouslySetInnerHTML](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml) is never used.

### CSRF

On client-side, JWT tokens are stored in the browser's local storage and not in cookies.

### Other Common HTTP headers vulnerabilities

[Helmet JS](https://github.com/helmetjs/helmet) is used to protect from some well-known web vulnerabilities by setting HTTP headers appropriately.

### Firebase

Social feed data comes from firebase. Strict rules are written for it :

-   Only logged in users can view or add post/comment.
-   Data validation for all add/update is done.
-   Only residents who own the post/comment or admin can delete it.

A copy of these rules can be found on this [location](https://github.com/pesto-students/n6-emarat-be-eta-6/blob/master/config/firebaseRules.json).

## Getting Started

#### Prerequisites

-   Node JS
-   NPM

#### 1. Clone the project from github

`git clone https://github.com/pesto-students/n6-emarat-be-eta-6.git emarat-be`

### 2. Navigate to folder

`cd emarat-be`

### 3. Install the dependencies

`npm install`

### 5. Set environment variables

Make a new file named `.env` in the folder `config` and paste the contents of [this](https://docs.google.com/document/d/1yKPiX6n7CZnYmGWt5j_y6WesPkWPfARBEB_wgRWP6oo/edit?usp=sharing) doc in it.

### 6. Start the server

`npm run dev`

### Credentials

*To login in the app as admin use no. 9999999999 and otp 123456*  
*To login in the app as resident use no. 8888888888 and otp 123456*  

## Contributors

Deepak Singh Rawat - [GiHub](https://github.com/dev-deepak-rawat) - [Email](mailto:dev.deepak.rawat@gmail.com)

Haris Rahman - [GiHub](https://github.com/harisrahman) - [Email](mailto:hi@haris.tech)
