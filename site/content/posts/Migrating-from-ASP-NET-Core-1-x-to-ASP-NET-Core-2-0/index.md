---
path: '/Migrating-from-ASP-NET-Core-1-x-to-ASP-NET-Core-2-0'
title: Migrating from ASP.NET Core 1.x to ASP.NET Core 2.0
date: 2017-11-01 13:34:40
category: Developement
tags: [.Net Core, ASP.Net Core, Migration]
featuredImage: ./ASP-NET-Core-Banner.png
published: true
---

## Intro

In this article i present to you the steps that i followed to upgrade our solution from .Net core 1.1 to “dotnet” core 2.0. The solution contains:

* ASP.net core 1.1 web api
* dotnet core 1.1 project containing IdentityServer4
* other dotnet core 1.1 library projects

<!-- more -->

## Hands on first part (Updating the .csproj)

First thing first, i edited the web api project file “.csproj” in visual studio and update the following tags:

```xml
    <TargetFramework>netcoreapp2.0</TargetFramework>
```

this tag was previously targeting “netcoreapp1.x”, the second thing to do is to completely replace the tag bellow it

```xml
    <PackageTargetFallback>$(PackageTargetFallback);portable-net45+win8+wp8+wpa81;</PackageTargetFallback>
```

to

```xml
    <AssetTargetFallback>$(AssetTargetFallback);portable-net45+win8+wp8+wpa81;</AssetTargetFallback>
```

then move more down in the same file and update the package references;
please to refer to the nuget dependencies of the special package: Microsoft.AspNetCore.All, this contains all the included dependencies where you can feel free to delete the tag reference. In my case i had to delete all the listed references tags as they are no more needed, they are included in the special “all” reference:

```xml
    <PackageReference Include="Microsoft.AspNetCore" Version="2.0.0" />
    <PackageReference Include="Microsoft.AspNetCore.Authentication.Cookies" Version="2.0.0" />
    <PackageReference Include="Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore" Version="2.0.0" />
    <PackageReference Include="Microsoft.AspNetCore.Identity.EntityFrameworkCore" Version="2.0.0" />
    <PackageReference Include="Microsoft.AspNetCore.Mvc" Version="2.0.0" />
    <PackageReference Include="Microsoft.AspNetCore.Mvc.Razor.ViewCompilation" Version="2.0.0" PrivateAssets="All" />
    <PackageReference Include="Microsoft.AspNetCore.StaticFiles" Version="2.0.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="2.0.0" PrivateAssets="All" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="2.0.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="2.0.0" PrivateAssets="All" />
    <PackageReference Include="Microsoft.VisualStudio.Web.BrowserLink" Version="2.0.0" />
    <PackageReference Include="Microsoft.VisualStudio.Web.CodeGeneration.Design" Version="2.0.0" PrivateAssets="All" />
```

replace by:

```xml
    <PackageReference Include="Microsoft.AspNetCore.All" Version="2.0.0" />
```

the last step to do in this file before saving it and closing it is to update the version of the .Net core cli tools reference from what ever 1.x.x version to 2.0.0:

```xml
    <DotNetCliToolReference Include="Microsoft.EntityFrameworkCore.Tools.DotNet" [Version="2.0.0"] />
    <DotNetCliToolReference Include="Microsoft.Extensions.SecretManager.Tools" [Version="2.0.0"] />
    <DotNetCliToolReference Include="Microsoft.VisualStudio.Web.CodeGeneration.Tools" [Version="2.0.0"] />
```

## Hands on second part (updating the template code)

As most of the people says you don’t have to do these steps, mean they are optional, if you are using migration or you are willing to consider migration you’ll need to update the template 'out of the box program implementation', as Microsoft mention it in the [documentation](https://docs.microsoft.com/en-us/aspnet/core/migration/1x-to-2x/) it is used by the EF core when updating the database:
the main method was spited in two to separate the web host building from the main method, so here move all the stuff that you change or added to the webHostBuilder:

```csharp
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                    .UseKestrel()
                    .UseContentRoot(Directory.GetCurrentDirectory())
                    .UseIISIntegration()
                    .UseUrls("http://localhost:5001")
                    .UseStartup<Startup>()
                    .UseApplicationInsights()
                    .Build();

            host.Run();
        }
    }
```

change to:

```csharp
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseUrls("http://localhost:5001")
                .UseStartup<Startup>()
                .Build();
    }
```

we are done with the program.cs file now we go to your "Startup" file we are going to change the constructor;

```csharp
    public Startup(IHostingEnvironment env)
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(env.ContentRootPath)
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

        if (env.IsDevelopment())
        {
            builder.AddUserSecrets<Startup>();
        }

        builder.AddEnvironmentVariables();
        Configuration = builder.Build();
    }

    public IConfigurationRoot Configuration { get; }
```

again change to:

```csharp
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }
```

dont forget to resolve your usings, and this is it regarding the template code.

## Hands on fird part (updating specific code)

AccessTokenValidation for identiryserver4 was updated to version 2.0.0 we need to get the upgrade too :)
In the Api project we are contacting another dotnet core project wich contains IdentityServer4 configured on it, in order to continue using the server for authentication we need to change some settings there too;
previously to configure our server in version 1.x in the configure method we were using

```csharp
    app.UseIdentityServerAuthentication(new IdentityServerAuthenticationOptions
    {
        Authority = "http://localhost:5000",
        RequireHttpsMetadata = false,
        ApiName = "apiApp"
    });
```

we should change it to

```csharp
    app.UseAuthentication();
```

thats it! no now we have to configure JwtBearer for now on to use our identity server.
to do so move to the ConfigureServices method in your "Startup" file and after adding mvc service add this code

```csharp
    services.AddAuthentication("Bearer")
        .AddIdentityServerAuthentication(options =>
        {
            options.Authority = "http://localhost:5000";
            options.RequireHttpsMetadata = false;
            options.ApiName = "apiApp";
        });
```

for sure you have to tweak the code to your configuration and add the necessary using.
we are using authentication in our project so again as Microsoft [docs](https://docs.microsoft.com/en-us/aspnet/core/migration/1x-to-2x/identity-2x) mention it we need to add the navigation properties of the base IdentityUser object,

```csharp
    /// <summary>
    /// Navigation property for the roles this user belongs to.
    /// </summary>
    public virtual ICollection<IdentityUserRole<int>> Roles { get; } = new List<IdentityUserRole<int>>();
```

### Updating IdentityServer project

In the IdentityServer project (project where identityServer4 is configured) there is not much to change besides the dotnet core changes, it means that we have to proceed the same as we did above for the api project, and update IdentityServer4 and IdentityServer4.AspNetIdentity package reference to target the versin 2.0.0

```xml
    <PackageReference Include="IdentityServer4" Version="2.0.0" />
    <PackageReference Include="IdentityServer4.AspNetIdentity" Version="2.0.0" />
```

then we will change the identityServer service in the ConfigureServices:

```csharp
    services.AddIdentityServer()
                    .AddTemporarySigningCredential()
```

is changed to

```csharp
    services.AddIdentityServer()
                    .AddDeveloperSigningCredential()
```

and the rest stays as it is.
