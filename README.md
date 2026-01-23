# ManAuto

Projekt służący do zarządzania wynajmem pojazdów, środowisku ASP.NET Core i React.

# Screeny

## Funkcjonalności

- Zarządzanie klientami i pojazdami 
- Integracja z backendem poprzez REST API
- Użycie CQRS i wzorców projektowych w warstwie aplikacji

## Struktura projektu

- **API** – warstwa prezentacji i kontrolery Web API  
- **Application** – logika aplikacji (CQRS, handlery, DTO)  
- **Domain** – modele domenowe
- **Persistence** – konfiguracja Entity Framework Core i dostęp do bazy  
- **Infrastructure** – serwisy wspomagające

## Technologie

### Backend

- ASP.NET Core 10
- Entity Framework Core  
- AutoMapper  
- FluentValidation  
- SQLite

### Frontend
- React + TypeScript
- Tailwind CSS
- Shadcn/ui
- React Query
- Axios

## Uruchomienie

### Backend
-dotnet restore
-dotnet watch

### Frontend
-cd client
-npm install
-npm run dev
