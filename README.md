# ManAuto

Projekt służący do zarządzania wynajmem pojazdów, środowisku ASP.NET Core i React.

# Screeny

## Company View

### Dashboard
<img width="2558" height="1275" alt="{59893501-9D27-40E5-B351-9836B01A5ED5}" src="https://github.com/user-attachments/assets/f06b6875-3183-4835-bc0c-d9583ee99834" />
### Fleet
<img width="2558" height="1274" alt="{5CCC2DEB-4C9C-4475-9FFD-1D3CCA9AF45D}" src="https://github.com/user-attachments/assets/bdb1cd6c-953e-4e2b-a3e3-ba284fdd8e47" />

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
