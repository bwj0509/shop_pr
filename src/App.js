 /*eslint-disable*/
// import 사용하는 구간
import React, {useState, useContext} from 'react';
import './App.css';
import { button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import shoesName from './data.js';
import Detail from './component/Detail';
import Cart from './component/Cart' 
import axios from 'axios'; //ajax요청을 위한 라이브러리 import

import { Link, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

let stock_context = React.createContext(); // Stock_context라는 context를 생성하였고 범위를 지정하여 변수를 사용 할 수 있게 해준다. props친구임

function App() {

  // State사용하는 구간
  let [shoes, shoesChange] = useState(shoesName); // 신발 정보를 가지고 있는 state
  let [stock, stockChange] = useState([10,11,12]); // 물건 재고 정보를 가지고 있는 state




  //아래부터 출력값 입력
  return (
    <div className="App">
      {/*상단네비바*/}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">WOOJIN SHOP</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link><Link to="/" className='nav_deco'>Home</Link></Nav.Link>
              <Nav.Link ><Link to="/detail/2" className='nav_deco'>Detail</Link></Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item><Link to="/cart" className='nav_deco2'>Cart</Link></NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
    <Switch>
      {/*메인 페이지*/}
      <Route exact path="/"> 
        <div className='jumbotron'>
          <div>
            <h1>98% Season Off</h1>
            <hr />
            <p>
            This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.
            </p>
            <p class="lead">
              <a class="btn btn-light btn-lg" href="#" role="button">Learn more</a>
            </p>
          </div>
        </div>
        <stock_context.Provider value={stock}> {/*context를 사용하였고 상품 설명 창에서 stock 변수를 사용하기 위해서 props대신에 사용하였다. 필요한 부분을 HTML로 싸매면 가능하다*/}
          <ItemList shoes={shoes} />
          <button className='btn btn-primary' onClick={()=>{ // get요청으로 서버에서 데이터를 가져온다.  
            axios.get('https://codingapple1.github.io/shop/data2.json') //성공은 then, 실패는 catch, then에 result(네이밍)값을 넣어 data를 가져올 수 있다.
            .then((result)=>{ 
              shoesChange([...shoes,...result.data])
            })
            .catch(()=>{
              console.log("데이터 가져오는것을 실패했습니다.")
            })

            }}>더보기
          </button>
        </stock_context.Provider>
      </Route>

      {/*디테일 페이지*/}
      <Route path="/detail/:id">
        <Detail shoes={shoes} stock={stock} stockChange={stockChange}/>
      </Route>

      {/*장바구니 페이지*/}
      <Route path="/cart">
        <Cart />
      </Route>

      {/*잘못된 접근 페이지*/} 
      <Route path="/:id">
        <h1>잘못된 접근입니다.....</h1>
      </Route>

    </Switch>
      
    </div>
  );
}



//컴포넌트 제작 구간 
// 

//컴포넌트-1 : 상품을 보여주는 컴포넌트
function ItemList(props){

  let stock = useContext(stock_context); // useContext를 이용해서 공유된 값 사용 매개변수에는 지정해둔 범위를 넣는다.
  let history = useHistory();
  return(
    <>
    <div className='container'>
      <div className='row'>
        {props.shoes.map((shoess,i)=>{
          return(
            <>
              <div className='col-md-4' key={i} onClick={()=>{history.push(`./detail/${shoess.id}`)}}>
                  <img src={`https://codingapple1.github.io/shop/shoes${i+1}.jpg`} width="100%" />
                  <h4>{props.shoes[i].title}</h4>
                  <p>{props.shoes[i].content} & {props.shoes[i].price}</p>
                  {stock[props.i]}
              </div> 
            </>
          )
        })}
      </div>
    </div>
    </>
  )
}
 

export default App;
