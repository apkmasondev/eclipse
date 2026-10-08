# ECLIPSE

Pełnoekranowe warcaby 3D z autorskim wariantem **Eclipse**. Dwa połączone portale zmieniają drogi pionów, a co cztery rundy pojawiają się na nowych polach.

Gra działa w przeglądarce. Nie wymaga konta, kluczy API, płatnych usług ani serwera aplikacyjnego.

**[Zagraj w ECLIPSE](https://apkmason.dev/eclipse/)**

## Co zawiera gra

- Planszę i piony 3D z oświetleniem, cieniami i animacjami ruchów.
- Wariant Eclipse z portalami oraz wariant bez portali.
- Przeciwnika komputerowego z trzema poziomami trudności.
- Tryb dla dwóch osób na jednym urządzeniu.
- Podpowiedzi, cofanie ruchów i zapis partii dla białych i czarnych.
- Obracanie i przybliżanie planszy oraz widok z góry.
- Dźwięki, ograniczenie animacji i tryb oszczędny.
- Interfejs po polsku, układ mobilny i alternatywną planszę obsługiwaną klawiaturą.

## Uruchomienie lokalne

Potrzebujesz **Node.js 22 lub nowszego** oraz przeglądarki obsługującej WebGL 2, moduły JavaScript i import maps.

```sh
git clone https://github.com/apkmasondev/eclipse.git
cd eclipse
npm start
```

Otwórz **[http://127.0.0.1:4173](http://127.0.0.1:4173)**. Serwer zatrzymasz skrótem `Ctrl+C`.

**Nie musisz wykonywać `npm install` ani budować projektu.** Biblioteka Three.js i używane dodatki znajdują się w `dist/vendor/`. `package.json` zawiera jedynie ustawienia projektu i skróty do uruchomienia oraz testowania. Pole `private: true` chroni przed przypadkową publikacją pakietu w npm; nie zmienia widoczności repozytorium GitHub.

Możesz również uruchomić serwer bez npm:

```sh
node server.mjs
```

Otwieraj grę przez serwer HTTP, nie przez dwukrotne kliknięcie `index.html` — moduły i worker przeciwnika wymagają prawidłowego serwowania plików.

## Sterowanie

Kliknij pion, a następnie podświetlone pole docelowe. Przy portalu wybierasz pole wejścia; przeniesienie następuje automatycznie, jeśli wylot jest wolny.

| Czynność | Sterowanie |
| --- | --- |
| Obracanie planszy | Przeciąganie myszą lub palcem |
| Przybliżanie | Kółko myszy lub gest szczypania |
| Cofnięcie ruchu | `Z` |
| Podpowiedź | `H` |
| Zmiana widoku | `V` |
| Pełny ekran | `F` lub przycisk w stopce |

Przy nawigacji klawiszem `Tab` pojawia się przycisk otwierający planszę klawiaturową. Po jej otwarciu korzystaj ze strzałek i `Enter`; `Escape` wraca do planszy 3D. Dostępność pełnego ekranu zależy od przeglądarki i uprawnień strony osadzonej w ramce.

## Zasady

To wariant autorski na planszy 8 × 8, a nie implementacja konkretnego regulaminu turniejowego.

1. Każda strona zaczyna z 12 pionami. Białe wykonują pierwszy ruch.
2. Pion porusza się po skosie o jedno pole do przodu, a bić może w obu kierunkach.
3. Bicie jest obowiązkowe. Rozpoczętą sekwencję trzeba dokończyć tym samym pionem; nie trzeba wybierać najdłuższej dostępnej sekwencji.
4. Awans na damkę następuje po zakończeniu całej tury na ostatnim rzędzie. Damka porusza się po przekątnej o dowolną liczbę wolnych pól i bije z dystansu.
5. Wygrywa strona, która zbije wszystkie piony przeciwnika albo pozbawi go legalnych ruchów.
6. Remis następuje po 80 turach bez bicia lub awansu, albo po trzecim powtórzeniu pozycji z tym samym graczem przy ruchu i fazą cyklu portali.

### Portale Eclipse

- Zakończenie kroku na portalu przenosi pion na drugi portal, jeśli pole wyjścia jest puste.
- Zajęte wyjście wyłącza teleportację dla tego kroku; pion zostaje na wejściu.
- Po teleportacji trzeba kontynuować dostępne bicie.
- Co osiem tur, czyli cztery pełne rundy, portale zmieniają położenie.
- Pojawienie się portalu pod stojącym pionem nie przenosi go automatycznie.

Wariant bez portali zachowuje pozostałe zasady.

## Struktura repozytorium

```text
dist/
  index.html          Interfejs gry i okna dialogowe
  style.css           Podstawowy układ i responsywność
  table-ui.css        Wygląd stołu i elementów interfejsu
  app.js              Sterowanie, ustawienia, historia i WebMCP
  icons.js            Ikony pionów, damek i ruchów
  scene.js            Modele proceduralne, kamera i animacje 3D
  engine.js           Reguły gry i wybór ruchów przeciwnika
  ai-worker.js        Obliczenia przeciwnika w osobnym wątku
  vendor/             Three.js, dodatki i ich licencja
tests/
  engine.test.mjs     Testy silnika gry
server.mjs            Lokalny serwer statyczny
package.json          Polecenia start i test
.github/workflows/
  pages.yml           Testy i automatyczna publikacja na GitHub Pages
```

`dist/` zawiera edytowalne pliki aplikacji, a nie wynik procesu budowania. Zmiany w grze wprowadzaj bezpośrednio w tych plikach i odświeżaj przeglądarkę.

## Testy

```sh
npm test
```

Zestaw 12 testów obejmuje ustawienie początkowe, legalne ruchy, obowiązkowe i wielokrotne bicia, teleportację, zajęte wyjście portalu, awans, damki, zmianę fazy portali, zakończenie gry i wybór ruchu przeciwnika. Sprawdza również niezmienniki planszy w 24 deterministycznych symulacjach rozgrywki.

## Publikacja na własnym hostingu

Udostępnij **zawartość katalogu `dist/`** na dowolnym hostingu statycznym. Nie trzeba uruchamiać `server.mjs` na produkcji. Pliki `.js` powinny być serwowane z prawidłowym typem JavaScript.

### GitHub Pages

Gra jest hostowana na **GitHub Pages** pod adresem **[apkmason.dev/eclipse/](https://apkmason.dev/eclipse/)**. Adres [apkmasondev.github.io/eclipse/](https://apkmasondev.github.io/eclipse/) przekierowuje do tej domeny, ponieważ konto właściciela ma już skonfigurowaną własną domenę GitHub Pages.

Każdy push na `main` uruchamia [workflow](.github/workflows/pages.yml), który:

1. Uruchamia testy reguł na Node.js 22.
2. Pakuje wyłącznie katalog `dist/`.
3. Publikuje grę na GitHub Pages, jeśli testy przejdą.

Status publikacji znajdziesz w zakładce **Actions → Deploy GitHub Pages**. Ten sam workflow możesz uruchomić ręcznie przyciskiem **Run workflow**.

Przy przenoszeniu repozytorium na inne konto włącz **Settings → Pages → Build and deployment → Source: GitHub Actions**. Gra używa względnych ścieżek i obsługuje podkatalog, np. `/eclipse/`, bez zmiany kodu. Szczegóły konfiguracji opisuje [dokumentacja GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

Konfiguracja i identyfikatory hostingu OpenAI nie są wymagane do uruchomienia gry i nie znajdują się w tym repozytorium.

## Przechowywanie danych i ograniczenia

- Ustawienia dźwięku, animacji i jakości są zapisywane lokalnie w przeglądarce.
- Stan partii nie jest zapisywany po odświeżeniu strony.
- Tryb dla dwóch osób działa lokalnie; gra nie zawiera multiplayera sieciowego.
- Przeciwnik używa lokalnego algorytmu minimax z alpha-beta, bez usług generatywnego AI.
- Fonty pobierane są z Google Fonts; gdy są niedostępne, używane są fonty systemowe.
- Narzędzia WebMCP są opcjonalne i rejestrują się tylko w obsługującej je przeglądarce.

## Biblioteki

Dołączono **Three.js 0.180.0** oraz dodatki `OrbitControls` i `RoomEnvironment`. Ich licencja MIT znajduje się w [`dist/vendor/LICENSE`](dist/vendor/LICENSE). Zachowaj ją przy dalszej dystrybucji biblioteki.
