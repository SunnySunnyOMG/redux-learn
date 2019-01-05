# React-redux demo
Example for a rating star system using react-redux
###### by Wooko Inc.

## 使用Redux的意义
### - 数据流动更加清晰
<img src="https://onsen.io/blog/content/images/2016/Jun/react_redux.png" /> 

###### 以上图片来自网络

### - 数据与UI组件进一步解耦
![image](https://user-images.githubusercontent.com/23184068/50728730-cb4af100-10fc-11e9-9f01-e135d64f36a0.png) 



## Redux 基本概念与API

### - Store
* Store是redux储存数据的地方， 一个app有且只能有一个store. 可通过下面方法新建一个store

```js
import { createStore } from 'redux';

const store = createStore(ratingStarReducer, init_state);
```
其中， `createStore（）`方法接受两个参数， 第一个是store对应的reducer（后面会具体介绍），第二个是Store的起始状态

### - State
* 在Redux语境下的state， 指的是某个时刻store中所有数据的快照

### - Action
* Action指的是View发出的state变化的通知。<br/> 
用户不能直接接触到store但是可以接触到View，所以action的意义在于： 用户的操作-> 发出Action -> 引起state的变化<br/>

* Action 是一个对象

```javascript
var action = {
  type: 'ADD',
  payload: 'tag1'
};
```
其中 type属性是必须提供，type的value一般为全大写+下划线格式，剩下的payload等其他属性可以自己定义， 关于具体的action的定义方法可以[参考这里](http://www.jianshu.com/p/945c048aa60c) 和 [这里](https://github.com/acdlite/flux-standard-action)


### Action Creator
* Action Creator是一个用来返回Action对象的函数， 用于减少手写代码的重复工作，例如下面`starNumModifyAction`就是一个 Action Creator:

```js
const ADD = 'ADD';
const MINUS = 'MINUS';

const starNumModifyAction = type =>{
  switch(type){
    case ADD:
    return {type: ADD}

    case MINUS:
    return {type:MINUS}

    default:
    console.error('undefined action type: ', type)
  }
}
```

### API: store.dispatch()
`dispatch` 是redux发出action的唯一方法， 其接受一个Action座位参数

比如，发出一个增加（ADD）的Action, 可以这么写：

```js
dispatch(starNumModifyAction(ADD))
```

### Reducer
* 用于根据当前state和action计算出 new_state的 **纯函数** (关于纯函数定义，可以[参考这里](http://zcfy.cc/article/master-the-javascript-interview-what-is-a-pure-function-2186.html))
* reducer接受两个参数， 第一个参数为 state， 第二个参数为 action， 返回新的state
* 在实际应用中， reducer并不需要人为调用，它会在dispatch发过来一个action后自动被运行， 为了实现这一点，我在新建一个store的时候需要把reducer与store绑定，代码如下：

```js
import { createStore } from 'redux';
import ratingStarReducer from '../reducers/rating_stars.reducer';

const storeConfig = (init_state) => {
  return createStore(ratingStarReducer, init_state);
}

export default storeConfig;
```

### API: store.subscribe()
* 用于设置针对store的监听，一旦state变化，则运行这个listener


## React-Redux 的用法
为了方便在react中使用redux， 官方给我们提供了一个专门用于react的redux库： [react-redux](https://github.com/reactjs/react-redux)

下面具体介绍如何在react中使用redux：

### 组件（Component）

组件可以被分两种类型:

* dumb/pure UI component
* container （smart component）

纯UI控件（pure UI component）有以下特点：
> * 只负责显示： 给具体的数据，就一定会显示唯一对应的view
> * 无内部状态： 不含有 state， 所有参数均由 props 提供
> * 不接触redux： 个人认为是最重要的区分点， 即纯UI组件中，不会含有关于redux的代码/API

容器（container）有以下特点:
> * 主要负责数据处理，和UI组件的整合，并不负责具体UI的呈现
> * 带有内部状态
> * 使用redux API

###### 其实， 一个组件是 纯组件还是容器 并没有非常明显的界限，在实际中，我们往往需要具体情况具体分析，以上只是参考

### API： connect()
react-redux 中的connect方法，用于将我们的UI组件封装入一个container，通过container，我们可以建立View与Store的连接

```js
import { connect } from 'react-redux'

const RatingStars = <UI component />
const RatingStarContainer = connect(mapStateToProps, mapDispatchToProps)(RatingStars)
```

* connect方法接受两个函数作为参数: `mapStateToProps` 和 `mapDispatchToProps`:

#### `mapStateToProps`
用于建立container中的props和store中的state的对应关系，这样就可以建立起container针对store的监听（subscribe）

本函数返回一个对象，对象中每一个key-value就是一个 props到store中state的映射， 如下：

```js
const mapStateToProps = （state, own_props） => {
  return {
    starNum: state.starNum,
    litStarNum: state.litStarNum
  }
};
```

> 注意
> 
> * mapStateToProps 除了接受一个参数state，还接受第二个参数own_props，代表了container的props对象，引入此参数后，container 的props变化也会引起UI组件的re-render 
> * connect方法可以省略 mapStateToProps 参数， 这样UI组件就不会监听store变化

#### `mapDispatchToProps`
一个container除了能够监听store（subscribe），还应该能够引起store的变化（dispatch）， `mapDispatchToProps` 定义了一个组件是如何发出一个action的

本函数返回一个对象，对象中每一个key-value就是一个 props到`dispatch()`方法的映射， 如下：

```js
const mapDispatchToProps = (dispatch, own_props) => {
  return {
    onClickAdd: () => dispatch(starNumModifyAction(ADD)),
    onClickMinus: () => dispatch(starNumModifyAction(MINUS))
  }
}
```

**上述代码也可以简写成：**

```js
const mapDispatchToProps = {
  onClickAdd: () => starNumModifyAction(ADD),
  onClickMinus: () => starNumModifyAction(MINUS)
}
```
此时 `mapDispatchToProps` 是一个对象， 它的每个key对应一个value， value则是一个函数，会被当做 Action Creator，返回的Action会被redux自动发出

### API：< Provider >
用于将store中的state传入container， 一般来说可以在最上层传入，这样所有子组件都可以拿到store的state， 如下

```js
import { Provider } from 'react-redux';
import storeConfig from './stores';

const store = storeConfig({ starNum: 4, litStarNum: 2 });
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
```

###### 传入原理利用了React组件的 [contex属性](https://reactjs.org/docs/context.html)

## Redux高级用法
上文讲述了redux的概念和react-redux的基本用法，但其中用到的action皆为同步操作，本节将重点介绍redux是如何处理异步操作的
### 异步操作的思路
redux的基本理念就是用户/View不能直接更新store， 而是需要发出一个Action去运行reducer，而后得到新的state。
那么我们现在以一个异步的服务器请求为例， 讲解redux中异步操作的流程。 一个异步请求基本模型如下：

**用户发出request ---->（一段时间....）----> 得到response（可能成功也可能失败）**

#### - Async Actions
所以不同于同步操作对应一Action，一个异步操作中一般会至少存在3种Action：

> * 请求开始时的 Action
> * 请求成功时的 Action OR
> * 请求失败时的 Action

三种Action的区别可以通过使用不同的 Action Type 或者在action中加入不同的payload来区分， 比如

```js
// 写法一：Action type相同， payload不同
{ type: 'DELAY_ADD' }
{ type: 'DELAY_ADD', status: 'success_status', response: { ... } }
{ type: 'DELAY_ADD', status: 'error_status', error: { ... } }


// 写法二：Action type不同
{ type: 'DELAY_ADD_REQUEST' }
{ type: 'DELAY_ADD_SUCCESS', resposne: { ... } }
{ type: 'DELAY_ADD_FAILURE', response: { ... } }
```
个人更加倾向于第二种写法， 因为这样可以减少由于某些type error带来的错误。

#### - Async State

除了Action被分解成3个以外， 我们也需要增加相关的state来作为异步操作的标志位，比如

```js
let state = {
	isFetching: true/false, // 标识异步操作是否在进行中
	lastUpdateTime： timeStamp， // 标识响应获取的时间， 可用于判定更新时间	
  response： { ... some data } // store中用于存储异步操作的结果
}
```

#### - 改造Action Creator
所以，根据以上，我们可以总结出Redux中异步操作的一般流程：

>* 异步操作开始时， 立刻发出一个Action（上文 DELAY\_ADD_REQUEST), 改变state以表示请求进行中（i.e. isFetching），触发View的信息读取界面（i.e. loading）
>* 异步操作结束时，再发出一个Action（上文 DELAY\_ADD_SUCCESS/FAILURE）以表示操作结束，更新相关state以触发View的重新渲染

也就是说，现在每个异步操作都至少触发两个Action，为了在异步操作结束时自动再dispatch出一个Action，我们为此需要改造Action Creator， 写的写法如下：

```js
export const starNumDelayAddAsyncAction = () => {
  return dispatch => {
    dispatch({ type: DELAY_ADD_REQUEST });
    // 异步服务器请求
    mockAsyncServerCall(
      // success callback
      (response) => dispatch({ type: DELAY_ADD_SUCCESS, payload: response }),
      // fail callback
      (response) => dispatch({ type: DELAY_ADD_FAILURE, payload: response })
    )
  }
}
```
暂且忽略其中的dispatch方法是如何得到的（下文会介绍），现在先总结此Action Creator的特点：

>* 不同于一般的Action Creator会返回一个对象， 此Action Creator实际上返回了一个函数
>* 返回函数首先 dispatch出第一个Action表示异步操作开始，然后运行异步函数， 并在异步函数的回调（也可以使用Promise）中dispatch出第二个Action表示异步操作的成功/失败

>**注意：**
>
>此时dipatch方法实际发出的是一个函数， 而在一般Redux框架下，dispatch仅能发出一个Action（Object），为了能够使dispatch方法发出一个函数，我们需要使用Redux中的API引入中间件（Middleware）


### 中间件（Middleware）
#### - 中间件概念
为了理解中间件，让我们站在框架作者的角度思考问题：如果要添加功能，你会在哪个环节添加？

>It provides a third-party extension point between dispatching an
action, and the moment it reaches the reducer.

这是 redux 作者 Dan 对 middleware 的描述，middleware 提供了一个分类处理 action 的机会，添加在了dispatch方法上, 在 middleware 中你可以检阅每一个流过的 action，挑选出特定类型的 action 进行相应操作，给你
次改变 action 的机会。注： 此部分转自[这里](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)

下图展示了Middleware的插入结构：
![middleware model](https://dn-myg6wstv.qbox.me/b611ebe4e60eeee99d68.png?imageView2/0/w/1280/h/960/ignore-error/1)

**简而言之， 中间件具有以下特点：**

* 中间件（Middleware）强化了Redux环节中的Dispatch部分
* 浏览源码会发现，Middleware被放在一个数组中，会在每次调用Dispatch前先依次被调用
* 每个中间件都可以拿到 store 的 `getState()`和`dispatch()`方法

#### - 中间件用法
API：`createStore()` 除了前两个参数（分别接受 reducer 和 initial state）之外，还接受第三个参数 `applyMiddleware()`， 在`applyMiddleware()`中声明使用的Middleware， 案例代码如下：

```js
import { createStore, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';

createStore(ratingStarReducer, init_state, applyMiddleware(thunk));
```
上述代码中的中间件 redux-thunk 就增强了`dispatch()`的功能，使其能够接受一个函数作为参数

> 注意
> 
> `applyMiddleware()`所接受的Middleware参数是有顺序之分的（e.g. redux-logger 这个中间件就需要作为`applyMiddleware()`的最后的参数传入），在引入第三方库的时候需要认真查阅文档。



### Reducer分割 (API: combineReducers)
在实际开发中，我们有时需要不止一个的reducer来处理各种业务逻辑， 而`createStore()`仅仅接受一个参数作为reducer传入，所以我们要引入新的API：`combineReducers()`来将各种Reducer合并。

* 若仅有一个Reducer，那么我们在此reducer中声明的所有state将会在store的根属性上被创建，
也就是说下面代码：

```js
// Reducer declaration
const ratingStar = (state = { starNum: 5, litStarNum: 3 }, action) => {
  console.log('store state:', state)
  switch (action.type) {
    case ADD:
    case DELAY_ADD_SUCCESS:
      return state.get('starNum') < 20 ? state.set('starNum', state.get('starNum') + 1) : state;
    
    case MINUS:
      return state.get('starNum') > 0 ? state.set('starNum', state.get('starNum') - 1) : state;

    case CLICK_STAR:
      return state.set('litStarNum', action.payload + 1);

    default:
      return state;
  }
}
```
将会创建以下Store，其中的State为(默认情况)：

```js
let state = {
	starNum: 5,
	litStarNum: 3
}
```

* 若仅有多个Reducer，那么我们在此reducer中声明的所有state将会在各自的节点（key）下被创建，当我们新增一个Reducer后：

```js
// 首先引入API: combineReducers()

const delayAddStarReducer = (state = { isFetching: false, response: null }, action) => {
  let $$new_state = null;
  switch (action.type) {
    case DELAY_ADD_REQUEST:
      return state.set('isFetching', true);

    case DELAY_ADD_SUCCESS:
      $$new_state = Immutable.fromJS({
        //starNum: state.starNum + 1,
        isFetching: false,
        response: action.payload
      })
      return state.merge($$new_state)

    case DELAY_ADD_FAILURE:
      $$new_state = Immutable.fromJS({ isFetching: false, response: action.payload });
      return state.merge($$new_state);

    default: return state;
  }
}

const rootReducer = combineReducers({ 
ratingStarState: ratingStar, 
delayAddState: delayAddStarReducer 
});
```

将会创建以下Store，其中的State为(默认情况)：

```js
let state = {

  ratingStarState: {
    starNum: 5,
	litStarNum: 3
  },
  
  delayAddState: {
    isFetching: false,
    response: null
  }
  
}
```
** 注意： 使用`combineReducer()`后，每个reducer仅能够接收到本个节点下的state信息 **
如果一个action可能会引起多个reducer节点下state的变化，解决的办法一般有：
* 发出多个action，触发多个reducer
* 发出单个action，触发多个reducer

个人比较倾向于第二种方法，在本例中，一个Action.type == DELAY_ADD_SUCCESS 的 操作，将会引发 state.delayAddState 的变化（fecting结束，显示信息）, 也势必会影响state.ratingStarState.starNum的改变（星星+1），可以使用下面的代码：

```js
const delayAddStarReducer =（...） => {
...some codes...

 switch (action.type) {
    case ADD:
    case DELAY_ADD_SUCCESS: // common action type
      return state.get('starNum') < 20 ? state.set('starNum', state.get('starNum') + 1) : state; 
      
    ...some codes...
 }
}

const delayAddStarReducer = (state = { isFetching: false, response: null }, action) => {
  let $$new_state = null;
  switch (action.type) {
    ...some codes...

    case DELAY_ADD_SUCCESS: // common action type
      ...do something...
  }
```
通过给两个Reducer设置公共的Action type， 可以实现一个action调用多个reducer

### 不可变数据（Immutable Data）
#### - Why Immutable
React 中引入Immutatble data可以给APP执行效率带来极大地提升。建议同学们的可以多多理解这一个非常重要的知识点。

#### - Online resources
鉴于网上教程的丰富，不可变数据的概念和使用必要性本教程不再赘述，具体信息可以[参考这里](https://github.com/camsong/blog/issues/3)

#### - 3rd-Part Library
Immutable Data的实现方式有很多， 目前我们选用 Facebook 开源的 immutable.js； 相关文档可以[参考这里](https://facebook.github.io/immutable-js/docs/#/)



### 异步操作的终极解决方案： Redux-Saga

to do ... 


## 本react-redux demo介绍

### 文件结构(src文件夹内)

```
.
├── App.css
├── App.js
├── App.test.js
├── actions
│   └── rating_stars.action.js
├── components
│   ├── button.js
│   ├── info_panel.js
│   ├── star.js
│   └── stars.js
├── containers
│   ├── rating_stars.container.js
│   └── star.container.js
├── index.css
├── index.js
├── logo.png
├── reducers
│   └── rating_stars.reducer.js
├── registerServiceWorker.js
├── stores
│   └── index.js
└── styles
    └── rating_stars.styles.js
```

> 注意
> 
> react + redux 项目文件结构有多种组织方式：
> 
> * 根据功能属性（action，component，container，reducer）来组织文件（本例）
> * 根据组件来组织文件，即把一个页面要用到的功能（action，component，container，reducer）分别放到该页面的文件夹下
> * 其他方法

##### 文件组织对于一个项目后期的维护非常重要，有关文件结构组织的介绍，可以参考 [这里](https://blog.jimmylv.info/2016-07-03-a-better-file-structure-for-react-redux-applications/) 和 [这里](https://juejin.im/post/58cbfcb05c497d0057b9b228)  



### 功能介绍

![Demo Image](https://raw.githubusercontent.com/SunnySunnyOMG/redux/master/demo.png)

实现了一个简单的评分系统，
 
* 按ADD按钮可以增加星星上限
* 按MINUS按钮可以减少总星星个数
* 按DELAY ADD可以实现异步添加星星上限，并在星星下发给予用户提示
* 直接点击星星可以点亮包括此星星在内的之前所有星星
