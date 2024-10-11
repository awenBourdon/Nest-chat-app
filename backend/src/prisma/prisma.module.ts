import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() //Signifie que tous les modules importés dans l'application auront accès à PrismaService sans avoir à importer explicitement PrismaModule
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}