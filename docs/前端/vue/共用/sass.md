# Sass

## vue2.x /3.x使用方法

### Node低版本安装依赖方式

```shell
npm install node-sass@4.14.1
npm install sass-loader@8.0.2
```

### Node高版本安装依赖方式

```shell
npm install node-sass@6.0.1
npm install sass-loader@10.2.0
```

### 具体Node-node-sass&sass-loader匹配版本

| node版本 | node-sass版本 |
| -------- | ------------- |
| node 16  | 6.0+          |
| node 15  | 5.0+          |
| node 14  | 4.14+         |
| node13   | 4.13+,<5.0    |
| node12   | 4.12+         |
| node11   | 4.10+,<5.0    |
| node10   | 4.9+,<5.0     |
| node8    | 4.5.3+,<5.0   |
| node<8   | <5.0          |



| sass-loader版本    | node-sass版本    |
| ------------------ | ---------------- |
| sass-loader 4.1.1  | node-sass 4.3.0  |
| sass-loader 7.0.3  | node-sass 4.7.2  |
| sass-loader 7.3.1  | node-sass 4.7.2  |
| sass-loader 7.3.1  | node-sass 4.14.1 |
| sass-loader 10.0.1 | node-sass 6.0.1  |




### 组件使用

```scss
<style scoped lang="scss">
  #all{
    width: 100%;
    height: 100%;
    .personalStatistic,.mapTrace{
      width: 100%;
      height: 50%;
      position: relative;
      opacity: 0.6;
      background-image: linear-gradient(to left, #30cfd0 0%, #330867 50%);
    }
  }
</style>
```

# Yarn

通过yarn添加依赖包，可防止版本不适配问题

- yarn add node-sass
- yarn add sass-loader

```scss
<style scoped lang="scss">
  #all{
    width: 100%;
    height: 100%;
    .personalStatistic,.mapTrace{
      width: 100%;
      height: 50%;
      position: relative;
      opacity: 0.6;
      background-image: linear-gradient(to left, #30cfd0 0%, #330867 50%);
    }
  }
</style>

```

