import React, {useEffect, useState} from "react";
import { useHistory, useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import './Detail.scss';
import { CSSTransition } from "react-transition-group";
import { connect, useDispatch } from "react-redux";


//Detail 컴포넌트 생성
function Detail(props){ // props정보 app.js에서 shoes={shoes} stock={stock} stockChange={stockChange}

    // state 생성하는 곳
    let [show, showChange] = useState(true);
    let [tabnumber, tabChange] = useState(0);
    let [cssswitch, cssswitchChange] = useState(false);

    //리액트 훅 생성하는 곳
    useEffect(()=>{
      let timer = setTimeout(()=>{ showChange(false) },3000); //삼항연산자를 이용해서 show의 값이 true일때는 재고메세지를 보여주고, 3초 뒤에 show의값을 false로 바꿔 안보이게 만듬.
      return ()=>{clearTimeout(timer)} // 2초안에 페이지를 이탈 할 경우 위에 코드에 문제가 생길 수 있어서 clearTimeout을 통해서 타이머를 해제 해 준다.
    });

    let history = useHistory();
    let {id} = useParams(); // :id값을 가져와서 id라는 변수에 저장!
    let dispatch = useDispatch();

    let find_item = props.shoes.find((item)=>{
      return item.id == id
    }) // find_item이라는 변수는 props.shoes에서 find를 해서 id라는 값과 일치하는 item.id를 가져온다.


    //출력되는 값
    return(
      <div className="container">
        {show===true? <div className="my-alert2">재고가 얼마 남지 않았습니다.</div> : null}
        <div className="row">
          <div className="col-md-6">
            <img src={`https://codingapple1.github.io/shop/shoes${Number(find_item.id) + 1}.jpg`} width="100%" />
          </div>
          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{find_item.title}</h4>
            <p>{find_item.content}</p>
            <p>{find_item.price} ₩</p>
            <Stock stock={props.stock} /> {/*App.js에서 props로 Detail.js에게 보낸 stock을 다시 Stock컴포넌트로 전송하는 방법 */}
            <button className="btn btn-danger m-1" onClick={()=>{
                props.stockChange([1,1,1]); 
                dispatch({ type : 'add_item_to_cart', payload : {id: props.shoes[find_item.id].id , name: props.shoes[find_item.id].title, quan: 1} })
                history.push('/cart')
              }}>주문하기
            </button>
            <button className="btn btn-danger" onClick={()=>{ 
                history.goBack();
              }}>뒤로가기</button>
          </div>
        </div>

        <Nav className='mt-5' variant="tabs" defaultActiveKey="link-0">
          <Nav.Item>
            <Nav.Link className="nav_deco" eventKey="link-0" onClick={()=>{ cssswitchChange(false); tabChange(0) }}>상품정보</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="nav_deco" eventKey="link-1" onClick={()=>{ cssswitchChange(false); tabChange(1) }}>배송정보</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="nav_deco" eventKey="link-2" onClick={()=>{ cssswitchChange(false); tabChange(2) }}>판매자정보</Nav.Link>
          </Nav.Item>
        </Nav>

        <CSSTransition in={cssswitch} classNames="wow" timeout={500}>
          <TapContent tabnumber={tabnumber} cssswitchChange={cssswitchChange}/> 
        </CSSTransition>
        

      </div>
    )
  }

  //컴포넌트 제작 구간

  function Stock(props){
    return(
      <p>재고 : {props.stock[0]}개</p>
    )
  }


  function TapContent(props){

    useEffect(()=>{
      props.cssswitchChange(true);
    })

    if(props.tabnumber === 0){
      return(<div>0번내용</div>)
    }
    else if(props.tabnumber === 1){
      return(<div>1번내용</div>)
    }
    else{
      return(<div>2번내용</div>)
    }
  }




  function 함수명(state){
    return{
        state : state.reducer, // state라는 이름의 props로 바꿔주셈
        alert_is_open : state.reducer2
    }
}
// 위 함수는 store안에 있는 내용들을 다 가져와서 props처럼 만들어주는 함수

export default connect(함수명)(Detail) 

