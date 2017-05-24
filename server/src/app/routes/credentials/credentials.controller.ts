import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { INewUserCredential, IUserCredential } from '../../core/shared/models';
import { CredentialsService } from '../credentials/credentials.service';
import { UsersService } from "../users/users.service";
import { Credential } from "./credential.entity";
import { CredentialsLogic } from "./credentials.logic";

@Controller('credentials')
export class CredentialsController {
  private logger: Logger;
  constructor(private credentialsService: CredentialsService, private credentialsLogic: CredentialsLogic) {
    this.logger = new Logger('CredentialsController');
  }

  @Post()
  public async registerNewUserCredential( @Res() res: Response, @Body() user: INewUserCredential) {
    const newUser = await this.credentialsLogic.registerNewUserCredential(user);
    if (newUser) {
      this.logger.log(JSON.stringify(newUser));
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
