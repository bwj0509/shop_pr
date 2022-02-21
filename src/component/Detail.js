import React, {useEffect, useState} from "react";
import { useHistory, useParams } from 'react-router-dom';
import './Detail.scss';



//Detail 컴포넌트 생성
function Detail(props){

    // state 생성하는 곳
    let [show, showChange] = useState(true);
    let [inputData, inputDataChange] = useState('');

    //리액트 훅 생성하는 곳
    useEffect(()=>{
      let timer = setTimeout(()=>{ showChange(false) },3000); //삼항연산자를 이용해서 show의 값이 true일때는 재고메세지를 보여주고, 3초 뒤에 show의값을 false로 바꿔 안보이게 만듬.
      return ()=>{clearTimeout(timer)} // 2초안에 페이지를 이탈 할 경우 위에 코드에 문제가 생길 수 있어서 clearTimeout을 통해서 타이머를 해제 해 준다.
    });

    let history = useHistory();
    let {id} = useParams();

    let find_item = props.shoes.find(function(item){
      return item.id == id
    })


    //출력되는 값
    return(
      <div className="container">
        {show===true? <div className="my-alert2">재고가 얼마 남지 않았습니다.</div>:null}
            <div className="row">
              <div className="col-md-6">
                <img src={`https://codingapple1.github.io/shop/shoes${Number(id) + 1}.jpg`} width="100%" />
              </div>
              <div className="col-md-6 mt-4">
                <h4 className="pt-5">{find_item.title}</h4>
                <p>{find_item.content}</p>
                <p>{find_item.price} ₩</p>
                <Stock stock={props.stock} /> {/*App.js에서 props로 Detail.js에게 보낸 stock을 다시 Stock컴포넌트로 전송하는 방법 */}
                <button className="btn btn-danger" onClick={()=>{props.stockChange([1,1,1])}}>주문하기</button> 
                <button className="btn btn-danger" onClick={()=>{ 
                    history.goBack();
                 }}>뒤로가기</button>
              </div>
          </div>
        </div> 
    )
  }

  //컴포넌트 제작 구간

  function Stock(props){
    return(
      <p>재고 : {props.stock[0]}개</p>
    )
  }






  //외부로 익스폴트 실시!
  export default Detail;