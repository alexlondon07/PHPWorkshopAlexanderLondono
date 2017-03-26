<?php
defined('BASEPATH') OR exit('No direct script access allowed');

//Requerimos la libreria para la consumir API
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

class Articles extends REST_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->database();
        $this->load->model("Articles_model");
    }

    public function index_get(){
        $articles = $this->Articles_model->get();
        if(!is_null($articles)){
            $this->response(array('response' => $articles), 200);
        }else{
            $this->response(array('error' => 'No hay articulos en la base de datos'), 404);
        }
    }

    public function find_get($id){
        if(!$id){
            $this->reponse(null, 400);
        }

        $article = $this->Articles_model->get($id);
        if(!is_null($article)){
            $this->response(array('response' => $article), 200);
        }else{
            $this->response(array('error' => 'Articulo no encontrado'), 404);
        }
    }

    public function index_post(){
        if(!$this->post('article')){
            $this->reponse(null, 400);
        }

        $data = $this->Articles_model->save($this->post('article'));
        if(!is_null($data)){
            $this->response(array('response' => $data), 200);
        }else{
            $this->response(array('error' => 'Error en el servidor'), 400);
        }
    }

    public function index_put($id){
        if(!$this->post('article') || !$id){
            $this->response(null, 400);
        }

        $update = $this->Articles_model->update($id, $this->post('artcile'));
        if(!is_null($update)){
            $this->response(array('response' => 'Articulo editado correctamente'), 200);
        }else{
            $this->response(array('error' => 'Error en el servidor'), 400);
        }
    }

    public function delete_put($id){
        if(!$id){
            $this->response(null, 400);
        }

        $delete = $this->Articles_model->delete($id);
        if(!is_null($delete)){
             $this->response(array('response' => 'Articulo eliminado correctamente'), 200);
        }else{
            $this->response(array('error' => 'Error en el servidor'), 400);
        }
    }
}
