import { Body, Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { LoggerService } from "../../core/shared/logger.service";
import { Organization } from "./organization.entity";
import { OrganizationsService } from "./organizations.service";

@Controller('organizations')
export class OrganizationsController {
  constructor(
    private logger: LoggerService,
    private organizationsService: OrganizationsService
  ) { }

  @Get()
  public async getAll( @Req() req: Request, @Res() res: Response) {
    const organizations = await this.organizationsService.getAll();
    res.status(HttpStatus.OK).json(organizations);
  }

  @Post()
  public async post( @Res() res: Response, @Body() organization: Organization) {
    const newOrganization = await this.organizationsService.post(organization);
    if (newOrganization) {
      this.logger.value(newOrganization);
      res.status(HttpStatus.CREATED).json(newOrganization);
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Not created' });
    }
  }

}
