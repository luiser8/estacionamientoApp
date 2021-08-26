# Estacionamientoapp
		
## FrontEnd
	*Poner en marcha el FrontEnd
		* Instalar GIT https://git-scm.com/
		* Instalar nodejs https://nodejs.org/es/ seleccionar la version LTS 14.17
		* Abrimos la Consola / Terminal y tecleamos npm install yarn -g
			yarn alternativa a npm mas fluido
		* Abrimos la Consola / Terminal y tecleamos npm install -g @angular/cli 
			CLI para Angular nos permite ejecutar, crear / proyectos de Angular
		* Donde hayamos abierto la consola / terminal en el directorio de preferencia
			descargamos / clonamos el repositorio, 
			tecleamos git clone https://github.com/luiser8/estacionamientoApp.git
		* Entramos con la consola / terminal en el proyecto descargado / clonado 
		 	estacionamientoApp
			entando en la carpeta raiz del proyecto ejecutamos yarn install
			para instalar las dependencias necesarias
		* Al finalizar la instalacion, ejecutamos ng serve --open --port=4200
		* En el caso que se necesite cambiar de ip del api rest
			- Ubicar el archivo environments/environment.ts en la variable url