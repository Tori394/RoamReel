© 2026 Wiktoria Herczyk | All rights reserved.

This work is legally protected and requires written permission for use.


<h1 align="center"> RoamReel </h1>
<p align="center">
  <img src="https://img.shields.io/badge/Status-Finished-brightgreen">
</p>

<p align="center">
<img width="233" height="270" alt="image" src="https://github.com/user-attachments/assets/f3e1cfed-017f-4f45-a9fd-b47ea77982d0" />
</p>
<h2 align="center">
   Aplikacja pozwalająca użytkownikowi na posiadanie swojej "galerii świata" na której może zapisywać swoje zdjęcia z wycieczek w formie 30 sekundowych rolek (reels'ów)
</h2>

---

## 📌 Działanie Aplikacji

Użytkownik po założeniu konta i zalogowaniu może generwoać 30sekundowe filmiki z wybranych zdjęć. Zapisane filmy wyświetlane są potem na osi czasu użytkownika lub w galerii po wybranu odpowiedniego kraju. Sortowane są chronologicznie. Użytkownik w każdej chwili może usunąć film lub edytować datę i kraj do którego go przypisał.

---

## 📌 Bezpieczeństwo i Uwierzytelnianie

System bezpieczeństwa w aplikacji jest realizowany przez `SecurityController` i opiera się na kilku kluczowych filarach.

### 1. Logowanie
Proces logowania został zaprojektowany z myślą o ochronie przed najczęstszymi atakami webowymi:
* **Inicjalizacja Sesji i Bezpieczeństwo Ciasteczek**: Ustawiane są parametry ciasteczka sesyjnego (`session_set_cookie_params`) takie jak `lifetime`, `path`, `domain`, `secure`, `httponly` oraz `samesite` ('Strict'), co chroni przed atakami XSS i CSRF.
* **Weryfikacja CSRF**: Metoda sprawdza token CSRF (`$_POST['csrf']`) przesłany z formularza, porównując go z tokenem zapisanym w sesji.
* **Walidacja Danych**: Sprawdzana jest długość i obecność danych, aby zapobiec błędom i atakom typu Buffer Overflow.
* **Uwierzytelnianie**: Hasło użytkownika jest weryfikowane z hashem zapisanym w bazie za pomocą bezpiecznej funkcji `password_verify`.
* **Regeneracja ID Sesji**: Po pomyślnym zalogowaniu ID sesji jest regenerowane (`session_regenerate_id(true)`), co chroni przed atakami Session Fixation.

### 2. Rejestracja
Rejestracja nowych użytkowników kładzie nacisk na walidację i higienę danych:
* **Weryfikacja Unikalności**: System sprawdza w bazie, czy email nie jest już zajęty.
* **Zaawansowana Polityka Haseł**: Hasło jest analizowane przez `validatePasswordStrength()`, która wymusza:
    * Minimum 8 znaków.
    * Małą i dużą literę, cyfrę oraz znak specjalny.
    * Brak nazwy użytkownika lub fragmentu maila w haśle.
* **Hashowanie**: Hasła są hashowane algorytmem **BCRYPT** (`password_hash`) przed zapisem do bazy.
* **Ochrona CSRF**: Formularz rejestracji również jest chroniony tokenem.

### 3. Zarządzanie Sesją
* **Bezpieczne Ciasteczka**: Flagi `HttpOnly` i `Secure` uniemożliwiają dostęp do sesji z poziomu JavaScriptu oraz wymuszają szyfrowane połączenie.
* **Przechowywanie Danych**: Sesja przechowuje tylko niezbędne identyfikatory (`user_id`, `role`), co pozwala na autoryzację bez ponownego logowania.

### 4. Wylogowywanie
Metoda `logout()` zapewnia całkowite usunięcie śladów sesji:
* Czyszczenie tablicy `$_SESSION`.
* Usuwanie ciasteczka sesyjnego z przeglądarki (ustawienie czasu wygaśnięcia w przeszłości).
* Niszczenie sesji po stronie serwera (`session_destroy()`).

### BINGO
<img width="680" height="702" alt="image" src="https://github.com/user-attachments/assets/a5baa21c-cede-47c2-a12b-cea092e8a40c" />


---

## 📌 Role i Uprawnienia

System rozróżnia uprawnienia na podstawie pola `role` w bazie danych:

* **Administrator (Rola = 1)**
    * Posiada pełny dostęp do systemu.
    * Automatyczne przekierowanie do `/adminPanel` po zalogowaniu.
    * Możliwość zarządzania użytkownikami (edycja, usuwanie) oraz podgląd statystyk globalnych.
* **Użytkownik (Rola domyślna)**
    * Dostęp do funkcjonalności twórcy (Creator), Mapy i Profilu.
    * Automatyczne przekierowanie do `/dashboard` po zalogowaniu.

---

## 📌 Główne Funkcjonalności

### Panel Administratora
* **Statystyki (Chart.js)**: Wizualizacja demografii podróży (wykres kołowy) ładowana asynchronicznie przez Fetch API.
* **Zarządzanie Użytkownikami**: Tabela z możliwością edycji nazw użytkowników i usuwania kont.
* **Architektura Hybrydowa**: Tabela renderowana po stronie serwera (PHP) dla stabilności, wykresy renderowane po stronie klienta (JS) dla wydajności.

### Kreator Podróży (Creator)
* **Upload Zdjęć**: Obsługa Drag & Drop, podgląd miniatur przed wysłaniem.
* **Generowanie Wideo**: Integracja PHP ze skryptem Python, który łączy przesłane zdjęcia w film (Reel).

### Interaktywna Mapa
* **SVG Map**: Skalowalna mapa świata z obsługą przybliżania i przesuwania (`svg-pan-zoom`).
* **Interakcja**: Kliknięcie w kraj dynamicznie pobiera listę filmów z tego regionu (AJAX) i wyświetla je w galerii.

### Profil Użytkownika
* **Oś Czasu i Statystyki**: Przegląd historii podróży.
* **Edycja Profilu**: Asynchroniczna zmiana zdjęcia profilowego bez przeładowania strony.

---

## 📌 Responsywność

Aplikacja działa na każdym formacie urządzenia, widoki odpowiednio dostosowywują się do wielkości ekranu.

* Widok logoawnia:
  <img width="2806" height="864" alt="image" src="https://github.com/user-attachments/assets/f75f6fe6-1f63-468c-b3f6-097940c1b094" />

* Widok rejestracji:
  <img width="2798" height="858" alt="image" src="https://github.com/user-attachments/assets/e06c4acb-1373-4dba-ba23-f6a9ded043d1" />

* Widoki mapy:
  <img width="2798" height="873" alt="image" src="https://github.com/user-attachments/assets/973e220d-deee-4c2a-adec-de2f4ca78c92" />

* Widoki profilu:
  <img width="2798" height="874" alt="image" src="https://github.com/user-attachments/assets/e5d63a27-05d3-4cee-93dd-011bb0faa45b" />
  <img width="2798" height="874" alt="image" src="https://github.com/user-attachments/assets/9daadc59-7d7a-4ef0-ac98-cf3459fb9108" />

* Widok kreatora:
 <img width="2798" height="874" alt="image" src="https://github.com/user-attachments/assets/8423af64-064f-4d5d-9f4f-12f7c563fe82" />

* Widok edytora:
  <img width="2798" height="874" alt="image" src="https://github.com/user-attachments/assets/aa794001-d25b-468a-b4ad-babb3900db9d" />

* Widok admina
<img width="2798" height="874" alt="image" src="https://github.com/user-attachments/assets/d1727790-b472-4d02-882b-08170fdc3870" />

---

## 📌 Struktura Projektu (MVC)

```text
/
├── public/              # Warstwa prezentacji i zasoby
│   ├── scripts/         # Skrypty JavaScript (logika klienta)
│   ├── styles/          # Arkusze stylów CSS
│   └── views/           # Widoki (pliki .html renderujące strony)
├── src/                 # Logika biznesowa
│   ├── controllers/     # Kontrolery sterujące przepływem danych
│   ├── repository/      # Logika zapytań do bazy danych (UserRepo, ReelRepo...)
│   └── services/        # Serwisy pomocnicze (skrypt Python)
├── Database.php         # Klasa odpowiedzialna za połączenie z bazą (PDO)
├── docker-compose.yaml  # Konfiguracja środowiska Docker
├── index.php            # Punkt wejścia aplikacji
├── Routing.php          # Obsługa ścieżek URL
└── readme.md            # Dokumentacja projektu
```
---

## 📌 Programowanie Obiektowe (OOP)

Aplikacja została zbudowana w oparciu o paradygmat programowania obiektowego, co zapewnia modularność, łatwość w utrzymaniu i skalowalność kodu:

* **Klasy i Dziedziczenie**: Logika aplikacji jest podzielona na klasy. Wszystkie kontrolery (np. `SecurityController`, `AdminController`) dziedziczą po bazowej klasie `AppController`, co pozwala na współdzielenie wspólnych metod (np. renderowania widoków, weryfikacji żądań).
* **Wzorzec Projektowy Singleton**: Repozytoria (np. `UserRepository`, `AdminRepository`) wykorzystują wzorzec Singleton (`getInstance()`). Gwarantuje to istnienie tylko jednej instancji klasy odpowiedzialnej za połączenie z bazą danych, co optymalizuje zasoby serwera.
* **Separacja Odpowiedzialności**: Każda klasa ma ściśle określone zadanie – Kontrolery zarządzają przepływem danych, a Repozytoria komunikują się z bazą danych.

---

## 📌 Wykorzystane języki

### HTML
Do budowania warstwy prezentacji (widoków) w architekturze MVC oraz tworzenia szkieletu interfejsu użytkownika renderowanego przez przeglądarkę.
### POSTGRESQL
Jako zaawansowany system relacyjnych baz danych, odpowiedzialny za trwałe przechowywanie danych, zapewnienie ich integralności (poprzez relacje i ograniczenia) oraz realizację logiki po stronie bazy danych.
### PHP	
Do logiki backendowej, obsługi zapytań serwera, zarządzania sesją użytkownika oraz sterowania przepływem danych w aplikacji (Kontrolery w MVC).
### JAVA SCRIPT
Do interaktywności po stronie klienta, asynchronicznego pobierania danych z serwera (Fetch API/AJAX) oraz dynamicznej aktualizacji elementów DOM bez przeładowania strony.

---

## 📌 Baza danych PostgreSQL

### ERD
<img width="926" height="489" alt="image" src="https://github.com/user-attachments/assets/5302051a-ecc1-480d-86e0-a2217564bc44" />


### init.sql
### Relacje i akcje na referencjach
### Tranzakcje
### Triggery

---

## 📌 FetchAPI

Interaktywność aplikacji bez konieczności przeładowywania strony została osiągnięta dzięki nowoczesnemu standardowi **Fetch API**:

* **Komunikacja Tło-Serwer**: Skrypty JavaScript (np. `map.js`, `admin.js`) wysyłają asynchroniczne żądania HTTP do endpointów API w PHP (np. `/api/admin/stats`).
* **Format JSON**: Wymiana danych między klientem a serwerem odbywa się w lekkim formacie JSON. PHP przetwarza logikę i zwraca dane (np. statystyki, listę filmów), a JavaScript dynamicznie aktualizuje drzewo DOM.
* **Płynność Użytkowania**: Dzięki temu podejściu, kliknięcie w kraj na mapie czy zmiana zdjęcia profilowego odbywa się natychmiastowo, dając wrażenie korzystania z aplikacji typu SPA (Single Page Application), mimo że backend oparty jest na tradycyjnym PHP.

---

