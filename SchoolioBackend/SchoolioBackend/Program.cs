using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using SchoolioBackend.Data;
using SchoolioBackend.Interface;
using SchoolioBackend.Service;
using Microsoft.AspNetCore.Identity;
using SchoolioBackend.Models;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Adding the DbContext to the container
builder.Services.AddDbContext<SchoolioDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registering services (such as the MaterialService and UserService)
builder.Services.AddScoped<IMaterialService, MaterialService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IActivityMapService, ActivityMapService>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<ILostAndFoundService, LostAndFoundService>();
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();


// Swagger/OpenAPI configuration
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add authentication and authorization with JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        // JWT settings, if you're using a secret key only, omit Authority and Audience
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false, // Optional (in production you may want to enable this)
            ValidateAudience = false, // Optional (in production you may want to enable this)
            ValidateLifetime = true, // Check if the token is expired
            ValidateIssuerSigningKey = true, // Validate the signing key (secret key)
            IssuerSigningKey = new SymmetricSecurityKey(
                System.Text.Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

// Registering authorization services
builder.Services.AddAuthorization();

// Configure CORS (Cross-Origin Resource Sharing) if needed
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable CORS
app.UseCors("AllowAll");

// Enable authentication and authorization
app.UseAuthentication();
app.UseAuthorization();

// Map controllers
app.MapControllers();

app.Run();
