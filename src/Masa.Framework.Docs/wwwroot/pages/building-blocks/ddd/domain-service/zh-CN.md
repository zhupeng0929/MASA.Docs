## 领域服务

是领域模型的操作者, 被用来处理业务逻辑, 它是无状态的, 状态由领域对象来保存, 提供面向应用层的服务, 完成封装领域知识, 供应用层使用。

与应用服务不同的是, 应用服务仅负责编排和转发, 它将要实现的功能委托给一个或多个领域对象来实现, 它本身只负责处理业务用例的执行顺序以及结果的拼装, 在应用服务中不应该包含业务逻辑

继承`IDomainService`的类被标记为领域服务, 领域服务中提供了[领域事件总线](#领域事件总线) (可用于提供发送领域事件)

```csharp
public class PaymentDomainService : DomainService
{
    private readonly ILogger<PaymentDomainService> _logger;

    public PaymentDomainService(ILogger<PaymentDomainService> logger)
    {
        _logger = logger;
    }

    public async Task StatusChangedAsync(Aggregate.Payment payment)
    {
        IIntegrationDomainEvent orderPaymentDomainEvent = payment.Succeeded ? 
            new OrderPaymentSucceededDomainEvent(payment.OrderId): 
            new OrderPaymentFailedDomainEvent(payment.OrderId);

        _logger.LogInformation(
            "----- Publishing integration event: {IntegrationEventId} from {AppName} - ({@IntegrationEvent})", 
            orderPaymentDomainEvent.GetEventId(), 
            Program.AppName, 
            orderPaymentDomainEvent);

        await EventBus.PublishAsync(orderPaymentDomainEvent);
    }
}
```

> 继承`DomainService`的类会被自动注入, 其生命周期为`Scoped`, 它可以在应用服务的构造函数中被注入使用

## 领域事件总线

领域事件总线不仅仅可以发布[进程内事件](/framework/building-blocks/dispatcher/local-event)、也可发布[集成事件](/framework/building-blocks/dispatcher/integration-event), 它提供了:

* Enqueue<TDomainEvent>(TDomainEvent @event): 领域事件入队
* PublishQueueAsync(): 发布领域事件 (根据领域事件入队顺序依次发布)
* AnyQueueAsync(): 得到是否存在领域事件

## 常见问题

1. 通过`IDomainEventBus`提供的`Enqueue`方法入队的领域事件什么时候会被执行？

领域事件是在领域服务中入队, 或者在[聚合根](/framework/building-blocks/ddd/aggregate-root)中被添加的, 无论属于哪一种情况, 它们都将在以下两种情况被发布

* 手动调用`IDomainEventBus`提供的`PublishQueueAsync`
  * 其中集成事件发送事件分为以下两种情况:
    * 未禁用事务: 在`IUnitOfWork` (工作单元) 提交后
    * 未开启事务: `PublishQueueAsync`方法被调用立即发送
* 最外层的`IEventBus`执行结束后被发送