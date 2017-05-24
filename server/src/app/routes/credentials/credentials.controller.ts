import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from "../../core/shared/logger.service";
import { UsersService } from "../users/users.service";
import { Credential } from "./credential.entity";
import { CredentialsLogic } from "./credentials.logic";
import { IUserInvitation, IUserCredential, IUserRegistration, IUserActivation, IUserConfirmation } from "./models";
import { User } from "../users/user.entity";

@Controller('credentials')
export class CredentialsController {
  constructor(
    private logger: LoggerService,
    private credentialsLogic: CredentialsLogic) { }

  @Post()
  public async postUserRegistration( @Res() res: Response, @Body() userRegistration: IUserRegistration) {
    const newUser = await this.credentialsLogic.postUserRegistration(userRegistration);
    await this.sendCreatedResponse(res, newUser);
  }

  @Post('invitation')
  public async postUserInvitation( @Res() res: Response, @Body() userInvitation: IUserInvitation) {
    const newUser = await this.credentialsLogic.postUserInvitation(userInvitation);
    await this.sendCreatedResponse(res, newUser);
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

  private sendCreatedResponse( @Res() res: Response, newUser: User) {
    if (newUser) {
      this.logger.value(newUser);
      res.status(HttpStatus.CREATED).json(newUser);
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Not created' });
    }
  }
}
