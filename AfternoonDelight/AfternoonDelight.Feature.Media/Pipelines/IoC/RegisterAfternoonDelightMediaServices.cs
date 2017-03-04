using AfternoonDelight.Feature.Media.Repositories;
using Microsoft.Extensions.DependencyInjection;
using Sitecore.XA.Foundation.IOC.Pipelines.IOC;

namespace AfternoonDelight.Feature.Media.Pipelines.IoC
{
    public class RegisterAfternoonDelightMediaServices : IocProcessor
    {
        public override void Process(IocArgs args)
        {
            //TODO patch
            ServiceCollectionServiceExtensions.AddTransient<IHotspotImageRepository, HotspotImageRepository>(args.ServiceCollection);
        }
    }
}