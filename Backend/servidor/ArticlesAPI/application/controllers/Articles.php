<?php
defined('BASEPATH') OR exit('No direct script access allowed');

//Requerimos la libreria para la consumir API
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

class Articles extends REST_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model('articles_model');
    }

    public function index_get(){
        echo 'Articles All';
    }

    public function find_get($id){
        echo 'Article # ' .$id;
    }

    public function index_post(){

    }

    public function index_put(){
        
    }

    public function delete_put(){
        
    }
}
