<?php
class Connector extends SQLite3
{
   function __construct()
   {
      $this->open(__DIR__ . '/../data/verbose_robot.db');
   }
}
