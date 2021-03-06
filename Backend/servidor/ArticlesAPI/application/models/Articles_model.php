<?php 
class Articles_model extends CI_Model{
    
    public function __construct(){
            parent::__construct();
            $this->table = "articles";
            // Your own constructor code
    }

    public function get($id = null){
        if(!is_null($id)){
            //Consultamos si registro del articulo que recibimos
            $query = $this->db->select('*')->from($this->table)->where('id', $id)->get();
            
            if($query->num_rows() === 1){
                return $query->row_array();
            }else{
                return null;
            }
        }

        //Si no llega un id como parametro, retornamos todos los articulos
        $query = $this->db->select('*')->from($this->table)->get();
         if($query->num_rows() > 0){
            return $query->result_array();
         }
    }

    public function save($article){
        $this->db->set($this->_setArticle($article))->insert($this->table);

        //Validamos si hubieron filas afectadas
        if($this->db->affected_rows() === 1){
            return $this->db->insert_id();
        }
        
        return null;
    }

    public function update($article){
        $id = $article['id'];
        $this->db->set($this->_setArticle($article))->where('id', $id)->update($this->table);
        if ($this->db->affected_rows() === 1) {
            return true;
        }
        return null;
    }


    public function delete($id){
        $this->db->where('id', $id)->delete($this->table);

        //Validamos si hubieron filas afectadas
        if($this->db->affected_rows() === 1){
            return true;
        }
        
        return null;
    }

    private function _setArticle($article){
        return array(
            'id' => $article['id'],
            'title' => $article['title'],
            'description' => $article['description']);
            //'img_route' => $article['img_route']);
    }
}