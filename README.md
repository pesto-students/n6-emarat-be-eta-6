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

[<img src="https://res.cloudinary.com/emarat/image/upload/v1631802213/homepage-screenshot_n2dxwk.png">](https://res.cloudinary.com/emarat/image/upload/v1631802213/homepage-screenshot_n2dxwk.png)

Most Resident Welfare Association (RWAs) and cooperative societies rely on physical methods
to solve resident problems and to collect maintenance fees which is quite a tedious task and
lacks clarity and status tracking. With E-Marat, we are providing digital solutions for all the
society issues at one place. This will include payments tracking, complaints resolving, and
public announcements system. We will also provide a Social space platform for residents to
become acquainted with others by posting stories and sharing their thoughts.

## Artefacts

<p>
	<a href="https://drive.google.com/file/d/1GeWlJTQ7-VaQLpc-Se31_dH8Kf1n8kUa/view?usp=sharing">PRD</a>
	&nbsp;&nbsp;&nbsp;&nbsp;
	<a href="https://drive.google.com/file/d/1wfXcbGgDDSTDIMjHo2rQlWlYX2FSgtwj/view?usp=sharing">HLD</a>
	&nbsp;&nbsp;&nbsp;&nbsp;
	<a href="https://drive.google.com/file/d/1YabDlAU6MeRzFvw3qotHrL2CxlqkCiEA/view?usp=sharing">One Pager</a>
	&nbsp;&nbsp;&nbsp;&nbsp;
	<a href="https://drive.google.com/file/d/1VhLwtQEiYDabaPfq7dHEWbr2DseD71Ce/view?usp=sharing">Wireframes</a>
	&nbsp;&nbsp;&nbsp;&nbsp;
	<a href="https://drive.google.com/file/d/1rL3K0NTI91a6QQmy0J6BE9FFQSvwDgVY/view?usp=sharing">Coding Practices</a>
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

### Performance, Security, Caching, etc

Please read our [coding practices doc](https://drive.google.com/file/d/1rL3K0NTI91a6QQmy0J6BE9FFQSvwDgVY/view?usp=sharing) for complete details on these.

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

_To login in the app as admin use no. 9999999999 and otp 123456_  
_To login in the app as resident use no. 8888888888 and otp 123456_

## Contributors

Deepak Singh Rawat - [GiHub](https://github.com/dev-deepak-rawat) - [Email](mailto:dev.deepak.rawat@gmail.com)

Haris Rahman - [GiHub](https://github.com/harisrahman) - [Email](mailto:hi@haris.tech)
