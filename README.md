<h1> Contact Book </h1>

<h2> Table of Contents: </h2>
<ul>
<li> <a href="#gm"> General Information </a> </li>
<li> <a href="#tech"> Technologies </a> </li>
<li> <a href="#deployment"> Deployment </a> </li>

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
<img src="/images/schemaDesign.png" align="center">
<br>
<br>
<li> Backend Design </li>
<ul>
<li> Follows MVC architecture
<li> <strong>Model</strong>: Mongoose Schema
<ul>
<li> Schema structure is nested and will save and retrieve data from mongoDB </li>
</ul>
<br>
<li> <strong>View</strong>: EJS Template
<ul>
<li> Data is rendered through EJS and basic styling is done through CSS </li>
</ul>
<br>
<li> <strong>Controller</strong>: Express.js
<ul>
<li> Controller is responsible for retrieving and submiting HTTP requests </li>
<li> Queries are done here which validates and checks data before retrieving and saving it to the database </li>
</ul>
</ul>
<br>
<img src="/images/backendDesign.png" align="center">
</ul>
<br>
<br>
<li> Application Prototype </li>
<p> Used Figma to work with UI. It made choosing colors, working with button functionalities and page display easier </p> <br>
<img src="/images/prototype.png" align="center">
<br>
<br>
<h4>  Application Functionality </h4>
<ul> 
    <li> User should be able to save contacts </li>
</ul>
</div>
<div id="tech">
<h3> Tools Used </h3>
<ul>
    <li> Node.js </li>
    <li> Express.js </li>
    <li> MongoDB </li>
    <li> Ejs </li>
    <li> CSS </li>
    <li> Draw.io </li>
    <li> Figma </li>
</ul>
    
<div id="deployment">
<h3> Deployed using:  </h3>
    <p> Heroku</p>
</div>


