import React, {useState} from "react";
import { useHistory, useParams } from 'react-router-dom';
import './Detail.scss';

function Detail(props){

    let history = useHistory();
    let {id} = useParams();

    let find_item = props.shoes.find(function(item){
      return item.id == id
    })

    return(
      <div className="container">
        <div className="my-alert1">재고가 얼마 남지 않았습니다.</div>
            <div className="row">
              <div className="col-md-6">
                <img src={`https://codingapple1.github.io/shop/shoes${Number(id) + 1}.jpg`} width="100%" />
              </div>
              <div className="col-md-6 mt-4">
                <h4 className="pt-5">{find_item.title}</h4>
                <p>{find_item.content}</p>
                <p>{find_item.price} ₩</p>
                <button className="btn btn-danger">주문하기</button> 
                <button className="btn btn-danger" onClick={()=>{ 
                    history.goBack();
                 }}>뒤로가기</button> 
              </div>
          </div>
        </div> 
    )
  }

  export default Detail;