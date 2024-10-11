import { NestFactory } from '@nestjs/core'; //NestFactory est une classe utilisée pour créer une instanc de l'application Nest.js
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


// bootstrap est la fonction qui permet de démarrer l'application et de préparer son l'environnement
async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Donc crée une instance de l'application en passant par le module racine AppModule
  
  app.useGlobalPipes( // Valide automatiquement les données entrantes par rapport aux classes DTO définies et purge autmatiquements celles qui ne matchent pas avec le DTO
    new ValidationPipe({ // Voir create-user.dto.ts
      whitelist: true, // Seules les propriétés définies dans le DTO seront autorisées
      transform: true, // Active la transformation automatique des données entrantes, c-à-d qu'elles seront converties en instance de la classe DTO correspondante et au type correct (exemple : string to number)
    }));
     
  await app.listen(3000);
}
bootstrap();
