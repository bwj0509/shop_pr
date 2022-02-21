 /*eslint-disable*/
// import 사용하는 구간
import React, {useState} from 'react';
import './App.css';
import { button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import shoesName from './data.js';
import Detail from './component/Detail';

import { Link, Route, Switch } from 'react-router-dom';


function App() {

  // State사용하는 구간
  let [shoes, shoesChange] = useState(shoesName); // 신발 정보를 가지고 있는 객체




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
              <Nav.Link ><Link to="/detail" className='nav_deco'>Detail</Link></Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
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
        <ItemList shoes={shoes} />
      </Route>

      {/*디테일 페이지*/}
      <Route path="/detail/:id">
        <Detail shoes={shoes}/>
      </Route>

      <Route path="/:id">
        <h1>잘못된 접근입니다.....</h1>
      </Route>

    </Switch>
      
    </div>
  );
}



//컴포넌트 제작 구간 


//컴포넌트-1 : 상품을 보여주는 컴포넌트
function ItemList(props){
  return(
    <>
    <div className='container'>
      <div className='row'>
        {props.shoes.map((shoess,i)=>{
          return(
            <>
              <div className='col-md-4' key={i}>
              <img src={`https://codingapple1.github.io/shop/shoes${i+1}.jpg`} width="100%" />
              <h4>{props.shoes[i].title}</h4>
              <p>{props.shoes[i].content} & {props.shoes[i].price}</p>
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
