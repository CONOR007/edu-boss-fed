module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es6: true,
    },
    // 使用插件的编码规则
    extends: [
        'plugin:vue/essential',
        '@vue/standard',
        '@vue/typescript/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    // 自定义编码规则
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/member-delimiter-style': ['error', {
            multiline: {
                delimiter: 'semi',
                requireLast: true,
            },
        }],
        '@typescript-eslint/no-explicit-any': 'off',
        // 要求末尾逗号
        'comma-dangle': ['error', 'always-multiline'],
        indent: ['error', 4],
    },
}
