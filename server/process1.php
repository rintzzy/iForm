<?php
/**
 * Created by PhpStorm.
 * User: RIN
 * Date: 5/21/2015
 * Time: 10:52 PM
 */
 if(isset($_POST['submit'])){
     $name = htmlentities($_POST['fullname']);
     echo "Thank you, ".$name;
 }