param(
    [string]$command = "runserver"
)

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process


# Process the command
switch ($command.ToLower()) {
    "migrations" {
        Write-Host "Creating migrations..." -ForegroundColor Yellow
        python manage.py makemigrations
        Write-Host "Migrations created successfully!" -ForegroundColor Green
    }
    "migrate" {
        Write-Host "Applying migrations..." -ForegroundColor Yellow
        python manage.py migrate
        Write-Host "Migrations applied successfully!" -ForegroundColor Green
    }
    "runserver" {
        Write-Host "Starting development server..." -ForegroundColor Yellow
        python manage.py runserver
        Write-Host "Server started successfully!" -ForegroundColor Green
    }
    default {
        Write-Host "Invalid command. Use one of: migrations, migrate, or runserver" -ForegroundColor Red
        exit 1
    }
}