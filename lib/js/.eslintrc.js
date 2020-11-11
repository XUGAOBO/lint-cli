module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    async: true,
    window: true,
    document: true,
    location: true,
  },
  parser: 'babel-eslint',
  rules: {
    'global-require': 2,
    // 因为jsx is not allowed in .js文件
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
    // 允许引用未在 package.json 中写入依赖的包
    'import/no-extraneous-dependencies': 0,
    // 允许方法前面加下划线
    'no-underscore-dangle': 0,
    // 由于现阶段有报错，暂时关闭这个校验
    'react/jsx-curly-spacing': 0,
    // 如需react的属性里面值为{true}的写法
    'react/jsx-boolean-value': 0,
    'react/jsx-no-bind': 0,
    'react/prefer-stateless-function': 2,
    'react/jsx-fragments': 0,
    'max-len': [2, 180, 4, { ignoreUrls: true }],
    // 允许在表达式中使用逻辑短路求值
    'no-unused-expressions': [2, { allowShortCircuit: true }],
    'prefer-const': [2, { destructuring: 'all' }],
    'prefer-destructuring': 0,
    'react/no-deprecated': 0,
    // https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/jsx-closing-bracket-location.md
    'react/jsx-closing-bracket-location': [2, 'line-aligned'],
    // 允许react组件里面用style值不是对象
    'react/style-prop-object': 0,
    // 不允许返回一个赋值语句关闭
    'no-return-assign': 0,
    // 不允许给入参赋值
    'no-param-reassign': 0,
    'react/no-array-index-key': 0,
    // 当componentDidMount周期中存在setState时给warning
    'react/no-did-mount-set-state': 1,
    // 生产环境不允许有console
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 生产环境不允许有调试
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 强制使用一致的换行符风格 参考链接 http://eslint.cn/docs/rules/linebreak-style
    'linebreak-style': [2, 'unix'],
    // 禁用不必要的 .call() 和 .apply() 参考链接 https://cn.eslint.org/docs/rules/no-useless-call
    'no-useless-call': 2,
    // 格式化函数时，函数名称或function关键字与开始参数之间允许有空格 参考链接 https://cloud.tencent.com/developer/section/1135831
    // space-before-function-paren: [2, { anonymous: always, named: never, asyncArrow: always }],
    // 防止 jsx props 蔓延 参考链接https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
    'react/jsx-props-no-spreading': 0,
    // 禁用 优先使用数组和对象解构 参考链接之为解构。此规则强制使用解构而不是通过成员表达式访问属性。
    'react/destructuring-assignment': 0,
    'react/prop-types': 0,
    // 没找着详细文档 参考文档https://t.codebug.vip/questions-1110739.htm
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    // 参考文档https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-element-interactions.md
    'jsx-a11y/no-noninteractive-element-interactions': 0,
  },
};
