TYPO3 Sitepackage "Skeleton"
==============================================================
Skeleton ist ein TYPO3 Distribution Template mit Grund-Konfigurationen für eine Website. Es gibt sowohl "Custom Content Elements", als auch die "TYPO3 Basic Elements". Einige ausgewählte Elemente sind mit den Fluid ViewHelper `Wrapper` und `Container` ausgestattet und rendern Container Farben, Abstände und Größen. Zudem gibt es einen optimierten Webp/SVG Picture Tag für gängige Geräte wie Mobile, Tablet und Desktop. Das Template unterstützt auch die Verwendung der `TYPO3 Headless` Erweiterung.

## Features

- Vite
- Tailwindcss
- SCSS
- Wrapper / Container ViewHelper
- Webp / SVG Picture Tag (Default)

## Installation

Beispiel `composer.json` Datei.

Die Versionsnummer `2.x-dev` mit einen gültigen Git Tag ersetzen. Da hier sonst der letzte Commit installiert wird.

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

Nachdem man die Composer Packages installiert und das TYPO3 `FIRST_INSTALL` Setup ausgeführt hat, muss man mit dem TYPO3 CLI Befehl `vendor/typo3 extension:setup` das Setup vom Skeleton Package anstoßen. Skeleton legt hierdurch eine vorkonfigurierte Root-Seite mit einer darin enthaltenen Backend-Seite für den Footer an. Alle Inhalte die in die Footer Seite abgelegt werden, werden auch im Frontend als Footer Elemente gerendert.
