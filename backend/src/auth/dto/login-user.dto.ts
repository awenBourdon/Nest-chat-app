import { IsEmail, IsNotEmpty } from 'class-validator';

export class LogUserDto {
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
  password: string;
}

