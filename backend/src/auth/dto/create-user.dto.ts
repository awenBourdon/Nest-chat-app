import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    {
      message: "Veuillez fournir une adresse email valide."
    }
  )
  email: string;

  @IsNotEmpty({
    message: "Le mot de passe ne doit pas être vide."
  })
  @MinLength(8, {
    message: "Votre mot de passe doit faire au moins 8 caractères."
  })
  password: string;

  @IsString({
    message: "Veuillez fournir un nom d'utilisateur valide."
  })
  name: string;
}

