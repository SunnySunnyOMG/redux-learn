# React-redux demo
Example for a rating star system using react-redux
###### by Wooko Inc.

## 使用Redux的意义
### - 数据流动更加清晰
<img src="https://onsen.io/blog/content/images/2016/Jun/react_redux.png" /> 

### - 数据与UI组件进一步解耦
<img src="https://cdn.css-tricks.com/wp-content/uploads/2016/03/redux-article-3-03.svg" />

###### 以上图片来自网络

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
 
* 按ADD按钮可以增加星星上限， 
* 按MINUS按钮可以减少总星星个数， 
* 直接点击星星可以点亮包括此星星在内的之前所有星星
