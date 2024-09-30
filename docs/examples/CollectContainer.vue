<template>
  <div class="collect-container">
    <div class="collect-container-item">
      <div>Desc：</div>
      <div><slot name="desc" /></div>
    </div>
    <div class="collect-container-item">
      <div>Value：</div>
      <div><slot name="value" /></div>
    </div>
    <div class="collect-container-item">
      <div>Demo：</div>
      <div><slot name="default" /></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.collect-container {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 8px;
  &-item {
    display: flex;

    margin-bottom: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid #eee;
    &:last-child {
      align-items: center;
    }
  }
}
</style>
