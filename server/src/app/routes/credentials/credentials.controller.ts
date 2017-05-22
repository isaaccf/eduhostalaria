import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { Request, Response } from 'express';
import { INewUserCredential, IUserCredential } from "../../core/shared/models";
import { UsersService } from "../users/users.service";
import { CredentialsService } from "../credentials/credentials.service";
import { Credential } from "./credential.entity";
import { NotFoundException } from "../../core/shared/exceptions";
import { sign } from 'jsonwebtoken';
import { SETTINGS } from "../../../environments/environment";

@Controller('credentials')
export class CredentialsController {

  constructor(
    private credentialsService: CredentialsService,
    private usersService: UsersService,
  ) { }


  // Register  
  @Post()
  public async createNewUserCredential( @Res() res: Response, @Body() user: INewUserCredential) {
    const newUser = await this.usersService.post(user);
    const credential = new Credential();
    credential.userId = newUser.id;
    credential.password = user.password;
    await this.credentialsService.post(credential);
    res.status(HttpStatus.CREATED).json(newUser);
  }

  // Login  
  @Get()
  public async getUserCredential( @Res() res: Response, @Body() userCredential: IUserCredential) {
    const user = await this.usersService.getByEmail(userCredential.email);
    const credential = await this.credentialsService.getByUserIdPassword(user.id, userCredential.password);
    if (!credential) {
      throw new NotFoundException('Invalid Credential');
    }
    const token = sign(user, SETTINGS.secret);
    res.status(HttpStatus.OK).json({ access_token: token });
  }
}