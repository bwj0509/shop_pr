// 리엑트의 모든것에 대한 파일입니다.







// 1. useState : 변수를 저장하고 변수를 변화시키는 함수를 가진 객체 => 리액트에서 State수정이 생기면 State가 포함된 HTML을 재 랜더링 한다.

import {useEffect, useState} from 'react'; // 함수 사용을 위한 선언
let [data,dataChange] = useState('default'); // data에 변수를 넣고 dataChange함수를 이용해서 data의 값을 변경 시킬 수 있다.
dataChange('changedValue');

//주의사항! 1. state의 변수에 직접 값을 변경시키는 것은 불가능-> 함수를 이용해서 변경하자.
// ex)
let [data, dataChange] = useState([1,2,3]);
Array = [4,5,6]
dataChange([...data, ...Array]); // data자체를 변경하지는 못하며 data copy를 만들어서 사용 하면 된다. 
 









// 2. Component : 반복적으로 출현하는 HTML 덩어리를 Component로 만드는것. -> 대상은 자주변경되는 HTML UI, 다른 페이지를 만들때 사용
// 단점은? state를 사용할때 복잡해진다. -> props, context를 사용해 해결 가능

function Detail(){
    return(
        <>
            <h1>제목입니다.</h1>
            <h3>내용입니다.</h3>
            <img src='./image.jpg' />
        </>
        
    )
}
export default Detail;

//Detail 이라는 컴포넌트를 생성하였다. 함수형식으로 사용하고 return안에 HTML 문서를 작성한다. export를 이용해 Detail 함수를 사용 할 수 있게 한다.
import Detail from '../src/component/Detail'; //사용하고자 하는 곳에서는 import를 해야 사용이 가능하다. 







// 3. React에서 사용하는 if
// React에서는 if사용이 불가능해 삼항연산자를 사용한다.

{ a<b ? console.log('a가 b보다 크다.') : console.log('b가 a보다 크다.') }

//React에서 조건에 따라서 UI가 보이고 안보이고를 사용 할 수 있다.
let [data, dataChange] = useState(false);
{ data === true ? <Detail /> : null} // data값을 보고 true이라면 Detail이라는 컴포넌트를 보여주고 아닌경우에는 아무것도 표현하지 않는 방법











// 4. 반복문 사용(map함수) -> array의 모든 데이터에 똑같은 작업을 시키고 싶을 때 사용한다. (for반복문도 사용 할 수 있지만 map함수를 이용을 많이 한다.)

array = ['홍길동','김길동','박길동'];
{array.map((a,b)=>{
    return(
        <h1>반복 할 내용</h1>
    )
})}
// 함수 사용 방법임 map함수에 파라미터 2개 들어가는데 a는 array안의 data를 가지고 있는 변수고 b는 index를 가지고 있는 변수다.











// 5. Props : 부모컴포넌트는 Props를 이용해 자식 컴포넌트에게 변수를 넘겨야 자식은 부모의 변수를 사용 할 수 있다.

function App(){

    let [price, priceChange] = useState(10000);

    return(
        <>
            <h1>상품입니다.</h1>
            <Detail price={price} priceChange={priceChange} /> {/* ①첫번째 : 사용하고자 하는 컴포넌트에 값을 보내준다. 왼쪽은 작명, 오른쪽은 보내고자 하는 변수 */}
        </>
        
    )
}
export default App;


function Detail(props){ {/*②두번째 : 사용하고 하는 컴포넌트의 파라미터에 props를 사용 */}
    return(
        <>
            <img src='./image.jpg' />
            <h3> 상품의 세부적인 내용입니다.</h3>
            <p>상품의 가격은 {props.price}입니다.</p> {/*③세번째 : 사용하고 하는 컴포넌트의 파라미터에 props를 사용 */}
        </>
        
    )
}
export default Detail;










// 6. useParams 훅 : 파라미터는 매개변수이다. useParams 훅을 이용해 id와 라우트를 매치할 수 있음.

<Route path="/detail/:id"> 
<Detail/>
</Route>
//App.js에 작성된 내용
// :id는 /detail 뒤에 오는 어떠한 문자나 받겠다는 것이다.

import { Router, useParams } from 'react-router-dom';

let {id} = useParams();
//Detail.js에 작성된 내용
//useParams 훅을 이용해서 App.js에 있는 detail뒤에 있는 id값을 가져온다.





// 7. 라우터 사용하기
// 첫번째 : npm install react-router-dom
// 두번째 : index.js에서 import {Browser Router} from 'react-router-dom'
// 세번째 : index.js에서 <App/>을 <BrowserRouter>로 감싸기
// 네번째 : App.js에 import { Link, Route, Switch } from 'react-router-dom'; 로 리액트 라우터 돔의 컴포넌트를 import한다.

import { Link, Route, Switch } from 'react-router-dom';


<Switch>
    <Router exact path="/">
        <h1>제목입니다.</h1>
    </Router>
    <Router path="/detail/:id">
        <Detail />
    </Router>
    <Router path="/:id">
        <p><Link to='/'>잘못된 경로입니다...처음 페이지로 돌아갑니다.</Link></p>
    </Router>
</Switch>

// Switch는 매치되는 <Router>를 전부 보여주지 말고 한번에 하나만 보여주는 컴포넌트 -> 스위치 안에 경로중 첫번째 해당하는 것만 보여준다.
// Router는 여러가지 페이지를 만들 때 사용하는 컴포넌트
// Link는 페이지 이동을 가능하게 하는 컴포넌트










// 8. useHistory : 화면이동에 사용 할 수 있는 history인스턴스에 접근하게 해줌.
import { useHistory } from 'react-router-dom';
let history = useHistory();
history.goBack();

// history 변수를 만들고 .goBack()을 이용하면 전 페이지로 이동하는 기능










// 9. styled-Components 이용
import styled from 'styled-components';
import axios from 'axios';

let Box = styled.div`
    padding : 20px;
    margin : auto;
    `;
<Box> 스타일된 div박스입니다. </Box>










// 10. SASS 사용하기 -> CSS를 프로그래밍 언어스럽게 작성가능한 전처리기 -> SASS문법을 사용하면 CSS길이를 많이 줄일 수 있다.

//제목.scss파일 생성, 메인컴포넌트에서 import로 사용


// div.container {
//     h4{
//         color:blue;
//     }
//     p{
//         color:green;
//     }
// }
// nesting을 이용해서 container안에 있는 태그들을 체계적으로 관리 할 수 있다.


// $메인칼라: #ff0000;

// .red {
//   color: $메인칼라;
// }
// 위와 같이 변수에 데이터를 저장해서 사용이 가능하다.


// .my-alert {
//   background-color: #eeeeee;
//   border-radius: 5px;
//   padding: 20px;
//   max-width: 500px;
//   width: 100%;
//   margin: auto;
//   margin-top: 20px;
// }


// .my-alert2 {
//   @extend .my-alert;
//   background-color: #fbf1c2;
// }
// extend기능을 이용해서 기존 CSS의 복사 + 내용 추가 가능하다







// 11.useEffect 훅 : 컴포넌트가 마운트, 업데이트 되었을때 특정 코드를 실행 시키는 훅

useEffect(()=>{
    return(()=>{
        <h1>실행 할 코드</h1>
    })
})
//기본형 작성 방법


useEffect(()=>{
    let timer = setTimeout(()=>{ showChange(false) },3000); //setTimeout()의 첫번째 매개변수에 실행할 코드 넣고, 두번째 매개변수에 몇초 뒤에 실행 할지 넣음
    return ()=>{clearTimeout(timer)} // 2초안에 페이지를 이탈 할 경우 위에 코드에 문제가 생길 수 있어서 clearTimeout을 통해서 타이머를 해제 해 준다.
  });
// 사용예시


useEffect(()=>{
    return(()=>{
        <h1>실행 할 코드</h1>
    })
},[data])

//,[data]를 넣는 경우에는 data라는 state가 업데이트 될 때에만 useEffect가 실행 된다.
// 여러개 집어넣는 것도 가능하고 []이런식으로 조건을 아무것도 적지 않으면 처음에 마운트 될 때에만 useEffect가 작동한다.













//12. UI를 특정 조건에 보여지게 하는 법

 let [show, showChange] = useState(false);
 // 초기에 useState를 사용해서 변수를 생성해준다.

 show === true? <Detail /> : null;
 // 삼항연산자를 이용해서 State 변수값이 true 일때만 보여준다.









//13. Ajax: 서버에 새로고침없이 요청을 할 수 있게 도와줌
// 요청의 종류는 GET요청:특정페이지/자료읽기 , POST요청:서버로 중요 정보를 전달
// 사용법 -> npm install axios
import axios from 'axios';

axios.get('URL')
.then((res)=>{
    console.log('get요청을 성공 했을 때 실행');
    console.log(res.result);
})
.catch(()=>{
    console.log('get요청을 실패 했을 때 실행')
})
//axios.get() 사용 기본형

axios.post('서버URL',{id:'bwj0509', pw:1234});
//axios.post() 사용 기본형










// 14. 하위 컴포넌트로 State값을 전송하는 방법
// 1 props를 사용 -> 부모의 자식까지는 괜찮은데 그 자식의 자식 컴포넌트가 있는 경우 코드가 많이 복잡해진다.
// 2 context를 사용 할 수 있다. -> 컴포넌트의 구성이 복잡할 때 사용하면 좋다.

let stock_context = React.createContext();
// context를 만들어서 변수에 저장한다.

<stock_context.Provider value = {data}>
 <html>
     <Detail />
     <h1>내용...</h1>
 </html>
</stock_context.Provider>

// context를 사용하고 하는 범위를 다음과 같이 지정해서 사용한다. 사용하고자 하는 변수를 value값안에 집어넣어 준다.
// 공유 된 곳에 가서 ex) Detail안에서 data.변수 이런식으로 사용이 가능하다.
//












// 15.Tap 생성하는법

function App(){
    let [showswitch, showswitchChange] = useState(0);
    return(
        <>
            <button onClick={()=>{showswitchChange(0)}}>0번버튼</button>
            <button onClick={()=>{showswitchChange(1)}}>1번버튼</button>
            <button onClick={()=>{showswitchChange(2)}}>2번버튼</button>

            <Switch_control showswitch={showswitch}/>
        </>
            )
}

function Switch_control(props){
    if(props.showswitch === 0){
        return(<div>0번 버튼을 클릭했을 때 보여줄 내용</div>)
    }
    else if(props.showswitch === 1){
        return(<div>1번 버튼을 클릭했을 때 보여줄 내용</div>)
    }
    else{
        return(<div>2번 버튼을 클릭했을 때 보여줄 내용</div>)
    }
}
// 버튼 3개를 생성하고, 그 버튼에 따라 보여질 div박스 3개를 생성한다. state로 상태를 관리해서 버튼에 맞는 div를 보여 줄 수 있도록 한다.












// 16. Tap을 만든 후에 리액트에서의 애니메이션 사용하는 법

// 15번 버튼제어하는 기본형에서 시작한다. -> css를 직접 제어해서 하는 방법이 있지만 리액트 라이브러리로 쉽게 처리가 가능하다.
// 라이브러리 설치하기 npm install react-transition-group
import {CSSTransition} from "react-transition-group"; // 임포트를 진행하고
// <CSSTransition>으로 필요한 곳을 감싸고 in, classNames, timeout을 속성으로 넣어준다.
// in은 스위치로 true일때 애니메이션을 적용하고, classNames는 어떤 애니메이션인지 작명하는 부분, tiemout은 작동시간이다.
// wow에 대한 스타일을 담당하는 CSS로 가서 애니메이션을 디자인 하면 된다.
// css설명: .wow-enter{} 는 컴포넌트 등장시작시 적용할 CSS, .wow-enter-active{}는 컴포넌트 등장중일시 적용할 CSS이다.
// 평소에는 in 안에 있는 값을 false로 해뒀다가 작동시킬때 true로 바꾸면된다 -> state를 이용해서 변수 관리
// 버튼을 클릭할때는 트랜지션컨트롤이 false가 되고 스위치컨트롤 컴포넌트를 실행 할때 useEffect에 의해 트랜지션컨트롤이 true가 되면서 에니매이션이 작동한다.

function App(){
    let [showswitch, showswitchChange] = useState(0);
    let [transition_control, transition_controlChange] =  useState(false)
    return(
        <>
            <button onClick={()=>{transition_controlChange(false); showswitchChange(0)}}>0번버튼</button>
            <button onClick={()=>{transition_controlChange(false); showswitchChange(1)}}>1번버튼</button>
            <button onClick={()=>{transition_controlChange(false); showswitchChange(2)}}>2번버튼</button>

            <CSSTransition in={transition_control} classNames="wow" timeout={500}> 
                <Switch_control showswitch={showswitch} transition_controlChange={transition_controlChange}/>
            </CSSTransition>
            
        </>
            )
}

function Switch_control(props){

    useEffect(()=>{
        props.transition_controlChange(true);
    })

    if(props.showswitch === 0){
        return(<div>0번 버튼을 클릭했을 때 보여줄 내용</div>)
    }
    else if(props.showswitch === 1){
        return(<div>1번 버튼을 클릭했을 때 보여줄 내용</div>)
    }
    else{
        return(<div>2번 버튼을 클릭했을 때 보여줄 내용</div>)
    }
}












// 17. redux 사용하기
// 사용이유는 깊은 하위 컴포넌트들도 State를 쉽게 사용할 수 있다. 그리고 state 데이터도 관리가 가능하다.

// index.js 에서 시작
import {Provider} from 'react-redux' // 리액트 리덕스 사용 세팅 -> 같은 State를 사용하고  HTML 구역을 <Provider>로 묶에 준다.
import { createStore } from 'redux'; // createStore를 이용해서 state관리를 쉽게 할 수 있다.

let item = [
    { id:0, name:'나이키신발', quan : 2 }, 
    { id:1, name:'아디다스신발', quan : 21 }, 
    { id:2, name:'디올신발', quan : 112 }
    ]
  
  function reducer(state = item, action){
    if( action.type === 'add_quan'){
      let copy_item = [...item];
      copy_item[0].quan++;
      return copy_item;
    }
    else if( action.type === 'minus_quan' && item[0].quan>0 ){
      let copy_item = [...item];
      copy_item[0].quan--;
      return copy_item;
    }
    else{
      return state
    }
  }
  
  let store = createStore(reducer); //1. state초깃값을 넣어서 생성해줄 수 있다. 그런다음 props처럼 Provider에게 전송해준다.
                                    //1. createStore 함수값으로 들어가던 내용을 리듀서로 옮겼다.
                                    // state보관통인 store 생성 완료!

//index.js에서는 세팅 끝

//사용하고자 하는 곳으로 이동. Cart.js로 이동

import { connect } from "react-redux"; // 리덕스 사용을 위해 connect를 import 진행한다.

// 기존에 작성된 Cart 컴포넌트 아래에 함수를 추가해서 connect를 진행한다.

function 함수명(state){
    return{
        state : state // state라는 이름의 props로 바꿔주셈
    }
}
// 위 함수는 store안에 있는 내용들을 다 가져와서 props처럼 만들어주는 함수

export default connect(함수명)(Cart)
// 이 함수랑 Cart라는 컴포넌트랑 연결시켜 주세요 라는 의미이다.


// 이제 Cart컴포넌트에서 props를 이용해서 state값에 접근이 가능하다. 

{<button onClick={()=>{ props.dispatch({ type : 'add_quan' }) }}>+</button>}
{<button onClick={()=>{ props.dispatch({ type : 'minus_quan' }) }}>-</button>}

// 버튼에 dispatch라는 함수를 이용해 type 값을 넣어 원하는 액션을 실행 시킬 수 있다.

// 리덕스는 조그만 사이트에서는 복잡해 보일 수 있으나 대규모(어마한 컴포넌트를 다루는 프로젝트)프로젝트에서는 컴포넌트를 쉽게 다루는 큰 장점이 있다.

//state가 하나 더 필요하다면 초기값 + reducer를 만들면 된다!

// redux store에 온갖 데이터 저장은 ㄴㄴ, cart에 alert창같은 단독으로 실행되는 것들은 cart안에서 useState로 상태 관리 하자!