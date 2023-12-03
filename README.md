TYPO3 Sitepackage "Skeleton"
==============================================================

Skeleton ist ein TYPO3 Distribution Template, mit dem du die Grund-Konfigurationen für eine Website installierst. Es gibt sowohl "Custom Content Elements", als auch die "TYPO3 Basic Elements". Einige ausgewählte Elemente sind mit den Fluid ViewHelper `Wrapper` und `Container` ausgestattet und rendern Container- Farben, Abstände und Größen für dich. Zudem gibt es einen optimierten Webp/SVG Picture Tag für gängige Bildschirme wie Mobile, Tablet und Desktop. Das Template unterstützt auch die Verwendung der `TYPO3 Headless` Erweiterung.

## Features

- Vite
- Tailwindcss
- SCSS
- Wrapper / Container ViewHelper
- Webp / SVG Picture Tag (Default)

## Installation

Beispiel `composer.json` Datei.

Die Versionsnummer `2.x-dev` musst du mit einen gültigen Git Tag ersetzen. Da hier sonst der letzte Commit (dev) installiert wird.

```json
{
  "name": "typo3/cms-base-distribution",
  "description" : "TYPO3 CMS Base Distribution",
  "license": "GPL-2.0-or-later",
  "config": {
    "allow-plugins": {
      "typo3/class-alias-loader": true,
      "typo3/cms-composer-installers": true
    },
    "sort-packages": true
  },
  "repositories": [
    {
      "type": "path",
      "url": "packages/*"
    }
  ],
  "require": {
    "ksnc/skeleton": "^2.x-dev",
    "friendsoftypo3/headless": "^4.2.2",
    "typo3/cms-adminpanel": "^12.4",
    "typo3/cms-backend": "^12.4",
    "typo3/cms-belog": "^12.4",
    "typo3/cms-beuser": "^12.4",
    "typo3/cms-core": "^12.4",
    "typo3/cms-dashboard": "^12.4",
    "typo3/cms-extbase": "^12.4",
    "typo3/cms-extensionmanager": "^12.4",
    "typo3/cms-felogin": "^12.4",
    "typo3/cms-filelist": "^12.4",
    "typo3/cms-filemetadata": "^12.4",
    "typo3/cms-fluid": "^12.4",
    "typo3/cms-fluid-styled-content": "^12.4",
    "typo3/cms-form": "^12.4",
    "typo3/cms-frontend": "^12.4",
    "typo3/cms-impexp": "^12.4",
    "typo3/cms-indexed-search": "^12.4",
    "typo3/cms-info": "^12.4",
    "typo3/cms-install": "^12.4",
    "typo3/cms-linkvalidator": "^12.4",
    "typo3/cms-lowlevel": "^12.4",
    "typo3/cms-opendocs": "^12.4",
    "typo3/cms-reactions": "^12.4",
    "typo3/cms-reports": "^12.4",
    "typo3/cms-rte-ckeditor": "^12.4",
    "typo3/cms-scheduler": "^12.4",
    "typo3/cms-seo": "^12.4",
    "typo3/cms-setup": "^12.4",
    "typo3/cms-sys-note": "^12.4",
    "typo3/cms-t3editor": "^12.4",
    "typo3/cms-tstemplate": "^12.4",
    "typo3/cms-webhooks": "^12.4",
    "typo3/minimal": "^12"
  }
}
```

Nachdem du die Composer Packages installiert und das TYPO3 `FIRST_INSTALL` Setup ausgeführt hast, muss du mit dem TYPO3 CLI Befehl `vendor/typo3 extension:setup` das Setup vom Skeleton Package anstoßen. Skeleton legt hierdurch eine vorkonfigurierte Root-Seite mit einer darin enthaltenen Backend-Seite für den Footer an. Alle Inhalte, die in die Footer Seite abgelegt werden, werden auch im Frontend als Footer Elemente gerendert.

## Vite (Library Mode)

Wenn du Tailwindcss, SCSS oder JavaScript ändern oder erweitern möchtest, musst du dir zunächst mit `npm install` alle Abhängigkeiten installieren. In der `vite.config.js` siehst du, welche JavaScript Dateien überwacht und als Library Bundle komprimiert werden. Diese JavaScript Dateien sind dann entweder über `TypoScript` oder über `<f:asset.* />` in den Fluid Templates eingebunden. Ebenso siehst du in der `tailwind.config.js`, welche Konfigurationen für Tailwindcss angewendet werden.

Möchtest du den Watcher starten, nutzt du den Befehl `npm start` in der Konsole.

Weitere Informationen kannst du in der Dokumentation von Vite, Tailswindcss und SCSS entnehmen.

## Assets

Alle CSS und JS Dateien der Components, werden über Fluid `<f:asset.css />` oder `<f:asset.script />` eingebunden. Dies ermöglicht dir, die Ressourcen nur dann zuladen, wenn diese auch auf einer Seite verwendet werden.

## ViewHelper

Skeleton hat einige ViewHelper an Board, die dir die Arbeit erleichtern sollen. Zu den wichtigsten ViewHelper gehören `WrapperViewHelper` und `ContainerViewHelper`. Der Wrapper sorgt dafür, dass Farben und Tailwindcss Abstände um das Modul (Komponente) gerendert werden. Die Abstände kannst du im Backend im Appearance (Erscheinungsbild) Tab eistellen. Jede Komponente bekommt vordefinierte Abstände mit. Der Container rendert die Breiten und den Containerumbruch, den du dir innerhalb der ViewHelper zu nutzen machen kannst. Sollte der Wrapper in einen deiner Module entfallen, so kannst du mit dem Attribut `wrap="true"`, dem Container sagen, dass dieser die Farben und Abstände übernehmen soll.

In den meisten Fällen wirst du die erste Version mit dem Wrapper + Container verwenden oder im den Templates vorfinden.

### WrapperViewHelper

Attribute

- as
- render
- class

```html
<skeleton:wrapper render="{data}" class="my-module-name">
  <skeleton:container render="{data}" class="{data.breakpoint}:flex gap-5">
    <div class="{data.breakpoint}:w-1/2">
      ...
    </div>
    <div class="{data.breakpoint}:w-1/2">
      ...
    </div>
  </skeleton:container>
</skeleton:wrapper>
```

### ContainerViewHelper

Attribute

- as
- render
- class
- wrap (Wenn kein Wrapper verwendet wird)

```html
<skeleton:container render="{data}" class="my-class" wrap="true">
  <div>...</div>
</skeleton:container>
```

### ReplaceViewHelper

PHP str_replace()

```html
<skeleton:replace search="sit" replace="ist" subject="Lorem ipsum dolor sit amet" />
{skeleton:replace(search:'sit', replace:'ist', subject:'Lorem ipsum dolor sit amet')}
```

### SubstringViewHelper

PHP substr()

```html
<skeleton:substring string="Lorem ipsum!..." offset="0" length="-1" />
{skeleton:substring(string:'Lorem ipsum!...', offset:'0', length:'-1')}
```

### SplitViewHelper

PHP explode()

```html
<skeleton:split string="Lorem ipsum" separator=" " />
{skeleton:split(string:'Lorem ipsum', separator:' ')}
```

## Logo Image / SVG Inline

Das Logo der Seite wird über einen TypoScript lib Marker gerendert. Hierfür gibt es eine Image Version mit einem Link zur Root Ebene und eine SVG-Version mit einem Link zur Root Ebene. Die URL zu einer anderen Root Ebene kannst du mit `lib.logoSVG.stdWrap.typolink.parameter = 1` überschreiben. Standard wird der logoSVG lib Marker verwendet.

```html
<f:cObject typoscriptObjectPath="lib.logo" />
<f:cObject typoscriptObjectPath="lib.logoSVG" data="{src: 'path/to/the/file.svg'}" />
```

## Picture Tag

Du solltest für alle Images das Partial `Picture` verwenden und darauf achten, dass der Server Webp unterstützt. Webp ist als festes modernes Format im Picture Tag integriert. Die Images werden Standard mit loading="lazy" geladen.

Argumente:

- file
- loading
- width
- height
- maxWidth
- maxHeight

```html
<f:render partial="Picture" arguments="{file: file, loading: 'eager', class: 'my-class'}" />
```
