import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from "../../core/shared/logger.service";
import { User } from "../users/user.entity";
import { UsersService } from "../users/users.service";
import { Credential } from "./credential.entity";
import { CredentialsLogic } from "./credentials.logic";
import {
  IUserActivation,
  IUserClientRegistration, IUserConfirmation,
  IUserCredential, IUserGodRegistration,
  IUserInvitation, IUserPublicRegistration
} from "./credentials.models";

@Controller('credentials')
export class CredentialsController {
  constructor(
    private logger: LoggerService,
    private credentialsLogic: CredentialsLogic) { }

  @Post('bigbang')
  public async postUserGodRegistration( @Res() res: Response, @Body() secret: string) {
    if (secret !== 'secret') {
      res.status(HttpStatus.UNAUTHORIZED).json(null);
      return;
    }
    const userRegistration: IUserGodRegistration = {
      email: 'admin@agorabinaria.com',
      name: 'Administrator',
      password: 'secret'
    };
    const newUser = await this.credentialsLogic.postUserGodRegistration(userRegistration);
    if (newUser) {
      this.logger.value(newUser);
      res.status(HttpStatus.CREATED).json(newUser);
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Not created' });
    }
  }

  @Post('client')
  public async postUserClientRegistration( @Res() res: Response, @Body() userRegistration: IUserClientRegistration) {
    const newUser = await this.credentialsLogic.postUserClientRegistration(userRegistration);
    if (newUser) {
      this.logger.value(newUser);
      res.status(HttpStatus.CREATED).json(newUser);
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Not created' });
    }
  }

  @Post('public')
  public async postUserPublicRegistration( @Res() res: Response, @Body() userRegistration: IUserPublicRegistration) {
    const newUser = await this.credentialsLogic.postUserPublicRegistration(userRegistration);
    if (newUser) {
      this.logger.value(newUser);
      res.status(HttpStatus.CREATED).json(newUser);
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Not created' });
    }
  }

  @Post('invitation')
  public async postUserInvitation( @Res() res: Response, @Body() userInvitation: IUserInvitation) {
    const newUser = await this.credentialsLogic.postUserInvitation(userInvitation);
    if (newUser) {
      this.logger.value(newUser);
      res.status(HttpStatus.CREATED).json(newUser);
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Not created' });
    }
  }

  @Post('confirmation')
  public async postUserConfirmation( @Res() res: Response, @Body() userConfirmation: IUserConfirmation) {

  }

  @Post('activation')
  public async postUserActivation( @Res() res: Response, @Body() userActivation: IUserActivation) {

  }

  @Get()
  public async getLoginToken( @Res() res: Response, @Body() userCredential: IUserCredential) {
    const token = await this.credentialsLogic.getToken(userCredential);
    res.status(HttpStatus.OK).json({ access_token: token });
  }

}
