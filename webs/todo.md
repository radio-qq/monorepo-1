basic-form

- submit reset button -> control byfooterAlign: left | right | center

function getPlaceholder(formItem: FormSchema) {

<!-- 这部分被去掉了，因为 element没有range-picker  之后要看下怎么去做 -->

if (formItem.component === 'range-picker') {
return ['开始时间', '结束时间']
}
return getMessage(formItem)
}

function addFormItemTimeFormat(formItem: FormSchema) {

<!-- 这里也是和上面一样，去掉了 因为antd有reange-cpiker element没有 -->

if (formItem.component === 'range-picker') {
return merge(
{
componentProps: {
format: formItem?.componentProps?.format || 'YYYY-MM-DD',
valueFormat: formItem?.componentProps?.valueFormat || 'YYYY-MM-DD',
},
},
formItem
)
}

return formItem
}

basic-table里的下面这3个被我删了，看起来好像写的很复杂，但其实只是表格的透传
没有必要做到 一个个过滤，之后透传v-for即可

/\*\*

- 表格单元格的插槽
  \*/
  const cellSlots = filterSlots(slots, getTableCellSlotName())
  /\*\*
- 表格单元格表头的插槽
  \*/
  const headerSlots = filterSlots(slots, getTableHeaderSlotName())
  /\*\*
- 表单单项的插槽
  \*/
  const fieldSlots = filterSlots(slots, getFieldSlotName())

我把 原本tablebody有的 @cell-click="handleClickCell"
@cell-dblclick="handleDoubleClickCell" 这2个删了 这2个是el-table提供出来的emits事件，我暂时删了
但我认为之后要还回来，原因是你不能把原本有的功能丢失掉
但是我不认为应该在emits中定义原因是太多了，应该直接使用v-bind eventlister

table的插槽全部的都有

我把table column的 样式删掉了，class="plus-table-column**header**icon"
去代码里搜 header**icon的话 在 theme-chalk里 的table.scss 文件里有 header**icon
这个刚好跟我之前看到的题目 如何做主题配置 我觉得是类似的问题
之后变成一个专项问题解决

  <!-- 状态显示 `select`, `radio`, `checkbox`-->

<span
v-else-if="statusValueTypes.includes(column.valueType)"
class="plus-display-item plus-display-item\_\_badge"
v-bind="customFieldProps"
:class="{ 'is-list': isArray(getStatus) }"

>

    <!-- 多选 -->
    <template v-if="isArray(getStatus)">
      <template v-if="isFunction(column.formatter)">
        {{ column.formatter(displayValue, renderParams) }}
      </template>

      <template v-else>
        <template v-for="item in getStatus" :key="String(item.value)">
          <span class="plus-display-item__badge__item">
            <i
              :class="[
                'plus-display-item__badge__dot',
                item.type && !item.color ? 'plus-display-item__badge__dot--' + item.type : ''
              ]"
              :style="{ backgroundColor: item.color }"
            />
            {{ item.label }}
          </span>
        </template>
      </template>
    </template>

我把上面这段代码删了 它是需要实现的功能，但是我认为实现思路不对，不应该在display-item里一个个v-if v-else-if
像上面这种情况，像basic-form的动态组件那样去做，这里提供displayType: status就可以了， 参数就是放在displayProps

禁止内耗
内耗禁止

之前没有细看plus的form 和 form-item，稍微看了下，我还缺少什么？
renderLabel 其实和table 那里的做法是一样的
