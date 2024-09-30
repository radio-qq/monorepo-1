为什么一定需要它？

1.EPlus radio 有3种用法，radio radio-group radio-button，而如果使用 BasicRadio 的话，这3种都支持，若想使用 radio-button 只需要传 props button="true"即可

2.EPlus 的radio在选中后无法取消选中，而 BasicRadio 支持选中后再点击取消选中

3.BasicRadio 可以直接传入options，组件内部自动循环渲染各个radio

4.radio选项可以通过options传入，也可以传入一个api，api返回的结果作为options的选项
