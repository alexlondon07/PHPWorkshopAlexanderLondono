<?php 
class Articles_model extends CI_Model{
    
    public function __construct(){
            parent::__construct();
            // Your own constructor code
    }

    public function get($id = null){
        if(!is_null($id)){
            //Consultamos si registro del articulo que recibimos
            $query = $this->db->select('*')->from('articles')->where('id', $id)->get();
            
            if($query->num_rows() === 1){
                return $query;
            }else{
                return false;
            }
        }

        //Si no llega un id como parametro, retornamos todos los articulos
        $query = $this->db->select('*')->from('articles')->get();
         if($query->num_rows() > 0){
            return $query->result_array();
         }
         return false;
    }

    public function save($article){
        $this->db->set($this->_setArticle($article))->insert('articles');

        //Validamos si hubieron filas afectadas
        if($this->db->affected_rows() === 1){
            return $this->db->insert_id();
        }
        
        return false;
    }

    public function update($id, $article){
        $this->db->set($this->_setArticle($article))->where('id', $id)->update('articles');

        //Validamos si hubieron filas afectadas
        if($this->db->affected_rows() === 1){
            return true;
        }
        
        return false;
    }

    public function delete($id){
        $this->db->where('id', $id)->delete('articles');

        //Validamos si hubieron filas afectadas
        if($this->db->affected_rows() === 1){
            return true;
        }
        
        return false;
    }

    private function _setArticle($article){
        return array(
            'id' => $article['id'],
            'title' => $article['title'],
            'description' => $article['description'],
            'img_route' => $article['img_route']);
    }
}