# psl-workshop-protractor

## Steps

### Tabla de Contenido

1. [Configuración Inicial del Proyecto](#1-configuración-inicial-del-proyecto)
1. [Mejorando el primer caso de prueba](#2-mejorando-el-primer-caso-de-prueba)
1. [Migrando a TypeScript](#3-migrando-a-typescript)
1. [Agregando Reporte a la Consola](#4-agregando-reporte-a-la-consola)
1. [Desactivar el manejador de promesas y Selenium server](#5-desactivar-el-manejador-de-promesas-y-selenium-server)
1. [Chrome Headless](#6-chrome-headless)
1. [Agregar Integración Continua](#7-agregar-integración-continua)
1. [Agregando Análisis de Código Estático](#8-agregando-análisis-de-código-estático)
1. [CSS Selector](#9-css-selector)
1. [Page Object Model](#10-page-object-model)
1. [Esperas de Carga de Página y de Jasmine](#11-esperas-de-carga-de-página-y-de-jasmine)
1. [Esperas Implicitas](#12-esperas-implicitas)
1. [Esperas Explicitas](#13-esperas-explicitas)
1. [Mejorando los Locator](#14-mejorando-los-locator)
1. [Separar prueba en diferentes describes](#15-separar-prueba-en-diferentes-describes)
1. [Agregando Jasmine Awesome](#16-agregando-jasmine-awesome)
1. [Utilizando Capabilities para configurar Chrome](#17-utilizando-capabilities-para-configurar-chrome)
1. [Listas de Elementos, filtros y elementos dentro de elementos](#18-listas-de-elementos-filtros-y-elementos-dentro-de-elementos)
1. [Más Locators](#19-más-locators)
1. [Ejecución de Código Javascript](#20-ejecución-de-código-javascript)
1. [Trabajando con IFrames](#21-trabajando-con-iframes)
1. [Subiendo un Archivo](#22-subiendo-un-archivo)
1. [Descargando Archivos](#23-descargando-archivos)
1. [Configurar Saucelabs](#24-configurar-saucelabs)
1. [Probar con diferentes navegadores](#25-probar-con-diferentes-navegadores)

### 1. Configuración Inicial del Proyecto

**Descripción**: Se configurará inicialmente el proyecto con javascript y se hará una prueba sobre la página de google

1. Crear un repositorio en GitHub con el nombre de “**protractor-workshop-2018**”
1. Seguir las instrucciones para realizar el primer commit
1. En la configuración del repositorio de GitHub en la opción Branches proteja la rama Master indicando que los PR requieran revisión antes de mergear y que requiera la comprobación del estado antes de hacer merge
1. Dentro del menú colaboradores agregar a:
   * [aperdomob](https://github.com/aperdomob)
   * [germandavid85](https://github.com/germandavid85)
   * [jhenaoz](https://github.com/jhenaoz)
   * [luigisamurai](https://github.com/luigisamurai)
1. [Instalar NodeJS](https://nodejs.org/es/download/package-manager/) en su equipo si no lo tiene instalado
1. Crear una rama **project-setup** en el repositorio
1. Ejecutar en una consola `npm init` dentro de la ruta donde se encuentra el repositorio y colocar la siguiente información:

   | Parametro          | Valor |
   | ------------------ | ---------- |
   | **Name**           | workshop-protractor                           |
   | **Version**        | _[Por Defecto]_                               |
   | **Description**    | This is a Workshop about Protractor           |
   | **Entry Point**    | _[Por Defecto]_                               |
   | **Test Command**   | `protractor protractor.config.js`             |
   | **Git Repository** | _[Por Defecto]_                               |
   | **Keywords**       | ui-testing, dojo, practice, protractor        |
   | **Author**         | _[Su nombre]_ <_[Su correo]_> (_[su github]_) |
   | **License**        | MIT                                           |

1. Instalar la dependencia de protractor
  `npm install --save protractor`

1. Crear en la raíz del proyecto el archivo **protractor.config.js** y agregar la siguiente información
   ``` js
   exports.config = {
     framework: 'jasmine',
     seleniumAddress: 'http://localhost:4444/wd/hub',
     specs: ['test/spec.js']
   }
   ```

1. Actualizar los drivers con el comando
   ``` bash
   ./node_modules/protractor/bin/webdriver-manager update
   ```

1. En una segunda consola ejecutar
   ``` bash
   ./node_modules/protractor/bin/webdriver-manager start
   ```

1. Crear la carpeta **test** y dentro de la carpeta crear el archivo **spec.js**
   ``` js
   describe('This is the first example of protractor', () => {
     it('should have a title', () => {
       browser.ignoreSynchronization = true;
       browser.get('http://www.google.com');
       expect(browser.getTitle()).toEqual('Google');
     });
   });
   ```

1. Ejecutar el comando `npm test` y comprobar que la prueba pasa de forma satisfactoria
1. Crear el archivo **.gitignore** en la raíz del proyecto. Ingresar a la página <https://www.gitignore.io/> y en el área de texto  agregar el _sistema operativo_, _IDE's_ y _NodeJS_, ejemplo _OSX Node VisualStudioCode_. Genere el archivo y cópielo dentro del archivo **.gitignore**
1. Crear el archivo **LICENSE** en la raíz del proyecto con lo especificado en <https://en.wikipedia.org/wiki/MIT_License> (_Tenga en cuanta cambiar el año y el copyright holders_)
1. Realizar un commit donde incluya los 5 archivos modificados con el mensaje “setup protractor configuration” y subir los cambios al repositorio
1. Crear un PR y esperar por la aprobación o comentarios de los revisores
1. Una vez aprobado realizar el merge a master seleccionando la opción “squash and merge”

### 2. Mejorando el primer caso de prueba

**Descripción**: Se utilizará el método `onPrepare` para configurar la información que debería ser igual en todas las pruebas, adicionalmente se utilizará el `beforeEach` para organizar la prueba de forma más legible

1. Crear la rama **improve-test** a partir de master
1. Modificar el **protractor.conf.js** agregando lo siguiente
    ``` js
    exports.config = {
      framework: 'jasmine',
      seleniumAddress: 'http://localhost:4444/wd/hub',
      specs: ['test/spec.js'],
      onPrepare: () => {
        browser.ignoreSynchronization = true;
      }
    }
    ```
1. En el **protractor.conf.js** cambiar el valor de spec por **test/Google.spec.js**
1. Cambiar de nombre el archivo **spec.js** por **Google.spec.js**
1. Cambiar el contenido del archivo **Google.spec.js** por
    ``` js
    describe('Given a SDET learning protractor', () => {
      describe('when open Google Page', () => {
        beforeEach(() => {
          browser.get('http://www.google.com');
        });

        it('then should have a title', () => {
          expect(browser.getTitle()).toEqual('Google');
        });
      });
    });
    ```
1. Ejecutar `npm test` y verificar la correcta ejecución de la prueba
1. Subir los cambios a Github
1. Crear un PR y esperar por la aprobación o comentarios de los revisores
1. Una vez aprobado realizar el merge a master seleccionando la opción “squash and merge”
1. Eliminar la rama una vez mergeada

### 3. Migrando a TypeScript

**Descripción**: Angular ha hecho un gran esfuerzo por hacer funcionar sus framework mucho mejor en typescript, y protractor no es la excepción, en esta sesión se migrará el proyecto que se tiene al uso de typescript

1. Instalar las dependencias de desarrollo **@types/jasminewd2** typescript
    `npm install --save-dev @types/jasminewd2 typescript`
1. Crear el archivo **tsconfig.json** en la raíz del proyecto con el siguiente contenido
    ``` json
    {
      "compilerOptions": {
        "target": "es6",
        "sourceMap": true,
        "outDir": "dist",
        "module": "commonjs",
        "moduleResolution": "node",
        "noUnusedParameters": true,
        "noUnusedLocals": true
      }
    }
    ```
1. Cambiar el nombre del archivo **Google.spec.js** por **Google.spec.ts** y agregar en la siguiente primera línea (La segunda línea debe ser un salto de línea para separar los imports de los describe)
    ```ts
    import { browser } from 'protractor';
    ```
1. Cambiar de nombre el archivo **protractor.config.js** por **config.ts** y moverlo dentro de una carpeta llamada **protractor** que debe ser creada en la raíz del proyecto
1. Cambiar todo el archivo por el siguiente:
    ``` ts
    import { browser, Config } from 'protractor';

    export const config: Config = {
      framework: 'jasmine',
      seleniumAddress: 'http://localhost:4444/wd/hub',
      specs: ['../test/Google.spec.js'],
      noGlobals: true,
      onPrepare: () => {
        browser.ignoreSynchronization = true;
      }
    }
    ```
1. Modificar los scripts del package.json para que tengan el siguiente contenido:
    ``` json
    "clean": "rm -rf dist",
   "prebuild": "npm run clean",
   "build": "tsc",
   "test": "npm run build && protractor dist/protractor/config.js"
    ```
1. Agregar las siguientes líneas en el **.gitignore**
    ``` bash
    ## Typescript
    dist
    ```

### 4. Agregando Reporte a la Consola

**Descripción**: Es necesario poder ver los resultados de una forma entendible en la consola, en esta sesión se configura un reporte de consola.

1. Instale la dependencia de desarrollo **jasmine-spec-reporter**
1. Crear la carpeta **protractor/helpers** y dentro de la carpeta el archivo **reporter.ts** con el siguiente contenido
    ```ts
    import { DisplayProcessor, SpecReporter } from "jasmine-spec-reporter";

    export let reporter = () => {
      jasmine.getEnv().addReporter(new SpecReporter({
        customProcessors: [DisplayProcessor],
      }));
    };
    ```
1. Modifique el **conf.ts** incluyendo el `import` del `reporter` y dentro del `onPrepare` llamar al método reporter
    ``` ts
    import { reporter }   from './helpers/reporter';
    reporter();
    ```
1. Solicite la revisión de código tal como se hizo en el punto anterior. Dentro de la descripción del PR incluya una imagen con el resultado de la ejecución, así como muestra a continuación
   ![Console result](https://raw.githubusercontent.com/wiki/AgileTestingColombia/workshop-protractor/images/image4.png)

### 5. Desactivar el manejador de promesas y Selenium server

**Descripción**: El próximo año, protractor dejará de dar soporte a un tipo de promesas personalizadas que ha trabajado desde sus inicios, para adelantarnos al futuro modificaremos el proyecto de tal forma que protractor no maneje el manejador de promesas que piensa deprecar

1. Eliminar la propiedad `seleniumAddress` del **config.ts**
1. Agregar la propiedad `SELENIUM_PROMISE_MANAGER` con el valor `false`
1. Modificar el archivo de **Google.spec.ts** para que trabaje con **async/await**
    ``` ts
    import { browser } from 'protractor';

    describe('Given a SDET learning protractor', () => {
      describe('when open Google Page', () => {
        beforeEach(async () => {
          await browser.get('http://www.google.com');
        });

        it('then should have a title', async () => {
          await expect(browser.getTitle()).toEqual('Google');
        });
      });
    });
    ```
1. Solicite la revisión de código tal como se hizo en el punto anterior

### 6. Chrome Headless

**Descripción**: Muchas veces no contamos con servidores de integración continua que tengan acceso a máquinas con interfaz gráfica. Existen algunos navegadores que tienen versión headless que funcionan sin interfaz gráfica pero se comportan muy similar a los navegadores comunes. En esta sesión vamos a configurar la versión headless de chrome

1. Duplicar el archivo **conf.js** con el nombre de **headless.conf.ts**
1. Agregar la propiedad de capabilities en el nuevo archivo con la siguiente información
    ``` ts
    capabilities: {
      browserName: 'chrome',
      chromeOptions: {
        args: ['--headless', '--disable-gpu', '--window-size=800,600', '--no-sandbox']
      }
    }
    ```
1. Duplicar el script **test** del **package.json** con el nombre de **test:headless** y cambia la ruta de ejecución al archivo **headless.conf.js**
1. Cambia el nombre del script **test** por **test:local**
1. Ejecuta tanto el comando `npm run test:local` como el `npm run test:headless` para comprobar que ejecuta efectivamente
1. Solicite la revisión de código tal como se hizo en el punto anterior

### 7. Agregar Integración Continua

**Descripción**: La integración continua es una práctica requerida hoy en día, en esta sesión configuraremos travis para ejecutar nuestra integración continua

1. Crear el archivo **.travis.yml** en la raíz del proyecto
1. Agregar el siguiente contenido
    ``` yml
    language: node_js
    cache:
    directories:
    - node_modules
    notifications:
    email: false
    node_js:
    - '7'
    branches:
    except:
    - /^v\d+\.\d+\.\d+$/
    ```
1. Habilitar en Travis en el repositorio <https://docs.travis-ci.com/user/getting-started/>
1. Modificar los scripts de **package.json** con agregando `"test": "npm run test:headless"`
1. Agregar el script `"postinstall"` con el valor `"webdriver-manager update --gecko false"`
1. Cree un PR
1. Verificar que la ejecución en Travis termine correctamente

### 8. Agregando Análisis de Código Estático

**Descripción**: El análisis de código estático nos ayuda a estandarizar la forma en como escribimos código, en esta sesión configuraremos tslint con airbnb para tener análisis de código estático

1. Agregar las dependencias de desarrollo **tslint** y **tslint-config-airbnb**
1. Crear el archivo **tslint.json** con la siguientes información
    ``` json
    {
      "defaultSeverity": "error",
      "extends": [
        "tslint-config-airbnb"
      ],
      "rules": {
        "trailing-comma": [true]
      }
    }
    ```
1. Agregar el script de **package.json** lint
    `"lint": "tslint --type-check --project tsconfig.json protractor/**/*.ts test/**/*.ts src/**/*.ts"`
1. Corregir las reglas de forma automática `npm run lint -- --fix`
1. Las reglas que no se puedan corregir automáticamente investigue y corrijalas. Ejecute el comando `npm run lint` para verificar que reglas esta rompiendo
1. Modifique el script de `prebuild` del `package.json` agregandole al final `&& npm run lint`
1. Solicite la revisión de código tal como se hizo en el punto anterior

### 9. CSS Selector

**Descripción**: Los css selector son los selectores más utilizados por los desarrolladores tener un buen dominio de ellos facilita la automatización de pruebas. En esta sesión se implementará un primer caso de pruebas con css selectores

1. Crear el archivo **BuyTshirt.spec.ts** dentro de la carpeta **test**
1. Escribir dentro del archivo el siguiente contenido
    ``` ts
    import { $, browser } from 'protractor';

    describe('Buy a t-shirt', () => {
      beforeEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
      });

      it('then should be bought a t-shirt', async () => {
        await browser.get('http://automationpractice.com/');
        await(browser.sleep(10000));
        await $('#block_top_menu > ul > li:nth-child(3) > a').click();
        await(browser.sleep(3000));
        await
        $('#center_column > ul > li > div > div.left-block > div > a.product_img_link > img').click();
        await(browser.sleep(3000));
        await $('#add_to_cart > button > span').click();
        await(browser.sleep(3000));
        await $('[style*="display: block;"] .button-container > a').click();
        await(browser.sleep(3000));
        await $('.cart_navigation span').click();
        await(browser.sleep(3000));

        await $('#email').sendKeys('aperdomobo@gmail.com');
        await $('#passwd').sendKeys('WorkshopProtractor');
        await $('#SubmitLogin > span').click();
        await(browser.sleep(3000));

        await $('#center_column > form > p > button > span').click();
        await(browser.sleep(3000));

        await $('#cgv').click();
        await(browser.sleep(3000));

        await $('#form > p > button > span').click();
        await(browser.sleep(3000));
        await $('#HOOK_PAYMENT > div:nth-child(1) > div > p > a').click();
        await(browser.sleep(3000));
        await $('#cart_navigation > button > span').click();
        await(browser.sleep(3000));

        await expect($('#center_column > div > p > strong').getText())
          .toBe('Your order on My Store is complete.');
      });
    });
    ```
1. Modifique los archivos de configuración de protractor cambiando
    ``` ts
    specs: ['../test/**/*.spec.js']
    ```
    y
    ``` ts
    getPageTimeout: 1000
    ```
1. Eliminar el archivo **Google.spec.ts**
1. Ejecute las pruebas tanto con interfaz gráfica como en modo headless. Si alguna prueba falla modificarla utilizando css locators o los tiempos hasta que logre funcionar
1. Solicite la revisión de código tal como se hizo en el punto anterior

### 10. Page Object Model

**Descripción**: El page object model es el patrón por defecto que se utiliza para la mantenibilidad de las pruebas, conocer cómo implementar este patrón le ahorrará muchas horas de reproceso en el futuro. En esta sesión se hará la primera implementación del patrón Page Object Model (POM)

1. Crear la carpeta **src/page** desde la raíz del proyecto
1. Crear el archivo **src/page/MenuContent.page.ts** con el siguiente contenido
    ``` ts
    import { $, ElementFinder, promise } from 'protractor';

    export class MenuContentPage {
      private get tShirtMenu(): ElementFinder {
        return $('#block_top_menu > ul > li:nth-child(3) > a');
      }

      public goToTShirtMenu(): promise.Promise<void> {
        return this.tShirtMenu.click();
      }
    }
    ```
1. Crear el archivo src/page/index.ts con el siguiente contenido
    ``` ts
    export { MenuContentPage } from './MenuContent.page';
    ```
1. Modificar el archivo **BuyTshirt.spec.ts** de la siguiente forma
    * Importar la dependencia del page object despues del import de protractor
      ``` ts
      import { $, browser } from 'protractor';
      import { MenuContentPage } from '../src/page';
      ```
    * Creando una instancia del objeto `MenuContentPage`
      ``` ts
      describe('Buy a t-shirt', () => {
      const menuContentPage: MenuContentPage = new MenuContentPage();
      ```
    * Modificando el locator que le da clic en el menú de t-shirt
      ``` ts
      await browser.get('http://automationpractice.com/');
      await(browser.sleep(3000));
      await menuContentPage.goToTShirtMenu();
      ```
1. Realice el resto de page object y remplacelo en la prueba, los nombres de los page object son:  **AddressStep.page.ts**, **BankPayment.page.ts**, **OrderResume.page.ts**, **PaymentStep.page.ts**, **ProductAddedModal.page.ts**, **ProductDetail.page.ts**, **ProductList.page.ts**, **ShippingStep.page.ts**, **SignInStep.page.ts**, **SummaryStep.page.ts**
1. Ejecute las pruebas tanto con interfaz gráfica como en modo headless. Si alguna prueba falla modificarla utilizando css locators o los tiempos hasta que logre funcionar
1. Solicite la revisión de código tal como se hizo en el punto anterior

### 11. Esperas de Carga de Página y de Jasmine

**Descripción**: Las esperas en selenium son los tiempos que se esperará para realizar algunas acciones, conocerlos y saber cómo utilizarlos nos disminuirá la fragilidad de las pruebas y adicionalmente nos ayudará a reducir los tiempos de ejecución.

1. Cambia el valor del `getPageTimeout` por `30000` en los archivos de configuración de protractor
1. Elimina el `sleep` de **10000**
1. Ejecutar las pruebas y verifica que aun sigan funcionando
1. Agregar el tiempo de espera de Jasmine dentro de los archivos de configuración como muestra la siguiente imagen
    ``` ts
    jasmineNodeOpts: {
      defaultTimeoutInterval: 120000
    }
    ```
1. Eliminar el `beforeEach` de la prueba
1. Ejecute las pruebas tanto con interfaz gráfica como en modo headless. Si alguna prueba falla modificarla utilizando css locators o los tiempos hasta que logre funcionar
1. Solicite la revisión de código tal como se hizo en el punto anterior

### 12. Esperas Implicitas

**Descripción**: Una espera implícita es una espera global que se tiene para cada elemento de la página. En esta sesión veremos cómo tenerla configurada nos ayudará a reducir la cantidad de sleeps de la prueba

1. Agregar dentro del onPrepare de los archivos de config la línea
    ``` ts
    browser.manage().timeouts().implicitlyWait(3000)
    ```
1. Quitar todos los sleeps de la prueba
1. Ejecute las pruebas tanto con interfaz gráfica como en modo headless. Si alguna prueba falla 1. modificarla utilizando css locators o los tiempos hasta que logre funcionar
1. Solicite la revisión de código tal como se hizo en el punto anterior

### 13. Esperas Explicitas

**Descripción**: Las esperas explícitas es la más recomendada, ya que nos permite hacer esperas puntuales sobre algunos elementos y no sobre todos. En esta sesión desactivaremos las esperas implícitas y activaremos las explícitas donde sea necesario

1. Modificar los archivos de configuración de tal forma que desactive las esperas implicitas
    ```ts
    browser.manage().timeouts().implicitlyWait(0)
    ```
1. Ejecute la prueba e identifique en qué partes la prueba falla
1. Utiliza esperas explícitas para solucionar las fallas de la prueba. busque apoyo de **browser** y **ExpectedConditions**
1. Ejecute las pruebas tanto con interfaz gráfica como en modo headless. Si alguna prueba falla modificarla utilizando css locators o los tiempos hasta que logre funcionar
1. Solicite la revisión de código tal como se hizo en el punto anterior

### 14. Mejorando los Locator

**Descripción**: En esta sesión usted hará la propuesta de que locators deberían ser utilizados en la prueba que se está implementado.

1. Haga su propia propuesta de locators para cada uno de los page-objects
1. Enviar PR con los cambios
1. El revisor comentará con los que no está de acuerdo, en ese caso, justifique la razón de su selección (No une **XPATH**)

### 15. Separar prueba en diferentes describes

**Descripción**: Por legibilidad es bueno tener sesionados cada uno de los pasos de las pruebas en diferentes describes, en esta sesión usted aprenderá cómo hacerlo

1. Modificar la prueba de **BuyTShirt.spec.ts** de tal forma que tenga varios describes de la siguiente forma
    * Abrir la página en el navegador
    * Proceso de compra de la Camiseta
    * Logeo en la aplicación
    * Seleccionar la dirección por defecto
    * Pago en el banco (Este debe contener el `it` de validación)
1. Enviar PR con los cambios

### 16. Agregando Jasmine Awesome

**Descripción**: agregaremos un reporte visual a nuestro proyecto de tal forma que tenga un reporte html de la ejecución de las pruebas

1. Instalar la dependencia de desarrollo **jasmine-awesome-report**
1. Siga las instrucciones de <https://github.com/aperdomob/jasmine-awesome-report> (La carpeta debe llamarse reports y el reporte awesome)
1. Modificar el gitignore para que excluya la carpeta del reports
1. Modificar el package.json para que el script del clean borre la carpeta de reports
1. Ejecute las pruebas tanto con interfaz gráfica como en modo headless. Si alguna prueba falla modificarla utilizando css locators o los tiempos hasta que logre funcionar
1. Solicite la revisión de código tal como se hizo en el punto anterior

### 17. Utilizando Capabilities para configurar Chrome

**Descripción**: Las popups que muestra chrome cuando se está ejecutando por selenium son molestas y pueden causar fragilidad en las pruebas, en esta sesión se enseñará a desactivarlas por medio de las capabilities.

1. Modificar la configuración local de protractor agregando una capability para chrome para evitar ventanas emergente en la ejecución
    ``` ts
    capabilities: {
      browserName: 'chrome',
      chromeOptions: {
        args: ['disable-infobars=true --window-size=800,600'],
        prefs: { credentials_enable_service: false }
      }
    },
    ```
1. Tomar una foto de que ejecuta sin las ventanas emergentes y colocarla en la descripción del PR
1. Ejecute las pruebas tanto con interfaz gráfica como en modo headless. Si alguna prueba falla modificarla utilizando css locators o los tiempos hasta que logre funcionar
1. Solicite la revisión de código tal como se hizo en el punto anterior

### 18. Listas de Elementos, filtros y elementos dentro de elementos

**Descripción**: En muchas ocasiones tenemos que obtener un locator para posteriormente poder hacer una acción sobre un hermano o alguno que no esté directamente relacionado, en esta sesión trabajaremos con la anidación de locators y métodos de búsqueda para poder conseguir relacionar dos locators

1. Agregue un `get` dentro de **ProductList.page.ts** llamado `productContainerList` el cual obtendrá todos los productos
1. Cree el método privado `findByProduct` el cual debe retornar toda la caja del producto con el nombre específico. Utilice `$` para obtener elementos internos del locator, `filter` para filtrar la lista y `first` para obtener el primer elemento. Revise la API de protractor por si tiene alguna duda
1. Elimine el método que antes obtenía el primer elemento y cambielo por un método llamado `selectProduct` que reciba el nombre del producto y le da clic en la imagen
1. Ejecute las pruebas tanto con interfaz gráfica como en modo headless. Si alguna prueba falla modificarla utilizando css locators o los tiempos hasta que logre funcionar
1. Solicite la revisión de código tal como se hizo en el punto anterior

### 19. Más Locators

**Descripción**: esta sesión automatizaremos otra página diferente, y su misión es seleccionar los mejores locators posibles de tal forma que el page object sea lo más reutilizable posible

1. Crear el archivo **PersonalInformation.page.ts**
1. Crear el archivo **Locators.spec.ts** en la carpeta de test, dentro de este archivo se navegará a <http://toolsqa.com/automation-practice-form/> y ejecutará el siguiente método que debe llenar el formulario con la información que se indica y dar clic en el botón Button
    ``` ts
    await personalInformationPage.fillForm({
       firstName: 'Alejandro',
       lastName: 'Perdomo',
       sex: 'Male',
       experience: 7,
       profession: ['Automation Tester'],
       tools: ['Selenium Webdriver'],
       continent: 'South America',
       commands: [
         'Browser Commands',
         'Navigation Commands',
         'Switch Commands',
         'Wait Commands',
         'WebElement Commands']
    });
    ```
1. Realizar una comprobación del título "**Practice Automation Form**"

### 20. Ejecución de Código Javascript

**Descripción**: Selenium tiene algunas limiaciones y por tanto en ocasiones nos toca ejecutar código directamente en javascript para poder hacer una acción que necesitamos, en este sesión cambiaremos una propiedad de un locator por medio de javascript ya que selenium no es capaz de soportarlo nativamente.

1. Cree el archivo de prueba **IFrame.spec.ts** el cual abrirá la página <http://toolsqa.com/iframe-practice-page/> modificará la áltura del IFrame 1, posteriormente obtendrá la nueva altura para comprobar si efectivamente cambio
1. Cree el archivo page **IFrame.page.ts** el cual contendrá un método para modificar la altura de un IFrame y otro para obtener su altura

### 21. Trabajando con IFrames

**Descripción**: Los IFrames aunque ya están mandados a recoger, en ocasiones no los encontramos en algunas páginas, y no está de más saber cómo trabajar con ellos cuando nos los encontremos. En esta sesión entraremos a un iframe, haremos acciones sobre el, saldremos de él y haremos otras acciones sobre la página principal

1. Modificar el page **IFrame.page.ts** de tal forma que publique:
    * un método que retorne el título de la página de valor **Sample Iframe page**
    * un método para pasarse al iframe 1
    * otro método para regresar al contexto principal
1. Modificar la prueba **IFrame.spec.ts** de tal forma que verifique el título principal
1. Modificar la prueba **IFrame.spec.ts** de tal forma que se cambie al iframe 1 y verifique el título
1. Modificar la prueba **IFrame.spec** de tal forma que se cambie al contexto principal y verifique nuevamente el título

### 22. Subiendo un Archivo

**Descripción**: En esta sesión se automatizará una prueba donde se deba subir un archivo.

1. Modificar el page **PersonalInformation.page.ts** de tal forma que el método `fillForm` ahora no haga clic en el botón y cree otro método submit que llene el formulario y haga clic en el botón
1. También debe recibir dentro del json un parámetro file que tiene la ruta relativa de algún archivo a subir, si tiene un valor válido debe subir el archivo
1. Cree la carpeta resources a nivel de la raíz del proyecto y coloque un archivo jpg en ella
1. Modificar Locators.spec.ts de tal forma que se le pase la ruta de la imagen que puso en resources
1. Agregue una validación el Locators.spec.ts que verifique la imagen fue cargada

### 23. Descargando Archivos

**Descripción**: En esta sesión se automatizará una prueba donde se deba descargar un archivo

1. Modificar el page **PersonalInformation.page.ts** de tal forma que si recibe el parámetro `downloadFile` dentro del JSON llame al método privado `download` de ese mismo pageobject
1. El método `download` obtendrá el link del enlace "**Test File to Download**" y se lo pasará al método `downloadFile` que recibe dos parametros de entrada el link de descarga y el nombre del archivo con que se quiere guardar
1. Crear la carpeta service dentro de **src** y crear dentro un archivo llamado **Download.service.ts** que tendrá dos métodos públicos
    ``` ts
    public async downloadFile(link: string, filename): Promise<void>
    ```
    Este método obtendrá la información del link y lo guardará en una carpeta temp a nivel raíz del proyecto con el nombre indicado
    ``` ts
    public readFileFromTemp(filename: string): Buffer
    ```
    Recibirá el nombre del archivo y devolverá el buffer que contiene la información del archivo
1. Modificar la prueba de tal forma que descargue el archivo y después comprobar que descargó de forma correcta

### 24. Configurar Saucelabs

**Descripción**: Ejecutar en modo headless no siempre es la mejor opción, existen herramientas de pago como Saucelabs que nos provisionan diferentes sistemas operativos y diferentes navegadores, en esta sesión configuraremos saucelabs para ejecutar nuestras pruebas.

Ya que nuestras pruebas se ejecutarán en un servidor de integración sin interfaz gráfica, debemos utilizar servicios externos para la ejecución en browsers reales. En este caso utilizaremos saucelabs.

1. Crear una cuenta en saucelabs diligenciando el formulario
1. Una vez creada la cuenta, ir a la opción de User Settings
    ![](https://raw.githubusercontent.com/wiki/AgileTestingColombia/workshop-protractor/images/image1.png)
1. Ir a la sección de Access Key y dar click en show. Esto pedirá el password para mostrar el access key. Una vez lo acceda, cópielo al portapapeles y guárdelo en un lugar seguro
    ![](https://raw.githubusercontent.com/wiki/AgileTestingColombia/workshop-protractor/images/image2.png)
1. Instale la dependencia cross-env para setear variables de ambiente en cualquier sistema operativo: `npm i cross-env --save-dev`
1. Adicione al archivo **package.json** el script `test:saucelabs` y haga que este se corra cuando se ejecute el script de test
    ``` json
    "test:saucelabs": "npm run build && protractor dist/protractor/saucelabs.config.js",
    "test": "npm run test:saucelabs"
    ```
1. Adicione el archivo **protractor/saucelabs.config.ts**, que contiene la siguiente información adicional:
    * `sauceUser`: tendrá el valor del user name de saucelabs
    * `sauceKey`: tendrá el valor del key de saucelabs copiado en el punto 3
    * `Capabilities.name`: nombre de la ejecución del job en saucelabs
    ``` ts
    import { browser, Config } from 'protractor';
    import { reporter } from './helpers/reporter';

    export let config: Config = {
      framework: 'jasmine',
      specs: ['../test/**/*.spec.js'],
      SELENIUM_PROMISE_MANAGER: false,
      noGlobals: true,
      getPageTimeout: 30000,
      capabilities: {
        name: 'UI Workshop',
        browserName: 'chrome',
        chromeOptions: {
          args: ['disable-infobars=true --window-size=800,600'],
          prefs: { credentials_enable_service: false }
        }
      },
      jasmineNodeOpts: {
        defaultTimeoutInterval: 120000
      },
      onPrepare: () => {
        reporter();
        browser.ignoreSynchronization = true;
        browser.manage().timeouts().implicitlyWait(0);
      },
      sauceUser: process.env.SAUCE_USERNAME,
      sauceKey: process.env.SAUCE_ACCESS_KEY
    };
    ```
1. Una vez configurado esto, en la consola asigne los valores para `SAUCE_USERNAME` y `SAUCE_ACCESS_KEY`, con los valores del registro en saucelabs
    ``` bash
    export SAUCE_USERNAME='sauce-username'
    export SAUCE_ACCESS_KEY='sauce-keu'
    ```
1. Ejecute la prueba `npm test`
1. Esto lanzará la ejecución directamente en saucelabs y se puede visualizar de la siguiente forma: <http://recordit.co/pIAXMQShQJ>
1. Para que travis tome correctamente el `SAUCE_ACCESS_KEY` se debe configurar la variable de forma encriptada
    ``` bash
    travis encrypt SAUCE_USERNAME=el-usuario --add
    travis encrypt SAUCE_ACCESS_KEY=el-key --add
    ```

#### Sugerencias

* Para configurar las variable de entorno en diferentes sistemas operativos, consulte este [link](https://wiki.saucelabs.com/display/DOCS/Best+Practice%3A+Use+Environment+Variables+for+Authentication+Credentials)
* Asegúrese de establecer los valores correctos para `SAUCE_USERNAME` y `SAUCE_ACCESS_KEY`

### 25. Probar con diferentes navegadores
**Descripción**: Nuestros productos generalmente deben ser verificados en más de un navegador, por tanto es importante saber cómo ejecutar nuestras pruebas en varios navegadores.

1. Necesitaremos editar el archivo protractor/saucelabs.config.ts, con los siguientes valoresCambiar capabilities por multiCapabilities
    * `multiCapabilities`: contiene la configuración de varios navegadores en un mismo config file
    ``` ts
    import { browser, Config } from 'protractor';
    import { reporter } from './helpers/reporter';

    const firefoxConfig = {
      browserName: 'firefox',
      name: 'firefox-tests',
      shardTestFiles: true,
      maxInstances: 1
    };

    const chromeConfig = {
      browserName: 'chrome',
      name: 'chrome-tests',
      shardTestFiles: true,
      maxInstances: 1
    };

    const multiCapabilities = [chromeConfig, firefoxConfig];

    export let config: Config = {
      multiCapabilities,
      framework: 'jasmine',
      specs: ['../test/**/*.spec.js'],
      SELENIUM_PROMISE_MANAGER: false,
      noGlobals: true,
      getPageTimeout: 30000,
      jasmineNodeOpts: {
        defaultTimeoutInterval: 120000
      },
      onPrepare: () => {
        reporter();
        browser.ignoreSynchronization = true;
        browser.manage().timeouts().implicitlyWait(0);
      },
      sauceUser: process.env.SAUCE_USERNAME,
      sauceKey: process.env.SAUCE_ACCESS_KEY
    };
    ```
1. Del punto anterior en el objeto multiCapabilities nos interesa:
    * `shardTestFiles`: habilitar ejecuciones en paralelo de los tests. Se puede aumentar la cantidad de ejecuciones por browser de uno a la cantidad en paralelo que se desee.
    * `maxInstance`: el número máximo de ejecuciones en paralelo para ese browser
1. Ahora la ejecución en saucelabs debe mostrar ambos navegadores en ejecución en paralelo
    ![](https://raw.githubusercontent.com/wiki/AgileTestingColombia/workshop-protractor/images/image3.png)

#### Sugerencias para brobar con diferentes navegadores

* Las configuraciones pueden mejorarse, haciendo que se reciban parámetros por consola con los browsers en los que se desea ejecutar
* Puede adicionar más browsers o versiones de browsers o sistema operativo, siempre y cuando sean [soportados](https://saucelabs.com/platforms) por saucelabs
* Opciones como shardTestFiles o maxInstances también pueden ser configurables para que el usuario decida cómo ejecutar las pruebas y dejar valores por defecto para ser usado por el CI
