using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PeopleSearch.Models;
using Microsoft.EntityFrameworkCore;

namespace PeopleSearch
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddDbContext<PeopleSearchDBContext>(options =>
            //    options.UseSqlServer(Configuration.GetConnectionString("PeopleSearchConnection")));

            //var options = new DbContextOptionsBuilder<PeopleSearchDBContext>()
            //    .UseInMemoryDatabase(databaseName: "In_Memory_Database")
            //    .Options;

            services.AddDbContext<PeopleSearchDBContext>(options =>
                options.UseInMemoryDatabase(databaseName: "In_Memory_Database"));

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            //services.AddScoped<IPersonService, PersonService>();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");

                //routes.MapRoute(
                //    name: "ApiByName",
                //    template: "{controller}/{action}/{name}",
                //    defaults: null,
                //    constraints: new { name = @"^[a-z]+$" });

                //routes.MapRoute(
                //    name: "ApiByAction",
                //    template: "{controller}/{action}",
                //    defaults: new { action = "Get" });
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
