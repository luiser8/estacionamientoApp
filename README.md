# Estacionamientoapp

## BD
	*Poner en marcha la base de datos
		MongoDB en local en mi preferencia
			* DB name = estacionamiento
			
## BackEnd
	*Poner en marcha el BackEnd	
		*node js actualizado ~ V14.17^
		* npm install yarn -g / npm install nodemon -g
		* en el proyecto raiz - yarn install
		* en el archivo .env colocamos el puerto y el servidor local de mongo
		* ejecutar nodemon index.js
		* verificar
			- http://localhost:9000/
			- probar con http://localhost:9000/api/v1/puestos
			
## FrontEnd
	*Poner en marcha el FrontEnd
		* en el proyecto raiz - yarn install
		* en el caso qeu se necesite cambiar de ip del api rest
			- Ubicar el archivo environments/environment.ts en la variable url
		* ejecutar ng serve --open --port=4200