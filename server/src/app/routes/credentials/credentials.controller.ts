import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { INewUserCredential, IUserCredential } from '../../core/shared/models';
import { CredentialsService } from '../credentials/credentials.service';

@Controller('credentials')
export class CredentialsController {

  constructor(private credentialsService: CredentialsService) { }

  // Register
  @Post()
  public async createNewUserCredential( @Res() res: Response, @Body() user: INewUserCredential) {
    const newUser = await this.credentialsService.post(user);
    res.status(HttpStatus.CREATED).json(newUser);
  }

  // Login
  @Get()
  public async getToken( @Res() res: Response, @Body() userCredential: IUserCredential) {
    const token = await this.credentialsService.getToken(userCredential);
    res.status(HttpStatus.OK).json({ access_token: token });
  }
}
