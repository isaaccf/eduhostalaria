import { Component, Logger, HttpStatus } from "@nestjs/common";
import * as nodemailer from 'nodemailer';
import { SETTINGS } from "../../../environments/environment";
import { IMessage } from './mail.models';


@Component()
export class MailsService {
    private transporter: any;
    private logger: Logger;
    constructor() {
        this.logger = new Logger('Mailer Service');
        this.transporter = nodemailer.createTransport(SETTINGS.mailerSettings);
    }

    public sendMail(message: IMessage) {
        return this.transporter.sendMail(message);
    }
}