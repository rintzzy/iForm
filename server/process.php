<?php
/**
 * Created by PhpStorm.
 * User: RIN
 * Date: 5/21/2015
 * Time: 10:52 PM
 */
// aquiring this PEAR package for data output in tabular way
require_once "HTML/Table.php";
 if(isset($_POST['submit'])){
     // extract the form fields from the form right after submission
     $name = htmlentities($_POST['fullname']);
     $email = htmlentities($_POST['email']);
     $phone = htmlentities($_POST['phone']);
     $url = htmlentities($_POST['url']);

     // connect to the database now
     $mysqldb = new mysqli('localhost','root','','subscriber');
     // set the query string for inserting data
     $query1 = "INSERT INTO user".
                "(fname,email,phone,url)".
                "VALUES ".
                "('$name','$email','$phone','$url')";
     // make the query and insert data into the database
     $result1 = $mysqldb->query($query1);

     // set the query string for pulling out all information from database
     $query2 = "SELECT * FROM user";
     $result2 = $mysqldb->query($query2);

     //initialize the html table constructor
     $table = new HTML_Table();
     // set the output table headers
     $table->setHeaderContents(0,0,'ID');
     $table->setHeaderContents(0,1,'Full Name');
     $table->setHeaderContents(0,2,'EMail ID');
     $table->setHeaderContents(0,3,'Phone no.');
     $table->setHeaderContents(0,4,'Website');

     // begin at the next row so that it won't overwrite the header row
     $row = 1;
     // format each row
     while($obj = $result2->fetch_row()) {
         $table->setCellContents($row, 0, $obj[0]);
         $table->setCellContents($row, 1, $obj[1]);
         $table->setCellContents($row, 2, $obj[2]);
         $table->setCellContents($row, 3, $obj[3]);
         $table->setCellContents($row, 4, $obj[4]);

         $row++;
     }
     // style a bit
     $table->altRowAttributes(1,null,array("class" => "style"));
     echo "<p>Thank you for signing for our newsletter, $name. Here's your details :</p><br />";
     // output the table
     echo $table->toHTML();
     // close the connection
     $mysqldb->close();
 }