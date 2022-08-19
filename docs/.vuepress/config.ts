import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  title: 'MASA Docs',
  description: 'Temp docs for MASA Stack projects',
  theme: 'reco',
  themeConfig: {
    style: '@vuepress-reco/style-default',
    logo: 'https://cdn.masastack.com/stack/images/logo/MASAStack/logo.png',
    author: 'MASA Team',
    docsRepo: 'https://github.com/masastack/MASA.Docs',
    docsBranch: 'main',
    docsDir: 'docs',
    lastUpdatedText: '',
    // series 为原 sidebar
    series: {
      '/Stack/': [
        {
          text: 'MASA Stack',
          children: [
            '/Stack/guide/introduce',
            '/Stack/guide/architecture',
          ]
        }, 
        {
          text: 'PM',
          children: [
            '/Stack/PM/guide/introduce',
            '/Stack/PM/guide/architecture',
          ]
        }, 
        {
          text: 'Auth',
          children: [
            '/Stack/Auth/guide/introduce',
            '/Stack/Auth/guide/architecture',
          ]
        },
         {
          text: 'DCC',
          children: [
            '/Stack/DCC/guide/introduce',
            '/Stack/DCC/guide/architecture',
          ]
        }
      ], 
      '/framework/': [
        {
          text: '基础概念',
          children: [
            '/framework/concepts/overview',
            '/framework/concepts/building-blocks-concept',
            // '/framework/concepts/contrib-concept',
            '/framework/concepts/observability',
            '/framework/concepts/security',
            '/framework/concepts/modern-application',
            '/framework/concepts/terminology',
            '/framework/concepts/faq',
          ]
        },
        {
          text: '快速入门',
          children: [
            '/framework/getting-started',
            '/framework/getting-started/template',
            '/framework/getting-started/demo'
          ]
        },
        {
          text: '现代应用最佳实践',
          children: [
            '/framework/practices',
          ]
        },
        // {
        //   text: 'Framework',
        //   children: [
        //     '/framework/concepts',
        //     '/framework/guide/getting-started',
        //     '/framework/Utils',
        //     // '/framework/guide/introduce',
        //     // '/framework/guide/architecture',
        //   ]
        // },
        {
          text: '构建块',
          children: [
            '/framework/building-blocks/authentication',
            '/framework/building-blocks/identity',
            '/framework/building-blocks/configuration',
            '/framework/building-blocks/data',
            '/framework/building-blocks/ddd',
            '/framework/building-blocks/dispatcher',
            '/framework/building-blocks/bindings',
            '/framework/building-blocks/isolation',
            '/framework/building-blocks/observability',
            '/framework/building-blocks/search-engine',
            '/framework/building-blocks/service',
            '/framework/building-blocks/r-w-spliting',
            '/framework/building-blocks/caching',
            '/framework/building-blocks/storage',
            '/framework/building-blocks/testable',
            '/framework/building-blocks/consistency',
            '/framework/building-blocks/aop',
            '/framework/building-blocks/i18n',
            '/framework/building-blocks/rule-engine',
            '/framework/building-blocks/stack-sdks'
          ]
        },
        {
          text: '工具包',
          children: [
            '/framework/utils/configuration',
            '/framework/utils/data',
            '/framework/utils/development',
            '/framework/utils/exceptions',
            '/framework/utils/extensions',
            '/framework/utils/model',
            '/framework/utils/security'
          ]
        },
        {
          text: '故障排查',
          children: [
            '/framework/troubleshooting',
          ]
        },
        {
          text: '参考',
          children: [
            '/framework/reference',
          ]
        },
        {
          text: '贡献',
          children: [
            '/framework/contributing',
          ]
        }
      ]
    },
    navbar:
    [
      { text: '首页', link: '/' },
      { text: 'MASA Stack',
        children: [
          { text: 'MASA Stack', link: '/Stack/guide/introduce' },
          { text: '项目管理(PM)', link: '/Stack/PM/guide/introduce' },
          { text: '权限中心(Auth)', link: '/Stack/Auth/guide/introduce' },
          { text: '分布式配置中心(DCC)', link: '/Stack/DCC/guide/introduce' }
        ]
      },
      { text: 'MASA Framework', link: '/framework/concepts' },
      { text: '组件库',
        children: [
          { text: 'MASA Blazor', link: 'https://github.com/BlazorComponent/MASA.Blazor' },
          { text: 'MASA Blazor Pro', link: 'https://github.com/BlazorComponent/MASA.Blazor.Pro' },
          { text: 'MASA Blazor Admin', link: 'https://github.com/masalabs/MASA.Framework.Admin' },
          { text: 'Blazor Component', link: 'https://github.com/BlazorComponent/BlazorComponent' }
        ]
      },
    ],
    bulletin: {
      body: [
        {
          type: 'text',
          content: `🎉🎉🎉 MASA Stack预计今年将会发布1.0版本。`,
          style: 'font-size: 16px; font-weight: bold;'
        },
        {
          type: 'hr',
        },
        {
          type: 'title',
          content: 'QQ 群',
        },
        {
          type: 'text',
          content: `
          <ul>
            <li>QQ群1：7424099</li>
          </ul>`,
          style: 'font-size: 12px;'
        },
        {
          type: 'hr',
        },
        {
          type: 'title',
          content: 'GitHub',
        },
        {
          type: 'text',
          content: `
          <ul>
            <li><a href="https://github.com/masastack">MASA Stack开源产品<a/></li>
          </ul>`,
          style: 'font-size: 12px;'
        },
        // {
        //   type: 'hr',
        // },
        // {
        //   type: 'buttongroup',
        //   children: [
        //     {
        //       text: 'test',
        //       link: '/docs/others/test.html'
        //     }
        //   ]
        // }
      ],
    },
    // valineConfig 配置与 1.x 一致
    // valineConfig: {
    //   appId: 'xxx',
    //   appKey: 'xxx',
    //   placeholder: '填写邮箱可以收到回复提醒哦！',
    //   verify: true, // 验证码服务
    //   // notify: true,
    //   recordIP: true,
    //   // hideComments: true // 隐藏评论
    // },
  },
  // debug: true,
})
