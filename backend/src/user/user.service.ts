import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UserService {
  // Le constructeur injecte le PrismaService, permettant l'accès à la base de données
  constructor(private readonly prisma: PrismaService) {}

  // Méthode pour récupérer tous les utilisateurs
  async getUsers(): Promise<any> {
    // Utilise Prisma pour rechercher tous les utilisateurs
    const users = await this.prisma.user.findMany({
      // Sélectionne uniquement les champs spécifiés pour chaque utilisateur
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    // Retourne la liste des utilisateurs
    return users;
  }

  // Méthode pour récupérer un utilisateur spécifique par son ID
  async getUser(params: { userId: string }) {
    // Extrait l'userId des params
    const { userId } = params;
    // Utilise Prisma pour trouver un utilisateur unique basé sur l'ID
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
