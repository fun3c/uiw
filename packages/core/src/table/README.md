Table 表格
===

表示两种相互对立的状态间的切换，多用于触发「开/关」。选中时的内容支持响应式。

```jsx
import { Table } from 'uiw';
```

### 基本使用

<!--DemoStart,bgWhite-->
```js
const columns = [
  {
    title: '姓名',
    style: { color: 'red' },
    key: 'name', 
  }, {
    title: '年龄',
    key: 'age',
  }, {
    title: '地址',
    key: 'info',
  }, {
    title: '操作',
    key: 'edit',
    width: 98,
    render: (text, key, rowData, rowNumber, columnNumber) => (
      <div>
        <Button size="small" type="danger">删除</Button>
        <Button size="small" type="success">修改</Button>
      </div>
    ),
  },
];
const dataSource = [
  { name: '邓紫棋', age: '12', info: '又名G.E.M.，原名邓诗颖，1991年8月16日生于中国上海，中国香港创作型女歌手。', edit: '' },
  { name: '李易峰', age: '32', info: '1987年5月4日出生于四川成都，中国内地男演员、流行乐歌手、影视制片人', edit: '' },
  { name: '范冰冰', age: '23', info: '1981年9月16日出生于山东青岛，中国影视女演员、制片人、流行乐女歌手', edit: '' },
  { name: '杨幂', age: '34', info: '1986年9月12日出生于北京市，中国内地影视女演员、流行乐歌手、影视制片人。', edit: '' },
  { name: 'Angelababy', age: '54', info: '1989年2月28日出生于上海市，华语影视女演员、时尚模特。', edit: '' },
  { name: '唐嫣', age: '12', info: '1983年12月6日出生于上海市，毕业于中央戏剧学院表演系本科班', edit: '' },
  { name: '吴亦凡', age: '4', info: '1990年11月06日出生于广东省广州市，华语影视男演员、流行乐歌手。', edit: '' },
];
const Demo = () => (
  <div>
    <Table columns={columns} data={dataSource} />
  </div>
);
```
<!--End-->


### 表头分组

表头分组通过 `columns` 数组中对象的 `children` 来实现，以渲染分组表头。。

<!--DemoStart,bgWhite-->
```js
const columns = [
  {
    title: '姓名',
    style: { color: 'red' },
    key: 'name', 
    children: [
      {
        title: '中文名字',
        key: 'cnname',
        children:[
          {
            title: '姓名',
            style: { color: 'red' },
            key: 'firstname',
            children:[
              { title: '姓', key: 'name1', width: 80 },
              { title: '名', key: 'name2', width: 80 },
            ]
          }, {
            title: '拼音',
            key: 'lastname',
            children:[
              { title: '姓', key: 'pinyin1', width: 80 },
              { title: '名', key: 'pinyin2', width: 80 },
            ],
          },
        ],
      }, {
        title: '英文名字',
        width: 100,
        key: 'name_en',
      },
    ]
  }, {
    title: '其它',
    children:[
      { title: '生日', key: 'birthday', width: 150 },
      { title: '职业', key: 'job', width: 150 },
    ],
  }, {
    title: '操作',
    key: 'edit',
    width: 150,
    render: (text, key, rowData, rowNumber, columnNumber) => (
      <span>{text} {key} - {rowNumber} - {columnNumber}</span>
    ),
  },
];
const dataSource = [
  { name1: '邓', name2:'紫棋', pinyin1: 'deng', pinyin2: 'ziqi', name_en: 'G.E.M.', birthday: '1991年8月16日', job: '唱作歌手、作曲人', edit:'' },
  { name1: '周', name2:'杰伦', pinyin1: 'zhou', pinyin2: 'jielun', name_en: 'Jay Chou', birthday: '1979年1月18日', job: '歌手、音乐人', edit:'' },
  { name1: '邓', name2:'紫棋', pinyin1: 'deng', pinyin2: 'ziqi', name_en: 'G.E.M.', birthday: '1991年8月16日', job: '唱作歌手、作曲人', edit:'' },
  { name1: '周', name2:'杰伦', pinyin1: 'zhou', pinyin2: 'jielun', name_en: 'Jay Chou', birthday: '1979年1月18日', job: '歌手、音乐人', edit:'' },
];
const Demo = () => (
  <div>
    <Table columns={columns} data={dataSource} />
  </div>
);
```
<!--End-->

## Props

### Table

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| columns | 表格列的配置描述，可以内嵌 `children`，以渲染分组表头。| ColumnProps[] | `[]` |
| data | 数据数组。| Array[] | `[]` |

### ColumnProps

列描述数据对象，是 columns 中的一项，

| 参数 | 说明 | 类型 | 默认值 |
|--------- |-------- |--------- |-------- |
| title | 列头显示文字。| ReactNode | `0` |
| key | 需要的 key，可以忽略这个属性，如果标题带有 `render` 函数，那么这个 `key` 为必须非常重要。| String | `0` |
| width | 列宽度。| Number | `0` |
| render | 生成复杂数据的渲染函数，参数分别为当前行的值，当前值的 `key`，行索引数据，当前行号，当前列号。| `Function(text, key, rowData, rowNumber, columnNumber)` | `0` |