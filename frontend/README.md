# Task Tracker

Eine Fullstack-Webanwendung zur Verwaltung von Aufgaben mit Dashboard und statistischer Übersicht. Das Projekt ist als Lern-Anwendung entstanden, um Angular, Spring Boot und PostgreSQL in einer zusammenhängenden Anwendung einzusetzen.

## Funktionen

- Aufgaben erstellen, bearbeiten und löschen
- Aufgaben nach Titel suchen und Details anzeigen
- Drei Aufgabenstatus: **Nicht angefangen**, **In Arbeit** und **Fertig**
- Dashboard mit Statusverteilung und Erledigungsquote
- Balkendiagramm für erledigte Aufgaben der letzten sieben Tage
- Übersicht der in der aktuellen Woche erstellten und abgeschlossenen Aufgaben

## Technologien

| Bereich | Technologien |
| --- | --- |
| Frontend | Angular 21, TypeScript, Angular Material, Signals, SCSS |
| Backend | Java 21, Spring Boot 4, Spring Data JPA, REST |
| Datenbank | PostgreSQL 15, Docker Compose |
| Tests | JUnit, Mockito, Spring MockMvc |

## Projekt lokal starten

**Voraussetzungen:** JDK 21, Docker mit Docker Compose, npm und eine mit Angular 21 kompatible Node.js-Version (z. B. Node.js 22.12 oder neuer aus der 22er-Reihe).

Die folgenden Befehle sind für **PowerShell unter Windows** gedacht. Alle drei Terminals werden im Hauptverzeichnis des Projekts geöffnet.

### 1. Datenbank starten

```powershell
docker compose up -d
```

Dadurch wird PostgreSQL gestartet. Die Daten bleiben in einem Docker-Volume gespeichert.

### 2. Backend starten

In einem zweiten Terminal:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Die API ist unter <http://localhost:8080/api/tasks> erreichbar.

### 3. Frontend starten

In einem dritten Terminal:

```powershell
cd frontend
npm ci
npm start
```

Die Anwendung ist unter <http://localhost:4200> erreichbar.

> Docker Compose startet in diesem Projekt nur die Datenbank. Die Zugangsdaten für die lokale Entwicklungsumgebung stehen in `docker-compose.yml` und `backend/src/main/resources/application.properties`.

## REST-API

| Methode | Endpunkt | Beschreibung | Erfolgs- und Fehlercodes |
| --- | --- | --- | --- |
| `GET` | `/api/tasks` | Alle Aufgaben abrufen | `200` |
| `GET` | `/api/tasks/{id}` | Eine Aufgabe abrufen | `200`, `404` |
| `POST` | `/api/tasks` | Aufgabe erstellen | `201`, `400` |
| `PATCH` | `/api/tasks/{id}` | Titel, Beschreibung oder Status ändern | `200`, `400`, `404` |
| `DELETE` | `/api/tasks/{id}` | Aufgabe löschen | `204`, `404` |

Beispiel für `POST /api/tasks`:

```json
{
  "title": "Bewerbung vorbereiten",
  "description": "Lebenslauf überarbeiten",
  "status": "IN_ARBEIT"
}
```

Der Titel ist Pflicht und darf höchstens 255 Zeichen lang sein; für die Beschreibung gilt ebenfalls eine Grenze von 255 Zeichen. Die ID und Datumsfelder werden beim Erstellen vom Backend verwaltet. Bei einem Statuswechsel auf `FERTIG` wird das Abschlussdatum gesetzt; beim erneuten Öffnen der Aufgabe wird es entfernt.

## Tests

Im Backend gibt es automatisierte Controller-Tests mit JUnit, Mockito und MockMvc. Sie prüfen unter anderem die Eingabevalidierung, HTTP-Statuscodes und den Umgang mit Abschlussdaten.

Gezielt die Controller-Tests ausführen (im Ordner `backend`):

```powershell
.\mvnw.cmd "-Dtest=TaskControllerTest" test
```

Alle Backend-Tests ausführen:

```powershell
.\mvnw.cmd test
```

Der vollständige Spring-Kontexttest benötigt eine erreichbare PostgreSQL-Datenbank.

## Projektstruktur

```text
task-tracker-app/
├── backend/             # Spring-Boot-API
├── frontend/            # Angular-Oberfläche
└── docker-compose.yml   # PostgreSQL für die lokale Entwicklung
```

## Projektstatus

Der Task Tracker ist eine lokale Lern-Anwendung. Er ist nicht als öffentlich bereitgestellter Mehrbenutzerdienst mit Anmeldung oder Rollenverwaltung ausgelegt.