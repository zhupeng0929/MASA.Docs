## 国际化

什么是[国际化](https://zh.wikipedia.org/wiki/%E5%9B%BD%E9%99%85%E5%8C%96%E4%B8%8E%E6%9C%AC%E5%9C%B0%E5%8C%96), 其中默认提供者有:

* [Masa.Contrib.Globalization.I18n](https://www.nuget.org/packages/Masa.Contrib.Globalization.I18n): 提供框架`I18n`的能力以及多语言的资源包 [查看详细](/framework/building-blocks/globalization/i18n)
* [Masa.Contrib.Globalization.I18n.AspNetCore](https://www.nuget.org/packages/Masa.Contrib.Globalization.I18n.AspNetCore): 基于微软提供的[本地化的中间件](https://learn.microsoft.com/zh-cn/aspnet/core/fundamentals/localization#localization-middleware)协助解析设置当前线程的区域性 [查看详细](/framework/building-blocks/globalization/i18n-aspnetcore)
* [Masa.Contrib.Globalization.I18n.Dcc](https://www.nuget.org/packages/Masa.Contrib.Globalization.I18n.Dcc): 为多语言提供了远程配置的能力, 同时它支持热更新 [查看详细](/framework/building-blocks/globalization/i18n-dcc)

## 功能

* 本地化字符串
* 对外提供当前支持的语言

## 使用

1. 以`ASP.NET Core`项目为例, 安装`Masa.Contrib.Globalization.I18n.AspNetCore`

``` powershell
dotnet add package Masa.Contrib.Globalization.I18n.AspNetCore
```

> 如果是非`Web`项目, 则仅安装`Masa.Contrib.Globalization.I18n`即可

2. 添加多语言资源文件, 文件夹结构如下:

``` structure
- Resources
  - I18n
    - en-US.json
    - zh-CN.json
    - supportedCultures.json
```

* en-US.json

``` en-US.json
{
    "Home":"Home"
}
```

* zh-CN.json

``` zh-CN.json
{
    "Home":"首页"
}
```

* supportedCultures.json

``` supportedCultures.json
[
    {
        "Culture":"zh-CN",
        "DisplayName":"中文简体",
        "Icon": "{Replace-Your-Icon}"
    },
    {
        "Culture":"en-US",
        "DisplayName":"English (United States)",
        "Icon": "{Replace-Your-Icon}"
    }
]
```

3. 注册`I18n`, 并修改`Program`

```csharp
builder.Services.AddI18n();
```

4. 使用`I18N`

```csharp
app.UseI18n();//启用i18n, 完成对请求的解析并为当前请求设置区域
```

> [设置默认区域](/framework/building-blocks/globalization/i18n-aspnetcore)

5. 使用`I18n`

```csharp
app.Map("/test", (string key) => I18n.T(key));
```

## 高阶用法

### 嵌套配置

`I18n`支持嵌套类型的json格式, 例如:

``` json
{
    "Home":"首页",
    "User":{
        "Name":"名称"
    }
}
```

我们可以通过`I18N.T("User.Name");`得到User节点下的Name信息 (层级不限, 格式: `父节点.子节点`, 其中key的值不区分大小写)

### 自定义资源

我们可以通过自定义资源, 使得不同的资源使用不同的资源文件, 其中自定义资源可以通过新建一个普通的类, 并指定资源文件地址来使用, 例如:

1. 新建资源类`CustomResource`

```csharp
public class CustomResource
{
    
}
```

2. 配置`CustomResource`与资源文件

```csharp
builder.Services.Configure<MasaI18nOptions>(options =>
{
    options.Resources
        .Add<CustomResource>()
        .AddJson(Path.Combine("Resources", "I18n2"));//指定自定义资源所在的资源目录
});
```

自定义资源在使用上需要通过`DI`获取到`II18n<CustomResource>`来使用, 或者通过`I18n.T<CustomResource>({Replace-Your-Name})`来获取自定义资源的配置

### 特性

为简化使用不同资源类型需要通过`DI`获取到不同资源的`I18n`, 我们支持了`InheritResource`特性, 在资源类的顶部增加`InheritResource`特性, 并指定继承资源类型, 那么我们从当前资源类型的`I18n`中, 不仅可以获取到当前资源类型的资源, 也可以获取到其继承类的资源

## 源码解读

多语言的能力被抽象在`II18n`, 它拥有以下能力:

* string this[string name]: 获取指定`name`的值 (如果`name`不存在, 则返回`name`的值)
* string? this[string name, bool returnKey]: 获取指定`name`的值 (如果returnKey为false, 且name不存在, 则返回`null`)
* string this[string name, params object[] arguments]: 获取指定`name`的值, 并根据文化、输入参数格式化响应信息返回 (如果`name`不存在, 则返回`name`的值)
* string? this[string name, bool returnKey, params object[] arguments]: 获取指定`name`的值, 并根据文化、输入参数格式化响应信息返回 (如果returnKey为false, 且name不存在, 则返回`null`)
* string T(string name): 获取指定`name`的值, 如果`name`不存在, 则返回`name`的值
* string? T(string name, bool returnKey): 获取指定`name`的值 (如果returnKey为false, 且name不存在, 则返回`null`)
* string T(string name, params object[] arguments): 获取指定`name`的值, 并根据文化、输入参数格式化响应信息返回 (如果`name`不存在, 则返回`name`的值)
* string? T(string name, bool returnKey, params object[] arguments):  获取指定`name`的值, 并根据文化、输入参数格式化响应信息返回 (如果returnKey为false, 且name不存在, 则返回`null`)
* CultureInfo GetCultureInfo(): 获取当前线程的区域性 (被用于需要格式化响应信息的方法)
* void SetCulture(string cultureName, bool useUserOverride = true): 设置当前线程的区域性
* void SetCulture(CultureInfo culture): 设置当前线程的区域性
* CultureInfo GetUiCultureInfo(): 获取资源管理器使用的当前区域性以便在运行时查找区域性特定的资源
* void SetUiCulture(string cultureName, bool useUserOverride = true): 设置资源管理器使用的当前区域性以便在运行时查找区域性特定的资源
* void SetUiCulture(CultureInfo culture): 设置资源管理器使用的当前区域性以便在运行时查找区域性特定的资源

除此之外, `i18n`还提供了支持的语言列表的能力, 它被抽象在`ILanguageProvider`

* IReadOnlyList\<LanguageInfo\> GetLanguages(): 获取支持语言集合

我们可以通过`DI`获取`ILanguageProvider`来使用, 也可以通过`I18n.GetLanguages()`来使用