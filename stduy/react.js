// 리엑트의 모든것에 대한 파일입니다.







// 1. useState : 변수를 저장하고 변수를 변화시키는 함수를 가진 객체 => 리액트에서 State수정이 생기면 State가 포함된 HTML을 재 랜더링 한다.

import {useState} from 'react'; // 함수 사용을 위한 선언
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









