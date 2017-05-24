import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from "../../core/shared/logger.service";
import { INewUserCredential, IUserCredential } from '../../core/shared/models';
import { UsersService } from "../users/users.service";
import { Credential } from "./credential.entity";
import { CredentialsLogic } from "./credentials.logic";

@Controller('credentials')
export class CredentialsController {
  constructor(
    private logger: LoggerService,
    private credentialsLogic: CredentialsLogic) {

  }

  @Post()
  public async registerNewUserCredential( @Res() res: Response, @Body() user: INewUserCredential) {
    const newUser = await this.credentialsLogic.registerNewUserCredential(user);
    if (newUser) {
      this.logger.value(newUser);
      res.status(HttpStatus.CREATED).json(newUser);
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Not created' });
    }
  }

  @Get()
  public async getLoginToken( @Res() res: Response, @Body() userCredential: IUserCredential) {
    const token = await this.credentialsLogic.getToken(userCredential);
    res.status(HttpStatus.OK).json({ access_token: token });
  }
}
