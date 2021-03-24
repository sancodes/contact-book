<h1> Contact Book </h1>

<h2> Table of Contents: </h2>
<ul>
<li> <a href="#gm"> General Information </a> </li>
<li> <a href="#tech"> Technologies </a> </li>
<li> <a href="#setup"> Setup </a> </li>

</ul>

<div id="gm">
<h3> Overview </h3>
<p> 
Application that allows you to save your contacts
</p>
<h4> Initial Planning </h4>
<h4> Snapshots </h4>
<ul>
<li> Schema Design </li>
<p> Contact to Address have 1:M relationship. Therefore, Address Schema is nested inside Contact Schema </p> <br>
<img src="/image/schemaDesign.png" align="center">
<br>

<li> Backend Design </li>
<ul>
<li> Follows MVC architecture
<li> <strong>Model</strong>: Mongoose Schema
<ul>
<li> Schema structure is nested and will save and retrieve data from mongoDB </li>
</ul>
<li> <strong>View</strong>: EJS Template
<ul>
<li> Data is rendered through EJS and basic styling is done through CSS </li>
</ul>
<li> <strong>Controller</strong>: Express.js
<ul>
<li> Controller is responsible for retrieving and submiting HTTP requests </li>
<li> Queries are done here which validates and checks data before retrieving and saving it to the database </li>
</ul>
</ul>
<img src="/image/backendDesign.png" align="center">
</ul>
<h4>  Application Functionality </h4>
<ul> 
    <li> You should be able to save contacts </li>
</ul>
</div>
<div id="tech">
<h3> Technologies Used </h3>
<ul>
    <li> Node.js </li>
    <li> Express.js </li>
    <li> MongoDB </li>
    <li> Ejs </li>
    <li> CSS </li>
</ul>
</div>
<div id="setup">
<h3> Setup </h3>
<p>
clone the repo to your desktop
```
npm install
```
then 
```
npm run devstart
```
open up your browser to run it in 
```
localhost:3000/
```
</p>
</div>
